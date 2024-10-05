export const formatCurrency = (inputValue: string|number) => {
    const initValue = inputValue.toString()
    const numberValue = parseFloat(initValue.replace(/[^0-9]/g, ""));
    if (isNaN(numberValue)) return "Rp0,00"; // Return default currency if input is invalid

    // Format the number as currency
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numberValue);
  };