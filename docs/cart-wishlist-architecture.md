# Cart & Wishlist Client Architecture — Shyamasree Bostraloy

This document defines the client state architecture, Zustand store implementations, persistence mechanisms, hydration safety, repository data boundaries, and future backend integration strategy for **Shyamasree Bostraloy (শ্যামাশ্রী বস্ত্রালয়)**.

---

## 1. Core Architectural Principle

The client cart and wishlist state stores are light-weight business intent stores that **do NOT replace the repository domain architecture**.

```
Client Cart / Wishlist Store (Zustand)
  └─ Persisted minimal state: productId + quantity / productIds
            ↓
ProductRepository Domain Abstraction
  └─ Resolves full Product entities (Mock / API / DB)
            ↓
UI Layer (CartDrawer / CartPage / WishlistPage)
```

### Key Design Decisions
- **Minimal Persisted State**: Persistent storage (`localStorage`) ONLY retains item identifiers (`productId`) and integer quantities (`quantity`). It NEVER duplicates full `Product` objects into local storage.
- **Single Source of Truth**: The `ProductRepository` interface remains the absolute source of truth for all catalog information, prices, titles, images, and availability.
- **Repository Isolation**: UI components resolve product information via `ProductRepository.getById()`. No UI code directly accesses raw data files (`@/data/*`).

---

## 2. Zustand Store Implementations

### A. Cart Store (`src/store/cart-store.ts`)
- **Key**: `shyamasree-cart`
- **Shape**:
  ```ts
  type CartItem = {
    productId: string;
    quantity: number;
  };
  ```
- **Actions**:
  - `addItem(productId, quantity?)`: Adds new item or increments existing item quantity.
  - `removeItem(productId)`: Removes item from state.
  - `updateQuantity(productId, quantity)`: Updates item quantity. Removes item if `quantity <= 0`.
  - `incrementQuantity(productId)` & `decrementQuantity(productId)`
  - `clearCart()`: Empties cart.
  - `getItemQuantity(productId)` & `getTotalItems()`

### B. Wishlist Store (`src/store/wishlist-store.ts`)
- **Key**: `shyamasree-wishlist`
- **Shape**:
  ```ts
  type WishlistState = {
    productIds: string[];
  };
  ```
- **Actions**:
  - `addToWishlist(productId)`
  - `removeFromWishlist(productId)`
  - `toggleWishlist(productId)`
  - `isInWishlist(productId)`
  - `clearWishlist()`

### C. UI Ephemeral Store (`src/store/cart-drawer-store.ts`)
- Unpersisted store for drawer open/close visibility state (`isOpen`, `openDrawer()`, `closeDrawer()`, `toggleDrawer()`).

---

## 3. Hydration Safety Strategy

Next.js App Router performs initial HTML prerendering on the server where `localStorage` does not exist. Direct rendering of client-persisted data causes React Hydration Mismatch errors.

### Implementation:
1. Stores implement `onRehydrateStorage` callback to flag when Zustand has completed rehydration (`_hasHydrated`).
2. Custom hook `useStoreHydration(storeHasHydrated)` verifies the component is mounted on the client browser.
3. Header badges, Cart Drawer list, and Cart/Wishlist pages check `isHydrated` before rendering client counts to guarantee 100% hydration safety without layout shifts.

---

## 4. Repository & Data Resolution Boundary

To render product information in the cart and wishlist UI:
1. `useResolvedCart()` and `useResolvedWishlist()` accept persisted IDs.
2. They query `productRepository.getById(id)` asynchronously.
3. Pure calculation helper `calculateCartTotals(items)` computes line totals (`product.price * quantity`) and subtotal.
4. If a stored product ID no longer exists in the catalog, it is safely filtered out without throwing runtime errors.

---

## 5. Security & Price Integrity

> [!CAUTION]
> **Client-Side Prices Are Un-Trusted for Payment**: All prices displayed in the cart drawer and cart page are presentation-only. During future checkout and payment processing, the backend server MUST re-query actual product prices directly from the database/repository. Never accept client-submitted subtotal amounts for transaction processing.

---

## 6. Future Backend API Contracts (Conceptual)

When backend services and user authentication are added, the current client state architecture will connect directly to server endpoints without requiring UI redesigns:

### Cart Endpoints
- `GET /api/v1/cart` — Retrieves active server cart for authenticated session.
- `POST /api/v1/cart/items` — Adds product to server cart `{ productId, quantity }`.
- `PATCH /api/v1/cart/items/:productId` — Updates item quantity on server `{ quantity }`.
- `DELETE /api/v1/cart/items/:productId` — Removes product from server cart.
- `DELETE /api/v1/cart` — Clears server cart.

### Wishlist Endpoints
- `GET /api/v1/wishlist` — Retrieves saved wishlist product IDs.
- `POST /api/v1/wishlist/items` — Adds product to wishlist `{ productId }`.
- `DELETE /api/v1/wishlist/items/:productId` — Removes product from wishlist.

---

## 7. SEO & Indexing Compliance
- Cart (`/[locale]/cart`) and Wishlist (`/[locale]/wishlist`) routes include `robots: { index: false, follow: true }` metadata to prevent search engines from indexing user-specific utility pages.
