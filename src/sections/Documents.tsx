import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowUp, Download, ExternalLink, FileText, SlidersHorizontal } from "lucide-react";
import { documents, DocumentRow } from "../content/documents";
import { site } from "../content/site";
import {
  AccordionHeader,
  Button,
  Checkbox,
  Chip,
  CloseBtn,
  Overlay,
  Select,
  plural,
  scrollToEl,
  toast,
  useBreakpoint,
} from "../components/ui";

type Key = "docType" | "fileType" | "language";
const groups: { key: Key; label: string }[] = [
  { key: "docType", label: "Documentation Type" },
  { key: "fileType", label: "File Type" },
  { key: "language", label: "Language" },
];
const optionsFor = (k: Key) => [...new Set(documents.map((d) => d[k]))].sort((a, b) => a.localeCompare(b));
const countFor = (k: Key, v: string) => documents.filter((d) => d[k] === v).length;
const docSorts = ["Most Popular", "Name A–Z", "Name Z–A"] as const;
type Col = "title" | Key;
const emptyFilters = (): Record<Key, string[]> => ({ docType: [], fileType: [], language: [] });

export function Documents() {
  const cfg = site.documents;
  const b = useBreakpoint();
  const top = useRef<HTMLElement>(null);
  const [filters, setFilters] = useState(emptyFilters);
  const [openGroups, setOpenGroups] = useState<Set<Key>>(new Set()); // all collapsed by default (Collin's rule)
  const [drawer, setDrawer] = useState(true); // drawer starts open
  const [sheet, setSheet] = useState(false);
  // null = "Most Popular" (the order rows are listed in documents.ts)
  const [sortCol, setSortCol] = useState<Col | null>(null);
  const [asc, setAsc] = useState(true);
  const pageSize = b === "mobile" ? cfg.pageSizeMobile : cfg.pageSizeDesktop;
  const [limit, setLimit] = useState(pageSize);

  const chips = groups.flatMap((g) => filters[g.key].map((v) => ({ key: g.key, v })));
  useEffect(() => setLimit(pageSize), [pageSize, filters, sortCol, asc]);

  const toggle = (k: Key, v: string) =>
    setFilters((f) => ({ ...f, [k]: f[k].includes(v) ? f[k].filter((x) => x !== v) : [...f[k], v] }));
  const toggleGroup = (k: Key) =>
    setOpenGroups((s) => {
      const n = new Set(s);
      n.has(k) ? n.delete(k) : n.add(k);
      return n;
    });

  const rows = useMemo(() => {
    const r = documents.filter((d) => groups.every((g) => !filters[g.key].length || filters[g.key].includes(d[g.key])));
    if (sortCol) r.sort((a, b) => (asc ? 1 : -1) * a[sortCol].localeCompare(b[sortCol]) || a.title.localeCompare(b.title));
    return r;
  }, [filters, sortCol, asc]);
  const visible = rows.slice(0, limit);
  const drawerShown = b === "desktop" && drawer;

  const sortBy = (c: Col) => {
    if (c === sortCol) setAsc(!asc);
    else {
      setSortCol(c);
      setAsc(true);
    }
  };
  const action = (d: DocumentRow) => toast(d.fileType === "Web page" ? `Prototype: would open “${d.title}”.` : `Prototype: “${d.title}” would download.`);

  const filterBody = (overlay: boolean) => (
    <>
      {overlay && chips.length > 0 && (
        <div className="fp-block">
          <h4>Applied Filters</h4>
          <div className="chips">
            {chips.map((c) => (
              <Chip key={c.key + c.v} label={c.v} onRemove={() => toggle(c.key, c.v)} />
            ))}
          </div>
        </div>
      )}
      <div className="fp-block">
        <h4>Sort By:</h4>
        <Select
          value={!sortCol ? docSorts[0] : sortCol === "title" && !asc ? docSorts[2] : docSorts[1]}
          options={docSorts}
          onChange={(v) => {
            setSortCol(v === docSorts[0] ? null : "title");
            setAsc(v !== docSorts[2]);
          }}
        />
      </div>
      <div className="fp-block">
        <h4>Document</h4>
        {groups.map((g) => {
          const opts = optionsFor(g.key);
          const open = openGroups.has(g.key);
          return (
            <div key={g.key} className="acc">
              <AccordionHeader label={`${g.label} (${opts.length})`} open={open} onClick={() => toggleGroup(g.key)} />
              {open && (
                <div className="acc-body">
                  {opts.map((o) => (
                    <Checkbox key={o} checked={filters[g.key].includes(o)} onChange={() => toggle(g.key, o)} label={`${o} (${countFor(g.key, o)})`} info disabled={countFor(g.key, o) === 0 && !filters[g.key].includes(o)} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );

  const SortHead = ({ c, label }: { c: Col; label: string }) => (
    <button type="button" className={`th-btn${sortCol === c ? " on" : ""}`} onClick={() => sortBy(c)}>
      {label}
      <span className="sort-arrows">
        <ArrowDown size={11} className={sortCol !== c || asc ? "on" : ""} />
        <ArrowUp size={11} className={sortCol === c && !asc ? "on" : ""} />
      </span>
    </button>
  );

  const ActionLink = ({ d }: { d: DocumentRow }) => (
    <button type="button" className="row-action" onClick={() => action(d)}>
      {d.fileType === "Web page" ? (
        <>
          Visit Page <ExternalLink size={14} />
        </>
      ) : (
        <>
          Download <Download size={14} />
        </>
      )}
    </button>
  );

  return (
    <section className="section docs" ref={top}>
      <div className="container">
        <h2 className="section-title">{cfg.title}</h2>
        <div className="results-header">
          <h3 className="small">{cfg.resultsTitle}</h3>
          <div className="results-meta">
            <span>
              <b>{rows.length}</b> {rows.length === 1 ? "Document" : "Documents"}
            </span>
          </div>
        </div>

        <div className={`fp-layout${drawerShown ? " with-panel docs-layout" : ""}`}>
          {drawerShown && (
            <aside className="fp-panel">
              <div className="fp-panel-top">
                <button type="button" className="round-btn" onClick={() => setDrawer(false)} aria-label="Close filters">
                  <ArrowLeft size={20} />
                </button>
                <button type="button" className="tiny-link" onClick={() => setFilters(emptyFilters())}>
                  Remove All
                </button>
              </div>
              {filterBody(false)}
            </aside>
          )}

          <div className="fp-results">
            {(!drawerShown || chips.length > 0) && (
              <div className="toolbar">
                {/* Figma: the Filters button is turned off while the inline filter drawer is open. */}
                {!drawerShown && (
                  <button type="button" className="filters-btn" onClick={() => (b === "desktop" ? setDrawer(!drawer) : setSheet(true))}>
                    <SlidersHorizontal size={16} /> Filters
                    {chips.length > 0 && <span className="badge">{chips.length}</span>}
                  </button>
                )}
                {chips.map((c) => (
                  <Chip key={c.key + c.v} label={c.v} onRemove={() => toggle(c.key, c.v)} />
                ))}
                {chips.length > 0 && (
                  <button type="button" className="clear-all" onClick={() => setFilters(emptyFilters())}>
                    Clear All
                  </button>
                )}
              </div>
            )}

            {rows.length === 0 ? (
              <div className="empty">
                <h4>No documents match these filters</h4>
                <button type="button" className="text-link" onClick={() => setFilters(emptyFilters())}>
                  Clear all filters
                </button>
              </div>
            ) : b === "mobile" ? (
              <div className="doc-cells">
                {visible.map((d, i) => (
                  <div key={d.title} className={`doc-cell${i % 2 === 0 ? " zebra" : ""}`}>
                    <div className="doc-cell-head">
                      <span className="eyebrow">{d.docType}</span>
                      <span className="doc-title">{d.title}</span>
                    </div>
                    <div className="doc-cell-foot">
                      <span className="doc-meta">
                        {d.fileType === "PDF" && <FileText size={16} />} {d.fileType}
                        <span className="meta-dot" aria-hidden />
                        {d.language}
                      </span>
                      <ActionLink d={d} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <table className="doc-table">
                <thead>
                  <tr>
                    <th className="col-name"><SortHead c="title" label="File Name" /></th>
                    <th><SortHead c="docType" label="Doc Type" /></th>
                    <th><SortHead c="fileType" label="File Type" /></th>
                    <th><SortHead c="language" label="Language" /></th>
                    <th className="col-action">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((d, i) => (
                    <tr key={d.title} className={i % 2 === 0 ? "zebra" : ""}>
                      <td className="col-name">{d.title}</td>
                      <td>{d.docType}</td>
                      <td>
                        <span className="filetype">
                          {d.fileType === "PDF" && <FileText size={14} />} {d.fileType}
                        </span>
                      </td>
                      <td>{d.language}</td>
                      <td className="col-action">
                        <ActionLink d={d} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {(rows.length > limit || visible.length > pageSize) && (
              <div className="more-row">
                {rows.length > limit && (
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

      <Overlay open={sheet} onClose={() => setSheet(false)} side={b === "mobile" ? "bottom" : "left"} width={420} height="86vh">
        <div className="panel-head">
          <h3>Filter &amp; Sort</h3>
          <div className="panel-head-actions">
            {chips.length > 0 && (
              <button type="button" className="clear-all plain" onClick={() => setFilters(emptyFilters())}>
                Clear All
              </button>
            )}
            <CloseBtn onClick={() => setSheet(false)} />
          </div>
        </div>
        <div className="panel-body">{filterBody(true)}</div>
        <div className="panel-foot">
          <Button variant="outline" size="md" full onClick={() => setSheet(false)}>
            Show {plural(rows.length, "Document")}
          </Button>
        </div>
      </Overlay>
    </section>
  );
}
