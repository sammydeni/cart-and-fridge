import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <li>
        <Link to="/">Products</Link>
      </li>
      <li>
        <Link to="/fridge">Fridge</Link>
      </li>
      <li>
        <Link to="/cart">Cart</Link>
      </li>
    </div>
  );
};
export default Navbar;
