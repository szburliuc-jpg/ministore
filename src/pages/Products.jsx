import { useSearchParams } from "react-router-dom";
import useAsync from "../hooks/useAsync.js";
import { api } from "../api.js";
import ProductCard from "../components/ProductCard.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function Products() {
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";
  const category = params.get("categorie") || "";
  const { add } = useCart();

  const { data: categories } = useAsync(() => api.getCategories(), []);
  const { data, loading, error } = useAsync(() => api.getProducts({ q, category }), [q, category]);

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    value ? next.set(key, value) : next.delete(key);
    setParams(next, { replace: true });
  };

  return (
    <>
      <h2>Produse</h2>
      <div className="bar">
        <input placeholder="Cauta..." value={q} onChange={(e) => update("q", e.target.value)} />
        <select value={category} onChange={(e) => update("categorie", e.target.value)}>
          <option value="">Toate categoriile</option>
          {(categories || []).map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
      {loading && <p className="mut">Se incarca...</p>}
      {error && <p className="err">{error}</p>}
      {data && !data.length && <p className="mut">Niciun produs gasit.</p>}
      <div className="grid">
        {(data || []).map((p) => (
          <ProductCard key={p.id} product={p} onAdd={add} />
        ))}
      </div>
    </>
  );
}
