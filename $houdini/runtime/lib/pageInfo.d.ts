import type { GraphQLObject, PageInfo } from './types';
export declare function nullPageInfo(): PageInfo;
export declare function missingPageSizeError(fnName: string): {
    message: string;
};
export declare function extractPageInfo(data: any, path: string[]): PageInfo;
export declare function countPage<_Data extends GraphQLObject>(source: string[], value: _Data | null): number;
