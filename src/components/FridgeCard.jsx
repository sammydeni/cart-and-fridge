import React from "react";
import { BsTrashFill } from "react-icons/bs";
import "./FridgeCard.css";
import { Button } from "react-bootstrap";

// creo un componente per gestire i prodotti nel carrello e la loro quantità

const FridgeCard = ({
  name,
  quantity,
  increaseQT,
  decreaseQT,
  deleteFridgeP,
}) => {
  return (
    <div className="cart-card">
      <h4>
        {name}
        <p>quantity: {quantity}</p>
        <Button className="btn-success" onClick={() => decreaseQT()}>
          -
        </Button>
        <Button className="btn-success" onClick={() => increaseQT()}>
          +
        </Button>
        <Button className="btn-danger" onClick={() => deleteFridgeP()}>
          <BsTrashFill />
        </Button>
      </h4>
    </div>
  );
};

export default FridgeCard;
