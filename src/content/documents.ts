/* =====================================================================
   DOCUMENTS & RESOURCES table

   HOW TO EDIT
   • Add a document: add a line to `documents` with title, docType,
     fileType and language. New docType / fileType / language values
     show up as filter options automatically, with counts.
   • fileType "Web page" shows "Visit Page" instead of "Download".
   • Rows are sorted A–Z by title by default; order here doesn't matter.
   ===================================================================== */

export type DocumentRow = {
  title: string;
  docType: string;
  fileType: string;
  language: string;
};

export const documents: DocumentRow[] = [
  { title: "Application Note #519 - Minimizing Radio Frequency Interference", docType: "Application Notes", fileType: "PDF", language: "English" },
  { title: "Application Note #579 - Color Tuning with Lutron Controls", docType: "Application Notes", fileType: "PDF", language: "English" },
  { title: "Application Note #696 - Integrating Ketra Products into HomeWorks QS Systems", docType: "Application Notes", fileType: "PDF", language: "English" },
  { title: "Application Note #730 - Ketra Emergency and Fire Alarm Integration", docType: "Application Notes", fileType: "PDF", language: "English" },
  { title: "Application Note #746 - Ketra & Track Lighting Applications", docType: "Application Notes", fileType: "PDF", language: "English" },
  { title: "Application Note #758 - Cleaning Recommendations for Lutron Products", docType: "Application Notes", fileType: "Web page", language: "English" },
  { title: "Application Note #766 - Lutron Design Files and Bluebeam Revu", docType: "Application Notes", fileType: "PDF", language: "English" },
  { title: "Application Note #772 - Lutron Design Files and AutoCAD", docType: "Application Notes", fileType: "PDF", language: "English" },
  { title: "Application Note #799 - Importing a Design from myProjects into D-Tools System Integrator", docType: "Application Notes", fileType: "PDF", language: "English" },
  { title: "Bluebeam/CAD Tool Kit", docType: "Bluebeam", fileType: "Web page", language: "English" },
  { title: "Exploring the Magic of Ketra - Design Guide", docType: "Product Brochures", fileType: "PDF", language: "English" },
  { title: "Exploring the Magic of Ketra - Design Guide (Español)", docType: "Product Brochures", fileType: "PDF", language: "Spanish" },
  { title: "HomeWorks & Ketra - One-Line Diagram", docType: "One-Line Diagrams", fileType: "PDF", language: "English" },
  { title: "HomeWorks & Ketra - One-Line Diagram (DWG)", docType: "One-Line Diagrams", fileType: "DWG", language: "English" },
  { title: "Ketra & HomeWorks - CAD Block", docType: "CAD Downloads", fileType: "ZIP", language: "English" },
  { title: "Ketra at Home - Brochure", docType: "Product Brochures", fileType: "PDF", language: "English" },
  { title: "Ketra at Home - Brochure (Español)", docType: "Product Brochures", fileType: "PDF", language: "Spanish" },
  { title: "Ketra Error Code Troubleshooting", docType: "Application Notes", fileType: "PDF", language: "English" },
  { title: "Ketra in the Workplace - Brochure", docType: "Product Brochures", fileType: "PDF", language: "English" },
  { title: "Ketra in the Workplace - Brochure (Español)", docType: "Product Brochures", fileType: "PDF", language: "Spanish" },
  { title: "Ketra S30 Lamp Specification Submittal", docType: "Specification Submittals", fileType: "PDF", language: "English" },
  { title: "Ketra S30 Track Luminaire Specification Submittal", docType: "Specification Submittals", fileType: "PDF", language: "English" },
  { title: "KetraNet Mesh Channel Planning and Wi-Fi Coexistence", docType: "Application Notes", fileType: "PDF", language: "English" },
  { title: "N3 Satellite | S30 0-10V Switch - One-Line Diagram", docType: "One-Line Diagrams", fileType: "PDF", language: "English" },
  { title: "N3 Satellite | S30 Lamp - One-Line Diagram", docType: "One-Line Diagrams", fileType: "PDF", language: "English" },
  { title: "Network Lighting Controls - HomeWorks - CSI Spec", docType: "Performance Specifications", fileType: "DOC", language: "English" },
  { title: "Retrofit Lamps - One-Line Diagram", docType: "One-Line Diagrams", fileType: "PDF", language: "English" },
  { title: "S30 Downlight Trim - Installation Guide", docType: "Installation Guides", fileType: "PDF", language: "English" },
  { title: "S30 Downlight Trim - Revit Drawings", docType: "Revit Downloads", fileType: "RFA", language: "English" },
  { title: "S30 Downlight Trim Specification Submittal", docType: "Specification Submittals", fileType: "PDF", language: "English" },
  { title: "S30 Lamp - One-Line Diagram", docType: "One-Line Diagrams", fileType: "PDF", language: "English" },
  { title: "S30 Lamp - Photometrics", docType: "Performance Specifications", fileType: "ZIP", language: "English" },
  { title: "Section 26 5134 - Luminaires, Lamps, and Accessories - Ketra GOVT", docType: "Performance Specifications", fileType: "DOC", language: "English" },
  { title: "Section 26 5134 - Luminaires, Lamps, and Accessories - Ketra NON-GOVT", docType: "Performance Specifications", fileType: "DOC", language: "English" },
  { title: "Systems Control - One-Line Diagram", docType: "One-Line Diagrams", fileType: "PDF", language: "English" },
  { title: "Tunable Wireless Lamps - Installation Guide", docType: "Installation Guides", fileType: "PDF", language: "English" },
];
