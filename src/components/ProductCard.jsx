import { Link } from "react-router-dom";
import { money } from "../utils.js";

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <div className="thumb">
        <img src={product.image} alt={product.title} loading="lazy" />
      </div>
      <strong className="clamp">{product.title}</strong>
      <span className="price">{money(product.price)}</span>
      <Link className="btn" to={`/products/${product.id}`}>View details</Link>
    </div>
  );
}
