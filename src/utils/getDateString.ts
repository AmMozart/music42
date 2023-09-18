const getDateString = (date: Date, separator = '.'): string => {
  const d = date.getDate().toString().padStart(2, '0');
  const m = date.getMonth().toString().padStart(2, '0');
  const y = date.getFullYear().toString();

  return `${d}${separator}${m}${separator}${y}`;
};

export { getDateString };
