import { Product } from '@/domain/product/types';
import { ProductCard } from '@/components/catalog/ProductCard';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, idx) => (
        <ProductCard key={product.id} product={product} priority={idx < 2} />
      ))}
    </div>
  );
}
