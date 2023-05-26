function getFieldsForType(selection, __typename, loading) {
  if (loading) {
    if (selection.loadingTypes && selection.loadingTypes.length > 0) {
      return deepMerge(
        ...selection.loadingTypes.map((type) => selection.abstractFields?.fields[type])
      );
    }
    return selection.fields ?? {};
  }
  let targetSelection = selection.fields || {};
  if (selection.abstractFields && __typename) {
    const mappedType = selection.abstractFields.typeMap[__typename];
    if (mappedType) {
      targetSelection = selection.abstractFields.fields[mappedType];
    } else if (selection.abstractFields.fields[__typename]) {
      targetSelection = selection.abstractFields.fields[__typename];
    }
  }
  return targetSelection;
}
function deepMerge(...objects) {
  const mergedObj = {};
  for (let obj of objects) {
    if (!obj) {
      continue;
    }
    for (let prop in obj) {
      if (prop in obj) {
        const val = obj[prop];
        if (typeof val === "object" && val !== null && !Array.isArray(val)) {
          mergedObj[prop] = deepMerge(mergedObj[prop] || {}, val);
        } else {
          mergedObj[prop] = val;
        }
      }
    }
  }
  return mergedObj;
}
export {
  getFieldsForType
};
