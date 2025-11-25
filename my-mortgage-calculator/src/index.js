import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/layout.css";
import "./styles/form.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
