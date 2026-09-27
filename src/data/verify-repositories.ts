import { productRepository, categoryRepository, collectionRepository } from '@/repositories';

export async function runRepositoryVerification() {
  const allProducts = await productRepository.getAll();
  const featuredProducts = await productRepository.getFeatured(3);
  const katanSaree = await productRepository.getBySlug('traditional-katan-silk-saree');
  const sareesCategory = await productRepository.getByCategory('cat-sarees');
  const bnSearch = await productRepository.getAll({ search: 'কাতান' });
  const enSearch = await productRepository.getAll({ search: 'silk' });
  const sortedByPrice = await productRepository.getAll({ sort: 'price_asc' });

  const categories = await categoryRepository.getAll();
  const collections = await collectionRepository.getAll();

  return {
    totalProducts: allProducts.total,
    featuredCount: featuredProducts.length,
    katanSareeFound: !!katanSaree,
    sareesCategoryCount: sareesCategory.total,
    bnSearchHits: bnSearch.total,
    enSearchHits: enSearch.total,
    lowestPrice: sortedByPrice.items[0]?.price,
    totalCategories: categories.length,
    totalCollections: collections.length,
  };
}
