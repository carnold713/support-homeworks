/*
  Overlay scrollbars. Native scrollbars are hidden everywhere (styles.css), so they never reserve
  gutter width or push the design over. Instead, a narrow thumb is drawn on top of the scrollable
  area under the mouse.

  Visibility is instant, with no fade (Collin, 2026-11-03): the thumb shows only while the mouse is
  over that scroll area (or dragging its thumb), and hides the moment the mouse leaves, the page
  scrolls the area out from under the cursor, or the area closes/unmounts.
  If the mouse is over no nested scroll area, the page's own thumb shows.
  On touch devices the thumb shows while a finger scrolls and hides as soon as scrolling stops.
  Swipe carousels that use dot navigation (EXCLUDE) never get a thumb.
*/
const EXCLUDE = ".tt-card-row, .tool-grid, [data-no-thumb]";
const SIZE = 6; // thumb thickness
const INSET = 3; // gap from the edge
const MIN = 32; // minimum thumb length
const TOUCH_HIDE_MS = 250;

type Axis = "y" | "x";
type Bar = { el: HTMLElement; axis: Axis; thumb: HTMLDivElement };

const bars = new Map<string, Bar>();
let ids = 0;
const idOf = (el: HTMLElement) => (el.dataset.ovs ??= String(++ids));
const root = () => document.scrollingElement as HTMLElement;

let mouse: { x: number; y: number } | null = null; // null = mouse is outside the window / not a mouse
let dragging: Bar | null = null;
let touchTarget: HTMLElement | null = null;
let touchTimer = 0;

function scrollable(el: HTMLElement, axis: Axis) {
  const isRoot = el === root();
  if (isRoot) {
    // page is scroll-locked while an overlay is open: no page thumb then
    const locked = (n: HTMLElement) => getComputedStyle(n)[axis === "y" ? "overflowY" : "overflowX"] === "hidden";
    if (locked(document.body) || locked(document.documentElement)) return false;
  } else {
    const cs = getComputedStyle(el);
    const ov = axis === "y" ? cs.overflowY : cs.overflowX;
    if (ov !== "auto" && ov !== "scroll") return false;
  }
  return axis === "y" ? el.scrollHeight > el.clientHeight + 1 : el.scrollWidth > el.clientWidth + 1;
}

function rectOf(el: HTMLElement) {
  if (el === root()) return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
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

function barFor(el: HTMLElement, axis: Axis): Bar {
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
  return bar;
}

// Nearest scroll area (not a dot carousel) that contains the node; the page if none.
function scrollerAt(node: Element | null): HTMLElement {
  let n = node as HTMLElement | null;
  while (n && n !== document.body && n !== document.documentElement) {
    if (!n.classList.contains("ovs-thumb") && !n.matches(EXCLUDE) && (scrollable(n, "y") || scrollable(n, "x"))) return n;
    n = n.parentElement;
  }
  return root();
}

// Decide which single scroll area shows its thumb right now, and show/hide every thumb instantly.
function update() {
  let target: HTMLElement | null = null;
  if (dragging) target = dragging.el;
  else if (touchTarget) target = touchTarget;
  else if (mouse) {
    const hit = document.elementFromPoint(mouse.x, mouse.y);
    target = hit?.classList.contains("ovs-thumb") ? [...bars.values()].find((b) => b.thumb === hit)?.el ?? null : scrollerAt(hit);
  }
  if (target && target.isConnected) {
    for (const axis of ["y", "x"] as Axis[]) if (scrollable(target, axis)) barFor(target, axis);
  }
  for (const [key, bar] of bars) {
    if (!bar.el.isConnected) {
      bar.thumb.remove();
      bars.delete(key);
      continue;
    }
    const on = bar.el === target && scrollable(bar.el, bar.axis);
    bar.thumb.classList.toggle("on", on);
    if (on) place(bar);
  }
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
    dragging = bar;
    thumb.classList.add("drag");
    thumb.setPointerCapture(e.pointerId);
    const move = (ev: PointerEvent) => {
      const d = (axis === "y" ? ev.clientY : ev.clientX) - start;
      const v = from + (track > 0 ? (d / track) * max : 0);
      if (axis === "y") el.scrollTop = v;
      else el.scrollLeft = v;
    };
    const up = (ev: PointerEvent) => {
      dragging = null;
      thumb.classList.remove("drag");
      thumb.removeEventListener("pointermove", move);
      thumb.removeEventListener("pointerup", up);
      thumb.removeEventListener("pointercancel", up);
      mouse = { x: ev.clientX, y: ev.clientY };
      update();
    };
    thumb.addEventListener("pointermove", move);
    thumb.addEventListener("pointerup", up);
    thumb.addEventListener("pointercancel", up);
  });
}

let raf = 0;
const schedule = () => {
  if (!raf) raf = requestAnimationFrame(() => {
    raf = 0;
    update();
  });
};

export function installOverlayScrollbars() {
  document.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType !== "mouse") return;
      mouse = { x: e.clientX, y: e.clientY };
      schedule();
    },
    { passive: true }
  );
  // Mouse left the window: hide everything.
  document.documentElement.addEventListener("mouseleave", () => {
    mouse = null;
    schedule();
  });
  window.addEventListener("blur", () => {
    mouse = null;
    schedule();
  });
  // Scrolling moves areas under a still cursor, so re-check what's under it every scroll.
  document.addEventListener(
    "scroll",
    (e) => {
      if (!mouse && !dragging) {
        // touch scrolling: show the area being scrolled, hide shortly after it stops
        const t = e.target === document ? root() : (e.target as HTMLElement);
        if (t && !(t instanceof HTMLElement && t.matches?.(EXCLUDE))) touchTarget = t;
        clearTimeout(touchTimer);
        touchTimer = window.setTimeout(() => {
          touchTarget = null;
          schedule();
        }, TOUCH_HIDE_MS);
      }
      schedule();
    },
    { capture: true, passive: true }
  );
  window.addEventListener("resize", schedule);
  // Panels and overlays opening/closing: re-check so a closed area's thumb disappears at once.
  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true });
}
