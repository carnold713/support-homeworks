import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import { installOverlayScrollbars } from "./components/overlayScroll";

installOverlayScrollbars();

/*
  The site is responsive (desktop, tablet, mobile). Layout breakpoints are container queries on
  #hw-cq, which spans the full window, so they behave like normal media queries.
  (The fixed 1440 x 1024 frame was removed on 2026-11-03 at Collin's request; the frame helpers in
  components/ui.tsx fall back to the normal window when there is no #hw-stage / #hw-scroll.)
*/
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <div id="hw-cq">
      <div id="hw-app">
        <App />
      </div>
    </div>
  </React.StrictMode>
);
