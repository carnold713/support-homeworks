/* =====================================================================
   PRODUCTS — "Find Products compatible with your HomeWorks System."

   HOW TO EDIT
   • Add a product: copy one of the objects in `products` below, give it a
     new unique `id`, and change the text. It appears in the grid, the
     flyout, the compare sheet and the search automatically.
   • `category` must match one of the names in `productCategories`
     (spelling counts). Filter counts update on their own.
   • `image`: put a PNG/JPG in /public/assets/products/ and point to it,
     e.g. "/assets/products/my-product.png". Leave it "" for a grey tile.
   • `photo: true`: the picture fills the whole card tile (room photos).
     Leave it out for cut-out product shots, which sit centred on grey.
   • `popularity`: lower number = shown first for "Most Popular" sort
     (the default order). It is currently A–Z, per the HomeWorks design.
   • `specs` and `docs` can have as many rows as you like.
   ===================================================================== */

export type DocFileType = "PDF" | "DOC" | "DWG" | "RFA" | "ZIP" | "Web page";

export type ProductDoc = { title: string; fileType: DocFileType };
export type ProductDocGroup = { group: string; items: ProductDoc[] };
export type Spec = { label: string; value: string };

export type Product = {
  id: string;
  sku: string; // small grey line above the name on cards
  name: string;
  category: string; // must match a name in productCategories
  image: string;
  photo?: boolean; // true = photo fills the whole tile (like the Palladiom Keypad card)
  popularity: number;
  specs: Spec[];
  docs: ProductDocGroup[];
};

/** Filter panel groups. Each group is an accordion; each item is a checkbox. */
export const productCategories: { group: string; items: string[] }[] = [
  { group: "Equipment", items: ["Load Controls", "Power Supplies", "Processors & Interfaces"] },
  { group: "Sensors", items: ["Occupancy Sensors", "Sensor Modules"] },
  { group: "Lighting", items: ["Downlights", "Lamps", "Tape Lights"] },
  { group: "Window Treatments", items: ["Blinds", "Drapery", "Roller Shades", "Roman Shades"] },
  { group: "Wall Controls & Remotes", items: ["Dimmers & Switches", "Keypads", "Wallplates"] },
  { group: "Services & Software", items: ["Startup Services"] },
];

export const sortOptions = ["Most Popular", "Name A–Z", "Name Z–A"] as const;

export const products: Product[] = [
  {
    id: "palladiom-keypad",
    sku: "HQWT-",
    name: "Palladiom Keypad",
    category: "Keypads",
    image: "/assets/products/palladiom-keypad.png",
    photo: true,
    popularity: 17,
    specs: [
      { label: "Product family", value: "PALLADIOM" },
      { label: "Category", value: "Wall Controls & Remotes" },
      { label: "Type", value: "Keypads" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "Palladiom Keypad Dimensional Drawing", fileType: "PDF" },
          { title: "Palladiom Keypad Product Brochure", fileType: "PDF" },
          { title: "Palladiom Keypad Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "Palladiom Keypad Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "alisse-keypad",
    sku: "HW-QS-B-",
    name: "Alisse Keypad",
    category: "Keypads",
    image: "/assets/products/alisse-keypad.png",
    popularity: 2,
    specs: [
      { label: "Product family", value: "ALISSE" },
      { label: "Category", value: "Wall Controls & Remotes" },
      { label: "Type", value: "Keypads" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "Alisse Keypad Dimensional Drawing", fileType: "PDF" },
          { title: "Alisse Keypad Product Brochure", fileType: "PDF" },
          { title: "Alisse Keypad Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "Alisse Keypad Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "aviena-keypad",
    sku: "HW-AV-KP-",
    name: "Aviena Keypad",
    category: "Keypads",
    image: "/assets/products/aviena-keypad.png",
    photo: true,
    popularity: 5,
    specs: [
      { label: "Product family", value: "AVIENA" },
      { label: "Category", value: "Wall Controls & Remotes" },
      { label: "Type", value: "Keypads" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "Aviena Keypad Dimensional Drawing", fileType: "PDF" },
          { title: "Aviena Keypad Product Brochure", fileType: "PDF" },
          { title: "Aviena Keypad Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "Aviena Keypad Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "d2-remodeler-downlight",
    sku: "HW-D2RFS",
    name: "D2 Remodeler Downlight",
    category: "Downlights",
    image: "/assets/products/d2-remodeler-downlight.png",
    popularity: 7,
    specs: [
      { label: "Product family", value: "KETRA D2" },
      { label: "Category", value: "Lighting" },
      { label: "Type", value: "Downlights" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "D2 Remodeler Downlight Dimensional Drawing", fileType: "PDF" },
          { title: "D2 Remodeler Downlight Product Brochure", fileType: "PDF" },
          { title: "D2 Remodeler Downlight Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "D2 Remodeler Downlight Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "d2-new-construction-downlight",
    sku: "HW-D2FS",
    name: "D2 New Construction Downlight",
    category: "Downlights",
    image: "/assets/products/d2-new-construction-downlight.png",
    popularity: 6,
    specs: [
      { label: "Product family", value: "KETRA D2" },
      { label: "Category", value: "Lighting" },
      { label: "Type", value: "Downlights" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "D2 New Construction Downlight Dimensional Drawing", fileType: "PDF" },
          { title: "D2 New Construction Downlight Product Brochure", fileType: "PDF" },
          { title: "D2 New Construction Downlight Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "D2 New Construction Downlight Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "rania-tape-light",
    sku: "RANIA",
    name: "Rania Tape Light",
    category: "Tape Lights",
    image: "/assets/products/rania-tape-light.png",
    popularity: 22,
    specs: [
      { label: "Product family", value: "RANIA" },
      { label: "Category", value: "Lighting" },
      { label: "Type", value: "Tape Lights" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "Rania Tape Light Dimensional Drawing", fileType: "PDF" },
          { title: "Rania Tape Light Product Brochure", fileType: "PDF" },
          { title: "Rania Tape Light Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "Rania Tape Light Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "a20-lamp",
    sku: "KETRA A20",
    name: "A20 Lamp",
    category: "Lamps",
    image: "/assets/products/a20-lamp.png",
    photo: true,
    popularity: 1,
    specs: [
      { label: "Product family", value: "KETRA A20" },
      { label: "Category", value: "Lighting" },
      { label: "Type", value: "Lamps" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "A20 Lamp Dimensional Drawing", fileType: "PDF" },
          { title: "A20 Lamp Product Brochure", fileType: "PDF" },
          { title: "A20 Lamp Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "A20 Lamp Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "wired-processor",
    sku: "HQP7-",
    name: "Wired Processor",
    category: "Processors & Interfaces",
    image: "/assets/products/wired-processor.png",
    popularity: 29,
    specs: [
      { label: "Product family", value: "HOMEWORKS" },
      { label: "Category", value: "Equipment" },
      { label: "Type", value: "Processors & Interfaces" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "Wired Processor Dimensional Drawing", fileType: "PDF" },
          { title: "Wired Processor Product Brochure", fileType: "PDF" },
          { title: "Wired Processor Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "Wired Processor Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "triathlon-select-roller",
    sku: "TRIATHLON",
    name: "Triathlon Select Roller",
    category: "Roller Shades",
    image: "/assets/products/triathlon-select-roller.png",
    popularity: 28,
    specs: [
      { label: "Product family", value: "TRIATHLON" },
      { label: "Category", value: "Window Treatments" },
      { label: "Type", value: "Roller Shades" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "Triathlon Select Roller Dimensional Drawing", fileType: "PDF" },
          { title: "Triathlon Select Roller Product Brochure", fileType: "PDF" },
          { title: "Triathlon Select Roller Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "Triathlon Select Roller Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "sivoia-roller-in-recessed-pocket",
    sku: "SIVOIA QS",
    name: "Sivoia Roller in Recessed Pocket",
    category: "Roller Shades",
    image: "/assets/products/sivoia-roller-in-recessed-pocket.png",
    popularity: 25,
    specs: [
      { label: "Product family", value: "SIVOIA QS" },
      { label: "Category", value: "Window Treatments" },
      { label: "Type", value: "Roller Shades" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "Sivoia Roller in Recessed Pocket Dimensional Drawing", fileType: "PDF" },
          { title: "Sivoia Roller in Recessed Pocket Product Brochure", fileType: "PDF" },
          { title: "Sivoia Roller in Recessed Pocket Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "Sivoia Roller in Recessed Pocket Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "palladiom-wire-free-roller",
    sku: "PALLADIOM",
    name: "Palladiom Wire-Free Roller",
    category: "Roller Shades",
    image: "/assets/products/palladiom-wire-free-roller.png",
    photo: true,
    popularity: 18,
    specs: [
      { label: "Product family", value: "PALLADIOM" },
      { label: "Category", value: "Window Treatments" },
      { label: "Type", value: "Roller Shades" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "Palladiom Wire-Free Roller Dimensional Drawing", fileType: "PDF" },
          { title: "Palladiom Wire-Free Roller Product Brochure", fileType: "PDF" },
          { title: "Palladiom Wire-Free Roller Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "Palladiom Wire-Free Roller Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "maestro-dimmers",
    sku: "HQRD-",
    name: "Maestro Dimmers",
    category: "Dimmers & Switches",
    image: "/assets/products/maestro-dimmers.png",
    photo: true,
    popularity: 15,
    specs: [
      { label: "Product family", value: "MAESTRO" },
      { label: "Category", value: "Wall Controls & Remotes" },
      { label: "Type", value: "Dimmers & Switches" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "Maestro Dimmers Dimensional Drawing", fileType: "PDF" },
          { title: "Maestro Dimmers Product Brochure", fileType: "PDF" },
          { title: "Maestro Dimmers Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "Maestro Dimmers Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "sunnata-dimmer",
    sku: "HRST-",
    name: "Sunnata Dimmer",
    category: "Dimmers & Switches",
    image: "/assets/products/sunnata-dimmer.png",
    photo: true,
    popularity: 27,
    specs: [
      { label: "Product family", value: "SUNNATA" },
      { label: "Category", value: "Wall Controls & Remotes" },
      { label: "Type", value: "Dimmers & Switches" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "Sunnata Dimmer Dimensional Drawing", fileType: "PDF" },
          { title: "Sunnata Dimmer Product Brochure", fileType: "PDF" },
          { title: "Sunnata Dimmer Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "Sunnata Dimmer Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "plug-in-dimmer",
    sku: "HQR-3PD-1",
    name: "Plug-in Dimmer",
    category: "Load Controls",
    image: "/assets/products/plug-in-dimmer.png",
    popularity: 19,
    specs: [
      { label: "Product family", value: "PLUG-IN" },
      { label: "Category", value: "Equipment" },
      { label: "Type", value: "Load Controls" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "Plug-in Dimmer Dimensional Drawing", fileType: "PDF" },
          { title: "Plug-in Dimmer Product Brochure", fileType: "PDF" },
          { title: "Plug-in Dimmer Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "Plug-in Dimmer Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "homeworks-maestro-companion-switch",
    sku: "HQD-RS",
    name: "HomeWorks Maestro Companion Switch",
    category: "Dimmers & Switches",
    image: "/assets/products/homeworks-maestro-companion-switch.png",
    popularity: 10,
    specs: [
      { label: "Product family", value: "MAESTRO" },
      { label: "Category", value: "Wall Controls & Remotes" },
      { label: "Type", value: "Dimmers & Switches" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "HomeWorks Maestro Companion Switch Dimensional Drawing", fileType: "PDF" },
          { title: "HomeWorks Maestro Companion Switch Product Brochure", fileType: "PDF" },
          { title: "HomeWorks Maestro Companion Switch Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "HomeWorks Maestro Companion Switch Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "sivoia-roman-fabrication-kit",
    sku: "SIVOIA",
    name: "Sivoia Roman Fabrication Kit",
    category: "Roman Shades",
    image: "/assets/products/sivoia-roman-fabrication-kit.png",
    popularity: 26,
    specs: [
      { label: "Product family", value: "SIVOIA" },
      { label: "Category", value: "Window Treatments" },
      { label: "Type", value: "Roman Shades" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "Sivoia Roman Fabrication Kit Dimensional Drawing", fileType: "PDF" },
          { title: "Sivoia Roman Fabrication Kit Product Brochure", fileType: "PDF" },
          { title: "Sivoia Roman Fabrication Kit Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "Sivoia Roman Fabrication Kit Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "architrave-keypad",
    sku: "HQWA-",
    name: "Architrave Keypad",
    category: "Keypads",
    image: "/assets/products/architrave-keypad.png",
    popularity: 3,
    specs: [
      { label: "Product family", value: "ARCHITRAVE" },
      { label: "Category", value: "Wall Controls & Remotes" },
      { label: "Type", value: "Keypads" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "Architrave Keypad Dimensional Drawing", fileType: "PDF" },
          { title: "Architrave Keypad Product Brochure", fileType: "PDF" },
          { title: "Architrave Keypad Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "Architrave Keypad Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "sivoia-qs-drapery",
    sku: "SIVOIA QS",
    name: "Sivoia QS Drapery",
    category: "Drapery",
    image: "/assets/products/sivoia-qs-drapery.png",
    popularity: 23,
    specs: [
      { label: "Product family", value: "SIVOIA QS" },
      { label: "Category", value: "Window Treatments" },
      { label: "Type", value: "Drapery" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "Sivoia QS Drapery Dimensional Drawing", fileType: "PDF" },
          { title: "Sivoia QS Drapery Product Brochure", fileType: "PDF" },
          { title: "Sivoia QS Drapery Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "Sivoia QS Drapery Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "sivoia-qs-wood-blinds",
    sku: "SIVOIA QS",
    name: "Sivoia QS Wood Blinds",
    category: "Blinds",
    image: "/assets/products/sivoia-qs-wood-blinds.png",
    popularity: 24,
    specs: [
      { label: "Product family", value: "SIVOIA QS" },
      { label: "Category", value: "Window Treatments" },
      { label: "Type", value: "Blinds" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "Sivoia QS Wood Blinds Dimensional Drawing", fileType: "PDF" },
          { title: "Sivoia QS Wood Blinds Product Brochure", fileType: "PDF" },
          { title: "Sivoia QS Wood Blinds Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "Sivoia QS Wood Blinds Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "maestro-fan-control",
    sku: "HQRD-2ANF",
    name: "Maestro Fan Control",
    category: "Dimmers & Switches",
    image: "/assets/products/maestro-fan-control.png",
    popularity: 16,
    specs: [
      { label: "Product family", value: "MAESTRO" },
      { label: "Category", value: "Wall Controls & Remotes" },
      { label: "Type", value: "Dimmers & Switches" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "Maestro Fan Control Dimensional Drawing", fileType: "PDF" },
          { title: "Maestro Fan Control Product Brochure", fileType: "PDF" },
          { title: "Maestro Fan Control Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "Maestro Fan Control Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "designer-wallplates",
    sku: "WALLPLATES",
    name: "Designer Wallplates",
    category: "Wallplates",
    image: "/assets/products/designer-wallplates.png",
    popularity: 8,
    specs: [
      { label: "Product family", value: "WALLPLATES" },
      { label: "Category", value: "Wall Controls & Remotes" },
      { label: "Type", value: "Wallplates" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "Designer Wallplates Dimensional Drawing", fileType: "PDF" },
          { title: "Designer Wallplates Product Brochure", fileType: "PDF" },
          { title: "Designer Wallplates Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "Designer Wallplates Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "radio-powr-savr-occupancy-sensor",
    sku: "LRF2-",
    name: "Radio Powr Savr Occupancy Sensor",
    category: "Occupancy Sensors",
    image: "/assets/products/radio-powr-savr-occupancy-sensor.png",
    popularity: 21,
    specs: [
      { label: "Product family", value: "RADIO POWR SAVR" },
      { label: "Category", value: "Sensors" },
      { label: "Type", value: "Occupancy Sensors" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "Radio Powr Savr Occupancy Sensor Dimensional Drawing", fileType: "PDF" },
          { title: "Radio Powr Savr Occupancy Sensor Product Brochure", fileType: "PDF" },
          { title: "Radio Powr Savr Occupancy Sensor Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "Radio Powr Savr Occupancy Sensor Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "light-management-hub-qp5",
    sku: "QP5-",
    name: "Light Management Hub (QP5)",
    category: "Processors & Interfaces",
    image: "/assets/products/light-management-hub-qp5.png",
    popularity: 12,
    specs: [
      { label: "Product family", value: "QP5-" },
      { label: "Category", value: "Equipment" },
      { label: "Type", value: "Processors & Interfaces" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "Light Management Hub (QP5) Dimensional Drawing", fileType: "PDF" },
          { title: "Light Management Hub (QP5) Product Brochure", fileType: "PDF" },
          { title: "Light Management Hub (QP5) Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "Light Management Hub (QP5) Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "light-management-hub-qp6",
    sku: "QP6-",
    name: "Light Management Hub (QP6)",
    category: "Processors & Interfaces",
    image: "/assets/products/light-management-hub-qp6.png",
    popularity: 13,
    specs: [
      { label: "Product family", value: "QP6-" },
      { label: "Category", value: "Equipment" },
      { label: "Type", value: "Processors & Interfaces" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "Light Management Hub (QP6) Dimensional Drawing", fileType: "PDF" },
          { title: "Light Management Hub (QP6) Product Brochure", fileType: "PDF" },
          { title: "Light Management Hub (QP6) Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "Light Management Hub (QP6) Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "din-rail-processor",
    sku: "QP-",
    name: "DIN Rail Processor",
    category: "Processors & Interfaces",
    image: "/assets/products/din-rail-processor.png",
    popularity: 9,
    specs: [
      { label: "Product family", value: "QP-" },
      { label: "Category", value: "Equipment" },
      { label: "Type", value: "Processors & Interfaces" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "DIN Rail Processor Dimensional Drawing", fileType: "PDF" },
          { title: "DIN Rail Processor Product Brochure", fileType: "PDF" },
          { title: "DIN Rail Processor Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "DIN Rail Processor Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "athena-wireless-processor",
    sku: "A-RF2",
    name: "Athena Wireless Processor",
    category: "Processors & Interfaces",
    image: "/assets/products/athena-wireless-processor.png",
    popularity: 4,
    specs: [
      { label: "Product family", value: "A-RF2" },
      { label: "Category", value: "Equipment" },
      { label: "Type", value: "Processors & Interfaces" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "Athena Wireless Processor Dimensional Drawing", fileType: "PDF" },
          { title: "Athena Wireless Processor Product Brochure", fileType: "PDF" },
          { title: "Athena Wireless Processor Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "Athena Wireless Processor Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "legacy-panel-interface-ua-cs-lx",
    sku: "UA-CS-LX",
    name: "Legacy Panel Interface (UA-CS-LX)",
    category: "Processors & Interfaces",
    image: "/assets/products/legacy-panel-interface-ua-cs-lx.png",
    popularity: 11,
    specs: [
      { label: "Product family", value: "UA-CS-LX" },
      { label: "Category", value: "Equipment" },
      { label: "Type", value: "Processors & Interfaces" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "Legacy Panel Interface (UA-CS-LX) Dimensional Drawing", fileType: "PDF" },
          { title: "Legacy Panel Interface (UA-CS-LX) Product Brochure", fileType: "PDF" },
          { title: "Legacy Panel Interface (UA-CS-LX) Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "Legacy Panel Interface (UA-CS-LX) Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "qs-sensor-module",
    sku: "QSM2-",
    name: "QS Sensor Module",
    category: "Sensor Modules",
    image: "/assets/products/qs-sensor-module.png",
    popularity: 20,
    specs: [
      { label: "Product family", value: "QS" },
      { label: "Category", value: "Sensors" },
      { label: "Type", value: "Sensor Modules" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "QS Sensor Module Dimensional Drawing", fileType: "PDF" },
          { title: "QS Sensor Module Product Brochure", fileType: "PDF" },
          { title: "QS Sensor Module Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "QS Sensor Module Installation Guide", fileType: "PDF" }],
      },
    ],
  },
  {
    id: "lutron-startup-service-lte-modem",
    sku: "LTE MODEM",
    name: "Lutron Startup Service (LTE Modem)",
    category: "Startup Services",
    image: "/assets/products/lutron-startup-service-lte-modem.png",
    popularity: 14,
    specs: [
      { label: "Product family", value: "LTE MODEM" },
      { label: "Category", value: "Services & Software" },
      { label: "Type", value: "Startup Services" },
      { label: "System", value: "HomeWorks" },
    ],
    docs: [
      {
        group: "Specification submittals",
        items: [
          { title: "Lutron Startup Service (LTE Modem) Dimensional Drawing", fileType: "PDF" },
          { title: "Lutron Startup Service (LTE Modem) Product Brochure", fileType: "PDF" },
          { title: "Lutron Startup Service (LTE Modem) Specification Submittal", fileType: "PDF" },
        ],
      },
      {
        group: "Installation instructions",
        items: [{ title: "Lutron Startup Service (LTE Modem) Installation Guide", fileType: "PDF" }],
      },
    ],
  },
];
