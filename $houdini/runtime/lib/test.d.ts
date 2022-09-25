import { ConfigFile } from './config';
export declare function getMockConfig(): ConfigFile | null;
export declare function setMockConfig(config: ConfigFile | null): void;
export declare function testConfigFile(config?: Partial<ConfigFile>): ConfigFile;
