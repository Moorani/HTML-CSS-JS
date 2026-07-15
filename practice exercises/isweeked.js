export default function isWeekend(date) {

    if (date === 'Sunday' || date === 'Saturday') {
        return `Yes it's weeked today: ${date}`;
    }
    else {
        return 'Today is not weeked!';
    }
}