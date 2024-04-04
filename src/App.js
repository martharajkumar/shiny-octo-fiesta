// const heading = React.createElement("h1", { id: "heading" }, "this is h1");
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(heading);

import React from "react";
import ReactDOM from "react-dom/client";
import "../index.css";
import RestaurantCard from "./components/Restaurantcard";

import Home from "../src/pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Home />
      <Footer />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AppLayout />);
