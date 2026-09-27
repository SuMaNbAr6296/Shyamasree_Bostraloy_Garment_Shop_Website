import { Order, CreateOrderInput } from './types';

export interface OrderService {
  createOrder(input: CreateOrderInput): Promise<Order>;
  getOrderById(id: string): Promise<Order | null>;
  getOrderByReference(reference: string): Promise<Order | null>;
}
