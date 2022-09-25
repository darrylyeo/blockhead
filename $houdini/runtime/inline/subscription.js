import { HoudiniRTError } from '../lib/HoudiniRTError';
import { InfoReleaseNote, OutdatedFunctionInlineInfo } from '../lib/constants';
export function subscription(store, variables) {
    // no longer exist!
    throw new HoudiniRTError('subscription', {
        type: 'OutdatedFunction',
        extraInfo: [
            OutdatedFunctionInlineInfo('subscription', store.artifact.name),
            InfoReleaseNote('#0160'),
        ],
        quiet: true,
    });
}
