import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h2>404</h2>
      <p className="mut">Pagina nu exista.</p>
      <Link to="/">Acasa</Link>
    </>
  );
}
