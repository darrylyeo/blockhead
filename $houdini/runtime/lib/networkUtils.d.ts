export declare function isExtractableFile(value: any): value is ExtractableFile;
type ExtractableFile = File | Blob;
/** @typedef {import("./isExtractableFile.mjs").default} isExtractableFile */
export declare function extractFiles(value: any): {
    clone: any;
    files: Map<any, any>;
};
export {};
