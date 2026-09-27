# Future Backend API Contract Mapping

This document describes how the `ProductRepository`, `CategoryRepository`, and `CollectionRepository` domain interfaces will map to future backend API endpoints or PostgreSQL database schemas without requiring any changes to UI components.

## Domain Contract to API Endpoint Mapping

| Repository Method | Future API Route | Expected Query Parameters | Response Schema |
| :--- | :--- | :--- | :--- |
| `productRepository.getAll(filters)` | `GET /api/products` | `?categoryId=&collectionId=&search=&featured=&sort=&page=&pageSize=` | `PaginatedResult<Product>` |
| `productRepository.getBySlug(slug)` | `GET /api/products/:slug` | — | `Product \| null` |
| `productRepository.getById(id)` | `GET /api/products/id/:id` | — | `Product \| null` |
| `productRepository.getFeatured(limit)` | `GET /api/products/featured` | `?limit=6` | `Product[]` |
| `categoryRepository.getAll()` | `GET /api/categories` | — | `Category[]` |
| `categoryRepository.getBySlug(slug)` | `GET /api/categories/:slug` | — | `Category \| null` |
| `collectionRepository.getAll()` | `GET /api/collections` | — | `Collection[]` |

## Database Integration Strategy

When connecting a database (e.g. PostgreSQL + Prisma):
1. Create `ApiProductRepository` implementing `ProductRepository` in `src/repositories/api/api-product.repository.ts`.
2. Swap export in `src/repositories/index.ts`:
   ```ts
   export const productRepository: ProductRepository = new ApiProductRepository();
   ```
3. All React Server Components using `productRepository.getAll()` will automatically fetch from the database without a single UI code modification.
