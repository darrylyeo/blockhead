export declare function goTo(href: string, opts?: {
    replaceState?: boolean;
    noscroll?: boolean;
    keepfocus?: boolean;
    state?: any;
}): Promise<void>;
export declare const isBrowser = false;
/**
 *  After `clientStarted = true`, only client side navigation will happen.
 */
export declare let clientStarted: boolean;
export declare let isPrerender: boolean;
export declare const error: (code: number, message: string) => string;
export declare function setClientStarted(): void;
