import { useState } from "react";
import { sectionOrder, site } from "./content/site";
import { Toaster } from "./components/ui";
import { Hero } from "./sections/Hero";
import { FindProducts } from "./sections/FindProducts";
import { Documents } from "./sections/Documents";
import { Help } from "./sections/Help";
import { ContactBar, ContactForm, Education, Footer, SearchInterrupter, SearchOverlay, Tools, TopTopics } from "./sections/Simple";

export default function App() {
  // null = search closed; a string = search open with that starting query
  const [search, setSearch] = useState<string | null>(null);
  const openSearch = (q: string) => setSearch(q);

  const sections: Record<(typeof sectionOrder)[number], JSX.Element | null> = {
    topTopics: site.topTopics.show ? <TopTopics /> : null,
    findProducts: site.findProducts.show ? <FindProducts /> : null,
    documents: site.documents.show ? <Documents /> : null,
    help: site.help.show ? <Help /> : null,
    contactBar: site.contactBar.show ? <ContactBar /> : null,
    tools: site.tools.show ? <Tools /> : null,
    education: site.education.show ? <Education /> : null,
    searchInterrupter: site.searchInterrupter.show ? <SearchInterrupter onSearch={openSearch} /> : null,
    contactForm: site.contactForm.show ? <ContactForm /> : null,
  };

  return (
    <>
      <Hero onSearch={openSearch} />
      <main>
        {sectionOrder.map((k, i) => (
          <div key={k} className={`slot slot-${k}`}>
            {i > 0 && ["documents", "help", "contactForm"].includes(k) && <hr className="divider" />}
            {sections[k]}
          </div>
        ))}
      </main>
      <Footer />
      {search !== null && <SearchOverlay key={search} query={search} onClose={() => setSearch(null)} />}
      <Toaster />
    </>
  );
}
