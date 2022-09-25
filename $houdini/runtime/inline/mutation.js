import { HoudiniRTError } from '../lib/HoudiniRTError';
import { InfoReleaseNote, OutdatedFunctionInlineInfo } from '../lib/constants';
export function mutation(store) {
    // no longer exist!
    throw new HoudiniRTError('mutation', {
        type: 'OutdatedFunction',
        extraInfo: [
            OutdatedFunctionInlineInfo('mutation', store.artifact.name),
            InfoReleaseNote('#0160'),
        ],
        quiet: true,
    });
}
