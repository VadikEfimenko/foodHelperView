export const getDateFromTimesTemp = (dateTime: string) => {
    let date = new Date(dateTime);

    let year = date.getFullYear();
    let month = date.getMonth() + 1; // добавляем 1, так как месяцы в JavaScript начинаются с 0
    let day = date.getDate();

    return (day < 10 ? '0' : '') + day + '-' + (month < 10 ? '0' : '') + month + '-' + year;
}