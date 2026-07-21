import { cart, cartTotalQuantity } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatMoney } from "../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";

import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {

    let productPriceCents = 0;
    let shippingCostsCents = 0;
    let totalPriceCentsWithoutTax = 0;
    let estimatedTaxCents = 0;
    let orderTotalPriceCents = 0;
    
    cart.forEach((cartItem) => {
        const {productId} = cartItem;

        let matchingProduct;
        products.forEach((product) => {
            if(product.id === productId) {
                matchingProduct = product;
            }
        });

        productPriceCents += matchingProduct.priceCents * cartItem.quantity;

        let deliveryOption = deliveryOptions[0];
        deliveryOptions.forEach((option) => {
            if (cartItem.deliveryOptionId === option.id) {
                deliveryOption = option;
            }
        })

        shippingCostsCents += deliveryOption.priceCents;

    });

    totalPriceCentsWithoutTax = productPriceCents + shippingCostsCents;
    estimatedTaxCents = totalPriceCentsWithoutTax * 0.1;
    orderTotalPriceCents = totalPriceCentsWithoutTax + estimatedTaxCents;

    let paymentSummaryHTML = 
    `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartTotalQuantity()}):</div>
            <div class="payment-summary-money">$${formatMoney(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatMoney(shippingCostsCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatMoney(totalPriceCentsWithoutTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatMoney(estimatedTaxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatMoney(orderTotalPriceCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order-button">
            Place your order
          </button>
    `;


    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
    document.querySelector('.js-place-order-button').addEventListener('click', async () => {
      
      try {

        const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart
        })
        });

        const order = await response.json();
        addOrder(order);


      } catch (error) {
          console.log('Unexpected error. try again later.');
      }

      window.location.href = 'orders.html';
      
      
    })
    
}