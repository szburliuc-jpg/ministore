import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api.js";
import { useCart } from "../context/CartContext.jsx";
import { money } from "../utils.js";

export default function Checkout() {
  const { items, total, clear } = useCart();
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);

  if (order)
    return (
      <>
        <h2>Multumim, {order.name}!</h2>
        <p>Comanda <strong>{order.orderId}</strong> a fost plasata ({money(order.total)}).</p>
        <Link className="btn" to="/">Acasa</Link>
      </>
    );

  if (!items.length)
    return (
      <>
        <p className="mut">Cosul este gol.</p>
        <Link className="btn" to="/produse">Produse</Link>
      </>
    );

  const valid = form.name && /\S+@\S+/.test(form.email) && form.address;
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await api.createOrder({
        ...form,
        items: items.map((i) => ({ id: i.id, qty: i.qty })),
      });
      clear();
      setOrder(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <h2>Checkout</h2>
      <p className="mut">Total de plata: {money(total)}</p>
      <form onSubmit={submit}>
        <input placeholder="Nume" value={form.name} onChange={set("name")} />
        <input placeholder="Email" value={form.email} onChange={set("email")} />
        <input placeholder="Adresa" value={form.address} onChange={set("address")} />
        {error && <p className="err">{error}</p>}
        <button disabled={!valid || busy}>{busy ? "Se trimite..." : "Plaseaza comanda"}</button>
      </form>
    </>
  );
}
