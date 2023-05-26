function flatten(source) {
  if (!source) {
    return [];
  }
  return source.reduce((acc, element) => {
    if (!element) {
      return acc;
    }
    if (Array.isArray(element)) {
      return acc.concat(flatten(element));
    }
    return acc.concat(element);
  }, []);
}
export {
  flatten
};
