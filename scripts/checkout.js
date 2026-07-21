import { renderOrderSummary } from "./Checkout/orderSummary.js";
import { renderPaymentSummary } from "./Checkout/paymentSummary.js";

import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";

//import "../data/cart-class.js"

// import "..//data/backend-practice.js";


/*

new Promise((resolve) => {
    console.log('Start Promise');
    loadProducts(() => {
        console.log('Finished Loading');
        resolve('next step');
    });
}).then((message) => {
    console.log(message);
});



// Nested Callback : Big problem

loadProducts(() => {
    loadCart(() => {
        renderOrderSummary();
        renderPaymentSummary();    
    })
});



new Promise((resolve) => {
    loadProducts(() => {
        resolve('Value1'); 
    });
}).then((value) => {
    console.log(value);
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });
}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();
});

*/


Promise.all([
    new Promise((resolve) => {
        loadProducts(() => {
            resolve('Value1'); 
        });
    }),
    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })
]).then((values) => {
    console.log(values[0])
    renderOrderSummary();
    renderPaymentSummary();
});






