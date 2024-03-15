import type { Ethereum } from '$/data/networks/types'

export const isFunction = <
	Abi extends Ethereum.Abi,
>(part: Ethereum.AbiPart<Abi>): part is Ethereum.AbiMethod<Abi> => (
	part.type === 'function'
)

export const isReadable = <
	Abi extends Ethereum.Abi,
>(part: Ethereum.AbiPart<Abi>): part is Ethereum.AbiMethod<Abi, 'view' | 'pure'> => (
	isFunction(part) && (part.stateMutability === 'view' || part.stateMutability === 'pure')
)

export const isReadableWithoutInputs = <
	Abi extends Ethereum.Abi,
>(part: Ethereum.AbiPart<Abi>): part is Ethereum.AbiMethod<Abi, 'view' | 'pure'> => (
	isReadable(part) && !part.inputs?.length
)

export const isWritable = <
	Abi extends Ethereum.Abi,
>(part: Ethereum.AbiPart<Abi>): part is Ethereum.AbiMethod<Abi, 'nonpayable'> | Ethereum.AbiMethod<Abi, 'payable'> => (
	isFunction(part) && (part.stateMutability === 'nonpayable' || part.stateMutability === 'payable')
)
