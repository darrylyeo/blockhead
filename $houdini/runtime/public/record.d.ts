import type { FragmentArtifact } from '../lib/types';
import type { Cache } from './cache';
import type { ArgType, CacheTypeDef, FragmentList, FragmentValue, FragmentVariables, TypeFieldNames, ValidTypes } from './types';
export declare class Record<Def extends CacheTypeDef, Type extends ValidTypes<Def>> {
    #private;
    type: string;
    idFields: {};
    constructor({ cache, type, id, idFields, }: {
        cache: Cache<Def>;
        type: string;
        idFields: {};
        id: string;
    });
    read<_Fragment extends {
        artifact: FragmentArtifact;
    }>({ fragment, variables, }: {
        fragment: _Fragment;
        variables?: FragmentVariables<FragmentList<Def, Type>, _Fragment>;
    }): {
        data: FragmentValue<FragmentList<Def, Type>, _Fragment> | null;
        partial: boolean;
    };
    write<_Fragment extends {
        artifact: FragmentArtifact;
    }, _Variable>(args: {
        fragment: _Fragment;
        data: FragmentValue<FragmentList<Def, Type>, _Fragment>;
        variables?: FragmentVariables<FragmentList<Def, Type>, _Fragment>;
        forceStale?: boolean;
    }): void;
    delete(): void;
    /**
     * Mark some elements of the record stale in the cache.
     * @param field
     * @param when
     */
    markStale<Field extends TypeFieldNames<Def, Type>>(field?: Field, { when, }?: {
        when?: ArgType<Def, Type, Field>;
    }): void;
}
