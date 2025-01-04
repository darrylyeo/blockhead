export const useAriaGrabbed = () => {
	const controller = new AbortController()
	const signal = controller.signal

	for(const [startEvent, endEvents] of (
		[
			['dragstart', ['dragend']],
			['pointerdown', ['pointerup', 'pointercancel']],
			['touchstart', ['touchend', 'touchcancel']],
		] as const
	))
		globalThis.window?.addEventListener(
			startEvent,
			event => {
				if(!(event.target instanceof Element)) return

				const element = (
					startEvent === 'dragstart' ?
						event.target
					:
						event.target?.closest('[draggable="true"]')
				)

				if(!(element instanceof Element)) return

				element.setAttribute('aria-grabbed', 'false')

				const controller = new AbortController()
				const signal = controller.signal

				for(const endEvent of endEvents)
					element.addEventListener(
						endEvent,
						() => {
							element.removeAttribute('aria-grabbed')
							controller.abort()
						},
						{
							capture: true,
							passive: true,
							once: true,
							signal,
						}
					)
			},
			{
				capture: true,
				passive: true,
				signal,
			}
		)

	return () => {
		controller.abort()
	}
}
