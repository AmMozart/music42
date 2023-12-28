const getExtension = (str: string) => {
  const idx = str.lastIndexOf('.');

  return idx === -1 ? '' : str.slice(idx);
};

export { getExtension };
