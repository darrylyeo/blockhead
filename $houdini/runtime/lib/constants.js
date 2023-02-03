const siteURL = "https://houdinigraphql.com";
const InfoReleaseNote = (focus) => {
  return `\u2753 For more info, visit this guide: ${siteURL}/guides/release-notes${focus ? `${focus}` : ""}`;
};
const OutdatedFunctionInlineInfo = (type, name) => {
  return `\u274C inline function "${type}" no longer exist (update: '${name}' ${type}).`;
};
export {
  InfoReleaseNote,
  OutdatedFunctionInlineInfo,
  siteURL
};
