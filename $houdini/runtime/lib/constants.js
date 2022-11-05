export const siteURL = 'https://houdinigraphql.com';
/**
 * @param focus example "#0160"
 */
export const InfoReleaseNote = (focus) => {
    return `❓ For more info, visit this guide: ${siteURL}/guides/release-notes${focus ? `${focus}` : ''}`;
};
export const OutdatedFunctionInlineInfo = (type, name) => {
    return `❌ inline function "${type}" no longer exist (update: '${name}' ${type}).`;
};
