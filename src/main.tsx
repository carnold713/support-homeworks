import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

/*
  The prototype is only ever shown at exactly 1440 x 1024, centred on a near-black background.
  The site renders straight into a fixed 1440 x 1024 box in the same page (no iframe), so tools
  that inspect the page, such as Figma comments on a Code layer, can still see every element.
  - #hw-stage is the 1440 x 1024 box. It has a transform, so overlays, sheets and toasts
    (position: fixed) stay inside it instead of covering the whole browser window.
  - #hw-scroll inside it is what scrolls.
  - When the window is smaller than 1440 x 1024, the box is scaled down to fit (never up).
  Add ?bare to the URL to see the page without the frame (used for measuring).
*/
const bare = /[?&]bare\b/.test(location.search);
const root = document.getElementById("root")!;

if (!bare) {
  document.documentElement.classList.add("hw-framed");
  root.innerHTML = '<div id="hw-stage"><div id="hw-scroll"></div></div>';
  const stage = document.getElementById("hw-stage")!;
  const fit = () => {
    const s = Math.min(1, window.innerWidth / 1440, window.innerHeight / 1024);
    stage.dataset.scale = String(s);
    stage.style.transform = `translate(-50%, -50%) scale(${s})`;
  };
  window.addEventListener("resize", fit);
  fit();
}

ReactDOM.createRoot(bare ? root : document.getElementById("hw-scroll")!).render(
  <React.StrictMode>
    <div id="hw-cq">
      <div id="hw-app">
        <App />
      </div>
    </div>
  </React.StrictMode>
);
