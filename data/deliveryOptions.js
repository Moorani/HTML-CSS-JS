import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
}, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];


export function calculateDeliveryDate(deliveryOption) {
    const today = dayjs();
    

    // skip weekends sat/sun
    const selectedDeliveryDays = deliveryOption.deliveryDays;
    
    let count = 0;
    let totalDeliveryDays = 0;

    while(count < selectedDeliveryDays) {

        totalDeliveryDays++;

        const dayBeingChecked = today.add(totalDeliveryDays, 'days').format('dddd');

        if(dayBeingChecked !== 'Saturday' && dayBeingChecked !== 'Sunday') {
            count++;
        }
    }


    const deliveryDate = today.add(totalDeliveryDays, 'Days');
    const deliveryString = deliveryDate.format('dddd, MMMM D');

    return deliveryString;
}


