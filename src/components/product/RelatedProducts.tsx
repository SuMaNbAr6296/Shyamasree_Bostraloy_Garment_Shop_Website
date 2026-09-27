import { productRepository } from '@/repositories';
import { getTranslations } from 'next-intl/server';
import { Product } from '@/domain/product/types';
import { ProductCard } from '@/components/catalog/ProductCard';

interface RelatedProductsProps {
  currentProduct: Product;
}

export async function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const t = await getTranslations('product');

  // Fetch category products or all products fallback
  const result = await productRepository.getByCategory(currentProduct.categoryId, {
    pageSize: 6,
  });

  const related = result.items
    .filter((p) => p.id !== currentProduct.id)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="space-y-6 pt-8 border-t border-border">
      <h2 className="font-serif font-bold text-2xl text-foreground">
        {t('relatedProducts')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {related.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
