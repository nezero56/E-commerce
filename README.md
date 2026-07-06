# Ecomus Storefront

A single-page e-commerce application built against the Ecomus REST API.

## Tech Stack

- **React 19** + **Vite** — UI and build tooling
- **React Router 7** — client-side routing with protected routes
- **TanStack Query 5** — server state, caching, and mutation handling
- **Axios** — centralized HTTP client with auth interceptor
- **Tailwind CSS 4** — utility-first responsive styling

## State Management Decision

**TanStack Query** handles all server state (products, cart, orders). It provides caching, background refetching, and mutation invalidation out of the box — no manual loading/error flags needed per component. Local UI state (search input, selected variant, pagination) lives in component `useState`. No global client-side store is needed because the API is the source of truth for cart and orders.

## Setup

### Prerequisites
- Node.js v18+

### Install & Run

```bash
git clone <repo-url>
cd ecomus-client
npm install
npm run dev
```

Open `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## Environment Variables

Create a `.env` file in the project root:

```
VITE_API_BASE_URL=https://e-commas-apis-production-e0f8.up.railway.app
```

The `.env` file is already included with the correct base URL. Do not hardcode this value in source files.

## Features

### Authentication
- Register (`POST /api/auth/users/register`) and login (`POST /api/auth/users/login`)
- JWT token stored in `localStorage`, attached to every request via Axios interceptor
- Logout clears token and user from storage
- Cart, Orders, and Order Detail routes are protected — unauthenticated users are redirected to `/login`

### Product Listing
- Products fetched from `GET /api/public/products` with server-side pagination (12 per page)
- Category filter uses `GET /api/public/products/category/:categoryId` (also paginated)
- Search by keyword via `?search=` query param
- Debounced search input (400ms) to avoid excessive API calls
- Loading, error, and empty states handled on every view

### Product Detail
- Full product info: images, name, brand, category, description, stock, rating, reviews
- Variant selector (color/size) — selecting a variant updates the displayed price
- "Add to Cart" for products with variants; "Buy Now" (direct order) for products without variants (API limitation: cart items require a `variantId`)
- Invalid product IDs show an error state

### Categories
- Fetched from `GET /api/categories` and displayed as filter pills
- Selecting a category filters the product grid and resets pagination

### Shopping Cart
- Cart persisted server-side via `GET/POST/PATCH/DELETE /api/auth/cart` endpoints
- Add, update quantity, remove individual items, clear all
- Per-item subtotal and overall total displayed
- Cart item count badge in the navbar

### Checkout / Orders
- "Place Order" converts the current cart to an order via `POST /api/auth/orders`
- "Buy Now" places a direct order via `POST /api/auth/orders/buy` (used for variant-less products)
- Order confirmation page shown after successful checkout
- Order history at `GET /api/auth/orders`
- Order detail at `GET /api/auth/orders/:id`

## Project Structure

```
src/
├── api/
│   ├── client.js        # Axios instance with auth interceptor
│   ├── auth.js          # /api/auth/users/*
│   ├── products.js      # /api/public/products/*  +  /api/categories
│   ├── cart.js          # /api/auth/cart/*
│   └── orders.js        # /api/auth/orders/*
├── components/
│   ├── Navbar.jsx       # Sticky nav with cart badge
│   ├── ProductCard.jsx  # Product grid card
│   └── Feedback.jsx     # Spinner, ErrorMessage, EmptyState
├── context/
│   ├── AuthContext.jsx  # Login/logout, token persistence
│   └── ToastContext.jsx # Global toast notifications
├── hooks/
│   └── useCart.js       # All cart + buy-now mutations
├── pages/
│   ├── ProductsPage.jsx
│   ├── ProductDetailPage.jsx
│   ├── CartPage.jsx
│   ├── LoginPage.jsx
│   ├── RegisterPage.jsx
│   ├── OrdersPage.jsx
│   └── OrderDetailPage.jsx
└── utils/
    └── image.js         # Unsplash fallback images by product keyword
```

## Key Decisions & Assumptions

- **Cart requires authentication** — the API's cart endpoints are all under `/api/auth/*`, so a guest cart is not possible. Unauthenticated users see a prompt to log in.
- **Variant-less products use Buy Now** — the cart `POST /api/auth/cart/items` endpoint requires a `variantId`. Products without variants bypass the cart and go directly to `POST /api/auth/orders/buy`.
- **Fallback images** — the API returns empty `images` arrays for most products. A deterministic Unsplash image is selected based on the product name so the UI is never broken.
- **No `name` field on register** — the `RegisterRequest` schema only requires `email` and `password`. The name field was removed from the registration form.

## Known Limitations

- No payment processing — orders are placed in `PENDING` status.
- Search is only supported on the all-products endpoint, not on category-filtered results (API limitation).
- Product images come from Unsplash fallbacks since the API returns empty image arrays for seeded products.

## Live Demo

[Deploy link — https://vercel.com/munezerosonia85-4533s-projects/e-commerce/6iR61987vi9ghNFGZSKesrtBpSvt]

## Repository

[GitHub link:https://github.com/nezero56/E-commerce]
