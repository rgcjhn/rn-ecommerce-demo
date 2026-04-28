import { CartItem } from "../models/cart.types";

// Calculate discounted price for a single item
export const getDiscountedPrice = (item: CartItem): number => {
  if (item.discountPercentage && item.discountPercentage > 0) {
    return item.price - (item.price * item.discountPercentage) / 100;
  }
  return item.price;
};

// Calculate all totals: quantity, original price, and discounted price
export const calculateTotals = (items: CartItem[]) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const totalDiscountedPrice = items.reduce((sum, item) => {
    const discountedPrice = getDiscountedPrice(item);
    return sum + discountedPrice * item.quantity;
  }, 0);

  return {
    totalQuantity,
    totalPrice: totalPrice,
    totalDiscountedPrice: totalDiscountedPrice,
  };
};

// Helper for displaying discounted price in cart item
export const getDisplayPrice = (item: CartItem) => {
  if (item.discountPercentage && item.discountPercentage > 0) {
    const discounted =
      item.price - (item.price * item.discountPercentage) / 100;
    return discounted.toFixed(2);
  }
  return item.price.toFixed(2);
};

export const truncateToDecimals = (num: number, dec = 2) => {
  const calcDec = Math.pow(10, dec);
  return Math.trunc(num * calcDec) / calcDec;
};
