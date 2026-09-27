import { z } from 'zod';

export const contactInquirySchema = z.object({
  name: z
    .string()
    .min(2, { message: 'bn:আপনার নাম লিখুন | en:Please enter your name' }),
  phone: z
    .string()
    .min(10, { message: 'bn:সঠিক ১০ সংখ্যার ফোন নম্বর লিখুন | en:Please enter a valid 10-digit phone number' }),
  email: z
    .string()
    .email({ message: 'bn:সঠিক ইমেল ঠিকানা লিখুন | en:Please enter a valid email address' })
    .optional()
    .or(z.literal('')),
  subject: z
    .string()
    .min(3, { message: 'bn:বিষয় সংক্ষেপে লিখুন | en:Please specify the subject' }),
  message: z
    .string()
    .min(10, { message: 'bn:কমপক্ষে ১০টি অক্ষরে আপনার বার্তা লিখুন | en:Message must be at least 10 characters' }),
});

export type ContactInquiry = z.infer<typeof contactInquirySchema>;

export type ContactSubmissionResult = {
  success: boolean;
  message: {
    bn: string;
    en: string;
  };
};
