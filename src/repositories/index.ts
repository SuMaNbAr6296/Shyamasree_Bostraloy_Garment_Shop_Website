import { ProductRepository } from '@/domain/product/repository';
import { CategoryRepository } from '@/domain/category/repository';
import { CollectionRepository } from '@/domain/collection/repository';
import { MockProductRepository } from './mock/mock-product.repository';
import { MockCategoryRepository } from './mock/mock-category.repository';
import { MockCollectionRepository } from './mock/mock-collection.repository';

// Repositories exported as singleton domain interfaces for UI & Server Components.
// To switch to a database or API backend in the future, swap the instances below.
export const productRepository: ProductRepository = new MockProductRepository();
export const categoryRepository: CategoryRepository = new MockCategoryRepository();
export const collectionRepository: CollectionRepository = new MockCollectionRepository();
