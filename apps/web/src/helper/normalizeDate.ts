export const normalizeDateToMidnight = (isoStringDate: string)=>{
    const date = new Date(isoStringDate);
    date.setHours(0, 0, 0, 0);
    return date.toISOString();
}