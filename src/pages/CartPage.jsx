// nei componenti jsx è necessario importare React
import React from "react";

class CartPage extends React.Component {
  // CartPage è un componente di classe
  // è necessario specificare sempre il costruttore se c'è uno stato
  constructor(props) {
    // la riga super(props) è sempre presente
    super(props);
    // è fondamentale inizializzare lo stato
    this.state = { loading: false };
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
      <div className="cart-page">
        <h1>Cart</h1>
        <div className="cart-container">
          {/* Nella riga seguente facciamo apparire un messaggio solo se loading=true */}
          {loading && <p>Loading...</p>}
          {/* completare la pagina */}
          TODO
        </div>
      </div>
    );
  }
}

export default CartPage;
