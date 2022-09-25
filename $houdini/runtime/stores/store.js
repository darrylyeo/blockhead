import cache from '../cache';
import { getCurrentConfig } from '../lib/config';
export class BaseStore {
    async getConfig() {
        const config = await getCurrentConfig();
        // make sure the cache gets the reference
        cache.setConfig(config);
        return config;
    }
}
