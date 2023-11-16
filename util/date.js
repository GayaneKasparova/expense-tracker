export const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month.toString().length < 2 ? '0' : ''}${month}-${month.toString().length < 2 ? '0' : ''}${day}`
}

export const getDateMinusDays = (date, days) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}