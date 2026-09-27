import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { orderService } from '@/services';
import { productRepository } from '@/repositories';
import { Product } from '@/domain/product/types';
import { OrderConfirmation } from '@/components/order/OrderConfirmation';

type Props = {
  params: Promise<{ locale: string; orderId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, orderId } = await params;
  const t = await getTranslations({ locale, namespace: 'orderConfirmation' });
  const order = await orderService.getOrderById(orderId);

  if (!order) {
    return {
      title: 'Order Not Found | Shyamasree Bostraloy',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${t('title')} (${order.reference}) | Shyamasree Bostraloy`,
    description: t('subtitle'),
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function OrderConfirmationPage({ params }: Props) {
  const { orderId } = await params;
  const order = await orderService.getOrderById(orderId);

  if (!order) {
    notFound();
  }

  // Pre-fetch product details to display titles and images in receipt
  const productsMap: Record<string, Product> = {};
  await Promise.all(
    order.items.map(async (item) => {
      const prod = await productRepository.getById(item.productId);
      if (prod) {
        productsMap[item.productId] = prod;
      }
    })
  );

  return <OrderConfirmation order={order} productsMap={productsMap} />;
}
