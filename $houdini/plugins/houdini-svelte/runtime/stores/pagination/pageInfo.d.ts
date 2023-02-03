import { GraphQLObject } from '$houdini/runtime/lib/types';
export declare function nullPageInfo(): PageInfo;
export type PageInfo = {
    startCursor: string | null;
    endCursor: string | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};
export declare function missingPageSizeError(fnName: string): {
    message: string;
};
export declare function extractPageInfo(data: any, path: string[]): PageInfo;
export declare function countPage<_Data extends GraphQLObject>(source: string[], value: _Data | null): number;
