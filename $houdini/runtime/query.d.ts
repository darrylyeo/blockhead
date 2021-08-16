import { Readable } from 'svelte/store';
import type { Config } from 'houdini-common';
import { Operation, GraphQLTagResult, QueryArtifact } from './types';
import { RequestPayload } from './network';
export declare function query<_Query extends Operation<any, any>>(document: GraphQLTagResult): QueryResponse<_Query['result'], _Query['input']>;
export declare type QueryResponse<_Data, _Input> = {
    data: Readable<_Data>;
    writeData: (data: RequestPayload<_Data>, variables: _Input) => void;
    refetch: (newVariables?: _Input) => Promise<void>;
    loading: Readable<boolean>;
    error: Readable<Error | null>;
};
export declare const routeQuery: <_Data, _Input>(queryResult: QueryResponse<_Data, _Input>) => QueryResponse<_Data, _Input>;
export declare const componentQuery: <_Data, _Input>({ config, artifact, queryHandler, variableFunction, getProps, }: {
    config: Config;
    artifact: QueryArtifact;
    queryHandler: QueryResponse<_Data, _Input>;
    variableFunction: (...args: any[]) => _Input;
    getProps: () => any;
}) => QueryResponse<_Data, _Input>;
