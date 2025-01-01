import type { ActionReturn } from 'svelte/action'

export const dragToReorder = <T>(
	node: HTMLElement,
	{
		direction = 'vertical',
		handle,
		onDragStart,
		afterDragStart,
		onDragEnd,
		items,
		setItems,
	}: {
		direction?: 'horizontal' | 'vertical',
		handle?: (element: Element) => boolean,
		onDragStart?: (e: DragEvent) => void,
		afterDragStart?: (e: DragEvent) => void,
		onDragEnd?: (e: DragEvent) => void,
		items: T[],
		setItems: (items: T[]) => void,
	},
): ActionReturn<{
	direction: 'horizontal' | 'vertical',
	items: T[],
	setItems: (items: T[]) => void,
}> => {
	const controller = new AbortController()
	const signal = controller.signal

	const isDraggingHandle = (
		event: DragEvent,
	) => (
		handle && (
			event.target instanceof Element
			&& handle(event.target)
		)
	)

	node.addEventListener('dragstart', (e: DragEvent) => {
		if(handle && !isDraggingHandle(e))
			return

		onDragStart?.(e)

		if(afterDragStart)
			globalThis.window.requestAnimationFrame(() => {
				afterDragStart?.(e)
			})
	})

	node.addEventListener('dragend', (e: DragEvent) => {
		if(handle && !isDraggingHandle(e))
			return

		e.preventDefault()

		const fromIndex = [...node.children].findIndex(child => child.contains(e.target as Node))

		const toIndex = (
			(() => {
				let start = 0
				let end = fromIndex - 1

				while (start <= end) {
					const mid = Math.floor((start + end) / 2)
					const rect = node.children[mid].getBoundingClientRect()

					if(
						direction === 'horizontal'
							? rect.right < e.clientX
							: rect.bottom < e.clientY
					)
						start = mid + 1
					else
						end = mid - 1
				}

				if(start < fromIndex)
					return start
			})()
			?? (() => {
				let start = fromIndex + 1
				let end = node.children.length - 1

				while (start <= end) {
					const mid = Math.floor((start + end) / 2)
					const rect = node.children[mid].getBoundingClientRect()

					if(
						direction === 'horizontal'
							? e.clientX < rect.left
							: e.clientY < rect.top
					)
						end = mid - 1
					else
						start = mid + 1
				}

				if(fromIndex < end)
					return end
			})()
		)

		if(toIndex !== undefined){
			const newItems = [...items]
			newItems.splice(toIndex ?? node.children.length, 0, ...newItems.splice(fromIndex, 1))
			setItems(newItems)
		}

		onDragEnd?.(e)
	}, { signal })

	node.addEventListener('dragenter', (e: DragEvent) => { e.preventDefault() }, { signal })
	node.addEventListener('dragover', (e: DragEvent) => { e.preventDefault() }, { signal })

	return {
		update: (_) => {
			({ direction, items, setItems } = _)
		},
		destroy: () => {
			controller.abort()
		},
	}
}
