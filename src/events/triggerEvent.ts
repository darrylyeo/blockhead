import type { EventType, Events } from './events'

export const triggerEvent = <T extends EventType>(type: EventType, data?: Events[T]) =>
	globalThis.CustomEvent && globalThis.dispatchEvent?.(
		new globalThis.CustomEvent('blockhead/event', {
			detail: {
				type,
				data,
			}
		})
	)
