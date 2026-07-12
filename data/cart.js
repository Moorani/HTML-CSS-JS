export let cart = JSON.parse(localStorage.getItem('cart')) || [];



function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


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

  saveToStorage();
}

export function removeFromCart(deleteBtnId) {
  const newCart = [];
  cart.forEach((cartItem) => {
      if(cartItem.productId !== deleteBtnId) {
          newCart.push(cartItem);
      }
  });
  cart = newCart;
  saveToStorage();
}