async function request(url, options) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Eroare de retea");
  return data;
}

export const api = {
  getProducts: ({ q = "", category = "" } = {}) =>
    request(`/api/products?q=${encodeURIComponent(q)}&category=${encodeURIComponent(category)}`),
  getCategories: () => request("/api/categories"),
  getProduct: (id) => request(`/api/products/${id}`),
  createOrder: (order) =>
    request("/api/orders", { method: "POST", body: JSON.stringify(order) }),
};
