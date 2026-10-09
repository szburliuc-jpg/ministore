import { Link, useParams } from "react-router-dom";
import useAsync from "../hooks/useAsync.js";
import { api } from "../api.js";
import { Thumb } from "../components/ProductCard.jsx";
import { useCart } from "../context/CartContext.jsx";
import { money } from "../utils.js";

export default function ProductDetail() {
  const { id } = useParams();
  const { add } = useCart();
  const { data, loading, error } = useAsync(() => api.getProduct(id), [id]);

  if (loading) return <p className="mut">Se incarca...</p>;
  if (error)
    return (
      <>
        <p className="err">{error}</p>
        <Link to="/produse">Inapoi la produse</Link>
      </>
    );

  return (
    <>
      <Link to="/produse" className="mut">Inapoi</Link>
      <div className="detail">
        <Thumb product={data} large />
        <div>
          <h2>{data.name}</h2>
          <p className="mut">{data.category}</p>
          <p>{data.description}</p>
          <p className="price big">{money(data.price)}</p>
          <button onClick={() => add(data)}>Adauga in cos</button>
        </div>
      </div>
    </>
  );
}
