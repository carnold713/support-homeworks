/* =====================================================================
   PAGE COPY & SETTINGS — every headline, button label and card on the
   page that isn't a product, article or document lives here.

   • Change any text in quotes and the page updates.
   • Hide a whole section: set its `show` to false.
   • Reorder sections: change the order in `sectionOrder`.
   • Images: put files in /public/assets/... and reference them as
     "/assets/...". Icons for Top Topics: "switch" | "wiring" | "lights" | "shop".
   ===================================================================== */

export const sectionOrder = [
  "topTopics",
  "findProducts",
  "documents",
  "help",
  "contactBar",
  "tools",
  "searchInterrupter",
  "education",
  "contactForm",
] as const;

export const site = {
  nav: {
    utility: ["Book a Tour", "Where to Buy"],
    utilityRight: ["Region", "Sign In"],
    primary: [
      "Lighting",
      "Window Treatments",
      "Controls",
      "Experience Lutron",
      "Support & Resources",
      "About Us",
    ],
  },

  hero: {
    title: "HomeWorks System",
    subtitle: "Custom whole-home system programmed by a certified dealer.",
    subtitleMobile: "Custom whole-home system programmed by a certified dealer, including QS and QSX processors.",
    searchLabel: "Search Lutron Support",
    searchPlaceholder: "How can we help?",
    // Shown when someone clicks into the search bar, before they type.
    // Clicking one fills the search box with it.
    suggestedTitle: "Suggested Support Topics",
    suggestedTopics: [
      "Diva Dimmer",
      "The complete tool and materials checklist for a first-time Caséta installation",
      "Do I need a voltage tester before I open the wallbox?",
      "Diva Dimmer CAD File",
      "Wiring Wizard",
    ],
    seeMoreLabel: "See more results",
    /** Shown instead of a results screen when someone picks a suggestion or presses Enter */
    searchToast:
      "Search results aren't part of this prototype. On lutron.com this would go to the main Lutron search, showing Support and HomeWorks results first.",
    otherVersionsLabel: "Other System Versions:",
    otherVersionsButton: "Other HomeWorks Versions", // phone: button that opens the versions sheet
    otherVersions: [
      "HomeWorks (Original)",
      "HomeWorks Interactive",
      "HomeWorks Illumination",
      "HomeWorks QS",
    ],
  },

  topTopics: {
    show: true,
    cards: [
      { icon: "switch", title: "Help me choose the right dimmer or switch", description: "Explore the best options for your lighting needs with our expert guide.", button: "Get Help" },
      { icon: "wiring", title: "Get help wiring my dimmer or switch", description: "Find step-by-step instructions to wire your dimmer or switch safely.", button: "Wiring Guide" },
      { icon: "lights", title: "LED compatibility tool", description: "Use our tool to check if your LED lights are compatible with your dimmer.", button: "Compatibility Tool" },
      { icon: "shop", title: "Where can I buy Lutron products?", description: "Discover where to purchase Lutron products at the best prices.", button: "Where to Buy" },
    ],
  },

  findProducts: {
    show: true,
    title: "Find Products compatible with your HomeWorks System.",
    resultsTitle: "Compatible Products",
    resultsSubtitle: "Lutron Products compatible with the HomeWorks System", // shown on phones
    compareLabel: "Compare specs & documents",
    visitProductLabel: "Visit Product Page",
    /** products shown before "View More" */
    pageSizeDesktop: 14,
    pageSizeMobile: 6,
  },

  documents: {
    show: true,
    title: "Documents & Resources for your Lutron products.",
    resultsTitle: "Ketra S30 Documents & Resources",
    /** rows shown before "View More" */
    pageSizeDesktop: 10,
    pageSizeMobile: 8,
  },

  help: {
    show: true,
    title: "Help & FAQs for a HomeWorks system.",
    rootCrumb: "HomeWorks",
    allLabel: "All Articles",
    /** articles shown before "View More" */
    pageSize: 8,
  },

  contactBar: {
    show: true,
    lead: "Can Someone at Lutron Help Me?",
    body: "Yes. Lutron specialists are available 24/7.",
    primary: "Contact a Specialist",
    secondary: "Request a Video Chat",
  },

  tools: {
    show: true,
    title: "Tools to help with Lutron products.",
    cards: [
      { title: "Troubleshooting", description: "Description" },
      { title: "Troubleshooting", description: "Description" },
      { title: "Troubleshooting", description: "Description" },
      { title: "Troubleshooting", description: "Description" },
    ],
  },

  education: {
    show: true,
    title: "Education & Training for installers, pros, homeowners and more.",
    tiles: [
      {
        image: "/assets/photos/education-1.png",
        title: "Certifications, Training, Courses & More",
        description: "Sharpen your skills and earn credits with in-person and online courses, training videos, articles on current industry topics, and more.",
        link: "Learn More",
      },
      {
        image: "/assets/photos/education-2.png",
        title: "Lutron YouTube",
        description: "The on-demand resource for details on the latest Lutron products, case studies & hot topics.",
        link: "Visit Lutron YouTube",
      },
    ],
  },

  searchInterrupter: {
    show: true,
    title: "Still having trouble? Give search a try...",
    body: "Search covers every manual, spec sheet, wiring diagram and troubleshooting article we have.",
    searchLabel: "Search Lutron Support",
    searchPlaceholder: "Search for a support topic or question",
  },

  contactForm: {
    show: false, // not part of the final HomeWorks design; set true to bring it back
    title: "Need additional Support?",
    body: "We’re here to help. When you share your Lutron job number, we can turn your quote around even more quickly.",
    image: "/assets/photos/contact.png",
    professions: ["Homeowner", "Dealer / Integrator", "Electrical Contractor", "Architect / Designer", "Lighting Designer", "Other"],
    countries: ["United States", "Canada", "Mexico", "United Kingdom", "Other"],
    applicationTypes: ["Residential", "Commercial", "Hospitality"],
    helpTopics: ["Product support", "Troubleshooting", "Quote or order", "Warranty", "Other"],
    optIn: "Opt-in to receive information about Lutron products, events, etc. By checking this box, you consent to receiving marketing materials from Lutron. You can unsubscribe from marketing emails at any time by clicking “unsubscribe” from any future email.",
    disclaimer: "By submitting this form, you are providing your contact information to Lutron allowing us to contact you regarding this inquiry.",
    submit: "Submit",
    success: "Thanks! A Lutron specialist will be in touch shortly.",
  },

  footer: {
    columns: [
      { title: "About Us", links: ["Who We Are", "Heritage", "Leadership", "Locations", "Press Releases", "Careers"] },
      { title: "Products", links: ["Lighting", "Shades", "Controls", "Legacy Products"] },
      { title: "Project Support", links: ["Lutron Connect", "Technical Documents & Specs", "Explore All Services", "Product Delivery Lead Times", "Lighting Control Institute", "Visit an Experience Center"] },
      { title: "Customer Support", links: ["Support Home", "Contact Us", "Where to Buy", "Community Forums"] },
    ],
    subscribeEyebrow: "Subscribe to Lutron Communications",
    subscribeTitle: "Let’s Stay in Touch",
    subscribeOptIn: "Opt-in to receive product and marketing communications from Lutron. You can unsubscribe at any time.",
    subscribeButton: "Join",
    copyright: "© 2024 Lutron. All rights reserved.",
    legal: ["Privacy Policy", "Cookie Preferences", "Legal", "Site Map", "Site Feedback", "Do not sell my personal information"],
  },
};
