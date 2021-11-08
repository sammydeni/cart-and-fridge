import React from "react";
import "./ProductCard.css";
import { Button } from "react-bootstrap";

const FridgeProductCard = ({
  name,
  onFavourite,
  isFavourite = false,
  onFridge,
}) => {
  return (
    <div className="product-card" style={{ "text-align": "center" }}>
      <h4>
        <button
          onClick={() => onFavourite(!isFavourite)}
          className={isFavourite ? "favourite" : "not-favourite"}
          title="Set as favourite"
        >
          &#9733;
        </button>

        {name}
        <Button
          className="mt-2 btn-lg"
          onClick={() => {
            onFridge();
          }}
        >
          Add to Fridge
        </Button>
      </h4>
    </div>
  );
};

export default FridgeProductCard;
