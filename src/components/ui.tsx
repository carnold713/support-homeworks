import { ReactNode, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Info, X } from "lucide-react";

/* ---------- breakpoints ---------- */
export type Breakpoint = "mobile" | "narrow" | "desktop";
const bp = (w: number): Breakpoint => (w < 768 ? "mobile" : w < 1200 ? "narrow" : "desktop");

export function useBreakpoint(): Breakpoint {
  const [b, setB] = useState<Breakpoint>(() => bp(window.innerWidth));
  useEffect(() => {
    const on = () => setB(bp(window.innerWidth));
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return b;
}

export function scrollToEl(el: HTMLElement | null, offset = 16) {
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: y, behavior: "smooth" });
}

/* ---------- buttons ---------- */
type BtnProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline" | "ghost" | "white" | "whiteOutline";
  size?: "sm" | "md";
  icon?: ReactNode;
  disabled?: boolean;
  full?: boolean;
  type?: "button" | "submit";
};
export function Button({ children, onClick, variant = "primary", size = "sm", icon, disabled, full, type = "button" }: BtnProps) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size}${full ? " btn-full" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{children}</span>
      {icon}
    </button>
  );
}

export const ArrowIcon = () => <ArrowRight size={16} strokeWidth={2} />;

export function RoundArrow({ dark = true }: { dark?: boolean }) {
  return (
    <span className={`round-arrow${dark ? "" : " light"}`} aria-hidden>
      <ArrowRight size={14} strokeWidth={2.25} />
    </span>
  );
}

/* ---------- chips ---------- */
export function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button type="button" className="chip" onClick={onRemove} aria-label={`Remove ${label}`}>
      <span>{label}</span>
      <X size={16} strokeWidth={2} />
    </button>
  );
}

/* ---------- checkbox row ---------- */
export function Checkbox({
  checked,
  onChange,
  label,
  info,
  suffix,
}: {
  checked: boolean;
  onChange: () => void;
  label: ReactNode;
  info?: boolean;
  suffix?: ReactNode;
}) {
  return (
    <label className="checkbox-row">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={`checkbox-box${checked ? " on" : ""}`}>{checked && <Check size={14} strokeWidth={2.5} />}</span>
      <span className="checkbox-label">{label}</span>
      {info && <Info size={14} className="checkbox-info" />}
      {suffix && <span className="checkbox-suffix">{suffix}</span>}
    </label>
  );
}

/* ---------- accordion header used in filter panels ---------- */
export function AccordionHeader({ label, open, onClick }: { label: ReactNode; open: boolean; onClick: () => void }) {
  return (
    <button type="button" className="acc-head" onClick={onClick} aria-expanded={open}>
      <span>{label}</span>
      <ChevronDown size={16} className={open ? "rot" : ""} />
    </button>
  );
}

/* ---------- select ---------- */
export function Select({ value, options, onChange }: { value: string; options: readonly string[]; onChange: (v: string) => void }) {
  return (
    <div className="select">
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown size={16} />
    </div>
  );
}

/* ---------- overlay (side panel / bottom sheet) ---------- */
export function Overlay({
  open,
  onClose,
  side,
  children,
  width,
  height,
}: {
  open: boolean;
  onClose: () => void;
  side: "right" | "bottom";
  children: ReactNode;
  width?: number;
  height?: string;
}) {
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", k);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="overlay" role="dialog" aria-modal>
      <div className="scrim" onClick={onClose} />
      <div
        className={`panel panel-${side}`}
        style={side === "right" ? { width: width ?? 434 } : { height: height ?? "auto" }}
      >
        {children}
      </div>
    </div>
  );
}

export function CloseBtn({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="icon-btn" onClick={onClick} aria-label="Close">
      <X size={20} />
    </button>
  );
}

/** Turns "/assets/x.png" into a URL that works in Figma Make's preview too. */
export const asset = (p: string) => (p.startsWith("http") ? p : import.meta.env.BASE_URL.replace(/\/$/, "") + p);

/** Fallback-friendly image: shows a grey tile if the file is missing. */
export function Img({ src, alt = "", className }: { src: string; alt?: string; className?: string }) {
  const [bad, setBad] = useState(!src);
  if (bad) return <div className={`img-missing ${className ?? ""}`} aria-hidden />;
  return <img src={asset(src)} alt={alt} className={className} onError={() => setBad(true)} />;
}

/** "N Products" style count text */
export const plural = (n: number, one: string, many = one + "s") => `${n} ${n === 1 ? one : many}`;

/* ---------- toast ---------- */
export const toast = (msg: string) => window.dispatchEvent(new CustomEvent("toast", { detail: msg }));

export function Toaster() {
  const [msg, setMsg] = useState<string | null>(null);
  useEffect(() => {
    let t: number | undefined;
    const on = (e: Event) => {
      setMsg((e as CustomEvent<string>).detail);
      window.clearTimeout(t);
      const m = (e as CustomEvent<string>).detail;
      t = window.setTimeout(() => setMsg(null), Math.max(2600, m.length * 55));
    };
    window.addEventListener("toast", on);
    return () => window.removeEventListener("toast", on);
  }, []);
  return msg ? <div className="toast" role="status">{msg}</div> : null;
}

/* ---------- phone carousel (scroll-snap strip + dots + arrows) ---------- */
export function useStrip(count: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const step = () => {
    const el = ref.current;
    const first = el?.firstElementChild as HTMLElement | null;
    return first ? first.getBoundingClientRect().width + parseFloat(getComputedStyle(el!).columnGap || "0") : 1;
  };
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setSlide(el.scrollLeft >= max - 2 ? count - 1 : Math.round(el.scrollLeft / step()));
  };
  const go = (i: number) => {
    const n = Math.max(0, Math.min(count - 1, i));
    ref.current?.scrollTo({ left: step() * n, behavior: "smooth" });
    setSlide(n);
  };
  return { ref, slide, onScroll, go };
}

export function StripNav({ count, slide, go, arrows = false }: { count: number; slide: number; go: (i: number) => void; arrows?: boolean }) {
  return (
    <div className="strip-nav">
      <div className="dots">
        {Array.from({ length: count }, (_, i) => (
          <button key={i} type="button" className={i === slide ? "on" : ""} onClick={() => go(i)} aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
      {arrows && (
        <div className="strip-arrows">
          <button type="button" aria-label="Previous" disabled={slide === 0} onClick={() => go(slide - 1)}><ArrowLeft size={26} strokeWidth={1.5} /></button>
          <button type="button" aria-label="Next" disabled={slide === count - 1} onClick={() => go(slide + 1)}><ArrowRight size={26} strokeWidth={1.5} /></button>
        </div>
      )}
    </div>
  );
}
