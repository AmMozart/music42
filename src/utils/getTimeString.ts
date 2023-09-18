const getTimeString = (date: Date, separator = ':'): string => {
  const h = date.getHours().toString().padStart(2, '0');
  const m = date.getMinutes().toString().padStart(2, '0');

  return `${h}${separator}${m}`;
};

export { getTimeString };
