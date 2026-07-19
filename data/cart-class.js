class Cart {
    localStorageKey;
    cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];

    constructor (localStorageKey) {
        this.localStorageKey = localStorageKey;
    }

    saveToStorage() {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }


    addToCart(productId, quantity) {
      const matchingItem = this.cartItems.find((cartItem) => cartItem.productId === productId);
      
        if (matchingItem) {
          matchingItem.quantity += quantity;
        }
        else {
          this.cartItems.push({
            productId,
            quantity,
            deliveryOptionId: '1'
          });
        }
      
        this.saveToStorage();
    }

    removeFromCart(deleteBtnId) {
      const newCart = [];
      this.cartItems.forEach((cartItem) => {
          if(cartItem.productId !== deleteBtnId) {
              newCart.push(cartItem);
          }
      });
      this.cartItems = newCart;
      this.saveToStorage();
    }

    
    cartTotalQuantity() {
      let cartQuantity = 0;
      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
    
      return cartQuantity;
    }

    updateCartQuantity(productId, newQuantity) {
  
        this.cartItems.forEach((cartItem) => {
            if(cartItem.productId === productId) {
                cartItem.quantity = newQuantity;
            }
        })

        this.saveToStorage();

    }

    updateDeliveryOptions(productId, deliveryOptionId) {
        const matchingItem = this.cartItems.find((cartItem) => cartItem.productId === productId);

        matchingItem.deliveryOptionId = deliveryOptionId;

        this.saveToStorage();
    }

}




const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');


cart.addToCart('3ebe75dc-64d2-4137-8860-1f5a963e534b', 3);


console.log(cart);
console.log(businessCart);







