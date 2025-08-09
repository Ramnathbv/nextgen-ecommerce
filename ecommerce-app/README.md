# NextGen Ecommerce (React + TypeScript + Vite)

A modern ecommerce frontend built with React 19, TypeScript, and Vite. It features a full-width header, responsive product catalog with category filtering, product detail pages, cart with context state, login modal, and more.

## Features

- Header with navigation: Home, Products, About, Contact, Cart (with live item count)
- Login modal with Sign In / Sign Up toggle (username/password, email, password confirm)
- Home page
  - Latest Trending section for a cloth store
  - Category chips (Newly Added, Men, Women, Kids) with filtering
  - Responsive product grid with Add to Cart and Favorites (heart) actions
- Products page
  - Same category chips and filtering
  - Product grid with favorites and add to cart
- Product Detail page: `/products/:id`
  - Large image, price, categories, add to cart, favorite
- Cart page: `/cart`
  - Lists items, quantity total, remove item, clear cart, total price
- About page with product-related content
- Contact page (placeholder)
- Client-side routing powered by React Router
- Global state
  - Shop context for cart and favorites
  - Guest ID utility for anonymous tracking
- Full-width layout with overflow protection and responsive design

## Tech Stack

- React 19, TypeScript, Vite
- React Router
- ESLint (strict, type-aware)

## Getting Started

```bash
# Install
npm install

# Run dev server
npm run dev

# Type-check & build
npm run build

# Preview production build
npm run preview
```

Open the dev server URL printed in the terminal (usually `http://localhost:5173`).

## Project Structure

```
src/
  App.tsx                # Routes and app shell
  main.tsx               # Entry with BrowserRouter
  Header/                # Header component and styles
  Home/                  # Home page, filtering, grid
  pages/
    Products.tsx/.css    # Catalog page with filtering
    ProductDetail.tsx/.css
    Cart.tsx/.css        # Cart page
    About.tsx/.css       # About content
    Contact.tsx          # Contact placeholder
  common/interfaces/     # Shared TypeScript interfaces
  context/
    ShopContext.tsx      # Cart + favorites context
    shopTypes.ts         # Shop context types
    AuthContext.tsx      # Placeholder auth provider
  data/
    products.ts          # Categories & sample products
  utils/
    guestId.ts           # Persistent guest user ID utility
  assets/
    Tshirts/             # Local product images
```

## Routing

- `/` → Home
- `/products` → Products
- `/products/:id` → Product Detail
- `/cart` → Cart
- `/about` → About
- `/contact` → Contact

## Key Components

- `Header/Header.tsx`
  - Navigation with `Link`
  - Cart chip shows total items from Shop context
  - Login button opens modal
- `Login/Login.tsx`
  - Sign In / Sign Up forms with toggle and close
- `Home/Home.tsx`, `pages/Products.tsx`
  - Category chips with active state
  - Product grid cards: image, name, price, heart (favorite), Add to Cart
  - Click image or name to open detail
- `pages/ProductDetail.tsx`
  - Large image, price, categories, favorite toggle, Add to Cart
- `pages/Cart.tsx`
  - Item list with qty and total, remove and clear actions

## State Management (Shop Context)

- `ShopContext` provides:
  - `cartItems`, `totalItemsInCart`
  - `addToCart(product)`, `removeFromCart(id)`, `clearCart()`
  - `favorites` as a Set, `toggleFavorite(id)`, `isFavorite(id)`

Wrap your app with `ShopProvider` (already done in `App.tsx`).

## Guest User ID

- `utils/guestId.ts` exposes `getOrCreateGuestId()` and `clearGuestId()`
- Persists a UUID in localStorage; falls back to a cookie
- Attach `X-Guest-Id` header for backend APIs (create a fetch/axios wrapper as needed)

## Styling & Responsiveness

- Full-width header and content
- Global box-sizing and overflow-x protection
- Responsive grids and layout

## Development Notes

- Type-aware ESLint is enabled; fix lints before committing
- Imports use explicit `.tsx` where needed due to Vite/TS settings (`verbatimModuleSyntax`)
- Sample product images use local assets under `src/assets/Tshirts/`

## Roadmap

- Real authentication
- Persistent cart storage (localStorage/remote)
- Product search and sorting
- Checkout flow
