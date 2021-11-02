import React from "react";
import "./CartCard.css";
import { Button } from "react-bootstrap";

// creo un componente per gestire i prodotti nel carrello e la loro quantità

const CartCard = ({ name, quantity, increaseQT, decreaseQT }) => {
  return (
    <div className="cart-card">
      <h4>
        {name}
        <p>quantity: {quantity}</p>
        <Button onClick={() => decreaseQT()}>-</Button>
        <Button onClick={() => increaseQT()}>+</Button>
      </h4>
    </div>
  );
};

export default CartCard;
