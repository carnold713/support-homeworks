import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Eye, SlidersHorizontal } from "lucide-react";
import { Product, productCategories, products, sortOptions } from "../content/products";
import { site } from "../content/site";
import {
  AccordionHeader,
  Button,
  Checkbox,
  Chip,
  CloseBtn,
  Img,
  Overlay,
  RoundArrow,
  Select,
  plural,
  scrollToEl,
  toast,
  useBreakpoint,
} from "../components/ui";

const allCategoryNames = productCategories.flatMap((g) => g.items);
const countIn = (cat: string) => products.filter((p) => p.category === cat).length;

/* ------------------------------------------------------------------ */
/* Doc checklist used in the flyout and in each compare card           */
/* ------------------------------------------------------------------ */
function DocList({
  product,
  selected,
  toggle,
}: {
  product: Product;
  selected: Set<string>;
  toggle: (key: string) => void;
}) {
  return (
    <div className="doclist">
      {product.docs.map((g) => (
        <div key={g.group} className="doclist-group">
          <h5>{g.group}</h5>
          {g.items.map((d) => {
            const key = `${product.id}::${g.group}::${d.title}`;
            return (
              <Checkbox
                key={key}
                checked={selected.has(key)}
                onChange={() => toggle(key)}
                label={d.title}
                suffix={d.fileType === "Web page" ? "WEB" : d.fileType}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

function Specs({ product }: { product: Product }) {
  if (!product.specs.length) return null;
  return (
    <dl className="specs">
      {product.specs.map((s) => (
        <div key={s.label}>
          <dt>{s.label}</dt>
          <dd>{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function DownloadBar({ count, onDownload }: { count: number; onDownload: () => void }) {
  return (
    <div className="download-bar">
      <span>{count ? `${plural(count, "doc")} selected` : "Select docs to download"}</span>
      <Button variant="primary" size="md" disabled={!count} onClick={onDownload}>
        Download
      </Button>
    </div>
  );
}

function useDocSelection() {
  const [sel, setSel] = useState<Set<string>>(new Set());
  const toggle = (k: string) =>
    setSel((s) => {
      const n = new Set(s);
      n.has(k) ? n.delete(k) : n.add(k);
      return n;
    });
  return { sel, toggle, clear: () => setSel(new Set()) };
}

/* ------------------------------------------------------------------ */
/* Filter body shared by the inline panel and the overlay              */
/* ------------------------------------------------------------------ */
function FilterBody({
  selected,
  toggleCat,
  sort,
  setSort,
  openGroups,
  toggleGroup,
  overlay,
  clearCats,
}: {
  selected: string[];
  toggleCat: (c: string) => void;
  sort: string;
  setSort: (s: string) => void;
  openGroups: Set<string>;
  toggleGroup: (g: string) => void;
  overlay?: boolean;
  clearCats: () => void;
}) {
  return (
    <>
      {overlay && selected.length > 0 && (
        <div className="fp-block">
          <h4>Applied Filters</h4>
          <div className="chips">
            {selected.map((c) => (
              <Chip key={c} label={c} onRemove={() => toggleCat(c)} />
            ))}
          </div>
        </div>
      )}
      <div className="fp-block">
        <div className="fp-block-head">
          <h4>Sort By:</h4>
          {overlay && sort !== sortOptions[0] && (
            <button className="link-btn" onClick={() => setSort(sortOptions[0])}>Clear</button>
          )}
        </div>
        <Select value={sort} options={sortOptions} onChange={setSort} />
      </div>
      <div className="fp-block">
        <div className="fp-block-head">
          <h4>Product Categories</h4>
          {overlay && selected.length > 0 && (
            <button className="link-btn" onClick={clearCats}>Clear</button>
          )}
        </div>
        {productCategories.map((g) => {
          const total = g.items.reduce((n, c) => n + countIn(c), 0);
          const open = openGroups.has(g.group);
          return (
            <div key={g.group} className="acc">
              <AccordionHeader label={`${g.group} (${total})`} open={open} onClick={() => toggleGroup(g.group)} />
              {open && (
                <div className="acc-body">
                  {g.items.map((c) => (
                    <Checkbox
                      key={c}
                      checked={selected.includes(c)}
                      onChange={() => toggleCat(c)}
                      label={`${c} (${countIn(c)})`}
                      info
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
export function FindProducts() {
  const cfg = site.findProducts;
  const b = useBreakpoint();
  const top = useRef<HTMLElement>(null);

  const [selected, setSelected] = useState<string[]>([]);
  const [sort, setSort] = useState<string>(sortOptions[0]);
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set([productCategories[0].group]));
  const [panelOpen, setPanelOpen] = useState(false); // inline panel (desktop)
  const [overlayOpen, setOverlayOpen] = useState(false); // filter overlay (narrow/mobile)
  const pageSize = b === "mobile" ? cfg.pageSizeMobile : cfg.pageSizeDesktop;
  const [limit, setLimit] = useState(pageSize);
  const [flyout, setFlyout] = useState<Product | null>(null);
  const [compare, setCompare] = useState(false);
  const [page, setPage] = useState(0);
  const flyDocs = useDocSelection();
  const cmpDocs = useDocSelection();

  useEffect(() => setLimit(pageSize), [pageSize, selected, sort]);
  useEffect(() => {
    if (b === "desktop") setOverlayOpen(false);
  }, [b]);

  // let the global search open a product
  useEffect(() => {
    const on = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      const p = products.find((x) => x.id === id);
      if (p) setFlyout(p);
    };
    window.addEventListener("open-product", on);
    return () => window.removeEventListener("open-product", on);
  }, []);

  const toggleCat = (c: string) =>
    setSelected((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]));
  const toggleGroup = (g: string) =>
    setOpenGroups((s) => {
      const n = new Set(s);
      n.has(g) ? n.delete(g) : n.add(g);
      return n;
    });

  const results = useMemo(() => {
    const r = products.filter((p) => !selected.length || selected.includes(p.category));
    if (sort === "Name A–Z") r.sort((a, b) => a.name.localeCompare(b.name));
    else if (sort === "Name Z–A") r.sort((a, b) => b.name.localeCompare(a.name));
    else r.sort((a, b) => a.popularity - b.popularity);
    return r;
  }, [selected, sort]);

  const visible = results.slice(0, limit);
  const inlinePanel = b === "desktop" && panelOpen;
  const perPage = b === "mobile" ? 1 : b === "narrow" ? 2 : 4;
  const pages = Math.max(1, Math.ceil(results.length / perPage));
  const sheetTitle = selected.length === 1 ? selected[0] : cfg.resultsTitle;

  const openFilters = () => (b === "desktop" ? setPanelOpen(true) : setOverlayOpen(true));
  const closeFlyout = () => {
    setFlyout(null);
    flyDocs.clear();
  };
  const closeCompare = () => {
    setCompare(false);
    cmpDocs.clear();
  };
  const fakeDownload = (n: number) => toast(`Prototype: ${plural(n, "document")} would download here.`);

  const filterProps = {
    selected,
    toggleCat,
    sort,
    setSort,
    openGroups,
    toggleGroup,
    clearCats: () => setSelected([]),
  };

  return (
    <section className="section fp" ref={top}>
      <div className="container">
        <h2 className="section-title">{cfg.title}</h2>

        <div className={`results-header${b === "mobile" ? " stacked" : ""}`}>
          <div>
            <h3>{cfg.resultsTitle}</h3>
            {b === "mobile" && <p className="results-sub">{cfg.resultsSubtitle}</p>}
          </div>
          <div className="results-meta">
            <span>
              <b>{results.length}</b> {results.length === 1 ? "Product" : "Products"}
            </span>
            {results.length > 0 && (
              <>
                <span className="dot">·</span>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => {
                    setPage(0);
                    setCompare(true);
                  }}
                >
                  <Eye size={16} /> {cfg.compareLabel}
                </button>
              </>
            )}
          </div>
        </div>

        <div className={`fp-layout${inlinePanel ? " with-panel" : ""}`}>
          {inlinePanel && (
            <aside className="fp-panel">
              <div className="fp-panel-top">
                <button type="button" className="round-btn" onClick={() => setPanelOpen(false)} aria-label="Close filters">
                  <ArrowLeft size={16} />
                </button>
                {selected.length > 0 && (
                  <button type="button" className="tiny-link" onClick={() => setSelected([])}>
                    Remove All
                  </button>
                )}
              </div>
              <FilterBody {...filterProps} />
            </aside>
          )}

          <div className="fp-results">
            {(!inlinePanel || selected.length > 0) && (
              <div className="toolbar">
                {!inlinePanel && (
                  <button type="button" className="filters-btn" onClick={openFilters}>
                    <SlidersHorizontal size={16} /> Filters
                    {selected.length > 0 && <span className="badge">{selected.length}</span>}
                  </button>
                )}
                {selected.map((c) => (
                  <Chip key={c} label={c} onRemove={() => toggleCat(c)} />
                ))}
                {selected.length > 0 && (
                  <button type="button" className="clear-all" onClick={() => setSelected([])}>
                    Clear All
                  </button>
                )}
              </div>
            )}

            {results.length === 0 ? (
              <div className="empty">
                <h4>No products match these filters</h4>
                <p>Try removing a filter. Your other filters stay as they are.</p>
                <button type="button" className="text-link" onClick={() => setSelected([])}>
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className={`product-grid${inlinePanel ? " narrow-grid" : ""}`}>
                {visible.map((p) => (
                  <button
                    type="button"
                    key={p.id}
                    className={`product-card${flyout?.id === p.id ? " ring" : ""}`}
                    onClick={() => setFlyout(p)}
                  >
                    <div className={`product-img${p.photo ? " photo" : ""}`}>
                      <Img src={p.image} alt={p.name} />
                      <RoundArrow />
                    </div>
                    <span className="eyebrow">{p.sku}</span>
                    <span className="product-name">{p.name}</span>
                  </button>
                ))}
              </div>
            )}

            {(results.length > limit || visible.length > pageSize) && (
              <div className="more-row">
                {results.length > limit && (
                  <Button variant="primary" size="md" onClick={() => setLimit(limit + pageSize)}>
                    View More
                  </Button>
                )}
                {visible.length > pageSize && (
                  <button type="button" className="back-top" onClick={() => scrollToEl(top.current)}>
                    Go back to top
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* -------- filter overlay (narrow = side panel, mobile = bottom sheet) -------- */}
      <Overlay open={overlayOpen} onClose={() => setOverlayOpen(false)} side={b === "mobile" ? "bottom" : "right"} width={400} height="86vh">
        <div className="panel-head">
          <h3>Filter &amp; Sort</h3>
          <div className="panel-head-actions">
            {selected.length > 0 && (
              <button type="button" className="clear-all plain" onClick={() => setSelected([])}>
                Clear All
              </button>
            )}
            <CloseBtn onClick={() => setOverlayOpen(false)} />
          </div>
        </div>
        <div className="panel-body">
          <FilterBody {...filterProps} overlay />
        </div>
        <div className="panel-foot">
          <Button variant="outline" size="md" full onClick={() => setOverlayOpen(false)}>
            Show {plural(results.length, "Product")}
          </Button>
        </div>
      </Overlay>

      {/* -------- product flyout -------- */}
      <Overlay open={!!flyout} onClose={closeFlyout} side={b === "mobile" ? "bottom" : "right"} width={434} height="92vh">
        {flyout && (
          <>
            <div className="panel-head">
              <h3>{flyout.name}</h3>
              <CloseBtn onClick={closeFlyout} />
            </div>
            <div className="panel-body">
              <Img src={flyout.image} alt={flyout.name} className={`flyout-img${flyout.photo ? " photo" : ""}`} />
              <Specs product={flyout} />
              <DocList product={flyout} selected={flyDocs.sel} toggle={flyDocs.toggle} />
            </div>
            <DownloadBar count={flyDocs.sel.size} onDownload={() => fakeDownload(flyDocs.sel.size)} />
            <div className="panel-foot">
              <Button variant="primary" size="md" full>
                {cfg.visitProductLabel}
              </Button>
            </div>
          </>
        )}
      </Overlay>

      {/* -------- compare specs & documents sheet -------- */}
      <Overlay open={compare} onClose={closeCompare} side="bottom" height={b === "mobile" ? "92vh" : "84vh"}>
        <div className="panel-head">
          <h3>{sheetTitle}</h3>
          <div className="panel-head-actions">
            {results.length > perPage && (
              <>
                <span className="pager-label">
                  {page * perPage + 1}–{Math.min(results.length, (page + 1) * perPage)} of {results.length}
                </span>
                <button type="button" className="pager-btn" disabled={page === 0} onClick={() => setPage(page - 1)} aria-label="Previous">
                  <ArrowLeft size={18} />
                </button>
                <button type="button" className="pager-btn" disabled={page >= pages - 1} onClick={() => setPage(page + 1)} aria-label="Next">
                  <ArrowRight size={18} />
                </button>
                <span className="v-div" />
              </>
            )}
            <CloseBtn onClick={closeCompare} />
          </div>
        </div>
        <div className="panel-body compare-body">
          <div className="compare-row" style={{ gridTemplateColumns: `repeat(${perPage}, minmax(0, 1fr))` }}>
            {results.slice(page * perPage, page * perPage + perPage).map((p) => (
              <div key={p.id} className="compare-card">
                <h4>{p.name}</h4>
                <Img src={p.image} alt={p.name} className={`compare-img${p.photo ? " photo" : ""}`} />
                <Specs product={p} />
                <DocList product={p} selected={cmpDocs.sel} toggle={cmpDocs.toggle} />
                <Button variant="primary" icon={<ArrowRight size={14} />}>
                  {cfg.visitProductLabel}
                </Button>
              </div>
            ))}
          </div>
        </div>
        <DownloadBar count={cmpDocs.sel.size} onDownload={() => fakeDownload(cmpDocs.sel.size)} />
      </Overlay>
    </section>
  );
}

export { allCategoryNames };
