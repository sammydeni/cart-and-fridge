import { callApi } from "./index";

const BASE_URL = "https://fridge-n-cart.herokuapp.com";
const USER_ID = "09";
const CART = "cart";

export const getCartProducts = async () => {
  const url = `${BASE_URL}/users/${USER_ID}/${CART}`;

  return await callApi({ url, method: "GET" });
};

export const addCartProduct = async ({ productId, quantity }) => {
  const url = `${BASE_URL}/users/${USER_ID}/${CART}`;
  const body = { productId, quantity };

  return await callApi({ url, method: "POST", body });
};

export const editCartProduct = async ({ productId, quantity }) => {
  const url = `${BASE_URL}/users/${USER_ID}/${CART}/${productId}`;
  const body = { quantity };

  return await callApi({ url, method: "PATCH", body });
};
