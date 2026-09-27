import { categoryRepository } from '@/repositories';
import { getTranslations } from 'next-intl/server';
import { Section } from '@/components/ui/Section';
import { CategoryCard } from '@/components/catalog/CategoryCard';

export async function FeaturedCategories() {
  const categories = await categoryRepository.getFeatured();
  const t = await getTranslations('home');

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <Section
      size="md"
      eyebrow={t('featuredCategoriesEyebrow')}
      title={t('featuredCategoriesTitle')}
      className="bg-background border-b border-border"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {categories.slice(0, 4).map((cat, idx) => (
          <CategoryCard key={cat.id} category={cat} priority={idx === 0} />
        ))}
      </div>
    </Section>
  );
}
