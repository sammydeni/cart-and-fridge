import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <ul id="nav">
      <li>
        <Link to="/">Products</Link>
      </li>
      <li>
        <Link to="/fridge">Fridge</Link>
      </li>
      <li>
        <Link to="/cart">Cart</Link>
      </li>
    </ul>
  );
};
export default Navbar;
