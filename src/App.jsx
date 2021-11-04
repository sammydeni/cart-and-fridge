// nei componenti jsx è necessario importare React
import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
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
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<ProductPage />} />
          <Route path="/fridge" element={<FridgePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
