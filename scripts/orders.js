import { orders, addOrder } from "../data/orders.js";
import { formatMoney } from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { products, loadProductsFetch } from "../data/products.js";
import { calculateDeliveryDate } from "../data/deliveryOptions.js";
import { addToCart, cartTotalQuantity } from "../data/cart.js";




async function loadOrderPage() {
    await loadProductsFetch();
    let orderHtml = ``;
    
    orders.forEach((order) => {
        const orderId = order.id;
        const orderPrice = order.totalCostCents;
        const orderPlacedDate = dayjs(order.orderTime).format('MMMM D');

        let productHtml = ``;
        
        
        order.products.forEach((product) => {
            productHtml += loadOrderProducts(product);
        });


        orderHtml += `
            <div class="order-container">
            
                ${loadOrderHeader()};

            <div class="order-details-grid">
                ${productHtml}
            </div>
            </div>    
        `

        function loadOrderHeader() {
            return `
                <div class="order-header">
                    <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${orderPlacedDate}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${formatMoney(orderPrice)}</div>
                    </div>
                    </div>

                    <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${orderId}</div>
                    </div>
                </div>
            `;
        }

        function loadOrderProducts(product) {
            let productHtml = ``;
            let matchingProductItem;
            let deliveryDate;
            const {productId} = product;
            products.forEach((product) => {
                if (product.id === productId) {
                    matchingProductItem = product;
                }
            });
            deliveryDate = dayjs(product.estimatedDeliveryTime).format('MMMM D');

            productHtml += `
                <div class="product-image-container">
                <img src="${matchingProductItem.image}">
                </div>

                <div class="product-details">
                <div class="product-name">
                    ${matchingProductItem.name}
                </div>
                <div class="product-delivery-date">
                    Arriving on: ${deliveryDate}
                </div>
                <div class="product-quantity">
                    Quantity: ${product.quantity}
                </div>
                <button class="buy-again-button button-primary js-buy-again-button" data-product-id = "${product.productId}">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                </button>
                </div>

                <div class="product-actions">
                <a href="tracking.html" class = "js-tracking-btn">
                    <button class="track-package-button button-secondary">
                    Track package
                    </button>
                </a>
                </div>
            `;

            return productHtml;
        }

    })

    document.querySelector('.js-cart-quantity').innerHTML = cartTotalQuantity();

    document.querySelector('.js-orders-grid').innerHTML = orderHtml;
    document.querySelectorAll('.js-buy-again-button').forEach((btn) => {
        btn.addEventListener('click', () => {
            const {productId} = btn.dataset;
    
            addToCart(productId, 1);
            document.querySelector('.js-cart-quantity').innerHTML = cartTotalQuantity();
        })

    })

    document.querySelectorAll('.js-tracking-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            window.location.href = 'tracking.html';
        })
    })

}


loadOrderPage();



