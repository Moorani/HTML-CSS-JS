import { cart, removeFromCart, cartTotalQuantity, updateCartQuantity, updateDeliveryOptions} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { formatMoney } from "../utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";
import { calculateDeliveryDate } from "../../data/deliveryOptions.js";


export function renderOrderSummary() {

    let checkOutHtml = ``;

    cart.forEach((cartItem) => {

        const {productId} = cartItem;

        let matchingProductItem;
        products.forEach((product) => {
            if (product.id === productId) {
                matchingProductItem = product;
            }
        });

        const {deliveryOptionId} = cartItem;

        let deliveryOption; 
        
        deliveryOptions.forEach((option) => {
            if (deliveryOptionId === option.id) {
                deliveryOption = option;
            }
        });

        checkOutHtml += 
        `
            <div class="cart-item-container js-cart-item-container-${matchingProductItem.id}">
                <div class="delivery-date">
                    Delivery date: ${calculateDeliveryDate(deliveryOption)}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${matchingProductItem.image}">

                    <div class="cart-item-details">
                        <div class="product-name">
                            ${matchingProductItem.name}
                        </div>
                        <div class="product-price">
                            ${matchingProductItem.getPrice()}
                        </div>
                        <div class="product-quantity">
                            <span>
                                Quantity: <span class="quantity-label js-quantity-label-${matchingProductItem.id}">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary js-update-quantity-link" data-update-link-id="${matchingProductItem.id}">
                                Update
                            </span>
                            <input type="number" name="" class="quantity-input js-quantity-input js-quantity-input-${matchingProductItem.id}" data-product-id="${matchingProductItem.id}">
                            <span class="save-quantity-link link-primary js-save-quantity-link" data-save-link-id="${matchingProductItem.id}">Save</span>  

                            <span class="delete-quantity-link link-primary js-delete-btn" data-delete-btn-id = "${matchingProductItem.id}">
                                Delete
                            </span>
                        </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHtml(matchingProductItem, cartItem)}

                    </div>
        
                    
                </div>
            </div>
        `;
        
    }); 


    function deliveryOptionsHtml(matchingProductItem, cartItem) {
        let deliveryHtml = '';
        deliveryOptions.forEach((option) => {


            const priceInCents = option.priceCents === 0 ? 'FREE' : `$${formatMoney(option.priceCents)}`;
            const isChecked = cartItem.deliveryOptionId === option.id ? 'checked' : '';


            deliveryHtml += `
                <div class="delivery-option js-delivery-option"
                    data-product-id = "${matchingProductItem.id}"
                    data-delivery-option-id = "${option.id}">
                    <input type="radio" ${isChecked}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProductItem.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${calculateDeliveryDate(option)}
                        </div>
                        <div class="delivery-option-price">
                            ${priceInCents} - Shipping
                        </div>
                    </div>
                </div>
            `
        });

        return deliveryHtml;
    }
        
    document.querySelector('.js-order-summary').innerHTML = checkOutHtml;
    renderCheckoutHeader();

    document.querySelectorAll('.js-delete-btn').forEach((deleteLink) => {
        deleteLink.addEventListener('click', () => {
            const {deleteBtnId} = deleteLink.dataset;
            removeFromCart(deleteBtnId);
            renderOrderSummary();
            // document.querySelector(`.js-cart-item-container-${deleteBtnId}`).remove();
            // document.querySelector('.js-total-quantity').innerHTML = `${cartTotalQuantity()} items`;
            renderPaymentSummary();
            
        })
    });

    document.querySelectorAll('.js-update-quantity-link').forEach((updateLink) => {
        updateLink.addEventListener('click', () => {
            const {updateLinkId} = updateLink.dataset;

            document.querySelector(`.js-cart-item-container-${updateLinkId}`).classList.add('is-editing-quantity');
        }); 
    });

    document.querySelectorAll('.js-save-quantity-link').forEach((saveQuantityLink) => {
        const {saveLinkId} = saveQuantityLink.dataset;
        saveQuantityLink.addEventListener('click', () => {
            let newQuantity =  document.querySelector(`.js-quantity-input-${saveLinkId}`).valueAsNumber;
            if (Number.isNaN(newQuantity) || newQuantity <= 0 || newQuantity >= 1000) {
                alert('Quantity must be at least 0 and less than 1000');
                document.querySelector(`.js-quantity-input-${saveLinkId}`).value = 1;
                return;
            }
            updateCartQuantity(saveLinkId, newQuantity);
            
            //document.querySelector(`.js-quantity-label-${saveLinkId}`).innerHTML = newQuantity;
            renderOrderSummary()
            renderCheckoutHeader();
            document.querySelector(`.js-cart-item-container-${saveLinkId}`).classList.remove('is-editing-quantity');
            renderPaymentSummary();
        })
    });

    document.querySelectorAll('.js-quantity-input').forEach((inputElement) => {
        inputElement.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                const {productId} = inputElement.dataset;
                let newQuantity =  inputElement.valueAsNumber;
                if (Number.isNaN(newQuantity) || newQuantity <= 0 || newQuantity >= 1000) {
                    alert('Quantity must be at least 0 and less than 1000');
                    inputElement.value = 1;
                    return;
                }
                updateCartQuantity(productId, newQuantity);

                //document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
                renderOrderSummary();
                renderCheckoutHeader();
                document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing-quantity');
                renderPaymentSummary();
            }
        })
    })


    document.querySelectorAll('.js-delivery-option').forEach((inputOption) => {
        inputOption.addEventListener('click', () => {
            const {productId, deliveryOptionId} = inputOption.dataset;
            updateDeliveryOptions(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();

            // document.querySelector(`.js-delivery-date-${productId}`).innerHTML = `Delivery date: ${deliveryDate(deliveryOptionId)}`;
        })
    });


}

renderOrderSummary();


/*

function deliveryDate(deliveryOptionId) {
        let deliveryOption; 
    
        deliveryOptions.forEach((option) => {
            if (deliveryOptionId === option.id) {
                deliveryOption = option;
            }
        });
    
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'Days');
        const deliveryString = deliveryDate.format('dddd, MMMM D');

        return deliveryString;
}

*/

