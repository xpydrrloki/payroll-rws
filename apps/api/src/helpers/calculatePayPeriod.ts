export const calculatePayPeriod = (today: Date) => {
  const currentDate = today.getDate();
  let payPeriodStart: Date;
  let payPeriodEnd: Date;

  // Check if the date is the 1st or the 16th
  if (currentDate === 1) {
    // Pay period from 16th of the previous month to the last day of the previous month
    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0); // Last day of the previous month
    const lastDayPreviousMonth = previousMonth.getDate();

    payPeriodStart = new Date(today.getFullYear(), today.getMonth() - 1, 16);
    payPeriodEnd = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      lastDayPreviousMonth,
    );
  } else if (currentDate === 16) {
    // Pay period from 1st of the current month to the 15th of the current month
    payPeriodStart = new Date(today.getFullYear(), today.getMonth(), 1);
    payPeriodEnd = new Date(today.getFullYear(), today.getMonth(), 15);
  } else {
    throw new Error(
      'Payroll can only be generated on the 1st or 16th of the month',
    );
  }

  return { payPeriodStart, payPeriodEnd };
};
