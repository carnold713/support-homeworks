import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, ArrowUpLeft, ChevronRight, Menu, Search, X } from "lucide-react";
import { Hit, quickHits } from "../components/searchIndex";
import { site } from "../content/site";
import { CloseBtn, Overlay, asset, toast, useBreakpoint } from "../components/ui";

/**
 * Search bar with the "Suggested Support Topics" dropdown.
 * Click in: the dropdown opens over the page with suggested topics (from site.hero).
 * Type: the dropdown shows the top matches. Enter or "See more results" opens the full results sheet.
 */
export function SearchBar({
  placeholder,
  onSubmit,
}: {
  placeholder: string;
  onSubmit: (q: string) => void;
}) {
  const h = site.hero;
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const hits = useMemo(() => quickHits(q, 5), [q]);

  // Lift the section that holds this search above the page scrim while open.
  useEffect(() => {
    const host = wrap.current?.closest("header, section");
    if (!open || !host) return;
    host.classList.add("search-raised");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      host.classList.remove("search-raised");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setQ("");
  };
  const submit = (term: string) => {
    setOpen(false);
    onSubmit(term);
  };
  const pick = (hit: Hit) => {
    if (hit.kind === "product") {
      close();
      window.dispatchEvent(new CustomEvent("open-product", { detail: hit.id }));
    } else submit(hit.title);
  };
  const fill = (t: string) => {
    setQ(t);
    input.current?.focus();
  };

  return (
    <div className="search-wrap" ref={wrap}>
      {open && createPortal(<div className="search-scrim" onClick={() => setOpen(false)} aria-hidden />, document.body)}
      <form
        className={`searchbar${open ? " open" : ""}`}
        onSubmit={(e) => {
          e.preventDefault();
          submit(q);
        }}
      >
        <div className="search-row">
          <Search size={22} strokeWidth={1.75} />
          <input
            ref={input}
            value={q}
            onFocus={() => setOpen(true)}
            onClick={() => setOpen(true)}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(true);
            }}
            placeholder={placeholder}
            aria-label={placeholder}
            aria-expanded={open}
          />
          {open && (
            <button type="button" className="search-x" aria-label="Close search" onClick={close}>
              <X size={22} strokeWidth={1.75} />
            </button>
          )}
        </div>
        {open && (
          <div className="search-pop">
            <h4>{q.trim() ? "Suggested Results" : h.suggestedTitle}</h4>
            {q.trim()
              ? hits.length === 0 ? (
                  <p className="search-empty">No quick matches for “{q}”. Press Enter to search everything.</p>
                ) : (
                  hits.map((hit) => (
                    <button type="button" key={hit.kind + hit.title} className="search-item" onClick={() => pick(hit)}>
                      <span className="search-item-text">
                        <span className="search-item-meta">{hit.meta}</span>
                        {hit.title}
                      </span>
                      <ArrowRight size={18} strokeWidth={1.5} />
                    </button>
                  ))
                )
              : h.suggestedTopics.map((t) => (
                  <button type="button" key={t} className="search-item" onClick={() => fill(t)}>
                    <span className="search-item-text">{t}</span>
                    <ArrowUpLeft size={18} strokeWidth={1.5} />
                  </button>
                ))}
            <button type="button" className="search-more" onClick={() => submit(q)}>
              {h.seeMoreLabel} <ArrowRight size={12} strokeWidth={2.5} />
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export function Hero({ onSearch }: { onSearch: (q: string) => void }) {
  const h = site.hero;
  const b = useBreakpoint();
  const [menu, setMenu] = useState(false);
  const [version, setVersion] = useState<string | null>(null);
  const [versionsSheet, setVersionsSheet] = useState(false);
  return (
    <header className="hero">
      <div className="hero-inner">
        {b !== "mobile" && (
          <div className="utility">
            {site.nav.utility.map((l) => (
              <span key={l} className="muted-link">{l}</span>
            ))}
            <span className="utility-div" />
            {site.nav.utilityRight.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        )}
        <nav className="primary-nav">
          <img className="logo" src={asset("/assets/icons/lutron-logo.svg")} alt="Lutron" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
          {b === "desktop" && (
            <div className="primary-links">
              {site.nav.primary.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
          )}
          <div className="nav-icons">
            <button type="button" className={`icon-btn${b === "mobile" ? "" : " light"}`} aria-label="Search" onClick={() => onSearch("")}>
              <Search size={22} strokeWidth={1.75} />
            </button>
            {b !== "desktop" && (
              <button type="button" className={`icon-btn${b === "mobile" ? "" : " light"}`} aria-label="Menu" onClick={() => setMenu(!menu)}>
                {menu ? <X size={22} /> : <Menu size={22} />}
              </button>
            )}
          </div>
        </nav>
        {menu && b !== "desktop" && (
          <div className="mobile-menu">
            {site.nav.primary.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        )}

        <div className="hero-body">
          <div className="hero-copy">
            <h1>{h.title}</h1>
            <p className="hero-sub">{b === "mobile" ? h.subtitleMobile : h.subtitle}</p>
            <div className="hero-search">
              <span className="search-label">{h.searchLabel}</span>
              <SearchBar placeholder={h.searchPlaceholder} onSubmit={onSearch} />
            </div>
          </div>
          {b === "mobile" ? (
            <button type="button" className="versions-btn" onClick={() => setVersionsSheet(true)}>
              {h.otherVersionsButton} <ChevronRight size={20} />
            </button>
          ) : (
          <div className="versions">
            <span className="search-label">{h.otherVersionsLabel}</span>
            <div className="versions-list">
              {h.otherVersions.map((v) => (
                <button type="button" key={v} className={`version-link${version === v ? " on" : ""}`} onClick={() => setVersion(v === version ? null : v)}>
                  {v} <ArrowRight size={14} strokeWidth={2.25} />
                </button>
              ))}
            </div>
          </div>
          )}
        </div>
      </div>
      <Overlay open={versionsSheet} onClose={() => setVersionsSheet(false)} side="bottom" height="auto">
        <div className="panel-head">
          <h3>{h.otherVersionsButton}</h3>
          <CloseBtn onClick={() => setVersionsSheet(false)} />
        </div>
        <div className="panel-body versions-sheet">
          {h.otherVersions.map((v) => (
            <button type="button" key={v} className={`sheet-link${version === v ? " on" : ""}`} onClick={() => { setVersion(v); setVersionsSheet(false); toast(`Prototype: this would open the ${v} support page.`); }}>
              {v} <ArrowRight size={16} />
            </button>
          ))}
        </div>
      </Overlay>
    </header>
  );
}
