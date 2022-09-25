import { GraphQLTagResult, Operation } from '../lib/types';
export declare function query<_Query extends Operation<any, any>>(store: GraphQLTagResult): void;
export declare function paginatedQuery<_Query extends Operation<any, any>>(store: GraphQLTagResult): void;
