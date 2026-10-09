import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h2>404</h2>
      <p className="mut">Page not found.</p>
      <Link className="btn" to="/">Home</Link>
    </>
  );
}
