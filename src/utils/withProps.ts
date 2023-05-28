import type { ComponentType, ComponentConstructorOptions } from 'svelte'

export const withProps = <T extends ComponentType>(Component: T, props = {}, events = {}) => (
	class extends Component {
		constructor(options: ComponentConstructorOptions<any>) {
			Object.assign(options.props ??= {}, props)

			super(options)

			this.$$.callbacks = events
		}
	}
)
