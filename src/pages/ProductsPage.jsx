import React from "react";
import ProductCardMain from "../components/ProductCardMain";
import { getProducts, addFavourite, getFavourites } from "../api/products.api";
import { addCartProduct } from "../api/cart.api";

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [], favourites: [], loading: false };
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      getProducts().then((products) => {
        getFavourites().then((favourites) => {
          this.setState({ products, favourites, loading: false });
        });
      });
    });
  }

  render() {
    const { products, favourites, loading } = this.state;
    return (
      <div className="product-page">
        <h1>Products</h1>

        <div className="products-container">
          {loading && <p>Loading...</p>}
          {products.map((product, index) => {
            const isInFavourites = favourites.find(
              (fav) => fav.product.id === product.id
            );
            return (
              <ProductCardMain
                key={index}
                name={product.name}
                isFavourite={!!isInFavourites}
                onFavourite={(isFavourite) => {
                  addFavourite({ productId: product.id, isFavourite }).then(
                    (favourites) => {
                      this.setState({ favourites });
                    }
                  );
                }}
                onCart={() => {
                  addCartProduct({
                    productId: product.id,
                    quantity: 1,
                  });
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProductPage;
