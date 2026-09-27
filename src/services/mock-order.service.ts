import { OrderService } from '@/domain/order/service';
import { Order, CreateOrderInput, OrderItem } from '@/domain/order/types';
import { productRepository } from '@/repositories';
import { calculateShippingFee } from '@/lib/order/shipping';

export class MockOrderService implements OrderService {
  private ordersMap = new Map<string, Order>();
  private orderCounter = 1;

  async createOrder(input: CreateOrderInput): Promise<Order> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    const { formValues, cartItems } = input;

    if (!cartItems || cartItems.length === 0) {
      throw new Error('Cannot create an order with an empty cart.');
    }

    // Resolve authoritative product data and prices from ProductRepository
    const orderItems: OrderItem[] = [];
    let subtotal = 0;

    for (const item of cartItems) {
      const product = await productRepository.getById(item.productId);
      if (!product) {
        throw new Error(`Product with ID ${item.productId} is no longer available.`);
      }

      if (product.availability !== 'in_stock') {
        throw new Error(`Product "${product.name.en}" is out of stock.`);
      }

      const unitPrice = product.price;
      const lineTotal = unitPrice * item.quantity;
      subtotal += lineTotal;

      orderItems.push({
        productId: product.id,
        quantity: item.quantity,
        unitPrice,
        lineTotal,
      });
    }

    const shipping = calculateShippingFee(subtotal);
    const discount = 0;
    const total = subtotal + shipping - discount;

    const currentYear = new Date().getFullYear();
    const referenceNum = String(this.orderCounter++).padStart(6, '0');
    const reference = `SBS-${currentYear}-${referenceNum}`;
    const id = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const isCod = formValues.paymentMethod === 'cod';

    const order: Order = {
      id,
      reference,
      items: orderItems,
      customer: {
        fullName: formValues.fullName,
        phone: formValues.phone,
        email: formValues.email || undefined,
      },
      shippingAddress: {
        fullName: formValues.fullName,
        phone: formValues.phone,
        email: formValues.email || undefined,
        addressLine1: formValues.addressLine1,
        addressLine2: formValues.addressLine2 || undefined,
        city: formValues.city,
        district: formValues.district,
        state: formValues.state,
        postalCode: formValues.postalCode,
        country: 'India',
      },
      summary: {
        subtotal,
        shipping,
        discount,
        total,
        currency: 'INR',
      },
      paymentMethod: formValues.paymentMethod,
      paymentStatus: 'pending',
      status: isCod ? 'confirmed' : 'pending',
      createdAt: new Date().toISOString(),
    };

    this.ordersMap.set(order.id, order);
    this.ordersMap.set(order.reference, order);

    console.log('[MockOrderService] Created Order successfully:', order);
    return order;
  }

  async getOrderById(id: string): Promise<Order | null> {
    const order = this.ordersMap.get(id);
    return order ? { ...order } : null;
  }

  async getOrderByReference(reference: string): Promise<Order | null> {
    const order = this.ordersMap.get(reference);
    return order ? { ...order } : null;
  }
}
