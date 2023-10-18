import type { Ethereum } from '../../data/networks/types'
import { env } from '../../env'

import type { DidUrl } from '../ceramic/did'

export namespace Disco {
	export type Issuer = {
		id: string;
	}

	export type CredentialSubject = {
		id: string;
		organization: string;
	}

	export type CredentialSchema = {
		id: string;
		type: string;
	}

	export type Domain = {
		chainId: number;
		name: string;
		version: string;
	}

	export type MessageSchema = Record<
		string,
		{
			name: string;
			type: string;
		}[]
	>

	export type Eip712Domain = {
		domain: Domain;
		messageSchema: MessageSchema;
		primaryType: string;
	}

	export type Proof = {
		verificationMethod: string;
		created: string;
		proofPurpose: string;
		type: string;
		proofValue: string;
		eip712Domain: Eip712Domain;
	}

	export type VerifiableCredential = {
		'@context': string[];
		type: string[];
		issuer: Issuer;
		issuanceDate: string;
		id: string;
		credentialSubject: CredentialSubject;
		expirationDate: string;
		credentialSchema: CredentialSchema;
		proof: Proof;
	}

	export type VerifiableCredentialResponse = {
		_id: string;
		vc: VerifiableCredential;
		isPublic: boolean;
		issuer: string;
		recipient: DidUrl;
		subject: DidUrl;
		schema: string;
		isDeleted: boolean;
		genId: string;
		updatedAt: string;
		history: string[];
	}

	export type VerifiableCredentialsResponse = (
		VerifiableCredentialResponse
		& {
			jwt: string;
		}
	)[]

	export type Linkage = {
		did: DidUrl;
		type: 'lens' | 'twitter' | 'discord' | 'domain' | string;
		handle: string;
	}
	
	export type Profile = {
		did: DidUrl;
		isDiscoOrg: boolean;
		profile: {
			avatar: string;
			name: string;
			bio: string;
			linkages: Linkage[];
		}
	}
}


const headers = new Headers({
	'Authorization': `Bearer ${env.DISCO_API_KEY}`
})

export const getCredential = async (
	credentialId: ReturnType<typeof crypto.randomUUID>
) => (
	await fetch(`https://api.disco.xyz/v1/credential/${encodeURIComponent(`https://api.disco.xyz/credential/${credentialId}`)}`, {
		method: 'GET',
		headers,
		redirect: 'follow',
	})
		.then(response => response.json())
		.then(result => {
			if(result.status !== 200)
				throw result

			return result
		})
) as Disco.VerifiableCredentialResponse

export const getCredentials = async (
	did: DidUrl,
	{
		page = 1,
		size = 100,
	}: {
		page?: number,
		size?: number,
	}
) => (
	await fetch(`https://api.disco.xyz/v1/credentials/${did}?${new URLSearchParams({ page: String(page), size: String(size) })}`, {
		method: 'GET',
		headers,
		redirect: 'follow',
	})
		.then(response => response.json())
) as Disco.VerifiableCredentialResponse

export const getProfile = async (
	address: Ethereum.Address,
) => (
	await fetch(`https://api.disco.xyz/v1/profile/address/${address}`, {
		method: 'GET',
		headers,
		redirect: 'follow',
	})
		.then(response => response.json())
) as Disco.Profile
