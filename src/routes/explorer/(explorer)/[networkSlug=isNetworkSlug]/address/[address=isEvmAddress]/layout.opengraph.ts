// Types/constants
import type { Ethereum } from '$/data/networks/types'
import type { ENS } from '$/api/ens'

import { networksBySlug } from '$/data/networks'
import { NetworkProvider } from '$/data/networkProviders/types'
import { getViemPublicClient } from '$/data/networkProviders'


// Context
import type { RouteParams } from './$types'


// Functions
import { getBytecode, getEnsName } from 'viem/actions'
import { Etherscan } from '$/api/etherscan'
import { normalizeContractSource as normalizeContractSourceEtherscan } from '$/api/etherscan/normalize'


// OpenGraph load
export const load = async ({
	params: {
		networkSlug,
		address,
	},
}: {
	params: RouteParams & {
		address: Ethereum.Address,
	},
}) => {
	const network = networksBySlug[networkSlug]

	const publicClient = getViemPublicClient({
		network: networksBySlug['ethereum'],
		networkProvider: NetworkProvider.Alchemy,
	})

	const ensName: ENS.Name | undefined = publicClient && (
		(
			await getEnsName(publicClient, {
				address,
			})
				.catch(() => undefined)
		) as ENS.Name | undefined
	) || undefined

	const bytecode = publicClient && address && (
		await getBytecode(publicClient, { address })
			.then(contractBytecode => contractBytecode === undefined ? undefined : contractBytecode)
			.catch(() => undefined)
	)

	const contractMetadata = bytecode && await Etherscan.Contracts.getSource({
		chainId: network.chainId,
		contractAddress: address,
	})
		.then(normalizeContractSourceEtherscan)
		.catch(() => undefined)

	const addressType = bytecode && contractMetadata ? 'Contract' : 'Account'

	const contractName = contractMetadata && Object.values(contractMetadata.contractMetadata.settings.compilationTarget)?.[0]

	const sourcePaths = contractMetadata ? Object.keys(contractMetadata.contractMetadata.sources) : undefined

	return {
		address,
		network,
		publicClient,
		ensName,
		bytecode,
		contractMetadata,
		addressType,
		contractName,
		sourcePaths,
	}
}
