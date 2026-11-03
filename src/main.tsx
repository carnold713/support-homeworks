import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

/*
  The prototype is only ever shown at exactly 1440 x 1024, on a near-black background.
  The page frames itself: when it is not already the inner page of the frame, it draws the
  frame and loads itself again inside a 1440 x 1024 iframe named "hw-frame-inner". This works
  wherever the page is opened: the Railway site, the app URL, or a Figma Code layer.
  Add ?bare to the URL to see the page without the frame (used for measuring).
*/
const INNER = "hw-frame-inner";
const isInner = window.name === INNER || /[?&]bare\b/.test(location.search);

function mountFrame() {
  const css = document.createElement("style");
  css.textContent = `
    html, body { margin: 0; height: 100%; background: #121212; overflow: hidden; }
    #hw-stage { position: absolute; left: 50%; top: 50%; width: 1440px; height: 1024px; transform-origin: center center; }
    #hw-stage iframe { display: block; width: 1440px; height: 1024px; border: 0; background: #fff; box-shadow: 0 8px 40px rgba(0,0,0,.4); }`;
  document.head.appendChild(css);
  const stage = document.createElement("div");
  stage.id = "hw-stage";
  const frame = document.createElement("iframe");
  frame.name = INNER;
  frame.title = "HomeWorks Support prototype, desktop 1440 by 1024";
  frame.src = location.href;
  stage.appendChild(frame);
  document.getElementById("root")!.replaceWith(stage);
  // Scale the whole window down (never up) when the space around it is smaller than 1440 x 1024.
  const fit = () => {
    const s = Math.min(1, window.innerWidth / 1440, window.innerHeight / 1024);
    stage.style.transform = `translate(-50%, -50%) scale(${s})`;
  };
  window.addEventListener("resize", fit);
  fit();
}

if (isInner) {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  mountFrame();
}
