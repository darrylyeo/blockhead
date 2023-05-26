export declare const isBrowser = true;
/**
 *  After `clientStarted = true`, only client side navigation will happen.
 */
export declare let clientStarted: boolean;
export declare let isPrerender: boolean;
export declare const error: (code: number, message: string) => string;
export declare const redirect: (status: 300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308, location: string) => void;
export declare function setClientStarted(): void;
