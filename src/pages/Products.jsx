import { useSearchParams } from "react-router-dom";
import useAsync from "../hooks/useAsync.js";
import { api } from "../api.js";
import ProductCard from "../components/ProductCard.jsx";

// URL: /products?category=electronics&sort=price&search=phone
export default function Products() {
  const [params, setParams] = useSearchParams();
  const search = params.get("search") || "";
  const category = params.get("category") || "";
  const sort = params.get("sort") || "";

  const { data, loading, error } = useAsync(() => api.getProducts(), []);
  const { data: categories } = useAsync(() => api.getCategories(), []);

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    setParams(next, { replace: true });
  };

  let list = (data || []).filter(
    (p) =>
      (!category || p.category === category) &&
      p.title.toLowerCase().includes(search.toLowerCase())
  );
  if (sort === "price") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

  return (
    <>
      <h2>Products</h2>
      <div className="bar">
        <input placeholder="Search..." value={search} onChange={(e) => update("search", e.target.value)} />
        <select value={category} onChange={(e) => update("category", e.target.value)}>
          <option value="">All categories</option>
          {(categories || []).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select value={sort} onChange={(e) => update("sort", e.target.value)}>
          <option value="">Default order</option>
          <option value="price">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
        </select>
      </div>
      {loading && <p className="mut">Loading...</p>}
      {error && <p className="err">Unable to load products.</p>}
      {data && !list.length && <p className="mut">No products found.</p>}
      <div className="grid">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
