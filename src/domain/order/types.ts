import { z } from 'zod';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 'cod' | 'online';

export type PaymentStatus = 'pending' | 'paid' | 'failed';

export type OrderAddress = {
  fullName: string;
  phone: string;
  email?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  district: string;
  state: string;
  postalCode: string;
  country: string;
};

export type OrderItem = {
  productId: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
};

export type OrderSummary = {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  currency: 'INR';
};

export type Order = {
  id: string;
  reference: string;
  items: OrderItem[];
  customer: {
    fullName: string;
    phone: string;
    email?: string;
  };
  shippingAddress: OrderAddress;
  summary: OrderSummary;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  createdAt: string;
};

// Zod Schema for Checkout Form Validation
export const checkoutFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'bn:আপনার নাম লিখুন | en:Please enter your full name' }),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, {
      message:
        'bn:সঠিক ১০ সংখ্যার মোবাইল নম্বর লিখুন | en:Please enter a valid 10-digit Indian mobile number',
    }),
  email: z
    .string()
    .email({ message: 'bn:সঠিক ইমেল ঠিকানা লিখুন | en:Please enter a valid email address' })
    .optional()
    .or(z.literal('')),
  addressLine1: z
    .string()
    .min(5, { message: 'bn:রাস্তা/বাড়ি/ঠিকানা লিখুন | en:Please enter street address' }),
  addressLine2: z.string().optional(),
  city: z
    .string()
    .min(2, { message: 'bn:শহর/গ্রামের নাম লিখুন | en:Please enter city or town' }),
  district: z
    .string()
    .min(2, { message: 'bn:জেলার নাম লিখুন | en:Please enter district' }),
  state: z
    .string()
    .min(2, { message: 'bn:রাজ্যের নাম লিখুন | en:Please enter state' }),
  postalCode: z
    .string()
    .regex(/^\d{6}$/, {
      message: 'bn:সঠিক ৬ সংখ্যার পিন কোড লিখুন | en:Please enter a valid 6-digit Indian PIN code',
    }),
  paymentMethod: z.enum(['cod', 'online'], {
    message: 'bn:পেমেন্ট পদ্ধতি নির্বাচন করুন | en:Please select a payment method',
  }),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export type CreateOrderInput = {
  formValues: CheckoutFormValues;
  cartItems: { productId: string; quantity: number }[];
};
