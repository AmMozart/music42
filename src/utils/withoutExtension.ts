const withoutExtension = (str: string) => {
  const idx = str.lastIndexOf('.');

  return idx === -1 ? str : str.slice(0, idx);
};

export { withoutExtension };
