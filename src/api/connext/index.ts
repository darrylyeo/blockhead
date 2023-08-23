// https://github.com/connext/vector-modal/blob/main/modules/sdk/src/utils/connext.ts


import { BrowserNode, NonEIP712Message } from '@connext/vector-browser-node'
import { ChannelMastercopy, WithdrawCommitment } from '@connext/vector-contracts'
import AwesomeDebouncePromise from 'awesome-debounce-promise'
import {
	ConditionalTransferCreatedPayload,
	ConditionalTransferResolvedPayload,
	DepositReconciledPayload,
	EngineEvents,
	FullChannelState,
	NodeParams,
	NodeResponses,
	TransferNames,
	WithdrawalReconciledPayload,
	jsonifyError,
	TransferQuote,
	AllowedSwap,
	WithdrawalResolvedPayload,
	ERC20Abi,
} from '@connext/vector-types'
import { calculateExchangeWad, createlockHash, getBalanceForAssetId, inverse } from '@connext/vector-utils'

import { getAddress } from '@ethersproject/address'
import { formatUnits, parseEther } from '@ethersproject/units'
import { Contract } from '@ethersproject/contracts'
import { BigNumber } from '@ethersproject/bignumber'
import { HashZero, AddressZero } from '@ethersproject/constants'
import { Web3Provider, JsonRpcSigner, BaseProvider, TransactionResponse } from '@ethersproject/providers'
import { Evt } from 'evt'
import detectEthereumProvider from '@metamask/detect-provider'


const PROD_IFRAME_WALLET = 'https://wallet.connext.network'
const iframeSrc = PROD_IFRAME_WALLET

const getOnchainBalance = async (
	ethProvider: BaseProvider,
	assetId: string,
	address: string,
): Promise<BigNumber> => {
	const balance =
		assetId === AddressZero
			? await ethProvider.getBalance(address)
			: await new Contract(assetId, ERC20Abi, ethProvider).balanceOf(address)
	return balance
}

export { WithdrawCommitment }

export const connectNode = async (
	routerPublicIdentifier: string,
	depositChainId: number,
	withdrawChainId: number,
	depositChainProvider: string,
	withdrawChainProvider: string,
	loginProvider?: Web3Provider,
	iframeSrcOverride?: string,
): Promise<BrowserNode> => {
	console.log('Connect Node')
	const browserNode = new BrowserNode({
		routerPublicIdentifier,
		iframeSrc: iframeSrcOverride ?? iframeSrc,
		supportedChains: [depositChainId, withdrawChainId],
		chainProviders: {
			[depositChainId]: depositChainProvider,
			[withdrawChainId]: withdrawChainProvider,
		},
	})

	let error: any | undefined = undefined
	let signature: string | undefined
	let signer: JsonRpcSigner | undefined
	let signerAddress: string | undefined

	// check for window provider
	const windowProvider = (await detectEthereumProvider()) as any

	// if login provider exists, i.e. for magic link, use it to sign in the dapp
	if (loginProvider) {
		console.warn('Using login provider to log in')
		signer = loginProvider.getSigner()
		signerAddress = await signer.getAddress()
		signature = await signer.signMessage(NonEIP712Message)
		console.log('signerAddress: ', signerAddress)
		console.log('signature: ', signature)
	} else if (!windowProvider) {
		throw new Error('Ethereum provider not detected and login provider not provided')
	} else if (windowProvider !== (window as any).ethereum) {
		throw new Error('Detected multiple wallets')
	} else {
		console.log('Using window provider to log in, signing in iframe')
	}

	try {
		await browserNode.init({
			signature,
			signer: signerAddress,
		})
	} catch (e) {
		// in some cases the iframe is not able to properly sign (i.e. MM mobile... for that case fall back to unsafe sig)
		if (
			(e.message ?? '').toLowerCase().includes('no signature provided') ||
			(e.message ?? '').toLowerCase().includes('provider not available')
		) {
			if (!windowProvider) {
				throw new Error('Could not get signature')
			}
			const windowWeb3 = new Web3Provider(windowProvider)
			// first choice is detected provider
			console.warn('Could not sign in iframe, signing in dapp')
			const _signer = windowWeb3.getSigner()
			signerAddress = await _signer.getAddress()
			signature = await _signer.signMessage(NonEIP712Message)
			console.log('signerAddress: ', signerAddress)
			console.log('signature: ', signature)
			try {
				await browserNode.init({
					signature,
					signer: signerAddress,
				})
			} catch (e) {
				console.error('Error initializing Browser Node:', jsonifyError(e))
				error = e
			}
		} else {
			console.error('Error initializing Browser Node:', jsonifyError(e))
			error = e
		}
	}
	const shouldAttemptRestore = (error?.context?.validationError ?? '').includes('Channel is already setup')
	if (error && !shouldAttemptRestore) {
		throw error
	}

	if (error && shouldAttemptRestore) {
		console.warn('Attempting restore from router')
		// restore state for depositChainId
		const [deposit, withdraw] = await Promise.all([
			browserNode.getStateChannelByParticipants({
				counterparty: routerPublicIdentifier,
				chainId: depositChainId,
			}),
			browserNode.getStateChannelByParticipants({
				counterparty: routerPublicIdentifier,
				chainId: withdrawChainId,
			}),
		])
		if (deposit.isError || withdraw.isError) {
			console.error('Error fetching deposit channel', deposit.getError())
			console.error('Error fetching withdraw channel', withdraw.getError())
			throw new Error('Could not retrieve channels')
		}
		if (!deposit.getValue()) {
			const restoreDepositChannelState = await browserNode.restoreState({
				counterpartyIdentifier: routerPublicIdentifier,
				chainId: depositChainId,
			})
			if (restoreDepositChannelState.isError) {
				console.error('Could not restore deposit state')
				throw restoreDepositChannelState.getError()
			}
		}

		if (!withdraw.getValue()) {
			// restore state for withdrawChainId
			const restoreWithdrawChannelState = await browserNode.restoreState({
				counterpartyIdentifier: routerPublicIdentifier,
				chainId: withdrawChainId,
			})
			if (restoreWithdrawChannelState.isError) {
				console.error('Could not restore withdraw state')
				throw restoreWithdrawChannelState.getError()
			}
		}
		console.warn('Restore complete, re-initing')
		try {
			await browserNode.init({ signature, signer: signerAddress })
		} catch (e) {
			console.error('Error initializing Browser Node:', jsonifyError(e))
			throw e
		}
	}
	console.log('connection success')

	const configRes = await browserNode.getConfig()
	if (!configRes[0]) throw new Error(`Error getConfig: node connection failed`)

	console.log('browser node config: ', configRes[0])

	return browserNode
}

export const requestCollateral = async (node: BrowserNode, channelAddress: string, _assetId: string): Promise<void> => {
	const res = await node.requestCollateral({
		channelAddress: channelAddress,
		assetId: getAddress(_assetId),
	})
	if (res.isError) {
		throw res.getError()
	}
}

export const getCrosschainFee = async (
	node: BrowserNode,
	routerIdentifier: string,
	_transferAmount: BigNumber,
	senderChainId: number,
	senderAssetId: string,
	senderAssetDecimals: number,
	receiverChainId: number,
	receiverAssetId: string,
	receiverAssetDecimals: number,
	swapDefinition: AllowedSwap,
	receiveExactAmount?: boolean,
): Promise<{
	transferQuote: TransferQuote
	totalFee: BigNumber
	senderAmount: string
	recipientAmount: string
}> => {
	const swap: AllowedSwap = swapDefinition

	let transferAmount = _transferAmount
	if (receiveExactAmount) {
		// Generally unsafe to use the inverse(swap.hardcodedRate)
		// but I think in this case it is OK because you are trying
		// to receive that amount, so the swap.hardcodedRate from the
		// correct swap would not necessarily yield the desired amounts.
		// Important to note this.

		// if input at recipient field
		// convert the input amount to senderAmount
		transferAmount = BigNumber.from(
			calculateExchangeWad(_transferAmount, receiverAssetDecimals, inverse(swap.hardcodedRate), senderAssetDecimals),
		)
	}

	const transferQuoteResult = await node.getTransferQuote({
		amount: transferAmount.toString(),
		recipientChainId: receiverChainId,
		recipientAssetId: receiverAssetId,
		recipient: node.publicIdentifier,
		routerIdentifier: routerIdentifier,
		assetId: senderAssetId,
		chainId: senderChainId,
		receiveExactAmount,
	})
	console.log('transferQuoteResult: ', transferQuoteResult.toJson())
	if (transferQuoteResult.isError) {
		throw transferQuoteResult.getError()
	}
	const depositAssetTransferFee = transferQuoteResult.getValue().fee
	const depositAssetTransferAmount = BigNumber.from(transferQuoteResult.getValue().amount)

	const totalFee = BigNumber.from(depositAssetTransferFee)
	console.log('totalFee', totalFee)

	let recipientAmount: BigNumber

	const senderAmount: BigNumber = depositAssetTransferAmount
	if (receiveExactAmount) {
		recipientAmount = calculateExchangeWad(
			depositAssetTransferAmount,
			senderAssetDecimals,
			swap.hardcodedRate,
			receiverAssetDecimals,
		)
	} else {
		recipientAmount = calculateExchangeWad(
			depositAssetTransferAmount.sub(totalFee),
			senderAssetDecimals,
			swap.hardcodedRate,
			receiverAssetDecimals,
		)
	}

	// NOTE: you may not want to rely on the retrieved quotes here when
	// actually calling transfer/withdraw. your amount will be off, and the quote
	// signature verification will fail. the transfer amount now includes the
	// withdraw fee, and the amount for the withdraw also includes a fee buffer.

	// Get total fee
	return {
		totalFee: totalFee,
		senderAmount: senderAmount.toString(),
		recipientAmount: recipientAmount.toString(),
		transferQuote: transferQuoteResult.getValue(),
	}
}

export const getFeesDebounced = AwesomeDebouncePromise(getCrosschainFee, 200)

export const getTotalDepositsBob = async (
	channelAddress: string,
	assetId: string,
	provider: BaseProvider,
): Promise<BigNumber> => {
	// see if contract was deployed
	const code = await provider.getCode(channelAddress)
	if (code === '0x') {
		// channel not deployed, all $$ at addr is users
		return getOnchainBalance(provider, assetId, channelAddress)
	}
	// get from chain
	return new Contract(channelAddress, ChannelMastercopy.abi, provider).getTotalDepositsBob(assetId)
}

// throws results to be used in retryWithDelay fn
export const reconcileDeposit = async (node: BrowserNode, channelAddress: string, _assetId: string): Promise<void> => {
	const ret = await node.reconcileDeposit({
		channelAddress,
		assetId: getAddress(_assetId),
	})
	if (ret.isError) {
		throw ret.getError()
	}
}

export const getChannelForChain = async (
	node: BrowserNode,
	routerIdentifier: string,
	chainId: number,
): Promise<FullChannelState> => {
	const depositChannelRes = await node.getStateChannelByParticipants({
		chainId,
		counterparty: routerIdentifier,
	})
	if (depositChannelRes.isError) {
		throw depositChannelRes.getError()
	}
	const channel = depositChannelRes.getValue()
	if (!channel) {
		throw new Error(`Could not find channel on ${chainId}`)
	}
	return channel as FullChannelState
}

export const createFromAssetTransfer = async (
	node: BrowserNode,
	fromChainId: number,
	_fromAssetId: string,
	toChainId: number,
	_toAssetId: string,
	routerPublicIdentifier: string,
	crossChainTransferId: string,
	preImage: string,
	quote?: TransferQuote,
): Promise<{ transferId: string; preImage: string }> => {
	const depositChannel = await getChannelForChain(node, routerPublicIdentifier, fromChainId)
	const fromAssetId = getAddress(_fromAssetId)
	const toAssetId = getAddress(_toAssetId)
	const toTransfer = getBalanceForAssetId(depositChannel, fromAssetId, 'bob')
	if (toTransfer === '0') {
		throw new Error(
			`Asset (${fromAssetId}) not in channel, please deposit. Assets: ${depositChannel.assetIds.join(',')}`,
		)
	}
	const params: NodeParams.ConditionalTransfer = {
		recipient: depositChannel.bobIdentifier,
		recipientChainId: toChainId,
		recipientAssetId: toAssetId,
		channelAddress: depositChannel.channelAddress,
		type: TransferNames.HashlockTransfer,
		assetId: fromAssetId,
		amount: toTransfer,
		meta: {
			routingId: crossChainTransferId,
			crossChainTransferId,
			fromAssetId,
			toAssetId,
		},
		details: { expiry: '0', lockHash: createlockHash(preImage) },
		publicIdentifier: depositChannel.bobIdentifier,
		quote,
	}
	console.log('transfer params', params)
	const ret = await node.conditionalTransfer(params)
	if (ret.isError) {
		throw ret.getError()
	}
	const { transferId } = ret.getValue()
	return {
		transferId,
		preImage,
	}
}

export const resolveToAssetTransfer = async (
	node: BrowserNode,
	toChainId: number,
	preImage: string,
	crossChainTransferId: string,
	routerPublicIdentifier: string,
): Promise<{ transferId: string }> => {
	const withdrawChannel = await getChannelForChain(node, routerPublicIdentifier, toChainId)

	const transfer = await node.getTransferByRoutingId({
		channelAddress: withdrawChannel.channelAddress,
		routingId: crossChainTransferId,
		publicIdentifier: withdrawChannel.bobIdentifier,
	})
	if (transfer.isError) {
		throw transfer.getError()
	}
	if (!transfer.getValue()) {
		throw new Error(`Cross-chain transfer not found in receiver channel: ${crossChainTransferId}`)
	}
	const params: NodeParams.ResolveTransfer = {
		publicIdentifier: withdrawChannel.bobIdentifier,
		channelAddress: withdrawChannel.channelAddress,
		transferId: transfer.getValue()!.transferId,
		transferResolver: { preImage },
		meta: { crossChainTransferId, routingId: crossChainTransferId },
	}
	const ret = await node.resolveTransfer(params)
	if (ret.isError) {
		throw ret.getError()
	}
	return { transferId: transfer.getValue()!.transferId }
}

export const waitForSenderCancels = async (
	node: BrowserNode,
	evt: Evt<ConditionalTransferResolvedPayload>,
	depositChannelAddress: string,
): Promise<void> => {
	const active = await node.getActiveTransfers({
		channelAddress: depositChannelAddress,
	})
	if (active.isError) {
		throw active.getError()
	}
	const hashlock = active.getValue().filter(t => {
		return Object.keys(t.transferState).includes('lockHash')
	})
	await Promise.all(
		hashlock.map(async t => {
			try {
				console.log('Waiting for sender cancellation: ', t)
				await evt.waitFor(
					data =>
						data.transfer.transferId === t.transferId &&
						data.channelAddress === depositChannelAddress &&
						Object.values(data.transfer.transferResolver)[0] === HashZero,
					300_000,
				)
			} catch (e) {
				console.error('Timed out waiting for cancellation:', e)
			}
		}),
	)
	const final = await node.getActiveTransfers({
		channelAddress: depositChannelAddress,
	})
	if (final.isError) {
		throw final.getError()
	}
	const remaining = final.getValue().filter(t => {
		return Object.keys(t.transferState).includes('lockHash')
	})
	if (remaining.length > 0) {
		throw new Error('Hanging sender transfers')
	}
}

export const cancelToAssetTransfer = async (
	node: BrowserNode,
	withdrawChannelAddess: string,
	transferId: string,
	cancellationReason: string,
): Promise<NodeResponses.ResolveTransfer> => {
	const params = {
		channelAddress: withdrawChannelAddess,
		transferId: transferId,
		transferResolver: { preImage: HashZero },
		meta: {
			cancellationReason,
		},
	}
	const ret = await node.resolveTransfer(params)
	if (ret.isError) {
		throw ret.getError()
	}
	return ret.getValue()
}

export const cancelHangingToTransfers = async (
	node: BrowserNode,
	evt: Evt<ConditionalTransferResolvedPayload>,
	fromChainId: number,
	toChainId: number,
	_toAssetId: string,
	routerPublicIdentifier: string,
): Promise<(NodeResponses.ResolveTransfer | undefined)[]> => {
	const depositChannel = await getChannelForChain(node, routerPublicIdentifier, fromChainId)
	const withdrawChannel = await getChannelForChain(node, routerPublicIdentifier, toChainId)

	const toAssetId = getAddress(_toAssetId)
	const transfers = await node.getActiveTransfers({
		publicIdentifier: withdrawChannel.bobIdentifier,
		channelAddress: withdrawChannel.channelAddress,
	})
	if (transfers.isError) {
		throw transfers.getError()
	}

	const toCancel = transfers.getValue().filter(t => {
		const amResponder = t.responderIdentifier === withdrawChannel.bobIdentifier
		const correctAsset = t.assetId === toAssetId
		const isHashlock = Object.keys(t.transferState).includes('lockHash')
		const wasForwarded = !!t.meta?.routingId
		return amResponder && correctAsset && isHashlock && wasForwarded
	})

	// wait for all hanging transfers to cancel
	const hangingResolutions = (await Promise.all(
		toCancel.map(async transferToCancel => {
			try {
				console.warn(
					'Cancelling hanging receiver transfer w/routingId:',
					transferToCancel.meta!.routingId,
					'and transferId:',
					transferToCancel.transferId,
				)
				const params: NodeParams.ResolveTransfer = {
					publicIdentifier: withdrawChannel.bobIdentifier,
					channelAddress: withdrawChannel.channelAddress,
					transferId: transferToCancel.transferId,
					transferResolver: { preImage: HashZero },
				}
				// for receiver transfer cancellatino
				const resolved = await new Promise(async (res, rej) => {
					const resolveRes = await node.resolveTransfer(params)
					if (resolveRes.isError) {
						console.error('Failed to cancel transfer:', resolveRes.getError())
						return rej(resolveRes.getError()?.message)
					}
					return res(resolveRes.getValue())
				})
				// for sender transfer cancellation
				await evt.waitFor(
					data =>
						data.transfer.meta.routingId === transferToCancel.meta!.routingId &&
						data.channelAddress === depositChannel.channelAddress &&
						Object.values(data.transfer.transferResolver)[0] === HashZero,
					45_000,
				)
				return resolved
			} catch (e) {
				console.error('Error cancelling hanging', e)
				return undefined
			}
		}),
	)) as (NodeResponses.ResolveTransfer | undefined)[]
	return hangingResolutions
}

export const withdrawToAsset = async (
	node: BrowserNode,
	toChainId: number,
	_toAssetId: string,
	recipientAddr: string,
	routerPublicIdentifier: string,
	withdrawCallTo?: string,
	withdrawCallData?: string,
	generateCallData?: (toWithdraw: string, toAssetId: string, node: BrowserNode) => Promise<{ callData?: string }>,
): Promise<{ withdrawalTx: string; withdrawalAmount: string }> => {
	console.log('Starting withdrawal: ', {
		toChainId,
		_toAssetId,
		recipientAddr,
		routerPublicIdentifier,
		withdrawCallTo,
		withdrawCallData,
	})
	const withdrawChannel = await getChannelForChain(node, routerPublicIdentifier, toChainId)

	const toAssetId = getAddress(_toAssetId)
	const toWithdraw = getBalanceForAssetId(withdrawChannel, toAssetId, 'bob')
	if (toWithdraw === '0') {
		throw new Error('Asset not in receiver channel')
	}

	let callData = withdrawCallData
	if (generateCallData && typeof generateCallData === 'function') {
		console.log('Using generateCallData function')
		const res = await generateCallData(toWithdraw, toAssetId, node)
		callData = res.callData ? res.callData : withdrawCallData
	}

	const params: NodeParams.Withdraw = {
		amount: toWithdraw,
		assetId: toAssetId,
		channelAddress: withdrawChannel.channelAddress,
		publicIdentifier: withdrawChannel.bobIdentifier,
		recipient: recipientAddr,
		callTo: withdrawCallTo,
		callData,
	}
	console.log('withdraw params', params)
	const ret = await node.withdraw(params)
	if (ret.isError) {
		throw ret.getError()
	}
	const { transactionHash } = ret.getValue()
	console.log(ret.getValue())
	if (!transactionHash) {
		// TODO: prompt router to retry sending transaction
		throw new Error('Router failed to withdraw')
	}

	const result = {
		withdrawalTx: transactionHash,
		withdrawalAmount: toWithdraw,
	}
	return result
}

// return strings, does not need to be retried
export const verifyAndGetRouterSupports = async (
	node: BrowserNode,
	fromChainId: number,
	_fromAssetId: string,
	toChainId: number,
	_toAssetId: string,
	ethProvider: BaseProvider, // For `to` chain
	routerPublicIdentifier: string,
): Promise<AllowedSwap> => {
	const withdrawChannel = await getChannelForChain(node, routerPublicIdentifier, toChainId)

	const fromAssetId = getAddress(_fromAssetId)
	const toAssetId = getAddress(_toAssetId)
	const config = await node.getRouterConfig({
		routerIdentifier: withdrawChannel.aliceIdentifier,
	})
	if (config.isError) {
		console.error('Router config error:', config.getError()?.toJson())
		throw new Error('Router config unavailable')
	}
	const { supportedChains, allowedSwaps } = config.getValue()
	console.log('Router supportedChains: ', supportedChains)
	console.log('Router allowedSwaps: ', allowedSwaps)
	if (!supportedChains.includes(fromChainId) || !supportedChains.includes(toChainId)) {
		throw new Error(`Router does not support chains`)
	}
	// let invertRate = false
	console.log('fromAssetId.toLowerCase(): ', fromAssetId.toLowerCase())
	console.log('toAssetId.toLowerCase(): ', toAssetId.toLowerCase())
	console.log('fromChainId: ', fromChainId)
	console.log('toChainId: ', toChainId)
	const swap = allowedSwaps.find(s => {
		const noninverted =
			s.fromAssetId.toLowerCase() === fromAssetId.toLowerCase() &&
			s.fromChainId === fromChainId &&
			s.toAssetId.toLowerCase() === toAssetId.toLowerCase() &&
			s.toChainId === toChainId
		return noninverted
	})
	if (!swap) {
		throw new Error('Swap is not supported by router')
	}

	// Verify sufficient gas
	const minGas = parseEther('0.1')
	const routerGasBudget = await getOnchainBalance(ethProvider, AddressZero, withdrawChannel.alice)
	if (routerGasBudget.lt(minGas)) {
		throw new Error('Router has insufficient gas funds')
	}
	return swap
}

export const verifyRouterCapacityForTransfer = async (
	ethProvider: BaseProvider,
	toAssetId: string,
	toAssetDecimals: number,
	withdrawChannel: FullChannelState,
	transferAmount: BigNumber,
	swap: any,
	fromAssetDecimals: number,
): Promise<void> => {
	console.log(`verifyRouterCapacityForTransfer for ${transferAmount}`)
	const routerOnchain = await getOnchainBalance(ethProvider, toAssetId, withdrawChannel.alice)
	const routerOffchain = BigNumber.from(getBalanceForAssetId(withdrawChannel, toAssetId, 'alice'))
	const swappedAmount = calculateExchangeWad(transferAmount, fromAssetDecimals, swap.hardcodedRate, toAssetDecimals)
	console.log('transferAmount: ', transferAmount.toString())
	console.log('swappedAmount: ', swappedAmount.toString())
	console.log('routerOnchain: ', routerOnchain.toString())
	console.log('routerOffchain: ', routerOffchain.toString())
	if (routerOffchain.gte(swappedAmount)) {
		return
	}

	const routerBalanceFull = routerOnchain.add(routerOffchain)
	console.log('routerBalanceFull: ', routerBalanceFull)
	console.log('routerBalanceFull.lt(swappedAmount): ', routerBalanceFull.lt(swappedAmount))
	if (routerBalanceFull.lt(swappedAmount)) {
		throw new Error(
			`Router has insufficient exit liquidity, please try again later. Available: ${formatUnits(
				routerBalanceFull.toString(),
				toAssetDecimals,
			)}`,
		)
	}
}

export type EvtContainer = {
	[EngineEvents.CONDITIONAL_TRANSFER_CREATED]: Evt<ConditionalTransferCreatedPayload>
	[EngineEvents.CONDITIONAL_TRANSFER_RESOLVED]: Evt<ConditionalTransferResolvedPayload>
	[EngineEvents.DEPOSIT_RECONCILED]: Evt<DepositReconciledPayload>
	[EngineEvents.WITHDRAWAL_RECONCILED]: Evt<WithdrawalReconciledPayload>
	[EngineEvents.WITHDRAWAL_RESOLVED]: Evt<WithdrawalResolvedPayload>
}

export const createEvtContainer = (node: BrowserNode): EvtContainer => {
	const createdTransfer = Evt.create<ConditionalTransferCreatedPayload>()
	const resolvedTransfer = Evt.create<ConditionalTransferResolvedPayload>()
	const deposit = Evt.create<DepositReconciledPayload>()
	const withdrawReconciled = Evt.create<WithdrawalReconciledPayload>()
	const withdrawResolved = Evt.create<WithdrawalResolvedPayload>()

	node.on(EngineEvents.CONDITIONAL_TRANSFER_CREATED, data => {
		console.log('EngineEvents.CONDITIONAL_TRANSFER_CREATED: ', data)
		createdTransfer.post(data)
	})
	node.on(EngineEvents.CONDITIONAL_TRANSFER_RESOLVED, data => {
		console.log('EngineEvents.CONDITIONAL_TRANSFER_RESOLVED: ', data)
		resolvedTransfer.post(data)
	})
	node.on(EngineEvents.DEPOSIT_RECONCILED, data => {
		console.log('EngineEvents.DEPOSIT_RECONCILED: ', data)
		deposit.post(data)
	})
	node.on(EngineEvents.WITHDRAWAL_RECONCILED, data => {
		console.log('EngineEvents.WITHDRAWAL_RECONCILED: ', data)
		withdrawReconciled.post(data)
	})
	node.on(EngineEvents.WITHDRAWAL_RESOLVED, data => {
		console.log('EngineEvents.WITHDRAWAL_RESOLVED: ', data)
		withdrawResolved.post(data)
	})
	return {
		[EngineEvents.CONDITIONAL_TRANSFER_CREATED]: createdTransfer,
		[EngineEvents.CONDITIONAL_TRANSFER_RESOLVED]: resolvedTransfer,
		[EngineEvents.DEPOSIT_RECONCILED]: deposit,
		[EngineEvents.WITHDRAWAL_RECONCILED]: withdrawReconciled,
		[EngineEvents.WITHDRAWAL_RESOLVED]: withdrawResolved,
	}
}

export const onchainTransfer = async (
	depositAddress: string,
	assetId: string,
	transferAmountBn: BigNumber,
	signer: JsonRpcSigner,
): Promise<TransactionResponse> => {
	const tx =
		assetId === AddressZero
			? await signer.sendTransaction({
					to: depositAddress,
					value: transferAmountBn.toHexString(),
				})
			: await new Contract(assetId, ERC20Abi, signer).transfer(depositAddress, transferAmountBn)

	return tx
}

export const withdrawRetry = async (
	node: BrowserNode,
	transferId: string,
	channelAddress: string,
	publicIdentifier?: string,
): Promise<string> => {
	const ret = await node.withdrawRetry({
		transferId: transferId,
		channelAddress: channelAddress,
		publicIdentifier: publicIdentifier,
	})

	if (ret.isError) {
		throw ret.getError()
	}

	if (!ret.getValue() || !ret.getValue().transactionHash) {
		throw new Error('Transaction hash undefined')
	}

	return ret.getValue().transactionHash!
};




/*
import {
	ConnextSdk,
	ChainDetail,
	getTotalDepositsBob,
	getChain,
	truncate,
	isValidAddress,
	TransferQuote,
	getUserBalance,
	BrowserNode,
	VectorError
} from '@connext/vector-sdk'
// '../../../node_modules/@connext/vector-sdk/dist/index'

import { formatUnits } from 'ethers/lib/utils.js'

export async function startConnextTransfer({
	fromNetwork,
	fromNetworkProvider,
	fromAccount,
	fromToken,
	fromTokenAmount,

	toNetwork,
	toNetworkProvider,
	toAccount,
	toToken,
	toTokenAmount,
}: {
	fromNetwork: Ethereum.Network,
	fromNetworkProvider: Ethereum.PublicClient,
	fromAccount: Account,
	fromToken: Ethereum.ContractAddress,
	fromTokenAmount: number

	toNetwork: Ethereum.Network,
	toNetworkProvider: Ethereum.PublicClient,
	toAccount: Account,
	toToken: Ethereum.ContractAddress,
	toTokenAmount: number
}){
	const fromAddress = fromAccount.id
	const fromChainID = fromNetwork.chainId
	const toAddress = toAccount.id
	const toChainID = toNetwork.chainId


	// https://github.com/connext/vector-modal/blob/main/modules/widget/src/components/Modal.tsx

	// import { ConnextSdk } from '@connext/vector-sdk'
	// const {
	// 	ConnextSdk,
	// 	ChainDetail,
	// 	getTotalDepositsBob,
	// 	getChain,
	// 	truncate,
	// 	isValidAddress,
	// 	TransferQuote,
	// 	getUserBalance,
	// 	BrowserNode,
	// 	VectorError
	// } = await import('@connext/vector-sdk')


	if(!isValidAddress(toAddress))
		throw new Error(`Invalid receiver address: ${toAddress}`)


	const senderChainInfo: ChainDetail = await getChain(fromChainID, fromNetworkProvider, fromToken)
	const receiverChainInfo: ChainDetail = await getChain(toChainID, toNetworkProvider, toToken)


	const signer = fromAccount.provider.getSigner()
	// const fromAddress = await signer.getAddress()
	console.assert(fromAddress === await signer.getAddress())


	const currentBalance = await getUserBalance(
		fromAccount.provider,
		senderChainInfo.assetId,
		senderChainInfo.assetDecimals,
	)


	const connextSdk = new ConnextSdk()

	// const {
	// 	offChainSenderChainAssetBalanceBn,
	// 	offChainRecipientChainAssetBalanceBn
	// } = await connextSdk.init({
	await connextSdk.setup({
		routerPublicIdentifier: Connext.mainnetPublicIdentifier, // Router Public Identifier
		loginProvider: fromAccount.provider, // Web3/JsonRPCProvider
		senderChainProvider: fromNetwork.rpc[0], // Rpc Provider Link
		senderAssetId: fromToken, // Asset/Token Address on Sender Chain
		senderChainId: fromChainID,
		recipientChainProvider: toNetwork.rpc[0], // Rpc Provider Link
		recipientAssetId: toToken, // Asset/Token Address on Recipient Chain
		recipientChainId: toChainID,
		// iframeSrcOverride
	})


	// onReady({
	// 	depositChannelAddress: connextSdk!.senderChainChannelAddress,
	// 	withdrawChannelAddress: connextSdk!.recipientChainChannelAddress,
	// })


	// Looking for pending transfers...
	const {
		offChainSenderChainAssetBalanceBn,
		offChainRecipientChainAssetBalanceBn
	} = await connextSdk!.checkPendingTransfer()
	
	const hasExistingDepositBalance = offChainSenderChainAssetBalanceBn.gt(0)
	const existingDepositBalance = formatUnits(offChainSenderChainAssetBalanceBn, senderChainInfo?.assetDecimals!)

	const hasExistingWithdrawBalance = offChainRecipientChainAssetBalanceBn.gt(0)
	const existingWithdrawBalance = formatUnits(offChainRecipientChainAssetBalanceBn, receiverChainInfo?.assetDecimals!)

	
	if(hasExistingWithdrawBalance)
		await connextSdk.withdraw({
			recipientAddress: toAddress,
			// onFinished: onSuccess,
			// withdrawalCallTo: withdrawCallTo,
			// withdrawalCallData: withdrawCallData,
			// generateCallData: generateCallData,
		})
	// `withdrawing ${senderChain?.assetName} to ${receiverChain?.name}. This step can take some time if the chain is congested`
}
*/