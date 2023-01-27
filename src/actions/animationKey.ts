import { createKeyChangeAction } from './createKeyChangeAction'

export const animationKey = createKeyChangeAction((element) => {
	const { className } = element
	element.className = ''
	void element.offsetWidth
	element.className = className
})

