/**
 * Category Asset & Presentation Mappings
 * Presentation-only helper for default fallbacks and editorial asset layouts.
 * Domain models and data resolution remain strictly inside CategoryRepository.
 */

export type CategoryAssetConfig = {
  defaultImage: string;
  badgeBn?: string;
  badgeEn?: string;
};

export const categoryAssetConfig: Record<string, CategoryAssetConfig> = {
  sarees: {
    defaultImage: '/assets/decorative/a.png',
    badgeBn: 'বিশেষ সংগ্রহ',
    badgeEn: 'Popular Choice',
  },
  'three-piece-salwar': {
    defaultImage: '/assets/decorative/b.png',
    badgeBn: 'নতুন স্টাইল',
    badgeEn: 'New Trends',
  },
  'kurtis-tunics': {
    defaultImage: '/assets/hero/hero-02.png',
    badgeBn: 'আরামদায়ক ফেব্রিক',
    badgeEn: 'Comfort Fit',
  },
  'mens-wear': {
    defaultImage: '/assets/hero/hero-03.png',
    badgeBn: 'ঐতিহ্যবাহী পোশাক',
    badgeEn: 'Ethnic Heritage',
  },
  'textiles-fabrics': {
    defaultImage: '/assets/banners/banner.png',
    badgeBn: 'প্রিমিয়াম থান',
    badgeEn: 'Unstitched Quality',
  },
};

export function getCategoryAsset(slug: string, fallbackImage?: string): string {
  if (fallbackImage) return fallbackImage;
  return categoryAssetConfig[slug]?.defaultImage || '/assets/banners/banner.png';
}
