import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { HomeScreen } from "./components/home";
import "bootstrap/dist/css/bootstrap.min.css";
import { Header } from "./components/header";
import { Footer } from "./components/footer/index";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Header />
    <HomeScreen />
    <Footer />
  </React.StrictMode>
);

reportWebVitals();
