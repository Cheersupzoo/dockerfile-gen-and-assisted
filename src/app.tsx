import * as React from "react";
// import * as ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import { Index } from "./client";

function render() {
  const root = createRoot(document.getElementById("app"));
  root.render(<Index />);
}

render();
