import { GraphQLTagResult } from './types';
export * from './network';
export * from './types';
export { query, routeQuery, componentQuery } from './query';
export { mutation } from './mutation';
export { fragment } from './fragment';
export { subscription } from './subscription';
export { paginatedQuery } from './pagination';
export declare function graphql(str: TemplateStringsArray): GraphQLTagResult;
