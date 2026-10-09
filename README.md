# MiniStore

Magazin mic cu React (Vite + react-router-dom). Datele vin de la https://fakestoreapi.com.

## Pornire
    npm install
    npm run dev

## Rute
    /                      Home
    /products              lista (?category=electronics&sort=price&search=phone)
    /products/:id          detalii produs
    /about                 About
    /dashboard             Overview (nested routes)
    /dashboard/profile     Profile
    /dashboard/settings    Settings
    *                      404 + buton Home

## API
    GET https://fakestoreapi.com/products
    GET https://fakestoreapi.com/products/{id}
    GET https://fakestoreapi.com/products/categories
