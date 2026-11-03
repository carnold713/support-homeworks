/*
  Overlay scrollbars. Native scrollbars are hidden everywhere (styles.css), so they never reserve
  gutter width or push the design over. Instead, a narrow thumb is drawn on top of whichever
  element is scrolling or hovered. It fades out after a moment, and it can be dragged.
  Swipe carousels that use dot navigation (EXCLUDE) get no thumb.
*/
const EXCLUDE = ".tt-card-row, .tool-grid, [data-no-thumb]";
const SIZE = 6; // thumb thickness
const INSET = 3; // gap from the edge
const MIN = 32; // minimum thumb length
const HIDE_MS = 900;

type Axis = "y" | "x";
type Bar = { el: HTMLElement; axis: Axis; thumb: HTMLDivElement; timer?: number; dragging?: boolean };

const bars = new Map<string, Bar>();
let ids = 0;
const idOf = (el: HTMLElement) => (el.dataset.ovs ??= String(++ids));

function scrollable(el: HTMLElement, axis: Axis) {
  const cs = getComputedStyle(el);
  const ov = axis === "y" ? cs.overflowY : cs.overflowX;
  const isRoot = el === document.scrollingElement;
  if (!isRoot && ov !== "auto" && ov !== "scroll") return false;
  return axis === "y" ? el.scrollHeight > el.clientHeight + 1 : el.scrollWidth > el.clientWidth + 1;
}

function rectOf(el: HTMLElement) {
  if (el === document.scrollingElement) return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  return el.getBoundingClientRect();
}

function place(bar: Bar) {
  const { el, axis, thumb } = bar;
  const r = rectOf(el);
  if (axis === "y") {
    const view = el.clientHeight, total = el.scrollHeight;
    const len = Math.max(MIN, (view / total) * (r.height - INSET * 2));
    const max = total - view;
    const pos = max > 0 ? (el.scrollTop / max) * (r.height - INSET * 2 - len) : 0;
    Object.assign(thumb.style, { top: `${r.top + INSET + pos}px`, left: `${r.left + r.width - SIZE - INSET}px`, width: `${SIZE}px`, height: `${len}px` });
  } else {
    const view = el.clientWidth, total = el.scrollWidth;
    const len = Math.max(MIN, (view / total) * (r.width - INSET * 2));
    const max = total - view;
    const pos = max > 0 ? (el.scrollLeft / max) * (r.width - INSET * 2 - len) : 0;
    Object.assign(thumb.style, { left: `${r.left + INSET + pos}px`, top: `${r.top + r.height - SIZE - INSET}px`, height: `${SIZE}px`, width: `${len}px` });
  }
}

function hideLater(bar: Bar) {
  clearTimeout(bar.timer);
  bar.timer = window.setTimeout(() => !bar.dragging && bar.thumb.classList.remove("on"), HIDE_MS);
}

function show(el: HTMLElement, axis: Axis) {
  if (!el.isConnected || el.closest(EXCLUDE) === el || !scrollable(el, axis)) return;
  const key = idOf(el) + axis;
  let bar = bars.get(key);
  if (!bar) {
    const thumb = document.createElement("div");
    thumb.className = "ovs-thumb";
    document.body.appendChild(thumb);
    bar = { el, axis, thumb };
    bars.set(key, bar);
    drag(bar);
  }
  place(bar);
  bar.thumb.classList.add("on");
  hideLater(bar);
}

function drag(bar: Bar) {
  bar.thumb.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { el, axis, thumb } = bar;
    const start = axis === "y" ? e.clientY : e.clientX;
    const from = axis === "y" ? el.scrollTop : el.scrollLeft;
    const r = rectOf(el);
    const track = (axis === "y" ? r.height : r.width) - INSET * 2 - (axis === "y" ? thumb.offsetHeight : thumb.offsetWidth);
    const max = axis === "y" ? el.scrollHeight - el.clientHeight : el.scrollWidth - el.clientWidth;
    bar.dragging = true;
    thumb.classList.add("drag");
    thumb.setPointerCapture(e.pointerId);
    const move = (ev: PointerEvent) => {
      const d = (axis === "y" ? ev.clientY : ev.clientX) - start;
      const v = from + (track > 0 ? (d / track) * max : 0);
      if (axis === "y") el.scrollTop = v;
      else el.scrollLeft = v;
    };
    const up = () => {
      bar.dragging = false;
      thumb.classList.remove("drag");
      thumb.removeEventListener("pointermove", move);
      thumb.removeEventListener("pointerup", up);
      thumb.removeEventListener("pointercancel", up);
      hideLater(bar);
    };
    thumb.addEventListener("pointermove", move);
    thumb.addEventListener("pointerup", up);
    thumb.addEventListener("pointercancel", up);
  });
  bar.thumb.addEventListener("pointerenter", () => {
    clearTimeout(bar.timer);
    bar.thumb.classList.add("on");
  });
  bar.thumb.addEventListener("pointerleave", () => hideLater(bar));
}

function both(el: HTMLElement) {
  show(el, "y");
  show(el, "x");
}

// Re-place every visible thumb (a scroller inside a scrolling page moves with it).
function refresh() {
  for (const [key, bar] of bars) {
    if (!bar.el.isConnected) {
      bar.thumb.remove();
      bars.delete(key);
    } else if (bar.thumb.classList.contains("on")) place(bar);
  }
}

let raf = 0;
let hoverTarget: EventTarget | null = null;
function onHover() {
  raf = 0;
  let n = hoverTarget as HTMLElement | null;
  while (n && n !== document.body && n !== document.documentElement) {
    if (n.nodeType === 1 && (scrollable(n, "y") || scrollable(n, "x"))) {
      both(n);
      return;
    }
    n = n.parentElement;
  }
}

export function installOverlayScrollbars() {
  document.addEventListener(
    "scroll",
    (e) => {
      const t = e.target === document ? (document.scrollingElement as HTMLElement) : (e.target as HTMLElement);
      if (t) both(t);
      refresh();
    },
    { capture: true, passive: true }
  );
  document.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType !== "mouse") return;
      hoverTarget = e.target;
      if (!raf) raf = requestAnimationFrame(onHover);
    },
    { passive: true }
  );
  window.addEventListener("resize", refresh);
}
