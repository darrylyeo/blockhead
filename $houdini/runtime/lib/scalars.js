import { getCurrentConfig } from "./config";
import { getFieldsForType } from "./selection";
async function marshalSelection({
  selection,
  data
}) {
  const config = getCurrentConfig();
  if (data === null || typeof data === "undefined") {
    return data;
  }
  if (Array.isArray(data)) {
    return await Promise.all(data.map((val) => marshalSelection({ selection, data: val })));
  }
  const targetSelection = getFieldsForType(selection, data["__typename"], false);
  return Object.fromEntries(
    await Promise.all(
      Object.entries(data).map(async ([fieldName, value]) => {
        const { type, selection: selection2 } = targetSelection[fieldName];
        if (!type) {
          return [fieldName, value];
        }
        if (selection2) {
          return [fieldName, await marshalSelection({ selection: selection2, data: value })];
        }
        if (config.scalars?.[type]) {
          const marshalFn = config.scalars[type].marshal;
          if (!marshalFn) {
            throw new Error(
              `scalar type ${type} is missing a \`marshal\` function. see https://github.com/AlecAivazis/houdini#%EF%B8%8Fcustom-scalars`
            );
          }
          if (Array.isArray(value)) {
            return [fieldName, value.map(marshalFn)];
          }
          return [fieldName, marshalFn(value)];
        }
        return [fieldName, value];
      })
    )
  );
}
function marshalInputs({
  artifact,
  input,
  config,
  rootType = "@root"
}) {
  if (input === null || typeof input === "undefined") {
    return input;
  }
  if (!artifact.input) {
    return input;
  }
  const fields = rootType === "@root" ? artifact.input.fields : artifact.input.types[rootType];
  if (Array.isArray(input)) {
    return input.map((val) => marshalInputs({ artifact, input: val, rootType, config }));
  }
  return Object.fromEntries(
    Object.entries(input).map(([fieldName, value]) => {
      const type = fields?.[fieldName];
      if (!type) {
        return [fieldName, value];
      }
      const marshalFn = config.scalars?.[type]?.marshal;
      if (marshalFn) {
        if (Array.isArray(value)) {
          return [fieldName, value.map(marshalFn)];
        }
        return [fieldName, marshalFn(value)];
      }
      if (isScalar(config, type) || !artifact.input.types[type]) {
        return [fieldName, value];
      }
      return [fieldName, marshalInputs({ artifact, input: value, rootType: type, config })];
    })
  );
}
function isScalar(config, type) {
  return ["String", "Boolean", "Float", "ID", "Int"].concat(Object.keys(config.scalars || {})).includes(type);
}
function parseScalar(config, type, value) {
  if (typeof value === "undefined") {
    return void 0;
  }
  if (type === "Boolean") {
    return value === "true";
  }
  if (type === "ID") {
    return value;
  }
  if (type === "String") {
    return value;
  }
  if (type === "Int") {
    const result = parseInt(value, 10);
    if (Number.isNaN(result)) {
      return void 0;
    }
    return result;
  }
  if (type === "Float") {
    const result = parseFloat(value);
    if (Number.isNaN(result)) {
      return void 0;
    }
    return result;
  }
  if (config.scalars?.[type]?.marshal) {
    return config.scalars[type]?.marshal(value);
  }
  return value;
}
export {
  isScalar,
  marshalInputs,
  marshalSelection,
  parseScalar
};
