export const cart = [];

export function addToCart(productId) {
  const QuantityElement = document.querySelector(`.js-product-quantity-${productId}`);
  const productQuantityValue = Number(QuantityElement.value);
  const matchingItem = cart.find((cartItem) => cartItem.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += productQuantityValue;
  }
  else {
    cart.push({
      productId,
      quantity: productQuantityValue
    });
  }
}