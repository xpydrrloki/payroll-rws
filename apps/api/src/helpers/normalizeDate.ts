export const normalizeDateToMidnight = (isoStringDate: string)=>{
    const date = new Date(isoStringDate);
    date.setUTCHours(0, 0, 0, 0);
    return date.toISOString();
}