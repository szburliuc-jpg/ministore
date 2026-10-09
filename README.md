# MiniStore

Magazin mic cu React (Vite + react-router-dom) si API Express.

## Pornire
    npm install
    npm run dev

- Frontend: http://localhost:5173
- API: http://localhost:3001 (Vite face proxy pe /api)

## Structura
    server/index.js        API Express (produse, categorii, comenzi)
    server/products.js     datele produselor
    src/api.js             client pentru API
    src/context/           cosul de cumparaturi (Context + localStorage)
    src/hooks/useAsync.js  hook pentru incarcare/erori
    src/components/        Header, ProductCard
    src/pages/             Home, Products, ProductDetail, Cart, Checkout, NotFound

## Rute
    /                 acasa
    /produse          lista (filtre in query: ?q=...&categorie=...)
    /produse/:id      detalii produs
    /cos              cosul
    /checkout         finalizare comanda

## Endpoint-uri API
    GET  /api/products?q=&category=
    GET  /api/categories
    GET  /api/products/:id
    POST /api/orders
