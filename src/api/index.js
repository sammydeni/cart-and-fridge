import { isEmpty } from "lodash";

// questa utility permette di utilizzare fetch più facilmente
// vedere products.api.js per l'utilizzo
export const callApi = async ({ url, method = "GET", body = undefined }) => {
  // fetch è una promise e serve per effettuare le chiamate API
  if (method !== "GET" && !isEmpty(body)) {
    body = JSON.stringify(body);
  } else {
    body = undefined;
  }
  const res = await fetch(url, {
    method,
    body,
    headers: !isEmpty(body) ? { "Content-Type": "application/json" } : undefined,
  });

  // res.json() è una promise
  return await res.json();
};
