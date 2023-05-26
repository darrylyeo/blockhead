import type { Record } from './record';
export type CacheTypeDef = {
    types: {
        [typeName: string]: {
            idFields: {
                [fieldName: string]: any;
            };
            fields: {
                [fieldName: string]: {
                    args: any;
                    type: any;
                };
            };
            fragments: [any, any, any][];
        };
    };
    lists: {
        [listName: string]: {
            types: any;
            filters: any;
        };
    };
    queries: [any, any, any][];
};
export type ValidTypes<Def extends CacheTypeDef> = keyof Def['types'];
export type TypeFields<Def extends CacheTypeDef, Type extends keyof Def['types']> = Def['types'][Type]['fields'];
export type TypeFieldNames<Def extends CacheTypeDef, Type extends keyof Def['types']> = Extract<keyof TypeFields<Def, Type>, string>;
export type TypeNames<Def extends CacheTypeDef> = Extract<Exclude<ValidTypes<Def>, '__ROOT__'>, string>;
export type FragmentList<Def extends CacheTypeDef, Type extends ValidTypes<Def>> = Def['types'][Type]['fragments'];
export type QueryList<Def extends CacheTypeDef> = Def['queries'];
export type IDFields<Def extends CacheTypeDef, Type extends keyof Def['types']> = Def['types'][Type]['idFields'];
export type ProxyUnion<Def extends CacheTypeDef, U> = U extends null ? null : U extends TypeNames<Def> ? Record<Def, U> : never;
export type FieldType<Def extends CacheTypeDef, Type extends keyof Def['types'], Field extends keyof TypeFields<Def, Type>> = TypeFields<Def, Type>[Field]['type'];
export type ArgType<Def extends CacheTypeDef, Type extends keyof Def['types'], Field extends keyof TypeFields<Def, Type>> = TypeFields<Def, Type>[Field]['args'];
export type ValidLists<Def extends CacheTypeDef> = Extract<keyof Def['lists'], string>;
export type ListFilters<Def extends CacheTypeDef, ListName extends ValidLists<Def>> = Def['lists'][ListName]['filters'] extends any ? {
    must?: Def['lists'][ListName]['filters'];
    must_not?: Def['lists'][ListName]['filters'];
} : never;
export type ListType<Def extends CacheTypeDef, Name extends ValidLists<Def>> = ProxyUnion<Def, Def['lists'][Name]['types']>;
export type FragmentVariables<_List, _Target> = _List extends [infer Head, ...infer Rest] ? Head extends [infer _Key, infer _Value, infer _Input] ? _Key extends _Target ? _Input : FragmentValue<Rest, _Target> : 'Encountered unknown fragment. Please make sure your runtime is up to date (ie, `vite dev` or `vite build`).' : 'Encountered unknown fragment. Please make sure your runtime is up to date (ie, `vite dev` or `vite build`).';
export type FragmentValue<List, _Target> = List extends [infer Head, ...infer Rest] ? Head extends [infer _Key, infer _Value, infer _Input] ? _Key extends _Target ? _Value : FragmentValue<Rest, _Target> : 'Encountered unknown fragment. Please make sure your runtime is up to date (ie, `vite dev` or `vite build`).' : 'Encountered unknown fragment. Please make sure your runtime is up to date (ie, `vite dev` or `vite build`).';
export type QueryValue<List, _Target> = List extends [infer Head, ...infer Rest] ? Head extends [infer _Key, infer _Value, infer _Input] ? _Key extends _Target ? _Value : QueryValue<Rest, _Target> : 'Encountered unknown query.Please make sure your runtime is up to date (ie, `vite dev` or `vite build`).' : 'Encountered unknown query.Please make sure your runtime is up to date (ie, `vite dev` or `vite build`).';
export type QueryInput<List, _Target> = List extends [infer Head, ...infer Rest] ? Head extends [infer _Key, infer _Value, infer _Input] ? _Key extends _Target ? _Input : QueryValue<Rest, _Target> : 'Encountered unknown query.Please make sure your runtime is up to date (ie, `vite dev` or `vite build`).' : 'Encountered unknown query.Please make sure your runtime is up to date (ie, `vite dev` or `vite build`).';
