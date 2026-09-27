import { ContactInquiry, ContactSubmissionResult } from './types';

export interface ContactService {
  submitInquiry(inquiry: ContactInquiry): Promise<ContactSubmissionResult>;
}
