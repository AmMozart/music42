const formatTime = (time: number) => {
  const minutes = Math.trunc(time / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

export { formatTime };
