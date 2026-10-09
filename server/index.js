import express from "express";
import { products } from "./products.js";

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());

// GET /api/products?q=&category=
app.get("/api/products", (req, res) => {
  const q = String(req.query.q || "").toLowerCase();
  const category = String(req.query.category || "");
  const result = products.filter(
    (p) => (!category || p.category === category) && p.name.toLowerCase().includes(q)
  );
  res.json(result);
});

// GET /api/categories
app.get("/api/categories", (_req, res) => {
  res.json([...new Set(products.map((p) => p.category))]);
});

// GET /api/products/:id
app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: "Produsul nu exista" });
  res.json(product);
});

// POST /api/orders
app.post("/api/orders", (req, res) => {
  const { name, email, address, items } = req.body || {};
  if (!name || !/\S+@\S+/.test(email || "") || !address || !Array.isArray(items) || !items.length) {
    return res.status(400).json({ error: "Date de comanda invalide" });
  }
  let total = 0;
  for (const it of items) {
    const p = products.find((x) => x.id === Number(it.id));
    if (!p || !(it.qty > 0)) return res.status(400).json({ error: "Produs invalid in comanda" });
    total += p.price * it.qty;
  }
  const orderId = "CMD-" + Math.floor(10000 + Math.random() * 90000);
  res.status(201).json({ orderId, name, total });
});

app.use("/api", (_req, res) => res.status(404).json({ error: "Endpoint inexistent" }));

app.listen(PORT, () => console.log(`API pornit pe http://localhost:${PORT}`));
