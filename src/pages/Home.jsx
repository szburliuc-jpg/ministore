import { Link } from "react-router-dom";
import useAsync from "../hooks/useAsync.js";
import { api } from "../api.js";
import ProductCard from "../components/ProductCard.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function Home() {
  const { data, loading, error } = useAsync(() => api.getProducts(), []);
  const { add } = useCart();

  return (
    <>
      <section className="hero">
        <h1>Bun venit la MiniStore</h1>
        <p className="mut">Cateva produse simple, un cos si un checkout.</p>
        <Link className="btn" to="/produse">Vezi produsele</Link>
      </section>
      <h2>Recomandate</h2>
      {loading && <p className="mut">Se incarca...</p>}
      {error && <p className="err">{error}</p>}
      <div className="grid">
        {(data || []).slice(0, 4).map((p) => (
          <ProductCard key={p.id} product={p} onAdd={add} />
        ))}
      </div>
    </>
  );
}
