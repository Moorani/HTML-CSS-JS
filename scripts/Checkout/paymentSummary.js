import { cart } from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatMoney } from "../utils/money.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";

export function renderPaymentSummary() {

    let productPriceCents = 0;
    let shippingCostsCents = 0;
    let totalPriceCentsWithoutTax = 0;
    let estimatedTaxCents = 0;
    let orderTotalPriceCents = 0;
    
    cart.forEach((cartItem) => {
        console.log(cartItem);
        const {productId} = cartItem;

        let matchingProduct;
        products.forEach((product) => {
            if(product.id === productId) {
                matchingProduct = product;
            }
        });

        productPriceCents += matchingProduct.priceCents * cartItem.quantity;

        let deliveryOption;
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
            <div>Items (3):</div>
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

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;


    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;

    console.log(formatMoney(productPriceCents));
    console.log(shippingCostsCents);
    console.log(totalPriceCentsWithoutTax);
    console.log(estimatedTaxCents);
    console.log(orderTotalPriceCents);
    
}