import { FormEvent, useMemo, useRef, useState } from "react";
import { ArrowRight, Facebook, Headphones, Instagram, Linkedin, Search, Twitter, Video, Youtube } from "lucide-react";
import { site } from "../content/site";
import { ArrowIcon, Button, Checkbox, CloseBtn, Img, Overlay, StripNav, asset, scrollToEl, toast, useBreakpoint, useStrip } from "../components/ui";
import { SearchBar } from "./Hero";
import { searchAll } from "../components/searchIndex";

/* ---------------- Top Topics ---------------- */
export function TopTopics() {
  const b = useBreakpoint();
  const cards = site.topTopics.cards;
  const strip = useStrip(cards.length);
  return (
    <section className="toptopics">
      <div className="container">
        <div className="tt-card-row" ref={strip.ref} onScroll={strip.onScroll}>
          {cards.map((c, i) => (
            <div key={i} className="tt-card">
              <img className="tt-icon" src={asset(`/assets/icons/${c.icon}.svg`)} alt="" onError={(e) => ((e.target as HTMLImageElement).style.visibility = "hidden")} />
              <div className="tt-copy">
                <h3>{c.title}</h3>
                <p>{c.description}</p>
                <Button icon={<ArrowIcon />}>{c.button}</Button>
              </div>
            </div>
          ))}
        </div>
        {b === "mobile" && <StripNav count={cards.length} slide={strip.slide} go={strip.go} arrows />}
      </div>
    </section>
  );
}

/* ---------------- Contact interrupter bar ---------------- */
export function ContactBar() {
  const c = site.contactBar;
  const b = useBreakpoint();
  if (b === "mobile") return null; // the phone design has no contact bar
  return (
    <section className="contactbar-wrap">
      <div className="container">
        <div className="contactbar">
          <p>
            <b>{c.lead}</b> {c.body}
          </p>
          <div className="contactbar-btns">
            <Button variant="white" size="md" icon={<Headphones size={16} />} onClick={() => { const f = document.getElementById("contact-form"); f ? scrollToEl(f) : toast("Prototype: this would connect you with a Lutron specialist."); }}>
              {c.primary}
            </Button>
            <Button variant="whiteOutline" size="md" icon={<Video size={16} />} onClick={() => toast("Prototype: a video chat request would start here.")}>
              {c.secondary}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Tools ---------------- */
export function Tools() {
  const t = site.tools;
  const b = useBreakpoint();
  const strip = useStrip(t.cards.length);
  return (
    <section className="section tools">
      <div className="container">
        <h2 className="section-title">{t.title}</h2>
        <div className="tool-grid" ref={strip.ref} onScroll={strip.onScroll}>
          {t.cards.map((c, i) => (
            <div key={i} className="tool-card">
              <img className="tool-icon" src={asset("/assets/icons/si-11.svg")} alt="" onError={(e) => ((e.target as HTMLImageElement).style.visibility = "hidden")} />
              <div>
                <h4>{c.title}</h4>
                <p>{c.description}</p>
              </div>
              <ArrowRight size={20} className="tool-arrow" />
            </div>
          ))}
        </div>
        {b === "mobile" && <StripNav count={t.cards.length} slide={strip.slide} go={strip.go} />}
      </div>
    </section>
  );
}

/* ---------------- Education ---------------- */
export function Education() {
  const e = site.education;
  return (
    <section className="section education">
      <div className="container">
        <h2 className="section-title">{e.title}</h2>
        <div className="edu-grid">
          {e.tiles.map((t) => (
            <div key={t.title} className="edu-tile">
              <div className="edu-img">
                <Img src={t.image} alt="" />
                <span className="fab"><ArrowRight size={20} /></span>
              </div>
              <div className="edu-copy">
                <h3>{t.title}</h3>
                <p>{t.description}</p>
                <span className="text-link underline">
                  {t.link} <ArrowRight size={14} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Search interrupter ---------------- */
// positions copied from the Figma illustration grid (x, y, icon file)
const iconGrid: [number, number, string][] = [
  [71, 135, "si-0"], [242, 135, "si-1"], [414, 135, "si-2"], [585, 135, "si-3"],
  [71, 297, "si-4"], [71, -26, "si-5"], [242, 457, "si-5"], [242, 297, "si-6"],
  [242, -26, "si-7"], [71, 457, "si-7"], [414, 297, "si-8"], [414, -26, "si-9"],
  [585, 457, "si-9"], [585, 297, "si-10"], [585, -26, "si-11"], [414, 457, "si-11"],
];
export function SearchInterrupter({ onSearch }: { onSearch: (q: string) => void }) {
  const s = site.searchInterrupter;
  return (
    <section className="search-int">
      <div className="si-art" aria-hidden>
        {iconGrid.map(([x, y, f], i) => (
          <img key={i} src={asset(`/assets/icons/${f}.svg`)} style={{ left: x, top: y }} alt="" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
        ))}
      </div>
      <div className="container">
        <div className="si-copy">
          <h2>{s.title}</h2>
          <p>{s.body}</p>
          <span className="search-label">{s.searchLabel}</span>
          <SearchBar placeholder={s.searchPlaceholder} onSubmit={onSearch} />
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact form ---------------- */
function Field({ label, required, value, onChange, options }: { label: string; required?: boolean; value: string; onChange: (v: string) => void; options?: string[] }) {
  return (
    <label className={`field${value ? " filled" : ""}`}>
      <span className="field-label">
        {label}
        {required && <i> *</i>}
      </span>
      {options ? (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="" />
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : (
        <input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

export function ContactForm() {
  const c = site.contactForm;
  const [v, setV] = useState<Record<string, string>>({});
  const [opt, setOpt] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (k: string) => (x: string) => setV((o) => ({ ...o, [k]: x }));
  const required = ["first", "last", "email", "profession", "company", "country", "state", "zip", "app", "topic", "more"];
  const ok = required.every((k) => (v[k] ?? "").trim());
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (ok) setSent(true);
  };
  return (
    <section className="section contact" id="contact-form">
      <div className="container contact-grid">
        <div className="contact-intro">
          <h2>{c.title}</h2>
          <p>{c.body}</p>
          <Img src={c.image} alt="" className="contact-img" />
        </div>
        {sent ? (
          <div className="contact-success">
            <h3>{c.success}</h3>
            <Button variant="outline" onClick={() => { setSent(false); setV({}); setOpt(false); }}>Send another</Button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={submit}>
            <div className="form-sec">
              <span className="caps">Contact Information</span>
              <div className="row2"><Field label="First Name" required value={v.first ?? ""} onChange={set("first")} /><Field label="Last Name" required value={v.last ?? ""} onChange={set("last")} /></div>
              <div className="row2"><Field label="Email" required value={v.email ?? ""} onChange={set("email")} /><Field label="Phone" value={v.phone ?? ""} onChange={set("phone")} /></div>
            </div>
            <div className="form-sec">
              <span className="caps">Which best describes you?</span>
              <Field label="Profession (Select One)" required value={v.profession ?? ""} onChange={set("profession")} options={c.professions} />
              <Field label="Company" required value={v.company ?? ""} onChange={set("company")} />
              <div className="row3"><Field label="Country" required value={v.country ?? ""} onChange={set("country")} options={c.countries} /><Field label="State/Province" required value={v.state ?? ""} onChange={set("state")} /><Field label="ZIP/Postal Code" required value={v.zip ?? ""} onChange={set("zip")} /></div>
            </div>
            <div className="form-sec">
              <span className="caps">Tell us more about your Request</span>
              <Field label="Application Type" required value={v.app ?? ""} onChange={set("app")} options={c.applicationTypes} />
              <Field label="What can we help you with?" required value={v.topic ?? ""} onChange={set("topic")} options={c.helpTopics} />
              <Field label="Tell Us More..." required value={v.more ?? ""} onChange={set("more")} />
            </div>
            <div className="form-foot">
              <div className="form-legal">
                <Checkbox checked={opt} onChange={() => setOpt(!opt)} label={c.optIn} info />
                <em>{c.disclaimer}</em>
              </div>
              <Button type="submit" size="md" disabled={!ok}>{c.submit}</Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */
export function Footer() {
  const f = site.footer;
  const [opt, setOpt] = useState(false);
  const social = [Facebook, Instagram, Twitter, Linkedin, Youtube];
  return (
    <footer className="footer">
      <div className="container">
        <img className="footer-logo" src={asset("/assets/icons/lutron-logo.svg")} alt="Lutron" onError={(e) => ((e.target as HTMLImageElement).style.visibility = "hidden")} />
        <div className="footer-grid">
          {f.columns.map((col) => (
            <div key={col.title} className="footer-col">
              <h5>{col.title}</h5>
              {col.links.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
          ))}
          <form className="footer-sub" onSubmit={(e) => { e.preventDefault(); toast("Prototype: thanks for subscribing!"); }}>
            <h5>{f.subscribeEyebrow}</h5>
            <h3>{f.subscribeTitle}</h3>
            <div className="row2"><label className="field"><span className="field-label">First Name<i> *</i></span><input /></label><label className="field"><span className="field-label">Last Name<i> *</i></span><input /></label></div>
            <label className="field"><span className="field-label">Email<i> *</i></span><input /></label>
            <label className="field"><span className="field-label">Company<i> *</i></span><input /></label>
            <label className="field"><span className="field-label">ZIP/Postal Code<i> *</i></span><input /></label>
            <Checkbox checked={opt} onChange={() => setOpt(!opt)} label={f.subscribeOptIn} />
            <Button type="submit" size="md">{f.subscribeButton}</Button>
          </form>
        </div>
        <div className="footer-bottom">
          <div className="footer-legal">
            <span>{f.copyright}</span>
            {f.legal.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
          <div className="footer-social">
            {social.map((I, i) => (
              <I key={i} size={22} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Search overlay (hero + interrupter search) ---------------- */

export function SearchOverlay({ query, onClose }: { query: string | null; onClose: () => void }) {
  const [q, setQ] = useState(query ?? "");
  const term = q.trim().toLowerCase();
  const hits = useMemo(() => {
    const r = searchAll(q);
    return { p: r.p, a: r.a.slice(0, 12), d: r.d.slice(0, 12) };
  }, [q]);
  const total = hits.p.length + hits.a.length + hits.d.length;
  return (
    <Overlay open={query !== null} onClose={onClose} side="bottom" height="88vh">
      <div className="panel-head">
        <div className="searchbar in-panel">
          <Search size={22} strokeWidth={1.75} />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products, articles and documents" />
        </div>
        <CloseBtn onClick={onClose} />
      </div>
      <div className="panel-body search-results">
        {!term && <p className="muted">Try “processor”, “blink codes” or “Ketra”.</p>}
        {term && total === 0 && <p className="muted">No results for “{q}”.</p>}
        {hits.p.length > 0 && (
          <div className="sr-group">
            <h4>Products</h4>
            {hits.p.map((p) => (
              <button key={p.id} type="button" className="sr-row" onClick={() => { onClose(); window.dispatchEvent(new CustomEvent("open-product", { detail: p.id })); }}>
                <span className="eyebrow">{p.sku}</span>
                <span>{p.name}</span>
              </button>
            ))}
          </div>
        )}
        {hits.a.length > 0 && (
          <div className="sr-group">
            <h4>Help &amp; FAQs</h4>
            {hits.a.map((a) => (
              <div key={a.title} className="sr-row static">
                <span className="eyebrow">{a.where}</span>
                <span>{a.title}</span>
              </div>
            ))}
          </div>
        )}
        {hits.d.length > 0 && (
          <div className="sr-group">
            <h4>Documents</h4>
            {hits.d.map((d) => (
              <div key={d.title} className="sr-row static">
                <span className="eyebrow">{d.docType} · {d.fileType}</span>
                <span>{d.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Overlay>
  );
}
