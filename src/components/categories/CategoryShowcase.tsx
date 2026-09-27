import { Category } from '@/domain/category/types';
import { CategoryCard } from '@/components/catalog/CategoryCard';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';

interface CategoryShowcaseProps {
  categories: Category[];
}

export function CategoryShowcase({ categories }: CategoryShowcaseProps) {
  if (!categories || categories.length === 0) {
    return null;
  }

  // Identify featured category (e.g. Sarees or first featured category)
  const featuredCategory = categories.find((c) => c.featured) || categories[0];
  const otherCategories = categories.filter((c) => c.id !== featuredCategory.id);

  return (
    <Section size="md" className="py-8 sm:py-12 lg:py-16 bg-background">
      <Container className="space-y-8">
        {/* Editorial Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Featured Category Card (8 Cols on Desktop) */}
          <div className="md:col-span-2 lg:col-span-8 flex flex-col">
            <CategoryCard
              category={featuredCategory}
              variant="featured"
              priority
              className="h-full"
            />
          </div>

          {/* Second Category Card (4 Cols on Desktop) */}
          {otherCategories[0] && (
            <div className="md:col-span-1 lg:col-span-4 flex flex-col">
              <CategoryCard
                category={otherCategories[0]}
                variant="standard"
                className="h-full"
              />
            </div>
          )}

          {/* Remaining Categories (4 Cols each on Desktop) */}
          {otherCategories.slice(1).map((category) => (
            <div
              key={category.id}
              className="md:col-span-1 lg:col-span-4 flex flex-col"
            >
              <CategoryCard
                category={category}
                variant="standard"
                className="h-full"
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
