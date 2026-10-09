import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

function load() {
  try {
    return JSON.parse(localStorage.getItem("ministore-cart")) || [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem("ministore-cart", JSON.stringify(items));
    } catch {
      /* ignorat */
    }
  }, [items]);

  const value = useMemo(() => {
    const add = (p) =>
      setItems((c) =>
        c.some((i) => i.id === p.id)
          ? c.map((i) => (i.id === p.id ? { ...i, qty: i.qty + 1 } : i))
          : [...c, { ...p, qty: 1 }]
      );
    const setQty = (id, qty) =>
      setItems((c) => c.map((i) => (i.id === id ? { ...i, qty } : i)).filter((i) => i.qty > 0));
    const clear = () => setItems([]);
    const total = items.reduce((s, i) => s + i.price * i.qty, 0);
    const count = items.reduce((s, i) => s + i.qty, 0);
    return { items, add, setQty, clear, total, count };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
