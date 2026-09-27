/**
 * Shipping calculation utility for Shyamasree Bostraloy.
 * Isolated domain calculation so it can easily be upgraded later with pincode or API lookups.
 */
export const FREE_SHIPPING_THRESHOLD = 3000;
export const STANDARD_SHIPPING_FEE = 80;

export function calculateShippingFee(subtotal: number): number {
  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    return 0;
  }
  return STANDARD_SHIPPING_FEE;
}
