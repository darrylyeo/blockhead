import { HoudiniRTError } from '../lib/HoudiniRTError';
import { InfoReleaseNote, OutdatedFunctionInlineInfo } from '../lib/constants';
export function query(store) {
    // no longer exist!
    throw new HoudiniRTError('query', {
        type: 'OutdatedFunction',
        extraInfo: [
            OutdatedFunctionInlineInfo('query', store.artifact.name),
            InfoReleaseNote('#0160'),
        ],
        quiet: true,
    });
}
export function paginatedQuery(store) {
    // no longer exist!
    throw new HoudiniRTError('paginatedQuery', {
        type: 'OutdatedFunction',
        extraInfo: [
            OutdatedFunctionInlineInfo('paginatedQuery', store.artifact.name),
            InfoReleaseNote('#0160'),
        ],
        quiet: true,
    });
}
