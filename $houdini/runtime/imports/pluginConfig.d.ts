import type { ConfigFile } from '../lib/config';
declare const configs: ((old: ConfigFile) => ConfigFile)[];
export default configs;
