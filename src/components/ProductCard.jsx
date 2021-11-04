import React from "react";
import "./ProductCard.css";
import { Button } from "react-bootstrap";

// ProductCard è un componente funzionale che riceve come props "name" e "onFavourite"
const ProductCard = ({
  name,
  onFavourite,
  isFavourite = false,
  //inCart = false,
  onCart,
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
        {name} &nbsp; &nbsp;
        <Button
          className="mt-2"
          onClick={() => {
            onCart();
          }}
        >
          Add To Cart
        </Button>
      </h4>
    </div>
  );
};

export default ProductCard;
