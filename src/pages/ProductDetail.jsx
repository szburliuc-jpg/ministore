import { Link, useParams } from "react-router-dom";
import useAsync from "../hooks/useAsync.js";
import { api } from "../api.js";
import { money } from "../utils.js";

export default function ProductDetail() {
  const { id } = useParams(); // id din URL -> folosit in request
  const { data, loading, error } = useAsync(() => api.getProduct(id), [id]);

  if (loading) return <p className="mut">Loading...</p>;
  if (error)
    return (
      <>
        <p className="err">Unable to load product.</p>
        <Link to="/products">Back to products</Link>
      </>
    );

  return (
    <>
      <Link to="/products" className="mut">Back</Link>
      <p className="mut">Product details...</p>
      <div className="detail">
        <div className="thumb large">
          <img src={data.image} alt={data.title} />
        </div>
        <div>
          <h2>{data.title}</h2>
          <p className="mut">{data.category}</p>
          <p>{data.description}</p>
          <p className="price big">{money(data.price)}</p>
        </div>
      </div>
    </>
  );
}
