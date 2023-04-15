import type { EventType, Events } from './events'

export const onEvent = <T extends EventType, CE extends CustomEvent<{
	type: keyof Events;
	data: Events[T] | undefined;
}>>(type: EventType, callback: (data: Events[T] | undefined, _: CE) => void, options: AddEventListenerOptions) =>
	globalThis.addEventListener(
		'blockhead/event',
		e => {
			if((e as CE).detail.type === type)
				callback((e as CE).detail.data, e as unknown as CE)
		},
		options
	)
