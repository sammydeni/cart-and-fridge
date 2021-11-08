import { callApi } from "./index";

const BASE_URL = "https://fridge-n-cart.herokuapp.com";
const PRODUCTS = "products";

export const getProducts = async () => {
  const url = `${BASE_URL}/${PRODUCTS}`;

  return await callApi({ url, method: "GET" });
};

const USER_ID = "09";
const FAVOURITES = "favourites";

export const getFavourites = async () => {
  const url = `${BASE_URL}/users/${USER_ID}/${FAVOURITES}`;

  return await callApi({ url, method: "GET" });
};

export const addFavourite = async ({ productId, isFavourite }) => {
  const url = `${BASE_URL}/users/${USER_ID}/${FAVOURITES}`;
  const body = { productId, isFavourite };

  return await callApi({ url, method: "POST", body });
};
