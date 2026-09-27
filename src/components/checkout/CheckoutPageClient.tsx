'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter } from '@/i18n/routing';
import { ShoppingBag, ArrowLeft, Lock } from 'lucide-react';
import { useResolvedCart } from '@/lib/cart/use-resolved-cart';
import { useCartStore } from '@/store/cart-store';
import { orderService } from '@/services';
import { CheckoutFormValues } from '@/domain/order/types';
import { CheckoutForm } from './CheckoutForm';
import { CheckoutOrderSummary } from './CheckoutOrderSummary';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export function CheckoutPageClient() {
  const t = useTranslations('checkout');
  const locale = useLocale() as 'bn' | 'en';
  const router = useRouter();

  const { items, subtotal, isLoading, isHydrated } = useResolvedCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFormSubmit = async (values: CheckoutFormValues) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      if (items.length === 0) {
        throw new Error(
          locale === 'bn' ? 'আপনার কার্ট ফাঁকা' : 'Your cart is empty'
        );
      }

      const order = await orderService.createOrder({
        formValues: values,
        cartItems: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      });

      // Clear persistent cart ONLY AFTER successful order creation
      useCartStore.getState().clearCart();

      // Navigate to Order Confirmation page
      router.push(`/order-confirmation/${order.id}`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error('Order creation error:', err);
      setErrorMessage(
        msg || (locale === 'bn' ? 'অর্ডার সম্পন্ন করতে সমস্যা হয়েছে।' : 'Failed to complete order.')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section size="md" className="py-8 sm:py-12 bg-background min-h-[70vh] font-sans">
      <Container className="space-y-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground flex items-center gap-2">
          <Link href="/" className="hover:text-primary transition-colors">
            {locale === 'bn' ? 'হোম' : 'Home'}
          </Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-primary transition-colors">
            {locale === 'bn' ? 'কার্ট' : 'Cart'}
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{t('title')}</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
              {t('title')}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-accent bg-accent/10 px-3 py-1.5 rounded-full border border-accent/20 shrink-0">
            <Lock className="w-3.5 h-3.5" />
            <span>Secure Checkout</span>
          </div>
        </div>

        {/* Loading State */}
        {!isHydrated || isLoading ? (
          <div className="py-20 text-center text-muted-foreground text-sm">
            {locale === 'bn' ? 'চেকআউট ডেটা লোড করা হচ্ছে...' : 'Loading checkout details...'}
          </div>
        ) : items.length === 0 ? (
          /* Empty Cart Protection */
          <div className="py-16 text-center space-y-6 max-w-md mx-auto">
            <div className="w-20 h-20 rounded-full bg-muted/60 flex items-center justify-center mx-auto text-muted-foreground border border-border/50">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                {locale === 'bn' ? 'আপনার কার্ট খালি রয়েছে' : 'Your cart is empty'}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {locale === 'bn'
                  ? 'অর্ডার প্রসেস করার জন্য অনুগ্রহ করে আপনার কার্টে পোশাক যোগ করুন।'
                  : 'Please add items to your cart before proceeding to checkout.'}
              </p>
            </div>
            <Link href="/shop" className="inline-block">
              <Button variant="primary" size="lg" className="gap-2 font-bold shadow-md">
                <ArrowLeft className="w-4 h-4" />
                <span>{t('emptyCartCta')}</span>
              </Button>
            </Link>
          </div>
        ) : (
          /* Checkout Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Shipping & Customer Form (7 cols) */}
            <div className="lg:col-span-7">
              <CheckoutForm
                onSubmit={handleFormSubmit}
                isSubmitting={isSubmitting}
                errorMessage={errorMessage}
              />
            </div>

            {/* Right: Order Summary Breakdown (5 cols) */}
            <div className="lg:col-span-5 sticky top-24">
              <CheckoutOrderSummary items={items} subtotal={subtotal} />
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
}
