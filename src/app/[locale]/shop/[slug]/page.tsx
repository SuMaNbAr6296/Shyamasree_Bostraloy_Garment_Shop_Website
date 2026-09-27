import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { productRepository, categoryRepository } from '@/repositories';
import { routing } from '@/i18n/routing';
import { Container } from '@/components/ui/Container';
import { Breadcrumb } from '@/components/shop/Breadcrumb';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInformation } from '@/components/product/ProductInformation';
import { ProductAttributes } from '@/components/product/ProductAttributes';
import { ProductDescription } from '@/components/product/ProductDescription';
import { RelatedProducts } from '@/components/product/RelatedProducts';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
  const result = await productRepository.getAll({ pageSize: 100 });
  const params: { locale: string; slug: string }[] = [];

  routing.locales.forEach((locale) => {
    result.items.forEach((product) => {
      params.push({ locale, slug: product.slug });
    });
  });

  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await productRepository.getBySlug(slug);

  if (!product) {
    return {};
  }

  const currentLocale = locale as 'bn' | 'en';
  const name = product.seo?.title?.[currentLocale] || product.name[currentLocale] || product.name.bn;
  const description = product.seo?.description?.[currentLocale] || product.shortDescription[currentLocale] || product.shortDescription.bn;
  const canonicalUrl = `https://www.shyamasreebostraloy.shop/${locale}/shop/${product.slug}`;
  const mainImage = product.images[0]?.src || '/assets/brand/logo.png';

  return {
    title: `${name} — Shyamasree Bostraloy`,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        bn: `https://www.shyamasreebostraloy.shop/bn/shop/${product.slug}`,
        en: `https://www.shyamasreebostraloy.shop/en/shop/${product.slug}`,
      },
    },
    openGraph: {
      title: name,
      description,
      url: canonicalUrl,
      siteName: 'Shyamasree Bostraloy',
      images: [
        {
          url: mainImage,
          alt: name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = await productRepository.getBySlug(slug);

  if (!product) {
    notFound();
  }

  const currentLocale = locale as 'bn' | 'en';
  const category = await categoryRepository.getById(product.categoryId);
  const categoryName = category ? category.name[currentLocale] || category.name.bn : null;

  // Json-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name[currentLocale] || product.name.bn,
    description: product.description[currentLocale] || product.description.bn,
    image: product.images.map((img) => img.src),
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability:
        product.availability === 'in_stock'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
      url: `https://www.shyamasreebostraloy.shop/${locale}/shop/${product.slug}`,
    },
    brand: {
      '@type': 'Brand',
      name: 'Shyamasree Bostraloy',
    },
  };

  const breadcrumbItems: { label: string; href?: string }[] = [
    { label: locale === 'bn' ? 'শপ' : 'Shop', href: '/shop' },
  ];

  if (categoryName && category) {
    breadcrumbItems.push({
      label: categoryName,
      href: `/shop?category=${category.slug}`,
    });
  }

  breadcrumbItems.push({
    label: product.name[currentLocale] || product.name.bn,
  });

  return (
    <main className="min-h-screen bg-background text-foreground font-sans pb-16">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container className="py-8 space-y-8">
        {/* Contextual Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Product Showcase Top Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left: Interactive Image Gallery */}
          <ProductGallery
            images={product.images}
            productName={product.name[currentLocale] || product.name.bn}
          />

          {/* Right: Product Meta, Price, Purchase Controls */}
          <ProductInformation product={product} category={category} />
        </div>

        {/* Product Attributes Specifications */}
        {product.attributes && (
          <ProductAttributes attributes={product.attributes} />
        )}

        {/* Product Full Editorial Description */}
        <ProductDescription product={product} />

        {/* Related Category Products Carousel/Grid */}
        <RelatedProducts currentProduct={product} />
      </Container>
    </main>
  );
}
