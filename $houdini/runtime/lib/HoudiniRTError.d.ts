export declare type RTErrorType = 'default' | 'OutdatedFunction';
export declare class HoudiniRTError extends Error {
    constructor(message: string, { type, extraInfo, quiet, }: {
        type?: RTErrorType;
        extraInfo?: string[];
        quiet?: boolean;
    });
}
