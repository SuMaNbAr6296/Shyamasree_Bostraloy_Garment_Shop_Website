import { Category } from '@/domain/category/types';

export const mockCategories: Category[] = [
  {
    id: 'cat-sarees',
    slug: 'sarees',
    name: {
      bn: 'ঐতিহ্যবাহী শাড়ি',
      en: 'Heritage Sarees',
    },
    description: {
      bn: 'তাঁত, বালুচরী, কাঞ্জিভরম, জামদানী ও কটন শাড়ির অভিজাত সংগ্রহ।',
      en: 'Exquisite collection of handloom, Baluchari, Kanjivaram, Jamdani, and fine cotton sarees.',
    },
    image: '/assets/decorative/a.png',
    sortOrder: 1,
    featured: true,
    active: true,
    seo: {
      title: {
        bn: 'ঐতিহ্যবাহী শাড়ি — শ্যামাশ্রী বস্ত্রালয়',
        en: 'Heritage Sarees — Shyamasree Bostraloy',
      },
      description: {
        bn: 'ডিঙ্গাল হাটতলার শ্যামাশ্রী বস্ত্রালয় থেকে কিনুন সেরা মানের তাঁত ও সিল্ক শাড়ি।',
        en: 'Explore premium handloom and silk sarees at Shyamasree Bostraloy, Dingal Hattala.',
      },
    },
  },
  {
    id: 'cat-three-piece',
    slug: 'three-piece-salwar',
    name: {
      bn: 'থ্রি-পিস ও সালোয়ার স্যুট',
      en: 'Three-Piece & Salwar Suits',
    },
    description: {
      bn: 'আধুনিক ও নান্দনিক ডিজাইনার থ্রি-পিস ও ড্রেস মেটেরিয়াল।',
      en: 'Contemporary & designer three-piece salwar suits and dress materials.',
    },
    image: '/assets/decorative/b.png',
    sortOrder: 2,
    featured: true,
    active: true,
    seo: {
      title: {
        bn: 'থ্রি-পিস স্যুট — শ্যামাশ্রী বস্ত্রালয়',
        en: 'Three-Piece Suits — Shyamasree Bostraloy',
      },
      description: {
        bn: 'আকর্ষণীয় ডিজাইনার সালোয়ার কামিজ ও থ্রি-পিস কালেকশন।',
        en: 'Attractive designer salwar kameez and three-piece collections.',
      },
    },
  },
  {
    id: 'cat-kurtis',
    slug: 'kurtis-tunics',
    name: {
      bn: 'ডিজাইনার কুর্তি',
      en: 'Designer Kurtis & Tunics',
    },
    description: {
      bn: 'দৈনন্দিন ব্যবহার ও উৎসবের উপযোগী আরামদায়ক কুর্তি।',
      en: 'Comfortable and stylish kurtis suited for daily wear and festive occasions.',
    },
    image: '/assets/hero/hero-02.png',
    sortOrder: 3,
    featured: true,
    active: true,
    seo: {
      title: {
        bn: 'ডিজাইনার কুর্তি — শ্যামাশ্রী বস্ত্রালয়',
        en: 'Designer Kurtis — Shyamasree Bostraloy',
      },
      description: {
        bn: 'সেরা মানের আরামদায়ক ও ফ্যাশনেবল কুর্তির কালেকশন।',
        en: 'Shop comfortable and fashionable kurti collections.',
      },
    },
  },
  {
    id: 'cat-mens-wear',
    slug: 'mens-wear',
    name: {
      bn: 'পুরুষদের পোশাক',
      en: "Men's Ethnic Wear",
    },
    description: {
      bn: 'ঐতিহ্যবাহী ধুতি, পাঞ্জাবি ও থান কাপড়ের বিশেষ সংগ্রহ।',
      en: 'Traditional dhoti, kurta, and unstitched premium fabrics for men.',
    },
    image: '/assets/hero/hero-03.png',
    sortOrder: 4,
    featured: true,
    active: true,
    seo: {
      title: {
        bn: 'পুরুষদের পোশাক — শ্যামাশ্রী বস্ত্রালয়',
        en: "Men's Wear — Shyamasree Bostraloy",
      },
      description: {
        bn: 'ঐতিহ্যবাহী ধুতি ও পাঞ্জাবি সংগ্রহ।',
        en: 'Traditional dhoti and kurta collections for men.',
      },
    },
  },
  {
    id: 'cat-fabrics',
    slug: 'textiles-fabrics',
    name: {
      bn: 'থান ও টেক্সটাইল ফেব্রিক',
      en: 'Textiles & Unstitched Fabrics',
    },
    description: {
      bn: 'উন্নতমানের সুতি, সিল্ক ও ফেব্রিক থান।',
      en: 'High quality cotton, silk, and unstitched dress fabrics.',
    },
    image: '/assets/banners/banner.png',
    sortOrder: 5,
    featured: false,
    active: true,
    seo: {
      title: {
        bn: 'টেক্সটাইল ফেব্রিক — শ্যামাশ্রী বস্ত্রালয়',
        en: 'Textiles & Fabrics — Shyamasree Bostraloy',
      },
      description: {
        bn: 'সেরা মানের থান কাপড় ও ফেব্রিক।',
        en: 'Premium unstitched fabrics and textiles.',
      },
    },
  },
];
