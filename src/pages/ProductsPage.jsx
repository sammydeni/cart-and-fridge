// nei componenti jsx è necessario importare React
import React from "react";

// importiamo il componente ProductCard
import ProductCardMain from "../components/ProductCardMain";

// importiamo le API
import { getProducts, addFavourite, getFavourites } from "../api/products.api";

// il seguente Mock JSON non serve più dopo aver agganciato l'API
// import productsMock from "./mock/products.json";

class ProductPage extends React.Component {
  // ProductPage è un componente di classe
  // è necessario specificare sempre il costruttore se c'è uno stato
  constructor(props) {
    // la riga super(props) è sempre presente
    super(props);
    // è fondamentale inizializzare lo stato
    this.state = { products: [], favourites: [], loading: false };
  }

  componentDidMount() {
    // prima aggiorniamo il valore di stato "loading",
    this.setState({ loading: true }, () => {
      // poi chiamiamo l'API getProducts
      getProducts().then((products) => {
        // poi chiamiamo l'API getFavourites
        getFavourites().then((favourites) => {
          // e infine salviamo le due risposte, aggiornando anche "loading"
          this.setState({ products, favourites, loading: false });
        });
      });
    });
  }

  render() {
    // destrutturiamo lo state
    const { products, favourites, loading } = this.state;
    return (
      <div className="product-page">
        <h1>Products</h1>

        {/* uso il modal per aggiungere i prodotti */}

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
            // find ritorna il primo elemento che corrisponde alla condizione oppure undefined
            return (
              <ProductCardMain
                key={index}
                name={product.name}
                isFavourite={!!isInFavourites}
                onFavourite={(isFavourite) => {
                  // "isFavourite" è un booleano controllato da ProductCard
                  // chiamiamo l'API per aggiungere il preferito
                  addFavourite({ productId: product.id, isFavourite }).then(
                    (favourites) => {
                      // aggiorniamo la lista dei preferiti
                      this.setState({ favourites });
                    }
                  );
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
