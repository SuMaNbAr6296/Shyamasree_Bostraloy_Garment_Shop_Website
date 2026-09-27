import { productRepository } from '@/repositories';
import { Link } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/Section';
import { ProductCard } from '@/components/catalog/ProductCard';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';

export async function FeaturedProducts() {
  const products = await productRepository.getFeatured(4);
  const t = await getTranslations('home');

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <Section
      size="md"
      eyebrow={t('featuredProductsEyebrow')}
      title={t('featuredProductsTitle')}
      className="bg-card border-b border-border"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {products.map((product, idx) => (
          <ProductCard key={product.id} product={product} priority={idx === 0} />
        ))}
      </div>

      <div className="pt-10 text-center">
        <Link href="/shop">
          <Button variant="outline" size="md" className="gap-2">
            <span>{t('viewAllProducts')}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </Section>
  );
}
