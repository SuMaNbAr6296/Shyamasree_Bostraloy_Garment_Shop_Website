'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import {
  CheckCircle2,
  Package,
  User,
  MapPin,
  CreditCard,
  Printer,
  ShoppingBag,
  Phone,
  Mail,
  Calendar,
} from 'lucide-react';
import { Order } from '@/domain/order/types';
import { Product } from '@/domain/product/types';
import { PriceDisplay } from '@/components/catalog/PriceDisplay';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

interface OrderConfirmationProps {
  order: Order;
  productsMap?: Record<string, Product>;
}

export function OrderConfirmation({ order, productsMap = {} }: OrderConfirmationProps) {
  const t = useTranslations('orderConfirmation');
  const locale = useLocale() as 'bn' | 'en';

  const formattedDate = new Date(order.createdAt).toLocaleDateString(
    locale === 'bn' ? 'bn-IN' : 'en-IN',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
  );

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <Section size="md" className="py-8 sm:py-12 bg-background min-h-[75vh] font-sans">
      <Container className="max-w-4xl space-y-8">
        {/* Print-only CSS style block */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            header, footer, nav, button { display: none !important; }
            body { background: white !important; color: black !important; }
            .no-print { display: none !important; }
            .print-full { width: 100% !important; max-width: 100% !important; border: none !important; shadow: none !important; }
          }
        ` }} />

        {/* Top Success Header */}
        <div className="text-center space-y-3 bg-card p-6 sm:p-8 rounded-md border border-border shadow-2xs">
          <div className="w-16 h-16 rounded-full bg-accent/15 text-accent flex items-center justify-center mx-auto border border-accent/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              {t('title')}
            </h1>
            <p className="text-sm text-muted-foreground max-w-lg mx-auto">
              {t('subtitle')}
            </p>
          </div>

          {/* Reference Pill & Status */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
            <div className="px-3.5 py-1.5 rounded-full bg-muted/60 border border-border text-foreground flex items-center gap-2">
              <Package className="w-4 h-4 text-primary" />
              <span>{t('reference')}: <strong className="font-mono text-primary text-sm ml-1">{order.reference}</strong></span>
            </div>

            <div className="px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold">
              {t('statusConfirmed')}
            </div>
          </div>
        </div>

        {/* Customer & Order Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Customer Info */}
          <div className="bg-card p-5 rounded-md border border-border space-y-2 shadow-2xs">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 border-b border-border pb-2">
              <User className="w-4 h-4 text-primary" />
              <span>{t('customerDetails')}</span>
            </h3>
            <p className="font-bold text-sm text-foreground">{order.customer.fullName}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" />
              <span>{order.customer.phone}</span>
            </p>
            {order.customer.email && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" />
                <span>{order.customer.email}</span>
              </p>
            )}
          </div>

          {/* Shipping Address */}
          <div className="bg-card p-5 rounded-md border border-border space-y-2 shadow-2xs">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 border-b border-border pb-2">
              <MapPin className="w-4 h-4 text-secondary-hover" />
              <span>{t('shippingAddress')}</span>
            </h3>
            <div className="text-xs text-foreground space-y-0.5 leading-relaxed">
              <p className="font-medium">{order.shippingAddress.addressLine1}</p>
              {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.district}
              </p>
              <p>
                {order.shippingAddress.state} — {order.shippingAddress.postalCode}
              </p>
            </div>
          </div>

          {/* Payment & Date */}
          <div className="bg-card p-5 rounded-md border border-border space-y-2 shadow-2xs">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5 border-b border-border pb-2">
              <CreditCard className="w-4 h-4 text-accent" />
              <span>{t('paymentMethod')}</span>
            </h3>
            <p className="font-bold text-sm text-foreground">
              {order.paymentMethod === 'cod' ? t('paymentCod') : t('paymentOnline')}
            </p>
            <div className="pt-1 text-[11px] text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Ordered Items Breakdown */}
        <div className="bg-card rounded-md border border-border p-5 sm:p-6 space-y-4 shadow-2xs">
          <h2 className="font-serif text-lg font-bold text-foreground border-b border-border pb-3 flex items-center justify-between">
            <span>{t('itemsOrdered')}</span>
            <span className="text-xs font-normal text-muted-foreground font-sans">
              {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          </h2>

          <div className="divide-y divide-border/60">
            {order.items.map((item) => {
              const product = productsMap[item.productId];
              const name = product ? (product.name[locale] || product.name.bn) : `Product #${item.productId}`;
              const mainImage = product?.images?.[0];

              return (
                <div key={item.productId} className="py-3.5 first:pt-0 flex items-center gap-4">
                  <div className="relative w-16 h-20 rounded-xs overflow-hidden bg-muted/20 shrink-0 border border-border/60">
                    {mainImage ? (
                      <Image
                        src={mainImage.src}
                        alt={mainImage.alt[locale] || name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center text-[10px] text-muted-foreground p-1 text-center">
                        {name}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="font-serif font-bold text-sm text-foreground truncate">
                      {name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity} × ₹{item.unitPrice.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <div className="text-right">
                    <PriceDisplay price={item.lineTotal} currency="INR" size="sm" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pricing Totals Breakdown */}
          <div className="pt-4 border-t border-border space-y-2 text-sm max-w-xs ml-auto">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal:</span>
              <PriceDisplay price={order.summary.subtotal} currency="INR" size="sm" />
            </div>

            <div className="flex justify-between text-muted-foreground">
              <span>Shipping:</span>
              {order.summary.shipping === 0 ? (
                <span className="font-bold text-accent">FREE</span>
              ) : (
                <PriceDisplay price={order.summary.shipping} currency="INR" size="sm" />
              )}
            </div>

            <div className="flex justify-between font-serif font-bold text-lg text-foreground pt-2 border-t border-border">
              <span>Total Amount:</span>
              <PriceDisplay price={order.summary.total} currency="INR" size="md" />
            </div>
          </div>
        </div>

        {/* Action Buttons & Contact Banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
          <Link href="/shop" className="w-full sm:w-auto">
            <Button variant="outline" size="md" className="w-full sm:w-auto gap-2 font-bold">
              <ShoppingBag className="w-4 h-4" />
              <span>{t('continueShopping')}</span>
            </Button>
          </Link>

          <Button
            variant="secondary"
            size="md"
            onClick={handlePrint}
            className="w-full sm:w-auto gap-2 font-bold cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{locale === 'bn' ? 'রসিদ প্রিন্ট করুন' : 'Print Invoice'}</span>
          </Button>
        </div>

        {/* Store Support Banner */}
        <div className="p-4 rounded-md bg-muted/40 border border-border/80 text-xs text-muted-foreground space-y-1 text-center">
          <p className="font-bold text-foreground">{t('contactUs')}</p>
          <p>
            Shyamasree Bostraloy, Dingal Hattala (Opposite Post Office), Paschim Medinipur — 721232
          </p>
          <p>
            Phone: <a href="tel:+919474725776" className="text-primary hover:underline font-semibold">+91 94747 25776</a> | Email: <a href="mailto:info@shyamasreebostraloy.com" className="text-primary hover:underline font-semibold">info@shyamasreebostraloy.com</a>
          </p>
        </div>
      </Container>
    </Section>
  );
}
