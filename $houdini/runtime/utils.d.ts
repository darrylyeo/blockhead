import { GraphQLObject } from './types';
export declare type PageInfo = {
    startCursor: string | null;
    endCursor: string | null;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};
export declare function extractPageInfo(data: GraphQLObject, path: string[]): PageInfo;
export declare function countPage(source: string[], value: GraphQLObject): number;
