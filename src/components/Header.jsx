import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/" className="logo">MiniStore</Link>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </nav>
    </header>
  );
}
