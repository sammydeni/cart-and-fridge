import React from "react";
import "./ProductCard.css";

// ProductCard è un componente funzionale che riceve come props "name" e "onFavourite"
const ProductCard = ({
  name,
  onFavourite,
  isFavourite = false,
  onCart,
  inCart = false,
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

        <button onClick={() => onCart(!inCart)}>Add to Cart</button>

        {name}
      </h4>
    </div>
  );
};

export default ProductCard;
