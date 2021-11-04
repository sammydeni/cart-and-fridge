import React from "react";
import "./ProductCard.css";
import { Button } from "react-bootstrap";

// ProductCard è un componente funzionale che riceve come props "name" e "onFavourite"
const ProductCardMain = ({
  name,
  onFavourite,
  isFavourite = false,
  onCart,
  //inCart = false,
}) => {
  return (
    <div className="product-card">
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

export default ProductCardMain;
