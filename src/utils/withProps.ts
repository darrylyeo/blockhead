import type { SvelteComponent } from 'svelte'
import type { SvelteComponentDev } from 'svelte/internal'

export const withProps = (Component: SvelteComponent | SvelteComponentDev, props = {}, events = {}) => (
	class extends Component {
		constructor(options) {
			Object.assign(options.props ??= {}, props)

			super(options)

			this.$$.callbacks = events
		}
	}
)
