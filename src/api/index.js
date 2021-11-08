import { isEmpty } from "lodash";

export const callApi = async ({ url, method = "GET", body = undefined }) => {
  if (method !== "GET" && !isEmpty(body)) {
    body = JSON.stringify(body);
  } else {
    body = undefined;
  }
  const res = await fetch(url, {
    method,
    body,
    headers: !isEmpty(body)
      ? { "Content-Type": "application/json" }
      : undefined,
  });

  return await res.json();
};
