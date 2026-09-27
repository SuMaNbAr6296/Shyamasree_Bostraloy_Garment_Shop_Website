import { ContactService } from '@/domain/contact/service';
import { MockContactService } from './mock-contact.service';
import { OrderService } from '@/domain/order/service';
import { MockOrderService } from './mock-order.service';

/**
 * Global ContactService instance for UI submission.
 * To replace with API or Server Action in future backend phases, swap instance here.
 */
export const contactService: ContactService = new MockContactService();

/**
 * Global OrderService instance for checkout & order creation.
 * To replace with API backend or Server Actions, swap instance here.
 */
export const orderService: OrderService = new MockOrderService();
