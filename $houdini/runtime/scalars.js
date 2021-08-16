export function marshalInputs({ artifact, config, input, rootType = '@root', }) {
    if (input === null || typeof input === 'undefined') {
        return input;
    }
    // if there are no inputs in the object, nothing to do
    if (!artifact.input) {
        return input;
    }
    // the object containing the relevant fields
    const fields = rootType === '@root' ? artifact.input.fields : artifact.input.types[rootType];
    // if we are looking at a list
    if (Array.isArray(input)) {
        return input.map((val) => marshalInputs({ artifact, config, input: val, rootType }));
    }
    // we're looking at an object, build it up from the current input
    return Object.fromEntries(Object.entries(input).map(([fieldName, value]) => {
        var _a, _b;
        // look up the type for the field
        const type = fields[fieldName];
        // if we don't have type information for this field, just use it directly
        // it's most likely a non-custom scalars or enums
        if (!type) {
            return [fieldName, value];
        }
        // is the type something that requires marshaling
        if ((_b = (_a = config.scalars) === null || _a === void 0 ? void 0 : _a[type]) === null || _b === void 0 ? void 0 : _b.marshal) {
            return [fieldName, config.scalars[type].marshal(value)];
        }
        // if the type doesn't require marshaling and isn't a referenced type
        if (isScalar(config, type)) {
            return [fieldName, value];
        }
        // we ran into an object type that should be referenced by the artifact
        return [fieldName, marshalInputs({ artifact, config, input: value, rootType: type })];
    }));
}
export function unmarshalSelection(config, selection, data) {
    if (data === null || typeof data === 'undefined') {
        return data;
    }
    // if we are looking at a list
    if (Array.isArray(data)) {
        // unmarshal every entry in the list
        return data.map((val) => unmarshalSelection(config, selection, val));
    }
    // we're looking at an object, build it up from the current input
    return Object.fromEntries(Object.entries(data).map(([fieldName, value]) => {
        var _a, _b;
        // look up the type for the field
        const { type, fields } = selection[fieldName];
        // if we don't have type information for this field, just use it directly
        // it's most likely a non-custom scalars or enums
        if (!type) {
            return [fieldName, value];
        }
        // is the type something that requires marshaling
        if ((_b = (_a = config.scalars) === null || _a === void 0 ? void 0 : _a[type]) === null || _b === void 0 ? void 0 : _b.marshal) {
            return [fieldName, config.scalars[type].unmarshal(value)];
        }
        // if the type doesn't require marshaling and isn't a referenced type
        // if the type is a scalar that doesn't require marshaling
        if (isScalar(config, type)) {
            return [fieldName, value];
        }
        if (fields) {
            return [
                fieldName,
                // unmarshalSelection({ artifact, config, input: value, rootType: type }),
                unmarshalSelection(config, fields, value),
            ];
        }
        return [];
    }));
}
// we can't use config.isScalar because that would require bundling in houdini-common
export function isScalar(config, type) {
    return ['String', 'Boolean', 'Float', 'ID', 'Int']
        .concat(Object.keys(config.scalars || {}))
        .includes(type);
}
