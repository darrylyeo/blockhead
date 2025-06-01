export const fetch = async (
	input: RequestInfo | URL,
	init?: RequestInit,
): Promise<Response> => {
	if (!(typeof input === 'string' || input instanceof URL && init && typeof init?.body === 'string'))
		return fetch(input, init)

	const { operationName, variables } = JSON.parse(init!.body as string)

	try {
		const result = await (async () => {
			switch (operationName) {
				case 'actor': {
					const { fetch, normalize } = await import('$/data/actor/blockscout')
					const { ActorType } = await import('$/entities/actor')

					const result = await fetch(variables)

					const actor = normalize(result, variables)

					return {
						data: {
							actor: {
								...actor,
								__typename: {
									[ActorType.Contract]: 'ContractActor',
									[ActorType.Eoa]: 'EoaActor'
								}[actor.type]
							}
						}
					}
				}

				case 'balance': {
					const { fetch, normalize } = await import('$/data/balance/blockscout')
					const { TokenStandard } = await import('$/entities/token')

					const result = await fetch(variables)

					const balance = normalize(result, variables)

					return {
						data: {
							balance: {
								...balance,
								__typename: {
									[TokenStandard.Native]: 'NativeBalance',
									[TokenStandard.Erc20]: 'Erc20Balance',
									[TokenStandard.Erc721]: 'Erc20Balance',
									[TokenStandard.Erc1155]: 'Erc20Balance',
									[TokenStandard.Erc4626]: 'Erc20Balance'
								}[balance.standard]
							}
						}
					}
				}

				case 'block': {
					const { fetch, normalize } = await import('$/data/block/blockscout')

					const result = await fetch(variables)

					const block = normalize(result, variables)

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

					const result = await fetch(variables)

					const contract = normalize(result, variables)

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

					const result = await fetch(variables)

					const event = normalize(result, variables)

					return {
						data: {
							event: {
								...event,
								__typename: {
									[EventCategory.Transfer]: 'TransferEvent',
									[EventCategory.Swap]: 'SwapEvent',
									[EventCategory.Approval]: 'ApprovalEvent',
									[EventCategory.Mint]: 'Event',
									[EventCategory.Burn]: 'Event',
									[EventCategory.Liquidity]: 'Event',
									[EventCategory.Lending]: 'Event',
									[EventCategory.Staking]: 'Event',
									[EventCategory.Governance]: 'Event',
									[EventCategory.Bridge]: 'Event',
									[EventCategory.Oracle]: 'Event',
									[EventCategory.System]: 'Event',
									[EventCategory.Custom]: 'Event'
								}[event.category]
							}
						}
					}
				}

				case 'nft': {
					const { fetch, normalize } = await import('$/data/nft/blockscout')

					const result = await fetch(variables)

					const nft = normalize(result, variables)

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

					const result = await fetch(variables)

					const token = normalize(result, variables)

					return {
						data: {
							token: {
								...token,
								__typename: {
									[TokenStandard.Native]: 'NativeToken',
									[TokenStandard.Erc20]: 'Erc20Token',
									[TokenStandard.Erc721]: 'Erc20Token',
									[TokenStandard.Erc1155]: 'Erc20Token',
									[TokenStandard.Erc4626]: 'Erc20Token'
								}[token.standard]
							}
						}
					}
				}

				case 'trace': {
					const { fetch, normalize } = await import('$/data/trace/blockscout')

					const result = await fetch(variables)

					const trace = normalize(result, variables)

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

					const result = await fetch(variables)

					const transaction = normalize(result, variables)

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

					const result = await fetch(variables)

					const transfer = normalize(result, variables)

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
		})()

		return new Response(
			JSON.stringify(result),
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
