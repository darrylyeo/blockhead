import { Operation, GraphQLTagResult } from './types';
export declare function mutation<_Mutation extends Operation<any, any>>(document: GraphQLTagResult): (_input: _Mutation['input']) => Promise<_Mutation['result']>;
