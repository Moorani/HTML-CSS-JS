import {cart, addToCart, cartTotalQuantity} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatMoney } from './utils/money.js';


let productHtml = '';

products.forEach((product) => {
    productHtml += 
    `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-product-quantity-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          
          ${product.getSizeChartHtml()}

          <div class="product-spacer"></div>


          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-btn" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
})
  
const addMessageTimeouts = {};


document.querySelector('.js-cart-quantity').innerHTML = cartTotalQuantity();


function addAddedMessage(productId) {
  document.querySelector(`.js-added-to-cart-${productId}`).classList.add('js-added-text');

  let previousTimoutId = addMessageTimeouts[productId];

  if (previousTimoutId) {
    clearTimeout(previousTimoutId);
  }

  const currentTimeoutId = setTimeout(() => {
    document.querySelector(`.js-added-to-cart-${productId}`).classList.remove('js-added-text');
  }, 2000);

  addMessageTimeouts[productId] = currentTimeoutId;
}





const productsGridElement = document.querySelector('.js-products-grid');
productsGridElement.innerHTML = productHtml; 

document.querySelectorAll('.js-add-to-cart-btn').forEach((addToCartButton) => {
  addToCartButton.addEventListener('click', () => {
    const {productId} = addToCartButton.dataset;
    const QuantityElement = document.querySelector(`.js-product-quantity-${productId}`);
    const productQuantityValue = Number(QuantityElement.value);
    
    addToCart(productId, productQuantityValue);

    addAddedMessage(productId);

    document.querySelector('.js-cart-quantity').innerHTML = cartTotalQuantity();
      

    });
});


