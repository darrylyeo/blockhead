import type { ArtifactKinds } from '../../lib/types';
import type { ClientPlugin, ClientHooks } from '../documentStore';
export declare const documentPlugin: (kind: ArtifactKinds, source: () => ClientHooks) => ClientPlugin;
