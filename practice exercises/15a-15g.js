import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import isSatSun from "./isweeked.js";


let today = dayjs();
const day5AfterToday = today.add(5, 'days');
const day5AfterTodayFormatted = day5AfterToday.format('MMMM D');

const aMonthLater = today.add(1, 'month').format('MMMM D')
const aMonthBefore = today.subtract(1, 'month').format('MMMM D');



console.log(day5AfterTodayFormatted);
console.log(aMonthLater);
console.log(aMonthBefore);
console.log(today.format('dddd'));

const dayOfTheWeek = dayjs().format('dddd');



console.log(isSatSun('Sunday'));