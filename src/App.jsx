import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ProductPage from "./pages/ProductsPage";
import FridgePage from "./pages/FridgePage";
import CartPage from "./pages/CartPage";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <div className="pageContainer">
          <Routes>
            <Route path="/" exact element={<ProductPage />} />
            <Route path="/fridge" element={<FridgePage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
