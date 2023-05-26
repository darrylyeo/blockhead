import cache from '../../cache';
import { Cache } from '../../cache/cache';
import type { ClientPlugin } from '../documentStore';
export declare const cachePolicy: ({ enabled, setFetching, cache: localCache, serverSideFallback, }: {
    enabled: boolean;
    setFetching: (val: boolean, data?: any) => void;
    cache?: Cache | undefined;
    serverSideFallback?: boolean | undefined;
}) => ClientPlugin;
