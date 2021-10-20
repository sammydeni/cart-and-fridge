// nei componenti jsx è necessario importare React
import React from "react";
import { getProducts, addFavourite, getFavourites } from "../api/products.api";

import {
  getFridgeProducts,
  addFridgeProduct,
  editFridgeProduct,
} from "../api/fridge.api";

class FridgePage extends React.Component {
  // FridgePage è un componente di classe
  // è necessario specificare sempre il costruttore se c'è uno stato
  constructor(props) {
    // la riga super(props) è sempre presente
    super(props);
    // è fondamentale inizializzare lo stato
    this.state = { fridge: [], products: [], favourites: [], loading: false };
  }

  componentDidMount() {
    // prima aggiorniamo il valore di stato "loading",
    this.setState({ loading: true }, () => {
      // inserire qui il codice per chiamare le API
      // e infine salviamo le due risposte, aggiornando anche "loading"
      this.setState({ loading: false });
    });
  }

  render() {
    const { loading } = this.state;
    return (
      <div className="fridge-page">
        <h1>Fridge</h1>
        <div className="fridge-container">
          {/* Nella riga seguente facciamo apparire un messaggio solo se loading=true */}
          {loading && <p>Loading...</p>}
          {/* completare la pagina */}
          TODO
        </div>
      </div>
    );
  }
}

export default FridgePage;
