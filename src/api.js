const BASE = "https://fakestoreapi.com";

async function request(path) {
  const res = await fetch(BASE + path);
  if (!res.ok) throw new Error("Request failed");
  const text = await res.text();
  // fakestoreapi intoarce 200 cu corp gol pentru id inexistent
  if (!text) throw new Error("Not found");
  return JSON.parse(text);
}

export const api = {
  getProducts: () => request("/products"),
  getProduct: (id) => request(`/products/${encodeURIComponent(id)}`),
  getCategories: () => request("/products/categories"),
};
