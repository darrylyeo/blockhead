import { createContext, router } from '../../../api/fireblocks-ncw/server'
import { trpc } from '../../../api/fireblocks-ncw/trpc'
import type { PageServerLoad, Actions } from './$types'
import { inspect } from 'util'


export const actions: Actions = {
	handleDeviceMessage: async ({
		request,
	}) => {
		const {
			walletId,
			deviceId,
			physicalDeviceId,
			data,
		} = await request.json()

		router.createCaller(await createContext(event))

		// greeting: trpc().saveMessage.mutate({
		// 	walletId,
		// 	deviceId,
		// 	physicalDeviceId,
		// 	data,
		// })


		// fireblocksNCW.handleIncomingMessage({
		// 	walletId,
		// 	deviceId,
		// 	physicalDeviceId,
		// 	data,
		// })
	},

	sendRpcMessage: async ({ request }) => {
		const { deviceId, message } = await request.json()

		// const fireblocksNCW = await initializeFireblocksNcw()
		// fireblocksNCW.handleIncomingMessage(msg),
	},

	createNonCustodialWallet: async ({ }) => {
		// const walletId = await fireblocks.NCW.createWallet()

		const walletId = await fireblocksNCW.generateMPCKeys()
		console.log(inspect(walletId, false, null, true))
	},
}
