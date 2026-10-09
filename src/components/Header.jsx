import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

export default function Header() {
  const { count } = useCart();
  return (
    <header>
      <Link to="/" className="logo">MiniStore</Link>
      <nav>
        <NavLink to="/" end>Acasa</NavLink>
        <NavLink to="/produse">Produse</NavLink>
        <NavLink to="/cos">
          Cos{count > 0 && <span className="badge">{count}</span>}
        </NavLink>
      </nav>
    </header>
  );
}
