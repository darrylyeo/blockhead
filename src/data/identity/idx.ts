// import CeramicClient from '@ceramicnetwork/ceramic-http-client'
// export const getIDXProfile = async () => {}

import { publishIDXConfig } from '@ceramicstudio/idx-tools'
// import { IDX } from '@ceramicstudio/idx'


let ceramic
export const getCeramicClient = async () => {
	if(!ceramic){
		try {
		const CeramicClient = (await import('@ceramicnetwork/ceramic-core')).default
		console.log(20)
		// @ts-ignore
		ceramic = new CeramicClient('https://ceramic.3boxlabs.com')
		}catch(e){
			console.dir(e)
		}
	}
	return ceramic
}


let IDX
export const getIDX = async () => {
	if(!IDX){
		IDX = (await import('@ceramicstudio/idx-web')).default
	}
	return IDX
}


// First we need to make sure the IDX config (definitions and schemas) are published on the Ceramic node
// Here `ceramic` implements the CeramicApi interface
let definitions
export const getIDXDefinitions = async () => {
	if(!definitions){
		const { definitions: baseDefinitions } = await publishIDXConfig(ceramic)

		definitions = {
			profile: baseDefinitions.basicProfile
		}
	}
	return definitions
}


// Import definitions created during development or build time
export const getIDXProfile = async did => {
	console.log(1)
	const ceramic = await getCeramicClient()
	console.log(2)
	const IDX = await getIDX()
	console.log(3)
	const idx = new IDX({
		ceramic,
		definitions: await getIDXDefinitions()
	})
	console.log(4)
	return await idx.get('basicProfile', did)
}


// export const setIDXProfile = async () => {
// 	const ceramic = await CeramicClient()
// 	const definitions = await getIDXDefinitions()

// 	// A first user (Alice) can set her profile on her IDX Document using the definition alias used by the app
// 	const aliceIndex = new IDX({ ceramic, definitions })
// 	await aliceIndex.set('profile', { name: 'Alice' })

// 	// Other users (such as Bob) can read from known Indexes using the same definion alias and Alice's DID
// 	const bobClient = new IDX({ ceramic, definitions })
// 	const aliceProfile = await bobClient.get('profile', aliceIndex.id)
// }