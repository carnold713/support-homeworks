import { products } from "../content/products";
import { helpTopics } from "../content/articles";
import { documents } from "../content/documents";

export const articleIndex = helpTopics.flatMap((t) =>
  t.subtopics.flatMap((s) => s.articles.map((a) => ({ ...a, where: `${t.name} › ${s.name}` }))),
);

export type Hit =
  | { kind: "product"; id: string; title: string; meta: string }
  | { kind: "article"; title: string; meta: string }
  | { kind: "document"; title: string; meta: string };

/** Search products, articles and documents. Products come first. */
export function searchAll(query: string) {
  const term = query.trim().toLowerCase();
  if (!term) return { p: [], a: [], d: [] } as { p: typeof products; a: typeof articleIndex; d: typeof documents };
  const has = (s: string) => s.toLowerCase().includes(term);
  return {
    p: products.filter((p) => has(p.name) || has(p.sku) || has(p.category)),
    a: articleIndex.filter((a) => has(a.title) || has(a.description)),
    d: documents.filter((d) => has(d.title) || has(d.docType)),
  };
}

/** A short mixed list for the search dropdown. */
export function quickHits(query: string, max = 5): Hit[] {
  const r = searchAll(query);
  const all: Hit[] = [
    ...r.p.map((p) => ({ kind: "product" as const, id: p.id, title: p.name, meta: "Product" })),
    ...r.a.map((a) => ({ kind: "article" as const, title: a.title, meta: a.kind === "video" ? "Video" : "Article" })),
    ...r.d.map((d) => ({ kind: "document" as const, title: d.title, meta: d.docType })),
  ];
  return all.slice(0, max);
}
