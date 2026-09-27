# Phase 11 — Checkout & Order Flow Architecture

This document describes the architectural foundation for the bilingual Checkout and Order Flow of **Shyamasree Bostraloy (শ্যামাশ্রী বস্ত্রালয়)**.

---

## 1. Core Architectural Overview

```
                      [ Client UI ]
                     Cart State (Zustand)
                              │
                              ▼
                       /locale/checkout
                 (React Hook Form + Zod)
                              │
                              │ onSubmit ({ formValues, cartItems })
                              ▼
                    [ MockOrderService ]
                              │
           ┌──────────────────┴──────────────────┐
           ▼                                     ▼
Re-validate Unit Prices & Stock          Calculate Shipping Fee
  ProductRepository.getById()           (₹3000+ -> Free, else ₹80)
           │                                     │
           └──────────────────┬──────────────────┘
                              ▼
                     Construct Order Object
                   Generate Reference Number
                     (SBS-2026-000001)
                              │
                              ▼
                     In-Memory Storage
                              │
                              ▼
                  Clear Persistent Cart State
                 (useCartStore.clearCart())
                              │
                              ▼
              /locale/order-confirmation/[orderId]
```

---

## 2. Key Architecture Principles

### 2.1 Authoritative Price Integrity & Security
Client-submitted unit prices and line totals in cart payloads are treated as **untrusted**.
When `MockOrderService.createOrder` is called:
1. It loops over each `cartItem.productId`.
2. It fetches the latest authoritative product record from `productRepository.getById(item.productId)`.
3. It checks product availability (`in_stock`).
4. It recalculates unit prices and totals server-side/service-side before building the final order summary.

### 2.2 Cart State Synchronization
The persistent Zustand cart store (`useCartStore`) is **NOT** cleared when the user navigates to `/checkout`.
It is only cleared **AFTER** `orderService.createOrder` returns a successfully created `Order` object.
If the order creation fails or encounters a validation error, the cart items remain intact.

### 2.3 Empty Cart Protection
Navigating directly to `/[locale]/checkout` with an empty cart displays an empty state banner prohibiting checkout and prompting the customer to return to the catalog (`/[locale]/shop`).

### 2.4 Form Validation & Bilingual Errors
Form validation is executed using **React Hook Form** paired with **Zod** (`checkoutFormSchema`).
Error messages are stored as bilingual strings (`bn:কথা | en:Text`) and extracted dynamically via `getErrorMessage` based on the active locale (`/bn` or `/en`).

---

## 3. Order Reference Format

Order references follow a clean, deterministic format:
`SBS-YYYY-000001` (e.g. `SBS-2026-000001`, `SBS-2026-000002`).

---

## 4. Payment Methods & Disclaimers

1. **Cash on Delivery (COD)**:
   - Full support. Order status is set to `confirmed` with payment status `pending`.
2. **Online Payment (UPI / Credit Card / Net Banking)**:
   - Disabled with a localized notice:
     - `bn`: *"অনলাইন পেমেন্ট সুবিধা শীঘ্রই উপলব্ধ হবে। অনুগ্রহ করে ক্যাশ অন ডেলিভারি নির্বাচন করুন।"*
     - `en`: *"Online payment option will be available soon. Please select Cash on Delivery."*

---

## 5. SEO & Privacy Boundaries

The checkout and order confirmation routes use private metadata configuration to prevent indexing by web crawlers:

```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    robots: {
      index: false,
      follow: false,
    },
  };
}
```

---

## 6. Directory Structure

```
src/
├── domain/order/
│   ├── types.ts                # Domain types & Zod schema
│   └── service.ts              # OrderService interface
├── services/
│   ├── mock-order.service.ts   # In-memory mock implementation with price re-validation
│   └── index.ts                # Exported singleton instance
├── lib/order/
│   └── shipping.ts             # Deterministic shipping fee rules
├── components/checkout/
│   ├── CheckoutForm.tsx        # Customer info & address form
│   ├── CheckoutOrderSummary.tsx# Line item breakdown & total calculations
│   └── CheckoutPageClient.tsx  # Page orchestrator & empty cart fallback
├── components/order/
│   └── OrderConfirmation.tsx   # Order receipt, summary, print & support contact
└── app/[locale]/
    ├── checkout/               # Checkout route (/bn/checkout, /en/checkout)
    └── order-confirmation/[orderId]/ # Order confirmation receipt route
```
