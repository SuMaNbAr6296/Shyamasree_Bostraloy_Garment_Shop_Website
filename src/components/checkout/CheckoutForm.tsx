'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, MapPin, CreditCard, AlertCircle, Send } from 'lucide-react';
import { checkoutFormSchema, CheckoutFormValues } from '@/domain/order/types';
import { Button } from '@/components/ui/Button';

interface CheckoutFormProps {
  onSubmit: (values: CheckoutFormValues) => Promise<void>;
  isSubmitting: boolean;
  errorMessage?: string | null;
}

export function CheckoutForm({ onSubmit, isSubmitting, errorMessage }: CheckoutFormProps) {
  const t = useTranslations('checkout');
  const locale = useLocale() as 'bn' | 'en';

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      addressLine1: '',
      addressLine2: '',
      city: 'Dingal',
      district: 'Paschim Medinipur',
      state: 'West Bengal',
      postalCode: '721232',
      paymentMethod: 'cod',
    },
  });

  const selectedPaymentMethod = watch('paymentMethod');

  const getErrorMessage = (errorMsg?: string) => {
    if (!errorMsg) return '';
    if (errorMsg.includes('|')) {
      const match = errorMsg.split('|').find((m) => m.trim().startsWith(locale + ':'));
      return match ? match.replace(locale + ':', '').trim() : errorMsg;
    }
    return errorMsg;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 font-sans">
      {/* Error Notice Banner */}
      {errorMessage && (
        <div className="p-4 rounded-md bg-destructive/10 border border-destructive/30 text-destructive text-sm flex items-start gap-3" role="alert">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="font-medium">{errorMessage}</p>
        </div>
      )}

      {/* Section 1: Customer Information */}
      <div className="bg-card rounded-md border border-border p-5 sm:p-6 space-y-4 shadow-2xs">
        <h2 className="font-serif text-xl font-bold text-foreground flex items-center gap-2 border-b border-border pb-3">
          <User className="w-5 h-5 text-primary" />
          <span>{t('customerInfo')}</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Full Name */}
          <div className="space-y-1.5 sm:col-span-1">
            <label htmlFor="fullName" className="text-xs font-semibold text-foreground block">
              {t('fullNameLabel')}
            </label>
            <input
              id="fullName"
              type="text"
              placeholder={t('fullNamePlaceholder')}
              {...register('fullName')}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? 'fullName-error' : undefined}
              className={`w-full px-3.5 py-2.5 rounded-xs border text-sm bg-background text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                errors.fullName ? 'border-destructive' : 'border-border'
              }`}
            />
            {errors.fullName && (
              <p id="fullName-error" className="text-[11px] text-destructive font-medium">
                {getErrorMessage(errors.fullName.message)}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-1.5 sm:col-span-1">
            <label htmlFor="phone" className="text-xs font-semibold text-foreground block">
              {t('phoneLabel')}
            </label>
            <input
              id="phone"
              type="tel"
              placeholder={t('phonePlaceholder')}
              {...register('phone')}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? 'phone-error' : undefined}
              className={`w-full px-3.5 py-2.5 rounded-xs border text-sm bg-background text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                errors.phone ? 'border-destructive' : 'border-border'
              }`}
            />
            {errors.phone && (
              <p id="phone-error" className="text-[11px] text-destructive font-medium">
                {getErrorMessage(errors.phone.message)}
              </p>
            )}
          </div>

          {/* Email (Optional) */}
          <div className="space-y-1.5 sm:col-span-2">
            <label htmlFor="email" className="text-xs font-semibold text-foreground block">
              {t('emailLabel')}
            </label>
            <input
              id="email"
              type="email"
              placeholder={t('emailPlaceholder')}
              {...register('email')}
              aria-invalid={Boolean(errors.email)}
              className="w-full px-3.5 py-2.5 rounded-xs border border-border text-sm bg-background text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            {errors.email && (
              <p className="text-[11px] text-destructive font-medium">
                {getErrorMessage(errors.email.message)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Section 2: Shipping Address */}
      <div className="bg-card rounded-md border border-border p-5 sm:p-6 space-y-4 shadow-2xs">
        <h2 className="font-serif text-xl font-bold text-foreground flex items-center gap-2 border-b border-border pb-3">
          <MapPin className="w-5 h-5 text-secondary-hover" />
          <span>{t('shippingAddress')}</span>
        </h2>

        <div className="space-y-4">
          {/* Address Line 1 */}
          <div className="space-y-1.5">
            <label htmlFor="addressLine1" className="text-xs font-semibold text-foreground block">
              {t('addressLine1Label')}
            </label>
            <input
              id="addressLine1"
              type="text"
              placeholder={t('addressLine1Placeholder')}
              {...register('addressLine1')}
              aria-invalid={Boolean(errors.addressLine1)}
              className={`w-full px-3.5 py-2.5 rounded-xs border text-sm bg-background text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                errors.addressLine1 ? 'border-destructive' : 'border-border'
              }`}
            />
            {errors.addressLine1 && (
              <p className="text-[11px] text-destructive font-medium">
                {getErrorMessage(errors.addressLine1.message)}
              </p>
            )}
          </div>

          {/* Address Line 2 */}
          <div className="space-y-1.5">
            <label htmlFor="addressLine2" className="text-xs font-semibold text-foreground block">
              {t('addressLine2Label')}
            </label>
            <input
              id="addressLine2"
              type="text"
              placeholder={t('addressLine2Placeholder')}
              {...register('addressLine2')}
              className="w-full px-3.5 py-2.5 rounded-xs border border-border text-sm bg-background text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* City */}
            <div className="space-y-1.5">
              <label htmlFor="city" className="text-xs font-semibold text-foreground block">
                {t('cityLabel')}
              </label>
              <input
                id="city"
                type="text"
                placeholder={t('cityPlaceholder')}
                {...register('city')}
                className="w-full px-3.5 py-2.5 rounded-xs border border-border text-sm bg-background text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {/* District */}
            <div className="space-y-1.5">
              <label htmlFor="district" className="text-xs font-semibold text-foreground block">
                {t('districtLabel')}
              </label>
              <input
                id="district"
                type="text"
                placeholder={t('districtPlaceholder')}
                {...register('district')}
                className="w-full px-3.5 py-2.5 rounded-xs border border-border text-sm bg-background text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {/* State */}
            <div className="space-y-1.5">
              <label htmlFor="state" className="text-xs font-semibold text-foreground block">
                {t('stateLabel')}
              </label>
              <input
                id="state"
                type="text"
                placeholder={t('statePlaceholder')}
                {...register('state')}
                className="w-full px-3.5 py-2.5 rounded-xs border border-border text-sm bg-background text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {/* PIN Code */}
            <div className="space-y-1.5">
              <label htmlFor="postalCode" className="text-xs font-semibold text-foreground block">
                {t('postalCodeLabel')}
              </label>
              <input
                id="postalCode"
                type="text"
                placeholder={t('postalCodePlaceholder')}
                {...register('postalCode')}
                aria-invalid={Boolean(errors.postalCode)}
                className={`w-full px-3.5 py-2.5 rounded-xs border text-sm bg-background text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  errors.postalCode ? 'border-destructive' : 'border-border'
                }`}
              />
              {errors.postalCode && (
                <p className="text-[11px] text-destructive font-medium">
                  {getErrorMessage(errors.postalCode.message)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Payment Method */}
      <div className="bg-card rounded-md border border-border p-5 sm:p-6 space-y-4 shadow-2xs">
        <h2 className="font-serif text-xl font-bold text-foreground flex items-center gap-2 border-b border-border pb-3">
          <CreditCard className="w-5 h-5 text-accent" />
          <span>{t('paymentMethod')}</span>
        </h2>

        <div className="space-y-3">
          {/* COD Option */}
          <label className={`flex items-start gap-3 p-4 rounded-md border cursor-pointer transition-colors ${
            selectedPaymentMethod === 'cod' ? 'bg-primary/5 border-primary' : 'bg-card border-border hover:bg-muted/30'
          }`}>
            <input
              type="radio"
              value="cod"
              {...register('paymentMethod')}
              className="mt-1 text-primary focus:ring-primary"
            />
            <div className="space-y-1">
              <span className="font-serif font-bold text-base text-foreground block">
                {t('cod')}
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {t('codDesc')}
              </p>
            </div>
          </label>

          {/* Online Option */}
          <label className={`flex items-start gap-3 p-4 rounded-md border cursor-pointer transition-colors ${
            selectedPaymentMethod === 'online' ? 'bg-secondary/10 border-secondary' : 'bg-card border-border hover:bg-muted/30'
          }`}>
            <input
              type="radio"
              value="online"
              {...register('paymentMethod')}
              className="mt-1 text-secondary focus:ring-secondary"
            />
            <div className="space-y-1">
              <span className="font-serif font-bold text-base text-foreground block">
                {t('onlinePayment')}
              </span>
              <p className="text-xs text-secondary-hover font-medium leading-relaxed">
                {t('onlinePaymentDisabledNote')}
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={isSubmitting || selectedPaymentMethod === 'online'}
        className="w-full font-bold gap-2 shadow-md h-14 text-base"
      >
        <Send className="w-5 h-5" />
        <span>{isSubmitting ? t('placingOrder') : t('placeOrder')}</span>
      </Button>
    </form>
  );
}
