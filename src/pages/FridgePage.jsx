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
  constructor(props) {
    super(props);
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
      getProducts().then((products) => {
        getFavourites().then((favourites) => {
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
              {loading && <p>Loading...</p>}
              {products.map((product, index) => {
                const isInFavourites = favourites.find(
                  (fav) => fav.product.id === product.id
                );
                const isInFridge = fridgeProducts.find(
                  (fridgeP) => fridgeP.id === product.id
                );

                return (
                  <FridgeProductCard
                    key={index}
                    name={product.name}
                    isFavourite={!!isInFavourites}
                    inFridge={!!isInFridge}
                    onFavourite={(isFavourite) => {
                      addFavourite({
                        productId: product.id,
                        isFavourite,
                      }).then((favourites) => {
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
