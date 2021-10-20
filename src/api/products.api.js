import { callApi } from "./index";

const BASE_URL = "https://fridge-n-cart.herokuapp.com";
const PRODUCTS = "products";

// la seguente funzione recupera la lista prodotti dal server
// async indica che la funzione ritornerà una promise
export const getProducts = async () => {
  const url = `${BASE_URL}/${PRODUCTS}`;

  return await callApi({ url, method: "GET" });
};

const USER_ID = "09"; // Aggiungere il proprio ID studente
const FAVOURITES = "favourites";

// la seguente funzione recupera la lista prodotti preferiti dall'utente dal server
// async indica che la funzione ritornerà una promise
export const getFavourites = async () => {
  const url = `${BASE_URL}/users/${USER_ID}/${FAVOURITES}`;

  return await callApi({ url, method: "GET" });
};

// la seguente funzione aggiunge un preferito alla lista dell'utente
// async indica che la funzione ritornerà una promise
export const addFavourite = async ({ productId, isFavourite }) => {
  const url = `${BASE_URL}/users/${USER_ID}/${FAVOURITES}`;
  const body = { productId, isFavourite };

  return await callApi({ url, method: "POST", body });
};
