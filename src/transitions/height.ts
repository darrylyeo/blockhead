// https://css-tricks.com/svelte-and-spring-animations

import { spring } from 'svelte/motion'

const OPEN_SPRING = { stiffness: 0.1, damping: 0.4 }
const CLOSE_SPRING = { stiffness: 0.1, damping: 0.95 }

function getHeightSpring() {
	const heightSpring = spring(0, OPEN_SPRING)
	let isShown = false

	const getConfig = (isOpen, value) => {
		const isActive = typeof value === 'number'
		const immediate = isOpen && !isShown && isActive
		isShown = isShown || isActive
		return immediate ? { hard: true } : {}
	}

	const sync = (isOpen, height) =>
		heightSpring.set(isOpen ? height || 0 : 0, getConfig(isOpen, height))

	return { sync, heightSpring }
}

export function transitionHeight(element, isOpen) {
	element.parentNode.style.overflow = 'hidden'

	const { heightSpring, sync } = getHeightSpring()
	const doUpdate = () => sync(isOpen, element.offsetHeight)

	let currentHeight = null
	const resizeObserver = new ResizeObserver(() => {
		const newHeight = element.offsetHeight
		const bigger = newHeight > currentHeight

		if (typeof currentHeight === 'number')
			Object.assign(heightSpring, bigger ? OPEN_SPRING : CLOSE_SPRING)

		currentHeight = newHeight
		doUpdate()
	})

	const cleanUp = heightSpring.subscribe(height => {
		element.parentNode.style.height = `${Math.max(height, 0)}px`
		element.parentNode.style.marginTop = height < 0 ? `${height}px` : null
		element.parentNode.style.position = height === 0 ? 'absolute' : null
	})

	resizeObserver.observe(element)

	return {
		update(_isOpen) {
			isOpen = _isOpen
			Object.assign(heightSpring, isOpen ? OPEN_SPRING : CLOSE_SPRING)
			doUpdate()
		},
		destroy() {
			resizeObserver.disconnect()
			cleanUp()
		}
	}
}
