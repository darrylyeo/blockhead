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
	match = 'full_match',
}: {
	contractAddress: Ethereum.ContractAddress,
	chainId: Ethereum.ChainID,
	match?: 'full_match' | 'partial_match'
}) =>
	`https://repo.sourcify.dev/contracts/${match}/${chainId}/${contractAddress}`

export const getContractMetadata = async ({
	contractAddress,
	chainId,
	match,
}: {
	contractAddress: Ethereum.ContractAddress,
	chainId: Ethereum.ChainID,
	match?: 'full_match' | 'partial_match'
}) =>
	await fetch(`${getSourcifyUrl({
		contractAddress,
		chainId,
		match,
	})}/metadata.json`)
		.then(r => r.json()) as ContractMetadata<string>
