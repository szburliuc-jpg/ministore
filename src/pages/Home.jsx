import { Link } from "react-router-dom";
import useAsync from "../hooks/useAsync.js";
import { api } from "../api.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Home() {
  const { data, loading, error } = useAsync(() => api.getProducts(), []);

  return (
    <>
      <section className="hero">
        <h1>Welcome to MiniStore</h1>
        <p className="mut">A small store built with React Router and fakestoreapi.com.</p>
        <Link className="btn" to="/products">Browse products</Link>
      </section>
      <h2>Featured</h2>
      {loading && <p className="mut">Loading...</p>}
      {error && <p className="err">Unable to load products.</p>}
      <div className="grid">
        {(data || []).slice(0, 4).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
