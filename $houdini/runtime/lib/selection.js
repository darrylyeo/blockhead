function getFieldsForType(selection, __typename) {
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
export {
  getFieldsForType
};
