// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { MetaTagsProps } from 'svelte-meta-tags'

// and what to do when importing types
declare namespace App {
	// interface Locals {}

	interface PageData {
		metaTags?: MetaTagsProps
	}

	// interface Error {}
	// interface Platform {}
}
