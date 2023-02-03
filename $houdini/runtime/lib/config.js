let mockConfig = null;
function getMockConfig() {
  return mockConfig;
}
function setMockConfig(config) {
  mockConfig = config;
}
function defaultConfigValues(file) {
  return {
    defaultKeys: ["id"],
    ...file,
    types: {
      Node: {
        keys: ["id"],
        resolve: {
          queryField: "node",
          arguments: (node) => ({ id: node.id })
        }
      },
      ...file.types
    }
  };
}
function keyFieldsForType(configFile, type) {
  return configFile.types?.[type]?.keys || configFile.defaultKeys;
}
function computeID(configFile, type, data) {
  const fields = keyFieldsForType(configFile, type);
  let id = "";
  for (const field of fields) {
    id += data[field] + "__";
  }
  return id.slice(0, -2);
}
async function getCurrentConfig() {
  const mockConfig2 = getMockConfig();
  if (mockConfig2) {
    return mockConfig2;
  }
  return defaultConfigValues((await import("../../../houdini.config.js")).default);
}
export {
  computeID,
  defaultConfigValues,
  getCurrentConfig,
  getMockConfig,
  keyFieldsForType,
  setMockConfig
};
