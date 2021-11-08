// nei componenti jsx è necessario importare React
import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./CartPage.css";
import ProductCard from "../components/ProductCard";
import CartCard from "../components/CartCard";
import { getProducts, addFavourite, getFavourites } from "../api/products.api";
import {
  getCartProducts,
  addCartProduct,
  editCartProduct,
} from "../api/cart.api";
import { orderBy } from "lodash";

class CartPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cartProducts: [],
      products: [],
      favourites: [],
      show: false,
      loading: false,
    };
  }

  handleModal() {
    this.setState({ show: !this.state.show });
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      getProducts().then((products) => {
        getFavourites().then((favourites) => {
          this.setState({ products, favourites });
        });
      });
      getCartProducts().then((cartProducts) => {
        this.setState({ cartProducts, loading: false });
      });
    });
  }

  render() {
    const { products, favourites, cartProducts, loading } = this.state;
    return (
      <div className="cart-page">
        <h1>Cart</h1>

        <Button
          className="btn-lg openBtn"
          onClick={() => {
            this.handleModal();
          }}
        >
          Open Products List
        </Button>
        <Modal show={this.state.show} size="xl">
          <Modal.Header style={{ color: "white" }}>Products List</Modal.Header>
          <Modal.Body>
            <div className="products-container">
              {loading && <p>Loading...</p>}
              {products.map((product, index) => {
                const isInFavourites = favourites.find(
                  (fav) => fav.product.id === product.id
                );

                const isInCart = cartProducts.find(
                  (cartP) => cartP.id === product.id
                );

                return (
                  <ProductCard
                    key={index}
                    name={product.name}
                    isFavourite={!!isInFavourites}
                    inCart={!!isInCart}
                    onFavourite={(isFavourite) => {
                      addFavourite({
                        productId: product.id,
                        isFavourite,
                      }).then((favourites) => {
                        this.setState({ favourites });
                      });
                    }}
                    onCart={() => {
                      addCartProduct({
                        productId: product.id,
                        quantity: 1,
                      }).then((cartProducts) => {
                        this.setState({ cartProducts });
                      });
                    }}
                  />
                );
              })}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                this.handleModal();
              }}
            >
              Close Modal
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="cart-container">
          {loading && <p>Loading...</p>}
          {orderBy(cartProducts, "product.name").map((cartProduct, index) => {
            return (
              <CartCard
                key={index}
                name={cartProduct.product.name}
                quantity={cartProduct.quantity}
                increaseQT={() => {
                  editCartProduct({
                    productId: cartProduct.id,
                    quantity: cartProduct.quantity + 1,
                  }).then((cartProducts) => {
                    this.setState({ cartProducts });
                  });
                }}
                decreaseQT={() => {
                  editCartProduct({
                    productId: cartProduct.id,
                    quantity: cartProduct.quantity - 1,
                  }).then((cartProducts) => {
                    this.setState({ cartProducts });
                  });
                }}
                deleteCartP={() => {
                  editCartProduct({
                    productId: cartProduct.id,
                    quantity: 0,
                  }).then((cartProducts) => {
                    this.setState({ cartProducts });
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

export default CartPage;
