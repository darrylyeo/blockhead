import { env } from '../../env'


import { FireblocksSDK } from 'fireblocks-sdk'
import { ApiBaseUrl } from '@fireblocks/fireblocks-web3-provider'


export const getFireblocksClient = ({
	isSandbox = false,
}: {
	isSandbox?: boolean,
}) => (console.log({getFireblocksClient})||
	isSandbox
		? new FireblocksSDK(
			env.FIREBLOCKS_SANDBOX_API_SECRET,
			env.FIREBLOCKS_SANDBOX_NCW_ADMIN_API_KEY,
			ApiBaseUrl.Sandbox,
		)
		: new FireblocksSDK(
			env.FIREBLOCKS_PRODUCTION_API_SECRET,
			env.FIREBLOCKS_PRODUCTION_NCW_ADMIN_API_KEY,
			ApiBaseUrl.Production,
		)
)

const generateDeviceId = async ({
	client,
}: {
	client: FireblocksSDK,
}) => (
	crypto.randomUUID()
	// client.NCW.generateDeviceId()
)

const createNoncustodialWallet = async ({
	client,
}: {
	client: FireblocksSDK,
}) => {
	const walletId = await client.NCW.createWallet()
	return walletId
}
