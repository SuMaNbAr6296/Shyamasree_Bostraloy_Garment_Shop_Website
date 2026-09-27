import { ContactService } from '@/domain/contact/service';
import { ContactInquiry, ContactSubmissionResult } from '@/domain/contact/types';

export class MockContactService implements ContactService {
  async submitInquiry(inquiry: ContactInquiry): Promise<ContactSubmissionResult> {
    // Simulate network latency for mock backend submission boundary
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Basic runtime safety check
    if (!inquiry.name || !inquiry.phone || !inquiry.message) {
      return {
        success: false,
        message: {
          bn: 'অনুগ্রহ করে সমস্ত প্রয়োজনীয় তথ্য প্রদান করুন।',
          en: 'Please provide all required fields.',
        },
      };
    }

    console.log('[MockContactService] Inquiry received successfully:', inquiry);

    return {
      success: true,
      message: {
        bn: 'আপনার বার্তাটি সফলভাবে পৌঁছায় গেছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।',
        en: 'Your inquiry has been received! We will get in touch with you shortly.',
      },
    };
  }
}
