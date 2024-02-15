// Types/constants
import type { Ethereum } from '$/data/networks/types'
import type { ENS } from '$/api/ens'

import { networksBySlug } from '$/data/networks'
import { NetworkProvider } from '$/data/networkProviders/types'
import { getViemPublicClient } from '$/data/networkProviders'


// Context
import type { RouteParams } from './$types'


// Functions
import { Etherscan } from '$/api/etherscan'
import { normalizeContractSource as normalizeContractSourceEtherscan } from '$/api/etherscan/normalize'
import { getTokenBalancesCount as getTokenBalancesCountZapper } from '$/api/zapper'
import { getNftContractsCountByAddress as getNftContractsCountByAddressAirstack } from '$/api/airstack'


// OpenGraph load
export const load = async ({
	networkSlug,
	address,
}: RouteParams & {
	address: Ethereum.Address,
}) => {
	const network = networksBySlug[networkSlug]

	const publicClient = getViemPublicClient({
		network: networksBySlug['ethereum'],
		networkProvider: NetworkProvider.Alchemy,
	})

	const ensName: ENS.Name | undefined = publicClient && (
		(
			await publicClient.getEnsName({
				address,
			})
				.catch(() => undefined)
		) as ENS.Name | undefined
	) || undefined

	const bytecode = publicClient && address && (
		await publicClient.getBytecode({ address })
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

	const tokensCount = await getTokenBalancesCountZapper({
		address,
		network,
	})
		.catch(() => undefined)

	const nftContractsCount = await getNftContractsCountByAddressAirstack({
		address,
		network,
	})
		.catch(() => undefined)

	const nftsCount = 0

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
		tokensCount,
		nftContractsCount,
		nftsCount,
	}
}
