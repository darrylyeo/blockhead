import type { Ethereum } from '../data/networks/types'


export type SolidityJsonAbi = SolidityJsonAbiPart[]

export type SolidityJsonAbiPart = {
	inputs?: {
		indexed?: boolean;
		internalType: string;
		name: string;
		type: string;
		components?: TupleComponent[]
	}[];
	stateMutability?: 'pure' | 'view' | 'nonpayable' | 'payable';
	type: 'constructor' | 'event' | 'function' | 'receive' | 'fallback';
	anonymous?: boolean;
	name?: string;
	outputs?: {
		internalType: string;
		name: string;
		type: string;
	}[];
}

type TupleComponent = {
	name: 'string';
	type: 'string';
	components?: TupleComponent[];
}[]

export type ContractMetadata<SourcePath extends string> = {
	"compiler": {
		"version": string
	},
	"language": "Solidity" | string,
	"output": {
		"abi": SolidityJsonAbi,
		"devdoc": {
			"kind": "dev" | string,
			"methods": {},
			"version": number
		},
		"userdoc": {
			"kind": "user" | string,
			"methods": {},
			"version": number
		}
	},
	"settings": {
		"compilationTarget": Record<SourcePath, string>,
		"evmVersion": "istanbul" | string,
		"libraries": {},
		"metadata": {
			"bytecodeHash": "ipfs" | string
		},
		"optimizer": {
			"enabled": boolean,
			"runs": number
		},
		"remappings": []
	},
	"sources": Record<SourcePath, {
		"content"?: string,
		"keccak256": `0x${string}`, // 64
		"license": string,
		"urls"?: string[]
	}>,
	"version": number
}


export const isReadable = (part: SolidityJsonAbiPart) =>
	part.type === 'function' && part.stateMutability === 'view'

export const isWritable = (part: SolidityJsonAbiPart) =>
	part.type === 'function' && (part.stateMutability === 'nonpayable' || part.stateMutability === 'payable')


export const getSourcifyUrl = ({
	contractAddress,
	chainId,
	partialMatch = false,
}: {
	contractAddress: Ethereum.ContractAddress,
	chainId: Ethereum.ChainID,
	partialMatch?: boolean,
}) =>
	`https://repo.sourcify.dev/contracts/${partialMatch ? 'partial_match' : 'full_match'}/${chainId}/${contractAddress}`

export const getContractMetadata = async ({
	contractAddress,
	chainId,
	partialMatch,
}: {
	contractAddress: Ethereum.ContractAddress,
	chainId: Ethereum.ChainID,
	partialMatch?: boolean,
}) =>
	await fetch(`${getSourcifyUrl({
		contractAddress,
		chainId,
		partialMatch,
	})}/metadata.json`)
		.then(r => r.json()) as ContractMetadata<string>
