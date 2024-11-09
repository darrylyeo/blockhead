import type { Ethereum } from '$/data/networks/types'
import { NetworkProvider } from '$/data/networkProviders/types'
import { getViemPublicClient } from '$/data/networkProviders'


// Functions
import * as publicEnv from '$env/static/public'

export const getQuicknodeEndpoint = () => (
	`https://${publicEnv.PUBLIC_QUICKNODE_ENDPOINT_NAME}.quiknode.pro/${publicEnv.PUBLIC_QUICKNODE_ENDPOINT_AUTHENTICATION_TOKEN}`
)

export const getQuickNodePublicClient = ({
	network,
}: {
	network: Ethereum.Network,
}) => {
	const publicClient = getViemPublicClient({
		network,
		networkProvider: NetworkProvider.QuickNode,
	})

	if(!publicClient)
		throw new Error(`Couldn't instantiate QuickNode client.`)

	return publicClient
}


// https://www.quicknode.com/docs/ethereum/qn_getWalletTokenBalance
export const getWalletTokenBalance = async ({
	network,
	address
}: {
	network: Ethereum.Network,
	address: Ethereum.Address
}) => {
	if(network.chainId !== 1)
		throw new Error('QuickNode only supports fetching token balances on Ethereum.')

	const publicClient = getQuickNodePublicClient({ network })

	return await publicClient.request<{
		Parameters: {
			wallet: Ethereum.Address,
		},
		ReturnType: {
			owner: Ethereum.Address,
			assets: {
				address: Ethereum.ContractAddress,
				name: string,
				decimals: number,
				symbol: string,
				logoURI: string,
				chain: string,
				network: string,
				amount: string,
			}[]
		},
	}>({
		method: 'qn_getWalletTokenBalance',
		params: {
			wallet: address,
		},
	})
}


// https://www.quicknode.com/docs/ethereum/qn_fetchNFTs
export const fetchNFTs = async ({
	network,
	address,
	contracts,
	page = 0,
	perPage = 40
}: {
	network: Ethereum.Network,
	address: Ethereum.Address,
	contracts?: Ethereum.Address[],
	page?: number,
	perPage?: number,
}) => {
	if(network.chainId !== 1)
		throw new Error('QuickNode only supports fetching NFTs on Ethereum.')

	const publicClient = getQuickNodePublicClient({ network })

	return await publicClient.request<{
		Parameters: {
			wallet: Ethereum.Address,
			contracts?: Ethereum.Address[],
			page?: number,
			perPage?: number,
		},
		ReturnType: {
			owner: string,
			assets: {
				/** The wallet address we checked for NFTs. */
				owner: string,
				/** An array of objects representing NFTs with the following shape: */
				assets: {
					/** The name of this specific NFT. */
					name: string,
					/** The token id of this NFT in its collection. */
					collectionTokenId: number,
					/** The name of this NFT's collection. */
					collectionName: string,
					/** The URL where the image for this NFT can be seen. */
					imageUrl: string,
					/** The contract address that this NFT lives in. */
					collectionAddress: string,
					/** An array of traits that this NFT has. */
					traits: string,
					/** What chain this aggregation happened on. */
					chain: string,
					/** What network this aggregation happened on. */
					network: string,
					/** An array with the transfer history for this NFT. */
					provenance: {
						/** The block number this transaction was included in. */
						blockNumber: string,
						/** The date when this transaction was mined. */
						date: string,
						/** The address for the sender of this transaction. */
						from: string,
						/** The address for the receiver of this transaction. */
						to: string,
						/** The token transfer transaction hash. */
						// to: string,
					},
				},
				/** The total number of results. */
				totalItems: string,
				/** The total number of results pages available. */
				totalPages: string,
				/** The page number of results that was returned with this response. */
				pageNumber: string,
			}[],
		},
	}>({
		method: 'qn_fetchNFTs',
		params: {
			wallet: address,
			contracts,
			page,
			perPage
		},
	})
}
