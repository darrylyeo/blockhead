export const useAriaGrabbed = () => {
	const controller = new AbortController()
	const signal = controller.signal

	globalThis.window?.addEventListener(
		'dragstart',
		event => {
			const element = event.target

			if(!(element instanceof Element)) return

			element.setAttribute('aria-grabbed', 'true')

			element.addEventListener(
				'dragend',
				() => {
					element.removeAttribute('aria-grabbed')
				},
				{
					capture: true,
					passive: true,
					once: true,
				}
			)
		},
		{
			capture: true,
			passive: true,
			signal,
		}
	)

	globalThis.window?.addEventListener(
		'pointerdown',
		event => {
			if(!(event.target instanceof Element)) return

			const element = event.target?.closest('[draggable="true"]')

			if(!(element instanceof Element)) return

			element.setAttribute('aria-grabbed', 'false')

			const controller = new AbortController()
			const signal = controller.signal

			element.addEventListener(
				'pointerup',
				event => {
					element.removeAttribute('aria-grabbed')
					controller.abort()

					element.dispatchEvent(new DragEvent('dragend', event))
				},
				{
					capture: true,
					passive: true,
					once: true,
					signal,
				}
			)

			element.addEventListener(
				'pointercancel',
				() => {
					if(element.getAttribute('aria-grabbed') === 'false')
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
