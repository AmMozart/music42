const isInRangeDate = (date: Date, startDate: Date, endDate: Date): boolean => {
  return (
    startDate.getFullYear() <= date.getFullYear() &&
    startDate.getMonth() <= date.getMonth() &&
    startDate.getDate() <= date.getDate() &&
    endDate.getFullYear() >= date.getFullYear() &&
    endDate.getMonth() >= date.getMonth() &&
    endDate.getDate() >= date.getDate()
  );
};

export { isInRangeDate };
