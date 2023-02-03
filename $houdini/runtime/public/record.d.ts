import { Cache } from './cache';
import type { ArgType, CacheTypeDef, FieldType, TypeFieldNames, ValidTypes } from './types';
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
    set<Field extends TypeFieldNames<Def, Type>>({ field, args, value, }: {
        field: Field;
        args?: ArgType<Def, Type, Field>;
        value: FieldType<Def, Type, Field>;
    }): void;
    get<Field extends TypeFieldNames<Def, Type>>({ field, args, }: {
        field: Field;
        args?: ArgType<Def, Type, Field>;
    }): FieldType<Def, Type, Field>;
    delete(): void;
}
export declare function computeKey({ field, args }: {
    field: string;
    args?: {
        [key: string]: any;
    };
}): string;
export declare const stringifyObjectWithNoQuotesOnKeys: (obj_from_json: {}) => string;
export declare function marshalNestedList(list: any[]): any[];
