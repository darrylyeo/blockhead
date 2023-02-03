export declare const isBrowser = true;
/**
 *  After `clientStarted = true`, only client side navigation will happen.
 */
export declare let clientStarted: boolean;
export declare let isPrerender: boolean;
export declare const error: (code: number, message: string) => string;
export declare function setClientStarted(): void;
