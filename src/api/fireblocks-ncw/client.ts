import {
	ConsoleLogger,
	FireblocksNCW,
	type IKeyDescriptor,
	type TEvent,
	type TMPCAlgorithm,
} from '@fireblocks/ncw-js-sdk'

import { get, writable } from 'svelte/store'

export const initializeFireblocksNcw = async ({
	deviceId,
}: {
	deviceId: string
}) => {
	const state = writable({
		keysStatus: {} as Record<TMPCAlgorithm, IKeyDescriptor>
	})

	const fireblocksNCW = await FireblocksNCW.initialize({
		env: 'sandbox',
		deviceId,

		messagesHandler: {
			handleOutgoingMessage: async (message: string) => (
				await fetch('/apps/fireblocks?/sendRpcMessage', {
					body: JSON.stringify({
						deviceId,
						message,
					}),
				}).then(response => response.json())
			),
		},

		eventsHandler: {
			handleEvent: (event: TEvent) => {
					switch (event.type) {
						case 'key_descriptor_changed':
							state.update((state) => ({
									...state,
									keysStatus: {
										...state.keysStatus,
										[event.keyDescriptor.algorithm]: event.keyDescriptor,
									}
							}))
							break
		
						case 'transaction_signature_changed':
							console.log(`Transaction signature status: ${event.transactionSignature.transactionSignatureStatus}`);
							break
					}
			},
		},

		secureStorageProvider: new PasswordEncryptedLocalStorage(deviceId, () => {
			const password = prompt("Enter password", "");
			return Promise.resolve(password || "");
		}),

		logger: new ConsoleLogger(),
	})

	const physicalDeviceId = fireblocksNCW.getPhysicalDeviceId()
}
