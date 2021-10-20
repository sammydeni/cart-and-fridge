import { callApi } from "./index";

const BASE_URL = "https://fridge-n-cart.herokuapp.com";
const USER_ID = "09";
const FRIDGE = "fridge";

export const getFridgeProducts = async () => {
  const url = `${BASE_URL}/users/${USER_ID}/${FRIDGE}`;

  return await callApi({ url, method: "GET" });
};

export const addFridgeProduct = async ({ productId, quantity }) => {
  const url = `${BASE_URL}/users/${USER_ID}/${FRIDGE}`;
  const body = { productId, quantity };

  return await callApi({ url, method: "POST", body });
};

export const editFridgeProduct = async ({ productId, quantity }) => {
  const url = `${BASE_URL}/users/${USER_ID}/${FRIDGE}/${productId}`;
  const body = { quantity };

  return await callApi({ url, method: "PATCH", body });
};
