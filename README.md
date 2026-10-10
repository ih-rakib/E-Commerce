# ShopGalore — E-Commerce Application

A modern, responsive e-commerce app built with the **MERN stack** (MongoDB, Express, React, Node.js).
Customers can browse products by category, search, view details with ratings & reviews, and manage
a persistent cart. Authentication uses **JWT in httpOnly cookies** with role-based access (`user` / `admin`).

## Monorepo layout

```
E-Commerce/
├── backend/               # Express + Mongoose REST API
│   ├── index.js           # App bootstrap (CORS, routes, error handling)
│   └── src/
│       ├── users/         # User model + auth/user routes
│       ├── products/      # Product model + routes
│       ├── reviews/       # Review model + routes
│       └── middleware/    # generateToken, verifyToken, verifyAdmin
└── client/                # React + Vite + Tailwind + Redux Toolkit
    └── src/
        ├── components/    # Navbar, Footer, Login, Register, Ratings
        ├── pages/         # home, shop, search, categories, blogs, error
        ├── redux/         # store, auth/cart/products/reviews slices & APIs
        ├── routers/       # react-router setup
        └── utils/         # baseURL, formatDate
```

## Features

- **Shop** — paginated product grid, category + price filters (single- or double-sided), sort by newest
- **Product details** — image, price, rating, quantity selector, related products, reviews
- **Reviews** — authenticated 1–5 star ratings with comments (one review per user per product, editable)
- **Cart** — add/increment/decrement/remove/clear, tax + grand total, **persisted in localStorage**
- **Auth** — register, login, logout; session in httpOnly cookie; profile updates (owner or admin only)
- **Admin-only** — create/update/delete products, list/delete users, change user roles
- **Search** — instant client-side search across name, description and category
- **Responsive UI** — mobile-first layouts (320px → desktop), hamburger nav, adaptive grids,
  skeleton loading states, staggered card entrances, hover lift, dark professional footer
  with socials, contact rows and newsletter signup
- **Error handling** — custom 404 page, API 404 + central error middleware, form-level validation messages

## Tech stack

| Layer      | Tech                                                              |
| ---------- | ----------------------------------------------------------------- |
| Frontend   | React 18, React Router 6, Tailwind CSS, Redux Toolkit + RTK Query |
| Backend    | Node.js, Express 4, Mongoose 8, bcrypt, jsonwebtoken              |
| Auth       | JWT (1h expiry) in httpOnly cookies, `Authorization: Bearer` fallback |
| Database   | MongoDB (Atlas or local)                                          |
| Icons      | Remix Icon                                                        |
| Build      | Vite 5 (client), Nodemon (backend dev)                            |

## Getting started

### Prerequisites

- Node.js 18+ and npm
- A MongoDB connection string (Atlas or local `mongod`)

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # then fill in real values
npm run start:dev      # or: npm start
```

`backend/.env` (see `.env.example` — **never commit real secrets**):

```env
PORT=3000
MONGO_URL=mongodb+srv://<user>:<password>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET_KEY=<long-random-secret>
CORS_ORIGINS=http://localhost:5173
NODE_ENV=development
```

> The server only starts listening **after** MongoDB connects, and exits if the connection fails.

### 2. Frontend

```bash
cd client
npm install
npm run dev        # http://localhost:5173
npm run build      # production bundle → dist/
npm run preview    # preview the production build
```

Optional `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

(Defaults to `http://localhost:3000` when unset.)

## API reference

Base URL: `http://localhost:3000`. All routes return JSON.

### Auth — `/api/auth`

| Method | Endpoint              | Auth          | Description                                    |
| ------ | --------------------- | ------------- | ---------------------------------------------- |
| POST   | `/auth/register`      | —             | Register (`username`, `email`, `password` ≥ 6). `409` if email taken |
| POST   | `/auth/login`         | —             | Login, sets httpOnly `token` cookie, returns `{ token, user }` |
| POST   | `/auth/logout`        | —             | Clears the auth cookie                         |
| GET    | `/auth/users`         | Admin         | List users (`_id`, `username`, `email`, `role`), max 200 |
| DELETE | `/auth/users/:id`     | Admin         | Delete a user                                  |
| PUT    | `/auth/users/:id`     | Admin         | Set role (`user` \| `admin`, whitelisted)      |
| PATCH  | `/auth/update-profile`| Owner/Admin   | Update `username`, `profileImg`, `bio`, `profession` |

### Products — `/api/products`

| Method | Endpoint                      | Auth  | Description                                                        |
| ------ | ----------------------------- | ----- | ------------------------------------------------------------------ |
| POST   | `/products/create-product`    | Admin | Create product (whitelisted fields; `author` set server-side)      |
| GET    | `/products`                   | —     | Filter by `category`, `minPrice`/`maxPrice` (either or both); `page`/`limit` (limit ≤ 100) |
| GET    | `/products/related/:id`       | —     | Up to 10 related products (name match or same category)            |
| GET    | `/products/:id`               | —     | Single product + populated `reviews`                               |
| PATCH  | `/products/update-product/:id`| Admin | Update whitelisted fields only                                     |
| DELETE | `/products/:id`               | Admin | Delete product + its reviews                                       |

### Reviews — `/api/reviews`

| Method | Endpoint                 | Auth       | Description                                              |
| ------ | ------------------------ | ---------- | -------------------------------------------------------- |
| POST   | `/reviews/post-review`   | User       | Create/update own review (`comment`, `rating` 1–5); recalcs product average |
| GET    | `/reviews/total-reviews` | —          | `{ totalReviews }`                                       |
| GET    | `/reviews/:userId`       | —          | Reviews by user (returns `[]` when none)                 |

### Security notes

- Passwords hashed with bcrypt; hashes never leave the server (`select('-password')`)
- Login issues tokens **only after** credential verification; generic `401` messages (no user enumeration)
- Privileged routes require `verifyToken` + `verifyAdmin`; profile/review writes are owner-or-admin
- Validation: email format + lowercase, role enum, price ≥ 0, rating 1–5, ObjectId checks, NoSQL-filter hardening, regex escaping on related-product search

## Roadmap

- [ ] Stripe checkout + order history
- [ ] Cloudinary image uploads (replacing URL/base64 strings)
- [ ] Real admin/user dashboards (placeholder routes exist under `/dashboard/*`)
- [ ] Wishlist, order tracking, live search against the API
- [ ] Rate limiting, Helmet headers, refresh-token rotation
