import config from "../imports/config";
import pluginConfigs from "../imports/pluginConfig";
let mockConfig = null;
function getMockConfig() {
  return mockConfig;
}
function setMockConfig(config2) {
  mockConfig = config2;
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
  const withDefault = defaultConfigValues(configFile);
  return withDefault.types?.[type]?.keys || withDefault.defaultKeys;
}
function computeID(configFile, type, data) {
  const fields = keyFieldsForType(configFile, type);
  let id = "";
  for (const field of fields) {
    id += data[field] + "__";
  }
  return id.slice(0, -2);
}
let _configFile = null;
function getCurrentConfig() {
  const mockConfig2 = getMockConfig();
  if (mockConfig2) {
    return mockConfig2;
  }
  if (_configFile) {
    return _configFile;
  }
  let configFile = defaultConfigValues(config);
  for (const pluginConfig of pluginConfigs) {
    configFile = pluginConfig(configFile);
  }
  _configFile = configFile;
  return configFile;
}
export {
  computeID,
  defaultConfigValues,
  getCurrentConfig,
  getMockConfig,
  keyFieldsForType,
  setMockConfig
};
