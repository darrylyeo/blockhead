export const animationKey = <T>(element: HTMLElement, key: T) => {
	let previousKey = key

	return {
		update(key: T) {
			if(previousKey !== key){
				const { className } = element
				element.className = ''
				void element.offsetWidth
				element.className = className

				previousKey = key
			}
		}
	}
}
