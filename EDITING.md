# HomeWorks Support page · clickable prototype

Everything you'd want to change lives in **`src/content/`**. You never need to touch the UI code to change copy, add products, articles or documents.

| File | What it controls |
| --- | --- |
| `src/content/site.ts` | All page copy: hero (including the search dropdown's Suggested Support Topics), Top Topics cards, section titles, contact bar, tools, education tiles, search block, contact form dropdown options, footer. Also `show: false` to hide a section, `sectionOrder` to reorder sections, and the "View More" page sizes. |
| `src/content/products.ts` | Find Products: the filter categories and every product (SKU, name, image, specs, documents). |
| `src/content/articles.ts` | Help & FAQs: topics, subtopics and articles. |
| `src/content/documents.ts` | The Documents & Resources table. |

## Common edits

**Add a product.** In `products.ts`, copy one product block, change `id` to something unique, and set `category` to one of the names in `productCategories`. `popularity` sets its place in the Most Popular sort (1 = first). Add `photo: true` when the picture is a room photo that should fill the tile. Drop its picture in `public/assets/products/` and set `image: "/assets/products/<file>.png"`. Filter counts, the flyout, the compare sheet and search pick it up automatically.

**Change suggested search topics.** Edit `hero.suggestedTopics` in `site.ts`.

**Add a filter category.** Add the name to a group's `items` in `productCategories` (or add a new group).

**Add an article.** In `articles.ts`, add `{ title: "...", description: "..." }` to a subtopic. Add `kind: "video"` to show "Watch Video".

**Add a document.** In `documents.ts`, add a row. New document types, file types and languages become filter options on their own.

In Figma Make you can also just ask the Make chat, for example: "add a product called X to Processors & Interfaces in src/content/products.ts".

## What's clickable

- Hero and "Still having trouble?" search: clicking in opens the Suggested Support Topics dropdown over a dimmed page (clicking a topic fills the box). Typing shows the top matches; clicking a product opens its flyout. Enter or "See more results" opens the full results sheet. X, Escape or clicking the dimmed page closes it.
- Find Products: Filters button (inline panel on desktop, side panel on tablet, bottom sheet on phone), category checkboxes with live counts, chips with ×, Clear All / Remove All, Sort By, product card → flyout with specs and selectable docs (Download enables when docs are selected), "Compare specs & documents" → bottom sheet with paging (4 at a time on desktop), View More after 14 (6 on phone), Go back to top once more than 14 are showing, empty state.
- Documents & Resources: filter drawer (starts open, groups start collapsed), sortable columns, zebra rows, chips, View More after 10 (8 on phone), phone list + filter sheet.
- Help & FAQs: topic rail accordion, "All <topic>" views, clickable breadcrumbs, View More after 8, phone "Select a Topic" sheet. Read Article / Watch Video stay non-interactive.
- Contact a Specialist shows a short note (the contact form is hidden in the final design; set `contactForm.show: true` in `site.ts` to bring it back, and the button will scroll to it).
- Phone only: "Other HomeWorks Versions" opens a bottom sheet of versions; Top Topics and Tools are swipeable carousels with dots (Top Topics also has arrows); the contact bar is hidden.
- Nothing links out of the prototype.

## Final-components update (2026-11-03)

- Section order (`sectionOrder` in `site.ts`): Top Topics, Find Products, Documents & Resources, Help & FAQs, contact bar, Tools, search block, Education.
- New copy fields: `hero.subtitleMobile` (shorter phone subtitle), `hero.otherVersionsButton`, `findProducts.resultsSubtitle`.
- Products default to A–Z (the `popularity` numbers follow the alphabet). Product tiles are square, 6 per row (5 with filters open, 2 on phone).
- Documents: "Sort By" offers Most Popular, Name A–Z and Name Z–A; the Filters button and Remove All are always shown.
- Section names in the code match the Figma section names, so Figma comments on the Make file map cleanly to a section.

## Notes

- Font: Lutron Sans Screen (the variable web font from the brand files) is bundled at `src/assets/fonts/` and loaded at the top of `src/styles.css`. Inter is only a fallback.
- Images and icons were exported from the Figma file into `public/assets/`. `scripts/fetch-figma-assets.sh` re-downloads them (the links expire about a week after 2026-11-03). A missing image shows a grey tile instead of breaking.
- Colors and spacing tokens are at the top of `src/styles.css`.
