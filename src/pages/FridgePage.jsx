// nei componenti jsx è necessario importare React
import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./FridgePage.css";
import FridgeProductCard from "../components/FridgeProductCard";
import FridgeCard from "../components/FridgeCard";
import { getProducts, addFavourite, getFavourites } from "../api/products.api";

import {
  getFridgeProducts,
  addFridgeProduct,
  editFridgeProduct,
} from "../api/fridge.api";
import { orderBy } from "lodash";

class FridgePage extends React.Component {
  // FridgePage è un componente di classe
  // è necessario specificare sempre il costruttore se c'è uno stato
  constructor(props) {
    // la riga super(props) è sempre presente
    super(props);
    // è fondamentale inizializzare lo stato
    this.state = {
      fridgeProducts: [],
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
      getFridgeProducts().then((fridgeProducts) => {
        this.setState({ fridgeProducts, loading: false });
      });
    });
  }

  render() {
    const { products, favourites, fridgeProducts, loading } = this.state;

    return (
      <div className="fridge-page">
        <h1>Fridge</h1>

        <Button
          className="btn-success btn-lg openBtn"
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
                const isInFridge = fridgeProducts.find(
                  (fridgeP) => fridgeP.id === product.id
                );

                // find ritorna il primo elemento che corrisponde alla condizione oppure undefined
                return (
                  <FridgeProductCard
                    key={index}
                    name={product.name}
                    isFavourite={!!isInFavourites}
                    inFridge={!!isInFridge}
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
                    onFridge={() => {
                      addFridgeProduct({
                        productId: product.id,
                        quantity: 1,
                      }).then((fridgeProducts) => {
                        this.setState({ fridgeProducts });
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
          {orderBy(fridgeProducts, "product.name").map(
            (fridgeProduct, index) => {
              return (
                <FridgeCard
                  key={index}
                  name={fridgeProduct.product.name}
                  quantity={fridgeProduct.quantity}
                  increaseQT={() => {
                    editFridgeProduct({
                      productId: fridgeProduct.id,
                      quantity: fridgeProduct.quantity + 1,
                    }).then((fridgeProducts) => {
                      this.setState({ fridgeProducts });
                    });
                  }}
                  decreaseQT={() => {
                    editFridgeProduct({
                      productId: fridgeProduct.id,
                      quantity: fridgeProduct.quantity - 1,
                    }).then((fridgeProducts) => {
                      this.setState({ fridgeProducts });
                    });
                  }}
                  deleteFridgeP={() => {
                    editFridgeProduct({
                      productId: fridgeProduct.id,
                      quantity: 0,
                    }).then((fridgeProducts) => {
                      this.setState({ fridgeProducts });
                    });
                  }}
                />
              );
            }
          )}
        </div>
      </div>
    );
  }
}

export default FridgePage;
