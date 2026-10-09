import { Link } from "react-router-dom";
import { money } from "../utils.js";

export function Thumb({ product, large }) {
  return (
    <div
      className={"thumb" + (large ? " large" : "") + (product.image ? " has-img" : "")}
      style={{ background: product.image ? "#fff" : product.color }}
    >
      {product.image ? <img src={product.image} alt={product.name} loading="lazy" /> : product.name[0]}
    </div>
  );
}

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="card">
      <Link to={`/produse/${product.id}`}>
        <Thumb product={product} />
        <strong>{product.name}</strong>
      </Link>
      <span className="mut">{product.category}</span>
      <span className="price">{money(product.price)}</span>
      {onAdd && <button onClick={() => onAdd(product)}>Adauga in cos</button>}
    </div>
  );
}
