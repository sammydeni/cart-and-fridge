import React from "react";
import { BsTrashFill } from "react-icons/bs";
import "./CartCard.css";
import { Button } from "react-bootstrap";

// creo un componente per gestire i prodotti nel carrello e la loro quantità

const CartCard = ({ name, quantity, increaseQT, decreaseQT, deleteCartP }) => {
  return (
    <div className="cart-card">
      <h4>
        {name}
        <p>quantity: {quantity}</p>
        <Button onClick={() => decreaseQT()}>-</Button>
        <Button onClick={() => increaseQT()}>+</Button>
        <Button className="btn-danger" onClick={() => deleteCartP()}>
          <BsTrashFill />
        </Button>
      </h4>
    </div>
  );
};

export default CartCard;
