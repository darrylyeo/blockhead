import { DataSource } from '$/data'
import { selectedDatasource } from '$/state/datasource.svelte'

// Helper function to recursively convert BigInt values to strings
const convertBigIntToString = (obj: any): any => {
	if (obj === null || obj === undefined) {
		return obj
	}
	
	if (typeof obj === 'bigint') {
		return obj.toString()
	}
	
	if (Array.isArray(obj)) {
		return obj.map(convertBigIntToString)
	}
	
	if (typeof obj === 'object') {
		const converted: any = {}
		for (const [key, value] of Object.entries(obj)) {
			converted[key] = convertBigIntToString(value)
		}
		return converted
	}
	
	return obj
}

export const fetch = async (
	input: RequestInfo | URL,
	init?: RequestInit,
): Promise<Response> => {
	if (!(typeof input === 'string' || input instanceof URL && init && typeof init?.body === 'string'))
		return fetch(input, init)

	const { operationName, variables } = JSON.parse(init!.body as string)
	// Use selected datasource from store, fallback to variables, then default to Blockscout
	const datasource = selectedDatasource.current ?? variables.datasource ?? DataSource.Blockscout
	const otherVariables = { ...variables, datasource }
	delete otherVariables.datasource

	try {
		const result = await (async () => {
			switch (datasource) {
				case DataSource.OneInch: {
					const { createClient } = await import('$/api/1inch')
					const client = createClient()

					switch (operationName) {
						case 'balances': {
							const { chainId, walletAddress, account } = otherVariables
							const address = walletAddress || account
							
							const result = await client.fetchEndpoint(`/v1.2/${chainId}/balances/${address}`)
							
							return {
								data: {
									balances: result,
									__typename: 'OneInchBalances'
								}
							}
						}

						case 'swapQuote': {
							const { chainId, ...params } = otherVariables
							const queryParams = new URLSearchParams(params).toString()
							
							const result = await client.fetchEndpoint(`/v6.0/${chainId}/quote?${queryParams}`)
							
							return {
								data: {
									swapQuote: result,
									__typename: 'OneInchSwapQuote'
								}
							}
						}

						case 'swap': {
							const { chainId, ...params } = otherVariables
							const queryParams = new URLSearchParams(params).toString()
							
							const result = await client.fetchEndpoint(`/v6.0/${chainId}/swap?${queryParams}`)
							
							return {
								data: {
									swap: result,
									__typename: 'OneInchSwap'
								}
							}
						}

						case 'tokens': {
							const { chainId } = otherVariables
							
							const result = await client.fetchEndpoint(`/v6.0/${chainId}/tokens`)
							
							return {
								data: {
									tokens: result,
									__typename: 'OneInchTokens'
								}
							}
						}

						case 'gasPrices': {
							const { chainId } = otherVariables
							
							const result = await client.fetchEndpoint(`/v1.6/${chainId}`)
							
							return {
								data: {
									gasPrices: result,
									__typename: 'OneInchGasPrices'
								}
							}
						}

						case 'spotPrices': {
							const { chainId } = otherVariables
							
							const result = await client.fetchEndpoint(`/v1.1/${chainId}`)
							
							return {
								data: {
									spotPrices: result,
									__typename: 'OneInchSpotPrices'
								}
							}
						}

						case 'tokenPriceHistory': {
							const { token0, token1, period, chainId } = otherVariables
							
							const result = await client.fetchEndpoint(`/v1.0/chart/line/${token0}/${token1}/${period}/${chainId}`)
							
							return {
								data: {
									tokenPriceHistory: result,
									__typename: 'OneInchTokenPriceHistory'
								}
							}
						}

						default:
							return { data: {} }
					}
				}
				
				case DataSource.EthereumJsonRpc: {
					switch (operationName) {
						case 'getBalance': {
							const { getViemClient } = await import('$/api/viem')
							const { chainId, address } = otherVariables
							
							const client = getViemClient(chainId)
							const balance = await client.getBalance({ address })
							
							return {
								data: {
									balance: balance.toString(),
									__typename: 'ViemBalance'
								}
							}
						}

						case 'getBlock': {
							const { getViemClient } = await import('$/api/viem')
							const { chainId, blockNumber, blockHash } = otherVariables
							
							const client = getViemClient(chainId)
							const block = await client.getBlock({
								...(blockNumber && { blockNumber: BigInt(blockNumber) }),
								...(blockHash && { blockHash }),
							})
							
							return {
								data: {
									block: {
										...block,
										number: block.number?.toString(),
										timestamp: block.timestamp.toString(),
										gasLimit: block.gasLimit.toString(),
										gasUsed: block.gasUsed.toString(),
										size: block.size.toString(),
									},
									__typename: 'ViemBlock'
								}
							}
						}

						case 'getTransaction': {
							const { getViemClient } = await import('$/api/viem')
							const { chainId, hash } = otherVariables
							
							const client = getViemClient(chainId)
							const transaction = await client.getTransaction({ hash })
							
							return {
								data: {
									transaction: {
										...transaction,
										blockNumber: transaction.blockNumber?.toString(),
										value: transaction.value.toString(),
										gas: transaction.gas.toString(),
										gasPrice: transaction.gasPrice?.toString(),
										nonce: transaction.nonce.toString(),
									},
									__typename: 'ViemTransaction'
								}
							}
						}

						case 'getTransactionReceipt': {
							const { getViemClient } = await import('$/api/viem')
							const { chainId, hash } = otherVariables
							
							const client = getViemClient(chainId)
							const receipt = await client.getTransactionReceipt({ hash })
							
							return {
								data: {
									transactionReceipt: {
										...receipt,
										blockNumber: receipt.blockNumber.toString(),
										cumulativeGasUsed: receipt.cumulativeGasUsed.toString(),
										gasUsed: receipt.gasUsed.toString(),
										transactionIndex: receipt.transactionIndex.toString(),
									},
									__typename: 'ViemTransactionReceipt'
								}
							}
						}

						case 'getCode': {
							const { getViemClient } = await import('$/api/viem')
							const { chainId, address } = otherVariables
							
							const client = getViemClient(chainId)
							const code = await client.getCode({ address })
							
							return {
								data: {
									code,
									__typename: 'ViemCode'
								}
							}
						}

						case 'readContract': {
							const { getViemClient, erc20Abi, erc721Abi, erc1155Abi } = await import('$/api/viem')
							const { chainId, address, abi, functionName, args } = otherVariables
							
							const client = getViemClient(chainId)
							
							let selectedAbi = abi
							if (!selectedAbi) {
								selectedAbi = erc20Abi
							} else if (typeof selectedAbi === 'string') {
								switch (selectedAbi) {
									case 'erc20':
										selectedAbi = erc20Abi
										break
									case 'erc721':
										selectedAbi = erc721Abi
										break
									case 'erc1155':
										selectedAbi = erc1155Abi
										break
								}
							}
							
							const result = await client.readContract({
								address,
								abi: selectedAbi,
								functionName,
								args,
							})
							
							return {
								data: {
									contractRead: result,
									__typename: 'ViemContractRead'
								}
							}
						}

						case 'getLogs': {
							const { getViemClient } = await import('$/api/viem')
							const { chainId, address, topics, fromBlock, toBlock } = otherVariables
							
							const client = getViemClient(chainId)
							const logs = await client.getLogs({
								address,
								topics,
								...(fromBlock && { fromBlock: BigInt(fromBlock) }),
								...(toBlock && { toBlock: BigInt(toBlock) }),
							})
							
							return {
								data: {
									logs: logs.map(log => ({
										...log,
										blockNumber: log.blockNumber.toString(),
										transactionIndex: log.transactionIndex.toString(),
										logIndex: log.logIndex.toString(),
									})),
									__typename: 'ViemLogs'
								}
							}
						}

						default:
							return { data: {} }
					}
				}
				
				case DataSource.Blockscout:
				default: {
					switch (operationName) {
						case 'actor': {
							const { fetch, normalize } = await import('$/data/actor/blockscout')
							const { ActorType } = await import('$/entities/actor')

							const result = await fetch(otherVariables)
							const actor = normalize(result, otherVariables)

							return {
								data: {
									actor: {
										...actor,
										__typename: {
											[ActorType.Contract]: 'Actor_Contract',
											[ActorType.Eoa]: 'Actor_Eoa'
										}[actor.type]
									}
								}
							}
						}

						case 'balance': {
							const { fetch, normalize } = await import('$/data/balance/blockscout')
							const { TokenStandard } = await import('$/entities/token')

							const result = await fetch(otherVariables)
							const balance = normalize(result, otherVariables)

							return {
								data: {
									balance: {
										...balance,
										__typename: {
											[TokenStandard.Native]: 'Balance_Native',
											[TokenStandard.Erc20]: 'Balance_Erc20',
											[TokenStandard.Erc721]: 'Balance_Erc721',
											[TokenStandard.Erc1155]: 'Balance_Erc1155',
											[TokenStandard.Erc4626]: 'Balance_Erc20'
										}[balance.standard]
									}
								}
							}
						}

						case 'block': {
							const { fetch, normalize } = await import('$/data/block/blockscout')

							const result = await fetch(otherVariables)
							const block = normalize(result, otherVariables)

							return {
								data: {
									block: {
										...block,
										__typename: 'Block'
									}
								}
							}
						}

						case 'contract': {
							const { fetch, normalize } = await import('$/data/contract/blockscout')

							const result = await fetch(otherVariables)
							const contract = normalize(result, otherVariables)

							return {
								data: {
									contract: {
										...contract,
										__typename: 'Contract'
									}
								}
							}
						}

						case 'event': {
							const { fetch, normalize } = await import('$/data/event/blockscout')
							const { EventCategory } = await import('$/entities/event')

							const result = await fetch(otherVariables)
							const event = normalize(result, otherVariables)

							return {
								data: {
									event: {
										...event,
										__typename: {
											[EventCategory.Transfer]: 'Event_Transfer',
											[EventCategory.Swap]: 'Event_Swap',
											[EventCategory.Approval]: 'Event_Approval',
											[EventCategory.Mint]: 'Event_Custom',
											[EventCategory.Burn]: 'Event_Custom',
											[EventCategory.Liquidity]: 'Event_Custom',
											[EventCategory.Lending]: 'Event_Custom',
											[EventCategory.Staking]: 'Event_Custom',
											[EventCategory.Governance]: 'Event_Custom',
											[EventCategory.Bridge]: 'Event_Custom',
											[EventCategory.Oracle]: 'Event_Custom',
											[EventCategory.System]: 'Event_Custom',
											[EventCategory.Custom]: 'Event_Custom'
										}[event.category]
									}
								}
							}
						}

						case 'nft': {
							const { fetch, normalize } = await import('$/data/nft/blockscout')

							const result = await fetch(otherVariables)
							const nft = normalize(result, otherVariables)

							return {
								data: {
									nft: {
										...nft,
										__typename: 'Nft'
									}
								}
							}
						}

						case 'token': {
							const { fetch, normalize } = await import('$/data/token/blockscout')
							const { TokenStandard } = await import('$/entities/token')

							const result = await fetch(otherVariables)
							const token = normalize(result, otherVariables)

							// Create type mapping with proper typing
							const typeMapping: Record<string, string> = {
								[TokenStandard.Native]: 'Token_Native',
								[TokenStandard.Erc20]: 'Token_Erc20',
								[TokenStandard.Erc721]: 'Token_Erc721',
								[TokenStandard.Erc1155]: 'Token_Erc1155',
								[TokenStandard.Erc4626]: 'Token_Erc20'
							}

							return {
								data: {
									token: {
										...token,
										__typename: typeMapping[token.standard] || 'Token_Erc20'
									}
								}
							}
						}

						case 'trace': {
							const { fetch, normalize } = await import('$/data/trace/blockscout')

							const result = await fetch(otherVariables)
							const trace = normalize(result, otherVariables)

							return {
								data: {
									trace: {
										...trace,
										__typename: 'Trace'
									}
								}
							}
						}

						case 'transaction': {
							const { fetch, normalize } = await import('$/data/transaction/blockscout')

							const result = await fetch(otherVariables)
							const transaction = normalize(result, otherVariables)

							return {
								data: {
									transaction: {
										...transaction,
										__typename: 'Transaction'
									}
								}
							}
						}

						case 'transfer': {
							const { fetch, normalize } = await import('$/data/transfer/blockscout')

							const result = await fetch(otherVariables)
							const transfer = normalize(result, otherVariables)

							return {
								data: {
									transfer: {
										...transfer,
										__typename: 'Transfer'
									}
								}
							}
						}

						default:
							return { data: {} }
					}
				}
			}
		})()

		console.log('fetch', { operationName, variables }, {result})

		// Convert BigInt values to strings before serializing
		const serializedResult = convertBigIntToString(result)

		return new Response(
			JSON.stringify(serializedResult),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			}
		)
	} catch (error: any) {
		return new Response(
			JSON.stringify({
				data: null,
				errors: [{ message: error.message }]
			}),
			{
				status: 200,
				headers: { 'Content-Type': 'application/json' }
			}
		)
	}
}
