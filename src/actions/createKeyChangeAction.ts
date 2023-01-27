import type { Action } from 'svelte/action'

export const createKeyChangeAction = <Element = HTMLElement, Parameter = any>(
	onKeyChange: (element: Element, key: Parameter) => void
): Action<Element, Parameter> =>
	(element, key) => {
		let previousKey = key

		return {
			update(key) {
				if(previousKey !== key){
					onKeyChange(element, key)
					previousKey = key
				}
			}
		}
	}
