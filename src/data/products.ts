import { Product } from '@/domain/product/types';

export const mockProducts: Product[] = [
  {
    id: 'prod-001',
    slug: 'traditional-katan-silk-saree',
    name: {
      bn: 'ঐতিহ্যবাহী লাল কাতান সিল্ক শাড়ি',
      en: 'Traditional Red Katan Silk Saree',
    },
    shortDescription: {
      bn: 'স্বর্ণালী জরি পাড় ও আঁচল সমৃদ্ধ নিখুঁত তাঁতের কাতান সিল্ক শাড়ি।',
      en: 'Exquisite Katan silk saree featuring intricate golden zari border and pallu.',
    },
    description: {
      bn: 'মেদিনীপুরের সেরা কারিগরদের হাত দিয়ে তৈরি এই লাল কাতান সিল্ক শাড়িটি বিশেষ উৎসব ও বিয়ের অনুষ্ঠানের জন্য অত্যন্ত উপযোগী। নরম টেক্সচার ও দীর্ঘস্থায়ী আভিজাত্য।',
      en: 'Crafted for weddings and grand celebrations, this royal red Katan silk saree features traditional Bengali motifs woven with fine metallic gold threads.',
    },
    categoryId: 'cat-sarees',
    collectionId: 'col-traditional-heritage',
    images: [
      {
        src: '/assets/hero/hero-01.png',
        alt: {
          bn: 'লাল কাতান সিল্ক শাড়ি',
          en: 'Red Katan Silk Saree',
        },
        width: 1672,
        height: 941,
      },
      {
        src: '/assets/decorative/a.png',
        alt: {
          bn: 'শাড়ির আঁচল দৃশ্য',
          en: 'Saree Pallu View',
        },
        width: 1672,
        height: 941,
      },
    ],
    price: 3499,
    compareAtPrice: 4200,
    currency: 'INR',
    availability: 'in_stock',
    featured: true,
    newArrival: true,
    bestSeller: true,
    tags: ['সিল্ক শাড়ি', 'কাতান', 'বিয়ে', 'Silk Saree', 'Katan', 'Wedding'],
    attributes: {
      material: { bn: 'খাঁটি কড়িয়াল সিল্ক', en: 'Pure Katan Silk' },
      color: { bn: 'গাঢ় লাল ও সোনালী জরি', en: 'Deep Red & Gold Zari' },
      occasion: { bn: 'বিবাহ ও বিশেষ উৎসব', en: 'Wedding & Grand Occasions' },
      care: { bn: 'ড্রাই ক্লিন বাধ্যতামূলক', en: 'Dry Clean Only' },
    },
    seo: {
      title: {
        bn: 'ঐতিহ্যবাহী লাল কাতান সিল্ক শাড়ি — শ্যামাশ্রী বস্ত্রালয়',
        en: 'Traditional Red Katan Silk Saree — Shyamasree Bostraloy',
      },
      description: {
        bn: 'ডিঙ্গাল হাটতলার শ্যামাশ্রী বস্ত্রালয় থেকে কিনুন প্রিমিয়াম লাল কাতান সিল্ক শাড়ি।',
        en: 'Buy premium traditional red Katan silk saree at Shyamasree Bostraloy, Paschim Medinipur.',
      },
    },
  },
  {
    id: 'prod-002',
    slug: 'baluchari-silk-heritage-saree',
    name: {
      bn: 'রয়্যাল নীল বালুচরী সিল্ক শাড়ি',
      en: 'Royal Blue Baluchari Silk Saree',
    },
    shortDescription: {
      bn: 'রামায়ণ ও পৌরাণিক গল্পের নকশা আঁকা ঐতিহ্যবাহী বালুচরী শাড়ি।',
      en: 'Heritage Baluchari silk saree with mythological motif weaving on the pallu.',
    },
    description: {
      bn: 'ঐতিহাসিক গল্পগাঁথার বুনন শৈলীতে তৈরি রাজকীয় নীল রঙের বালুচরী সিল্ক শাড়ি। মেদিনীপুরের ঐতিহ্যপ্রেমীদের জন্য অনন্য পছন্দ।',
      en: 'Replete with mythical storytelling woven into pure silk, this royal blue Baluchari saree represents Bengal textile heritage at its finest.',
    },
    categoryId: 'cat-sarees',
    collectionId: 'col-traditional-heritage',
    images: [
      {
        src: '/assets/decorative/a.png',
        alt: {
          bn: 'রয়্যাল নীল বালুচরী শাড়ি',
          en: 'Royal Blue Baluchari Saree',
        },
        width: 1672,
        height: 941,
      },
    ],
    price: 4899,
    compareAtPrice: 5500,
    currency: 'INR',
    availability: 'in_stock',
    featured: true,
    newArrival: false,
    bestSeller: true,
    tags: ['বালুচরী', 'সিল্ক', 'অভিজাত', 'Baluchari', 'Silk', 'Heritage'],
    attributes: {
      material: { bn: 'খাঁটি বালুচরী সিল্ক', en: 'Pure Baluchari Silk' },
      color: { bn: 'রাজকীয় নীল', en: 'Royal Blue' },
      occasion: { bn: 'উৎসব ও অভ্যর্থনা', en: 'Festive & Reception' },
      care: { bn: 'ড্রাই ক্লিন', en: 'Dry Clean Only' },
    },
    seo: {
      title: {
        bn: 'রয়্যাল নীল বালুচরী সিল্ক শাড়ি — শ্যামাশ্রী বস্ত্রালয়',
        en: 'Royal Blue Baluchari Silk Saree — Shyamasree Bostraloy',
      },
      description: {
        bn: 'খাঁটি বালুচরী শাড়ির বিশাল সংগ্রহ শ্যামাশ্রী বস্ত্রালয়ে।',
        en: 'Authentic Baluchari silk sarees available at Shyamasree Bostraloy.',
      },
    },
  },
  {
    id: 'prod-003',
    slug: 'pure-dhakai-jamdani-saree',
    name: {
      bn: 'সাদা ও লাল ঢাকাই জামদানী শাড়ি',
      en: 'Classic White & Red Dhakai Jamdani Saree',
    },
    shortDescription: {
      bn: 'হালকা ও আরামদায়ক তাঁতের সুতির ওপর ঐতিহ্যবাহী জ্যামিতিক বুনন।',
      en: 'Lightweight breathable handloom cotton Jamdani with intricate geometric motifs.',
    },
    description: {
      bn: 'পুজো ও সমস্ত শুভ অনুষ্ঠানের জন্য অত্যন্ত প্রিয় সাদা সুতির ওপর লাল জ্যামিতিক বুটি তোলা আসল ঢাকাই জামদানী।',
      en: 'A timeless staple for Bengali festivities, featuring fine red geometric floral motifs hand-woven onto sheer white cotton.',
    },
    categoryId: 'cat-sarees',
    collectionId: 'col-festive-special',
    images: [
      {
        src: '/assets/hero/hero-04.png',
        alt: {
          bn: 'ঢাকাই জামদানী শাড়ি',
          en: 'Dhakai Jamdani Saree',
        },
        width: 1672,
        height: 941,
      },
    ],
    price: 2299,
    compareAtPrice: 2800,
    currency: 'INR',
    availability: 'in_stock',
    featured: true,
    newArrival: true,
    bestSeller: false,
    tags: ['জামদানী', 'সুতি শাড়ি', 'পুজো', 'Jamdani', 'Cotton Saree', 'Puja'],
    attributes: {
      material: { bn: 'নরম ফাইন কটন', en: 'Fine Soft Cotton' },
      color: { bn: 'সাদা ও লাল', en: 'White & Red' },
      occasion: { bn: 'পুজো ও পারিবারিক অনুষ্ঠান', en: 'Puja & Family Gatherings' },
      care: { bn: 'জেন্টল হ্যান্ড ওয়াশ', en: 'Gentle Hand Wash' },
    },
    seo: {
      title: {
        bn: 'ঢাকাই জামদানী শাড়ি — শ্যামাশ্রী বস্ত্রালয়',
        en: 'Dhakai Jamdani Saree — Shyamasree Bostraloy',
      },
      description: {
        bn: 'আসল ঢাকাই জামদানী শাড়ি কিনুন শ্যামাশ্রী বস্ত্রালয় থেকে।',
        en: 'Buy authentic Dhakai Jamdani sarees at Shyamasree Bostraloy.',
      },
    },
  },
  {
    id: 'prod-004',
    slug: 'designer-chanderi-three-piece-suit',
    name: {
      bn: 'এমব্রয়ডারি চंदेরী থ্রি-পিস স্যুট',
      en: 'Embroidered Chanderi Three-Piece Suit',
    },
    shortDescription: {
      bn: 'নান্দনিক নেকলাইন এমব্রয়ডারি ও ওড়না সহ চন্দেরী সিল্ক সুট।',
      en: 'Elegant Chanderi silk three-piece unstitched suit with floral neck embroidery.',
    },
    description: {
      bn: 'আধুনিক নারী ও তরুণদের পছন্দনীয় এই চন্দেরী সিল্ক স্যুটটি চমৎকার এমব্রয়ডারি ওয়ার্ক ও ম্যাচিং ওড়না সহ আসে।',
      en: 'Chic and versatile unstitched Chanderi dress material set paired with an ornate woven dupatta for boutique elegance.',
    },
    categoryId: 'cat-three-piece',
    collectionId: 'col-modern-boutique',
    images: [
      {
        src: '/assets/decorative/b.png',
        alt: {
          bn: 'চন্দেরী থ্রি-পিস স্যুট',
          en: 'Chanderi Three Piece Suit',
        },
        width: 1672,
        height: 941,
      },
    ],
    price: 1899,
    compareAtPrice: 2400,
    currency: 'INR',
    availability: 'in_stock',
    featured: true,
    newArrival: true,
    bestSeller: false,
    tags: ['থ্রি-পিস', 'চন্দেরী', 'সুইট', 'Three-Piece', 'Chanderi', 'Dress Material'],
    attributes: {
      fabric: { bn: 'চন্দেরী সিল্ক ও কটন বটম', en: 'Chanderi Silk Top, Cotton Bottom' },
      color: { bn: 'মোরগকণ্ঠী সবুজ ও সোনা', en: 'Peacock Green & Gold' },
      occasion: { bn: 'উৎসব ও পার্টি wear', en: 'Festive & Party Wear' },
    },
    seo: {
      title: {
        bn: 'চন্দেরী থ্রি-পিস স্যুট — শ্যামাশ্রী বস্ত্রালয়',
        en: 'Chanderi Three-Piece Suit — Shyamasree Bostraloy',
      },
      description: {
        bn: 'চমৎকার এমব্রয়ডারি থ্রি-পিস সুট কালেকশন।',
        en: 'Exclusive embroidered Chanderi three-piece suits.',
      },
    },
  },
  {
    id: 'prod-005',
    slug: 'printed-rayon-straight-kurti',
    name: {
      bn: 'ফ্লোরাল প্রিন্টেড কটন-রায়ণ কুর্তি',
      en: 'Floral Printed Cotton-Rayon Kurti',
    },
    shortDescription: {
      bn: 'প্রতিদিনের ব্যবহারের জন্য আরামদায়ক এবং স্টাইলিশ স্ট্রেট কাট কুর্তি।',
      en: 'Breathable straight-cut daily wear tunic featuring vibrant floral prints.',
    },
    description: {
      bn: 'অফিস, কলেজ বা প্রতিদিনের কাজে পরার মতো নরম ও টেকসই কটন-রায়ণ ফেব্রিকের সোজা কাটের ফ্লোরাল কুর্তি।',
      en: 'Designed for effortless everyday comfort in West Bengal heat, crafted from premium soft rayon blend.',
    },
    categoryId: 'cat-kurtis',
    collectionId: 'col-modern-boutique',
    images: [
      {
        src: '/assets/hero/hero-02.png',
        alt: {
          bn: 'ফ্লোরাল প্রিন্টেড কুর্তি',
          en: 'Floral Printed Kurti',
        },
        width: 1672,
        height: 941,
      },
    ],
    price: 799,
    compareAtPrice: 999,
    currency: 'INR',
    availability: 'in_stock',
    featured: false,
    newArrival: true,
    bestSeller: true,
    tags: ['কুর্তি', 'ডেইলি ওয়্যার', 'Kurti', 'Daily Wear', 'Casual'],
    attributes: {
      fabric: { bn: 'সফট রায়ণ কটন blend', en: 'Soft Rayon Cotton Blend' },
      color: { bn: 'মেরুন ও ক্রিম', en: 'Maroon & Cream' },
      occasion: { bn: 'দৈনন্দিন ও অফিস wear', en: 'Casual & Office Wear' },
    },
    seo: {
      title: {
        bn: 'ফ্লোরাল প্রিন্টেড কুর্তি — শ্যামাশ্রী বস্ত্রালয়',
        en: 'Floral Printed Kurti — Shyamasree Bostraloy',
      },
      description: {
        bn: 'আরামদায়ক কুর্তি কালেকশন কিনুন শ্যামাশ্রী বস্ত্রালয়ে।',
        en: 'Shop comfortable daily wear kurtis at Shyamasree Bostraloy.',
      },
    },
  },
  {
    id: 'prod-006',
    slug: 'bengal-handloom-cotton-dhoti-kurta-set',
    name: {
      bn: 'ঐতিহ্যবাহী তাঁতের ধুতি ও পাঞ্জাবি সেট',
      en: 'Traditional Bengal Handloom Dhoti & Kurta Set',
    },
    shortDescription: {
      bn: 'শুভ কাজ ও পূজার উপযোগী লাল পাড় সুতির ধুতি ও কটন পাঞ্জাবি।',
      en: 'Traditional red-bordered white cotton dhoti paired with classic handloom kurta.',
    },
    description: {
      bn: 'বাঙালির বিয়ে, ব্রত ও উৎসবে পরিধানের জন্য খাঁটি সুতির তৈরি লাল পাড় ধুতি এবং ক্লাসিক পাঞ্জাবি।',
      en: 'Authentic ethnic attire for grooms and festive occasions, featuring Bengal handloom fine cotton weave with traditional red border.',
    },
    categoryId: 'cat-mens-wear',
    collectionId: 'col-traditional-heritage',
    images: [
      {
        src: '/assets/hero/hero-03.png',
        alt: {
          bn: 'ধুতি ও পাঞ্জাবি সেট',
          en: 'Dhoti & Kurta Set',
        },
        width: 1672,
        height: 941,
      },
    ],
    price: 1699,
    compareAtPrice: 1999,
    currency: 'INR',
    availability: 'in_stock',
    featured: true,
    newArrival: false,
    bestSeller: true,
    tags: ['ধুতি', 'পাঞ্জাবি', 'পুরুষদের পোশাক', 'Dhoti', 'Kurta', 'Mens Ethnic'],
    attributes: {
      fabric: { bn: '১০০% খাঁটি সুতি', en: '100% Pure Handloom Cotton' },
      color: { bn: 'সাদা ও লাল পাড়', en: 'Off-White with Red Border' },
      occasion: { bn: 'বিবাহ, পূজা ও সামাজিক অনুষ্ঠান', en: 'Weddings, Puja & Ceremonies' },
    },
    seo: {
      title: {
        bn: 'ধুতি ও পাঞ্জাবি সেট — শ্যামাশ্রী বস্ত্রালয়',
        en: 'Dhoti & Kurta Set — Shyamasree Bostraloy',
      },
      description: {
        bn: 'পুরুষদের খাঁটি তাঁতের ধুতি ও পাঞ্জাবি কালেকশন।',
        en: 'Traditional Bengal handloom dhoti and kurta sets.',
      },
    },
  },
  {
    id: 'prod-007',
    slug: 'pure-tasar-silk-handloom-saree',
    name: {
      bn: 'প্রাকৃতিক তসর সিল্ক হ্যান্ডলুম শাড়ি',
      en: 'Natural Tussar Silk Handloom Saree',
    },
    shortDescription: {
      bn: 'প্রাকৃতিক ম্যাট টেক্সচার ও হস্তচালিত তাঁতের খাঁটি তসর সিল্ক।',
      en: 'Rich organic textured pure Tussar silk saree with handloom border detail.',
    },
    description: {
      bn: 'প্রাকৃতিক সোনালী আভা যুক্ত আসল তসর সিল্ক শাড়ি। অভিজাত রুচিসম্পন্ন মহিলাদের পরম পছন্দের।',
      en: 'Prized for its natural sheen and organic texture, woven meticulously by Bengal handloom master weavers.',
    },
    categoryId: 'cat-sarees',
    collectionId: 'col-traditional-heritage',
    images: [
      {
        src: '/assets/banners/banner.png',
        alt: {
          bn: 'তসর সিল্ক শাড়ি',
          en: 'Tussar Silk Saree',
        },
        width: 1536,
        height: 1024,
      },
    ],
    price: 3899,
    compareAtPrice: 4500,
    currency: 'INR',
    availability: 'in_stock',
    featured: false,
    newArrival: true,
    bestSeller: false,
    tags: ['তসর সিল্ক', 'হ্যান্ডলুম', 'Tussar Silk', 'Handloom'],
    attributes: {
      material: { bn: '১০০% খাঁটি তসর সিল্ক', en: '100% Pure Tussar Silk' },
      color: { bn: 'প্রাকৃতিক সোনালী বেজ', en: 'Natural Golden Beige' },
    },
    seo: {
      title: {
        bn: 'তসর সিল্ক শাড়ি — শ্যামাশ্রী বস্ত্রালয়',
        en: 'Tussar Silk Saree — Shyamasree Bostraloy',
      },
      description: {
        bn: 'খাঁটি তসর সিল্ক শাড়ির এক্সক্লুসিভ কালেকশন।',
        en: 'Pure natural Tussar silk saree collection.',
      },
    },
  },
  {
    id: 'prod-008',
    slug: 'hand-printed-cotton-dress-material',
    name: {
      bn: 'হ্যান্ড ব্লক প্রিন্টেড কটন থান',
      en: 'Hand Block Printed Cotton Fabric',
    },
    shortDescription: {
      bn: 'প্রাকৃতিক রঙে তৈরি হস্তচালিত ব্লক প্রিন্ট সুতি ড্রেস ফেব্রিক।',
      en: 'Unstitched fine cotton fabric adorned with traditional Indian block prints.',
    },
    description: {
      bn: 'ইচ্ছা মতো বানিয়ে নেওয়ার জন্য প্রিমিয়াম কোয়ালিটির কটন থান। পোশাক বা সুটের জন্য পারফেক্ট।',
      en: 'High thread-count unstitched cotton material suited for tailored suits, blouses, or tunics.',
    },
    categoryId: 'cat-fabrics',
    collectionId: 'col-modern-boutique',
    images: [
      {
        src: '/assets/decorative/b.png',
        alt: {
          bn: 'ব্লক প্রিন্টেড কটন থান',
          en: 'Block Printed Cotton Fabric',
        },
        width: 1672,
        height: 941,
      },
    ],
    price: 650,
    compareAtPrice: 800,
    currency: 'INR',
    availability: 'in_stock',
    featured: false,
    newArrival: false,
    bestSeller: false,
    tags: ['থান', 'ব্লক প্রিন্ট', 'কটন', 'Fabric', 'Block Print', 'Cotton'],
    attributes: {
      fabric: { bn: '১০০% প্রিমিয়াম কটন', en: '100% Premium Cotton' },
    },
    seo: {
      title: {
        bn: 'কটন থান কাপড় — শ্যামাশ্রী বস্ত্রালয়',
        en: 'Cotton Fabric — Shyamasree Bostraloy',
      },
      description: {
        bn: 'হ্যান্ড ব্লক প্রিন্ট কটন ফেব্রিক থান।',
        en: 'Hand block printed unstitched cotton fabric.',
      },
    },
  },
];
