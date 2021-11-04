import React from "react";
import "./ProductCard.css";
import { Button } from "react-bootstrap";

// ProductCard è un componente funzionale che riceve come props "name" e "onFavourite"
const FridgeProductCard = ({
  name,
  onFavourite,
  isFavourite = false,
  //inFridge = false,
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
