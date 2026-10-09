import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { money } from "../utils.js";

export default function Cart() {
  const { items, setQty, total } = useCart();

  if (!items.length)
    return (
      <>
        <h2>Cosul tau</h2>
        <p className="mut">Cosul este gol.</p>
        <Link className="btn" to="/produse">Mergi la produse</Link>
      </>
    );

  return (
    <>
      <h2>Cosul tau</h2>
      {items.map((i) => (
        <div className="row" key={i.id}>
          <div className="thumb small" style={{ background: i.color }}>{i.name[0]}</div>
          <div className="grow">
            <strong>{i.name}</strong>
            <div className="mut">{money(i.price)}</div>
          </div>
          <div className="qty">
            <button className="ghost" onClick={() => setQty(i.id, i.qty - 1)}>-</button>
            <span>{i.qty}</span>
            <button className="ghost" onClick={() => setQty(i.id, i.qty + 1)}>+</button>
          </div>
          <span className="price">{money(i.price * i.qty)}</span>
        </div>
      ))}
      <p className="total">Total: {money(total)}</p>
      <div className="right"><Link className="btn" to="/checkout">Finalizeaza comanda</Link></div>
    </>
  );
}
