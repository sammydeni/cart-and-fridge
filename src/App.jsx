// nei componenti jsx è necessario importare React
import React from "react";
import "./App.css";

// importiamo le sezioni/pagine
import ProductPage from "./pages/ProductsPage";
import FridgePage from "./pages/FridgePage";
import CartPage from "./pages/CartPage";

// App include solo le sezioni/pagine
// perciò può essere una funzione "stupida"
const App = () => {
  return (
    <div className="app">
      <ProductPage />
      <FridgePage />
      <CartPage />
    </div>
  );
};

export default App;
