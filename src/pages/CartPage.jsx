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
  // CartPage è un componente di classe
  // è necessario specificare sempre il costruttore se c'è uno stato
  constructor(props) {
    // la riga super(props) è sempre presente
    super(props);
    // è fondamentale inizializzare lo stato
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
      // poi chiamiamo l'API getProducts
      getProducts().then((products) => {
        // poi chiamiamo l'API getFavourites
        getFavourites().then((favourites) => {
          // e infine salviamo le due risposte, aggiornando anche "loading"
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
          onClick={() => {
            this.handleModal();
          }}
        >
          Open Products List
        </Button>
        <Modal show={this.state.show} size="xl">
          <Modal.Header>Products List</Modal.Header>
          <Modal.Body>
            <div className="products-container">
              {/* Nella riga seguente facciamo apparire un messaggio solo se loading=true */}
              {loading && <p>Loading...</p>}
              {/* Nelle righe seguenti cicliamo all'interno dell'array products, ritornando il componente ProductCard per ogni elemento */}
              {products.map((product, index) => {
                // quando si cicla un array e si ritorna un qualsiasi componente, va specificata la props "key"
                // che deve essere valorizzata come univoca (per questo qui utilizziamo l'index dell'array)
                // innanzitutto controlliamo se il prodotto attuale sia nei preferiti
                const isInFavourites = favourites.find(
                  (fav) => fav.product.id === product.id
                );
                // controllo se il prodotto è già nel carrello
                const isInCart = cartProducts.find(
                  (cartP) => cartP.id === product.id
                );

                // find ritorna il primo elemento che corrisponde alla condizione oppure undefined
                return (
                  <ProductCard
                    key={index}
                    name={product.name}
                    isFavourite={!!isInFavourites}
                    inCart={!!isInCart}
                    onFavourite={(isFavourite) => {
                      // "isFavourite" è un booleano controllato da ProductCard
                      // chiamiamo l'API per aggiungere il preferito
                      addFavourite({
                        productId: product.id,
                        isFavourite,
                      }).then((favourites) => {
                        // aggiorniamo la lista dei preferiti
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
          {/* Nella riga seguente facciamo apparire un messaggio solo se loading=true */}
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
