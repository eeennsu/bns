export const getDiscountPercent = (discountedPrice: number, price: number) => {
  if (discountedPrice === 0) return 0;

  return Math.round(((price - discountedPrice) / price) * 100);
};
