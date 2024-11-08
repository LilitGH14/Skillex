import { get } from "./httpClient";

export function getProducts() {
  return get(`${process.env.REACT_APP_BASE_URL}/assets/mock/products.json`);
}

export function getFilteredProducts(filters) {
  // in real case, we will use POST method and get filtered data on the backend
  // if we deal with big data, we can get them page by page

  // return post(
  //   `${process.env.REACT_APP_BASE_URL}/assets/mock/products.json?page=${page}`,
  //   filters
  // );

  // in our case, we will use the GET method and filter the data on the frontend
  return get(`${process.env.REACT_APP_BASE_URL}/assets/mock/products.json`);
}
