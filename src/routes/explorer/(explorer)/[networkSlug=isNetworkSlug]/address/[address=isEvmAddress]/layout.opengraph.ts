// Types/constants
import { networksBySlug } from '$/data/networks'
import { NetworkProvider } from '$/data/networkProviders/types'
import { getViemPublicClient } from '$/data/networkProviders'


// Context
import type { RouteParams } from './$types'


// Functions
import { Etherscan } from '$/api/etherscan'
import { normalizeContractSource as normalizeContractSourceEtherscan } from '$/api/etherscan/normalize'


// OpenGraph load
export const load = async ({
	networkSlug,
	address,
}: RouteParams) => {
	const network = networksBySlug[networkSlug]

	const publicClient = getViemPublicClient({
		network: networksBySlug['ethereum'],
		networkProvider: NetworkProvider.Alchemy,
	})

	const ensName = publicClient && (
		await publicClient.getEnsName({
			address,
		})
			.catch(() => undefined)
	) || undefined

	const bytecode = publicClient && address && (
		await publicClient.getBytecode({ address })
			.then(contractBytecode => contractBytecode === undefined ? undefined : contractBytecode)
	)

	const contractMetadata = bytecode && await Etherscan.Contracts.getSource({
		chainId: network.chainId,
		contractAddress: address,
	})
		.then(normalizeContractSourceEtherscan)

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
