import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Admin } from "./components/admin";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/index";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Header />
    <Admin />
    <Footer />
  </React.StrictMode>
);

reportWebVitals();
