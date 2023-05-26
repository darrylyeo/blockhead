import type { RequestPayload } from '../../lib/types';
import type { ClientPlugin } from '../documentStore';
export declare const fetch: (target?: RequestHandler | string) => ClientPlugin;
export type FetchContext = {
    fetch: typeof globalThis.fetch;
    metadata?: App.Metadata | null;
    session: App.Session | null;
};
/**
 * ## Tip 👇
 *
 * To define types for your metadata, create a file `src/app.d.ts` containing the followingI:
 *
 * ```ts
 * declare namespace App { *
 * 	interface Metadata {}
 * }
 * ```
 *
 */
export type RequestHandlerArgs = FetchContext & FetchParams;
export type RequestHandler<_Data = any> = (args: RequestHandlerArgs) => Promise<RequestPayload<_Data>>;
export type FetchParams = {
    name: string;
    text: string;
    hash: string;
    variables: {
        [key: string]: any;
    };
};
export declare function isExtractableFile(value: any): value is ExtractableFile;
type ExtractableFile = File | Blob;
/** @typedef {import("./isExtractableFile.mjs").default} isExtractableFile */
export declare function extractFiles(value: any): {
    clone: any;
    files: Map<any, any>;
};
export {};
