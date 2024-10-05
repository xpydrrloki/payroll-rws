const parseCurrencyToNumber = (value: string): number => {
    return parseInt(value.replace(/[^,\d]/g, ""), 10); // Remove non-numeric characters and parse as integer
  };
  