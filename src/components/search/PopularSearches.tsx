'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { Tag } from 'lucide-react';
import { Category } from '@/domain/category/types';
import { categoryRepository } from '@/repositories';
import { useSearchStore } from '@/store/search-store';

export function PopularSearches() {
  const t = useTranslations('search');
  const locale = useLocale() as 'bn' | 'en';
  const closeSearch = useSearchStore((state) => state.closeSearch);

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    categoryRepository.getAll().then((res) => {
      setCategories(res.slice(0, 5));
    });
  }, []);

  if (categories.length === 0) return null;

  return (
    <div className="space-y-2.5 font-sans">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
        <Tag className="w-3.5 h-3.5 text-secondary-hover" />
        <span>{t('popularCategories')}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const name = category.name[locale] || category.name.bn;
          return (
            <Link
              key={category.id}
              href={`/shop?category=${category.slug}`}
              onClick={closeSearch}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-secondary/10 text-xs font-semibold text-secondary-hover hover:bg-secondary/20 border border-secondary/20 transition-colors"
            >
              <span>{name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
