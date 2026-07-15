import { cartTotalQuantity } from "../../data/cart.js";


export function renderCheckoutHeader() {
    let checkoutHeaderHtml = 
    `
        Checkout (<a class="return-to-home-link"
        href="amazon.html">${cartTotalQuantity()} items</a>)
    `

    document.querySelector('.js-checkout-header').innerHTML = checkoutHeaderHtml;
}