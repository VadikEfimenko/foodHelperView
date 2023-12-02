export function getDayFromTimesTemp(date) {
    const options = { day: "numeric", month: "long" };

    return date.toLocaleDateString("ru-RU", options);
}