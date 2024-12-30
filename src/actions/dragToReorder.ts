import type { ActionReturn } from 'svelte/action'

export const dragToReorder = <T>(
	node: HTMLElement,
	{
		direction = 'vertical',
		items,
		setItems,
	}: {
		direction?: 'horizontal' | 'vertical',
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

	node.addEventListener('dragend', (e: DragEvent) => {
		e.preventDefault()

		const draggedIndex = [...node.children].findIndex(child => child.contains(e.target as Node))

		const insertBeforeIndex = (
			[...node.children].slice(0, draggedIndex)
				.findIndex(element => {
					const rect = element.getBoundingClientRect()

					return (
						direction === 'horizontal' ?
							e.clientX <= rect.right
						:
							e.clientY <= rect.bottom
					)
				})
		)

		const insertAfterIndex = (
			[...node.children].slice(draggedIndex + 1)
				.findLastIndex(element => {
					const rect = element.getBoundingClientRect()

					return (
						direction === 'horizontal' ?
							rect.left <= e.clientX
						:
							rect.top <= e.clientY
					)
				})
		)

		const insertIndex = (
			insertBeforeIndex !== -1 ?
				insertBeforeIndex
			: insertAfterIndex !== -1 ?
				draggedIndex + 1 + insertAfterIndex
			:
				-1
		)

		if(insertIndex === -1) return

		const newItems = [...items]
		newItems.splice(insertIndex !== -1 ? insertIndex : node.children.length, 0, newItems.splice(draggedIndex, 1)[0])
		setItems(newItems)
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
