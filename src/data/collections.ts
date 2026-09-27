import { Collection } from '@/domain/collection/types';

export const mockCollections: Collection[] = [
  {
    id: 'col-traditional-heritage',
    slug: 'traditional-heritage',
    name: {
      bn: 'ঐতিহ্যবাহী মেদিনীপুর কালেকশন',
      en: 'Traditional Heritage Collection',
    },
    description: {
      bn: 'মেদিনীপুরের খাঁটি তাঁত শিল্পীদের হস্তশিল্প শাড়ি ও ধুতি।',
      en: 'Authentic handloom sarees and dhotis crafted by Bengali artisans.',
    },
    image: '/assets/banners/banner.png',
    featured: true,
    active: true,
    sortOrder: 1,
    seo: {
      title: {
        bn: 'ঐতিহ্যবাহী মেদিনীপুর কালেকশন — শ্যামাশ্রী বস্ত্রালয়',
        en: 'Traditional Heritage Collection — Shyamasree Bostraloy',
      },
      description: {
        bn: 'ঐতিহ্যবাহী তাঁত ও সিল্ক শিল্পের অনন্য সম্ভার।',
        en: 'Exclusive showcase of traditional handloom and silk textiles.',
      },
    },
  },
  {
    id: 'col-festive-special',
    slug: 'festive-special',
    name: {
      bn: 'উৎসবের বিশেষ সম্ভার',
      en: 'Festive Special Showcase',
    },
    description: {
      bn: 'পুজো, বিয়ে ও বিশেষ অনুষ্ঠানের জন্য জমকালো শাড়ি ও লেহেঙ্গা।',
      en: 'Gorgeous sarees and festive wear curated for weddings & Durga Puja.',
    },
    image: '/assets/hero/hero-01.png',
    featured: true,
    active: true,
    sortOrder: 2,
    seo: {
      title: {
        bn: 'উৎসবের বিশেষ সম্ভার — শ্যামাশ্রী বস্ত্রালয়',
        en: 'Festive Special Showcase — Shyamasree Bostraloy',
      },
      description: {
        bn: 'উৎসবের সব সেরা পোশাকের সংগ্রহ।',
        en: 'Curated premium attire for festive celebrations.',
      },
    },
  },
  {
    id: 'col-modern-boutique',
    slug: 'modern-boutique',
    name: {
      bn: 'আধুনিক বুটিক কালেকশন',
      en: 'Modern Boutique Collection',
    },
    description: {
      bn: 'আধুনিক নারী ও তরুণদের জন্য স্টাইলিশ থ্রি-পিস ও ডিজাইনার কুর্তি।',
      en: 'Contemporary three-piece suits and stylish designer tunics.',
    },
    image: '/assets/decorative/b.png',
    featured: true,
    active: true,
    sortOrder: 3,
    seo: {
      title: {
        bn: 'আধুনিক বুটিক কালেকশন — শ্যামাশ্রী বস্ত্রালয়',
        en: 'Modern Boutique Collection — Shyamasree Bostraloy',
      },
      description: {
        bn: 'ট্রেন্ডি বুটিক শাড়ি ও ফ্যাশন কালেকশন।',
        en: 'Trendy boutique sarees and fashion collections.',
      },
    },
  },
];
