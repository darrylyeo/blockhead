export const createKeyChangeAction = <T>(onKeyChange: (element: HTMLElement, key: T) => void) =>
	(element: HTMLElement, key: T) => {
		let previousKey = key

		return {
			update(key: T) {
				if(previousKey !== key){
					onKeyChange(element, key)
					previousKey = key
				}
			}
		}
	}
