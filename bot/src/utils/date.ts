export function formatDateFromTimestamp(timestamp: string) {
    const date = new Date(timestamp);
    const options: any = { day: 'numeric', month: 'long' };

    return date.toLocaleDateString('ru', options);
}