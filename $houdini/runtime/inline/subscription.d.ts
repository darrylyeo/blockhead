import { GraphQLTagResult, Operation } from '../lib/types';
export declare function subscription<_Subscription extends Operation<any, any>>(store: GraphQLTagResult, variables?: _Subscription['input']): void;
