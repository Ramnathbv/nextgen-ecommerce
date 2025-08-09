# E‑commerce Backend

An e‑commerce platform with users, products, carts, checkout, and CMS‑powered static pages. Built with performance, security, and developer experience in mind.

## ✨ Features

- **Users**: OAuth2 login, JWT sessions, roles/permissions, profile & addresses
- **Products**: Catalog, categories, variants, images, search, pagination, sorting, filters
- **Cart**: Add/update/remove items, persistent server‑side cart, guest to user merge
- **Checkout**: Address & shipping, tax calculation hooks, order creation, payment gateway integration ready
- **CMS Pages**: Static pages (About, FAQ, Terms, etc.) fetched from Strapi
- **Caching**: Redis‑backed caching for product lists/details and CMS pages
- **Observability**: Centralized error handling, basic request logging, health checks

## 🛠️ Tech Stack

| Component     | Technology      |
|---------------|----------------|
| Backend       | Node.js (Express) |
| Database      | MySQL           |
| Caching       |  Redis          |
| Auth          | OAuth2 + JWT    |
| ORM / Query   | Sequelize |
| API Format    | REST + JSON     |
| Frontend      |  React          |
| CMS           | Strapi          |
| E-commerce Engine | CommerceLayer  |

## 🧭 Architecture Overview

- **Express REST API** exposes resources for auth, users, products, cart, checkout, and orders
- **Sequelize** manages models, migrations, and MySQL access
- **Redis** caches hot endpoints and stores session‑adjacent/cart data
- **OAuth2 + JWT** handles identity: OAuth provider → backend callback → JWT for API
- **Strapi** serves CMS pages; backend proxies/normalizes page JSON by slug

Suggested structure:

```
src/
  config/            # env, db, redis, auth config
  db/                # sequelize models, migrations, seeders
  middleware/        # auth, validation, error handlers
  modules/
    auth/
    users/
    products/
    cart/
    checkout/
    orders/
    cms/
  routes/            # route definitions
  utils/             # helpers (cache, logger, http)
  app.ts             # express app wiring
  server.ts          # bootstrap
```

## 🚀 Getting Started

### Prerequisites

- Node.js 22+
- MySQL 8+
- Redis 6+
- Strapi (CMS) running and reachable

### Environment Variables

Create a `.env` file in the project root:

```
NODE_ENV=development
PORT=3000

# Database
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DB=ecommerce
MYSQL_USER=root
MYSQL_PASSWORD=yourpassword

# Redis
REDIS_URL=redis://localhost:6379

# Auth
JWT_SECRET=replace-with-secure-random
OAUTH_PROVIDER=google               # or github, etc.
OAUTH_CLIENT_ID=your-client-id
OAUTH_CLIENT_SECRET=your-client-secret
OAUTH_REDIRECT_URI=http://localhost:3000/auth/oauth2/callback

# CMS
CMS_BASE_URL=http://localhost:1337

# CORS
CORS_ORIGIN=http://localhost:5173   # react dev server origin
```

### Installation

```
npm install

### Run (Development)

```
# Start backend
npm run dev

# Make sure Redis and MySQL are running
# Start Strapi CMS separately (usually on :1337)
```

### Build & Run (Production)

```
npm run build
npm run start
```

## 📚 API Overview

Base URL: `/api`

- **Auth**
  - `GET /auth/oauth2/:provider` → redirect to provider
  - `GET /auth/oauth2/callback` → exchange code, set JWT
  - `POST /auth/logout` → invalidate token (client‑side removal) / optional server blacklist
  - `GET /me` → current user profile

- **Products**
  - `GET /products?search=&category=&sort=&page=&limit=`
  - `GET /products/:id`

- **Cart** (requires JWT)
  - `GET /cart` → get current cart
  - `POST /cart/items` → `{ productId, quantity }`
  - `PATCH /cart/items/:itemId` → `{ quantity }`
  - `DELETE /cart/items/:itemId`

- **Checkout / Orders** (requires JWT)
  - `POST /checkout` → create order from cart (idempotent key recommended)
  - `GET /orders/:orderId`

- **CMS Pages**
  - `GET /pages/:slug` → fetch static page content from Strapi

### Sample Response Shape

```
{
  "success": true,
  "data": { /* resource */ },
  "error": null,
  "meta": { "requestId": "..." }
}
```

## 🔐 Authentication & Authorization

- OAuth2 provider login, backend exchanges code for profile → creates/links user
- Backend signs a short‑lived JWT access token; clients send `Authorization: Bearer <token>`
- Role‑based middleware protects admin routes (e.g., product management)

## ⚡ Caching Strategy

- Product lists/details cached in Redis with short TTL; cache keys include query params
- Cache invalidated on product create/update/delete
- CMS page by slug cached with TTL; invalidated via webhook from Strapi

## 🧪 Testing

```
npm test           # unit/integration
npm run test:watch
```

## 🧰 Common Scripts

```
npm run dev        # start dev server (nodemon/ts-node)
npm run build      # compile TypeScript (if used)
npm run start      # start production server
npm run lint       # lint
npm run migrate    # wrapper for sequelize db:migrate
```

## 🗄️ Database Migrations (Sequelize)

```
npx sequelize migration:generate --name create-products
npx sequelize db:migrate
npx sequelize db:migrate:undo
```

## 📦 Deployment Notes

- Run migrations on deploy before starting the app
- Provide env vars and secure secrets (JWT, DB, OAuth) via your platform’s secret store
- Ensure MySQL/Redis connectivity and CMS URL reachability

## 🤝 Contributing

1. Create a feature branch
2. Write tests and ensure all checks pass
3. Open a PR with a clear description

## 📝 License

MIT

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Ramnathbv/nextgen-ecommerce
cd backend
cd frontend
