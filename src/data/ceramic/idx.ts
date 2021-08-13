import { IDX } from '@ceramicstudio/idx'
import { definitions, schemas } from '@ceramicstudio/idx-constants'

export function getIDX(ceramic){
	const aliases = {
		// alias1: 'definitionID 1',
		// alias2: 'definitionID 2',
	}

	const idx = new IDX({ ceramic, aliases })
	return idx
}