

export let cart = JSON.parse(localStorage.getItem('cart')) || [];



function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function addToCart(productId, quantity) {
  const matchingItem = cart.find((cartItem) => cartItem.productId === productId);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  }
  else {
    cart.push({
      productId,
      quantity,
      deliveryOptionId: '1'
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

export function cartTotalQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}


export function updateCartQuantity(productId, newQuantity) {
  
  cart.forEach((cartItem) => {
    if(cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
    }
  })
  saveToStorage();
}

export function updateDeliveryOptions(productId, deliveryOptionId){
  const matchingItem = cart.find((cartItem) => cartItem.productId === productId);

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}




export function loadCart(func) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {

    console.log(xhr.response);
   
    func();
     
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}