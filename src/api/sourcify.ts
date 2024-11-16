import type { Ethereum } from '$/data/networks/types'

export const getSourcifyUrl = ({
	contractAddress,
	chainId,
	partialMatch = false,
}: {
	contractAddress: Ethereum.ContractAddress,
	chainId: Ethereum.ChainId,
	partialMatch?: boolean,
}) =>
	`https://repo.sourcify.dev/contracts/${partialMatch ? 'partial_match' : 'full_match'}/${chainId}/${contractAddress}`

export const getContractMetadata = async ({
	contractAddress,
	chainId,
	partialMatch,
}: {
	contractAddress: Ethereum.ContractAddress,
	chainId: Ethereum.ChainId,
	partialMatch?: boolean,
}) => {
	const sourcifyUrl = getSourcifyUrl({
		contractAddress,
		chainId,
		partialMatch,
	})

	const contractMetadata = await fetch(`${sourcifyUrl}/metadata.json`).then(r => r.json()) as Ethereum.ContractMetadata<string>

	return {
		repository: {
			name: 'Sourcify',
			url: sourcifyUrl,
		},
		contractMetadata,
	}
}
