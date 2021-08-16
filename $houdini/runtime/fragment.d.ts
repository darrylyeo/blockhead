import { Readable } from 'svelte/store';
import type { Fragment, GraphQLTagResult } from './types';
export declare function fragment<_Fragment extends Fragment<any>>(fragment: GraphQLTagResult, initialValue: _Fragment): Readable<_Fragment['shape']>;
