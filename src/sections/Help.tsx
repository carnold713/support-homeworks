import { useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, ChevronDown, PlayCircle } from "lucide-react";
import { Article, helpTopics } from "../content/articles";
import { site } from "../content/site";
import { Button, CloseBtn, Overlay, scrollToEl, useBreakpoint } from "../components/ui";

type Sel = { topic: string | null; sub: string | null };
const byTitle = (a: Article, b: Article) => a.title.localeCompare(b.title);
const allArticles = helpTopics.flatMap((t) => t.subtopics.flatMap((s) => s.articles)).sort(byTitle);

function articlesFor(sel: Sel): Article[] {
  if (!sel.topic) return allArticles;
  const t = helpTopics.find((x) => x.name === sel.topic);
  if (!t) return [];
  if (!sel.sub) return t.subtopics.flatMap((s) => s.articles).sort(byTitle);
  return [...(t.subtopics.find((s) => s.name === sel.sub)?.articles ?? [])].sort(byTitle);
}

export function Help() {
  const cfg = site.help;
  const b = useBreakpoint();
  const top = useRef<HTMLElement>(null);
  const [sel, setSel] = useState<Sel>({ topic: null, sub: null });
  const [open, setOpen] = useState<Set<string>>(new Set([helpTopics[0].name]));
  const [sheet, setSheet] = useState(false);
  const [limit, setLimit] = useState(cfg.pageSize);

  const list = useMemo(() => articlesFor(sel), [sel]);
  const visible = list.slice(0, limit);
  useEffect(() => setLimit(cfg.pageSize), [sel, cfg.pageSize]);

  const panelTitle = !sel.topic ? cfg.allLabel : sel.sub ?? `All ${sel.topic}`;
  const choose = (s: Sel) => {
    setSel(s);
    setSheet(false);
    if (s.topic) setOpen((o) => new Set(o).add(s.topic!));
  };
  const toggleTopic = (t: string) =>
    setOpen((o) => {
      const n = new Set(o);
      n.has(t) ? n.delete(t) : n.add(t);
      return n;
    });

  const rail = (
    <nav className="help-rail">
      {helpTopics.map((t) => {
        const isOpen = open.has(t.name);
        return (
          <div key={t.name} className="rail-topic">
            <button type="button" className={`rail-topic-btn${sel.topic === t.name ? " active" : ""}`} onClick={() => toggleTopic(t.name)} aria-expanded={isOpen}>
              <span>{t.name}</span>
              <ChevronDown size={16} className={isOpen ? "rot" : ""} />
            </button>
            {isOpen && (
              <div className="rail-subs">
                <button type="button" className={`rail-sub${sel.topic === t.name && !sel.sub ? " active" : ""}`} onClick={() => choose({ topic: t.name, sub: null })}>
                  All {t.name}
                </button>
                {[...t.subtopics]
                  .sort((a, z) => a.name.localeCompare(z.name))
                  .map((s) => (
                    <button type="button" key={s.name} className={`rail-sub${sel.topic === t.name && sel.sub === s.name ? " active" : ""}`} onClick={() => choose({ topic: t.name, sub: s.name })}>
                      {s.name}
                    </button>
                  ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );

  return (
    <section className="section help" ref={top}>
      <div className="container">
        <h2 className="section-title">{cfg.title}</h2>

        {b !== "mobile" ? (
          <div className="crumbs">
            <button type="button" onClick={() => choose({ topic: null, sub: null })}>{cfg.rootCrumb}</button>
            <span>/</span>
            {!sel.topic ? (
              <b>{cfg.allLabel}</b>
            ) : sel.sub ? (
              <>
                <button type="button" onClick={() => choose({ topic: sel.topic, sub: null })}>{sel.topic}</button>
                <span>/</span>
                <b>{sel.sub}</b>
              </>
            ) : (
              <b>{sel.topic}</b>
            )}
          </div>
        ) : (
          <button type="button" className="topic-selector" onClick={() => setSheet(true)}>
            <span>{sel.topic ? panelTitle : "Select a Topic"}</span>
            <ChevronDown size={18} />
          </button>
        )}

        <div className="help-layout">
          {b !== "mobile" && rail}
          <div className="help-panel">
            <div className="results-header compact">
              <h3 className="small">{panelTitle}</h3>
              <span className="results-meta">
                Showing <b>{visible.length}</b> of <b>{list.length}</b> Documents
              </span>
            </div>
            <div className="article-list">
              {visible.map((a) => (
                <div key={a.title} className="article-row">
                  <div className="article-copy">
                    <h4>{a.title}</h4>
                    <p>{a.description}</p>
                  </div>
                  {/* Read Article / Watch Video are intentionally non-interactive in this prototype */}
                  <span className="article-btn" aria-disabled>
                    {a.kind === "video" ? <PlayCircle size={16} /> : <BookOpen size={16} />}
                    {a.kind === "video" ? "Watch Video" : "Read Article"}
                  </span>
                </div>
              ))}
            </div>
            {(list.length > limit || visible.length > cfg.pageSize) && (
              <div className="more-row">
                {list.length > limit && (
                  <Button variant="primary" size="md" onClick={() => setLimit(limit + cfg.pageSize)}>
                    View More
                  </Button>
                )}
                {visible.length > cfg.pageSize && (
                  <button type="button" className="back-top" onClick={() => scrollToEl(top.current)}>
                    Go back to top
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Overlay open={sheet} onClose={() => setSheet(false)} side="bottom" height="80vh">
        <div className="panel-head">
          <h3>Select a Topic</h3>
          <CloseBtn onClick={() => setSheet(false)} />
        </div>
        <div className="panel-body">{rail}</div>
      </Overlay>
    </section>
  );
}
