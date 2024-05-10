/**
 * Intuition API (2024-02-26)
 * @link https://docs.intuition.systems/api/api-information
 */

import * as publicEnv from '$env/static/public'

import { ConcurrentPromiseQueue } from '$/utils/ConcurrentPromiseQueue'
import { proxyFetch } from '$/utils/proxyFetch'

const queue = new ConcurrentPromiseQueue(1)

const get = async <T>(
	endpoint: string,
	params?: Record<string, string | number | boolean | undefined>,
) => {
	const response = await queue.enqueue(() => (
		proxyFetch(`https://api.intuition.systems/${endpoint}?${`${new URLSearchParams(params as Record<string, string>)}`}`, {
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': publicEnv.PUBLIC_INTUITION_API_KEY,
			},
		})
	))

	if(!response.ok)
		throw await response.json()

	return await response.json() as T
}

const post = async <T>(
	endpoint: string,
	body: Record<string, string | number | boolean | undefined>,
) => {
	const response = await queue.enqueue(() => (
		fetch(`https://api.intuition.systems/${endpoint}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': publicEnv.PUBLIC_INTUITION_API_KEY,
			},
			body: JSON.stringify(body),
		})
	))

	if(response.status === 200 || response.status === 202) {
		const responseJson = await response.json() as T
		return responseJson
	}

	const responseJson = await response.json() as {
		errors: {
			title: string,
			detail: string,
		}[],
	}
	throw responseJson
}


// Types
type PaginatedResponse<T> = {
	/**
	 * The current page in pagination sequence
	 */
	page: number,

	/**
	 * The max number of items returned on a single page
	 */
	limit: number,

	/**
	 * Total number of items
	 */
	total: number,

	/**
	 * Array of response items
	 */
	data: T[],
}



/**
 * Identities
 * @link https://docs.intuition.systems/api/identities
 */

type Identity = {
	vault_id: string,
	created_at: string,
	updated_at: string,
	display_name: string,
	identity_id: string,
	num_positions: number,
	assets_sum: string,
	conviction_sum: string,
	conviction_price: string,
	status?: string,
	isUser?: string,
	user_conviction?: string,
	user_conviction_value?: string,
}


/**
 * Fetch all Identities
 * @link https://docs.intuition.systems/api/identities/fetch-all-identities
 * 
 * `GET` request to `/identities` to retrieve all Identities in a paginated list.
 * 
 * @param page Current page in sequence
 * @param {number} limit Max number of items returned on single page
 * @param {string} sortBy Field to sort by. Default is created_at
 * @param {string} direction Direction to sort.Default is "desc"
 */
export const getIdentities = async ({
	page,
	limit,
	sortBy,
	direction,
}: {
	page: number,
	limit: number,
	sortBy: 'display_name' | 'created_at' | 'updated_at',
	direction: 'desc' | 'asc',
}) => (
	get<PaginatedResponse<Identity>>('identities', {
		page,
		limit,
		sortBy,
		direction,
	})	
)


/**
 * Search Identities
 * @link https://docs.intuition.systems/api/identities/search-identities
 * 
 * `GET` request to `/identities/search` to search for Identities based on specific criteria.
 * 
 * @param displayName To search by displayName you'll need to include the value from your search input.
 * @param {number} limit Max number of items returned on single page
 * @param {string} sortBy Field to sort by. Default is created_at
 * @param {string} direction Direction to sort.Default is "desc"
 */
export const searchIdentities = async ({
	displayName,
	limit,
	sortBy,
	direction,
}: {
	displayName: string,
	limit: number,
	sortBy: 'display_name' | 'created_at' | 'updated_at',
	direction: 'desc' | 'asc',
}) => (
	get<PaginatedResponse<Identity>>('identities/search', {
		displayName,
		limit,
		sortBy,
		direction,
	})
)


/**
 * Fetch an Identity
 * @link https://docs.intuition.systems/api/identities/fetch-an-identity
 * 
 * `GET` request to `/identity/:id` to fetch an Identity that matches the provided `identity_id`.
 * 
 * @param id The identity_id for the Identity you want to fetch.
 */
export const getIdentity = async ({
	id,
}: {
	id: string,
}) => (
	get<Identity>(`identity/${id}`)
)


/**
 * Create an Identity
 * @link https://docs.intuition.systems/api/identities/create-an-identity
 * 
 * `POST` request to `/identities` to create an Identity.
 * 
 * @param {string} display_name The `display_name` for the Identity.
 * @param {string} creator The Ethereum address of the Identity creator.
 * @param {string} description The description for the Identity.
 * @param {string} image_url The `image_url` for the Identity. This should be a valid URL.
 * @param {string} external_reference An `external_reference` link for the Identity. This should be a valid URL.
 */
export const createIdentity = async ({
	displayName,
	creator,
	description,
	imageUrl,
	externalReference,
}: {
	displayName: string,
	creator: string,
	description?: string,
	imageUrl: string,
	externalReference?: string,
}) => (
	post<Identity>('identities', {
		display_name: displayName,
		creator,
		description,
		image_url: imageUrl,
		external_reference: externalReference,
	})
)



/**
 * Claims
 * @link https://docs.intuition.systems/api/claim
 */

type Claim = {
	claim_id: string,
	vault_id: string,
	created_at: string,
	updated_at: string,
}


/**
 * Fetch all Claims
 * @link https://docs.intuition.systems/api/claims/fetch-all-claims
 * 
 * `GET` request to `/claims` to retrieve all Claims in a paginated list.
 * 
 * @param page Current page in sequence
 * @param {number} limit Max number of items returned on single page
 * @param {string} sortBy Field to sort by. Default is `created_at`
 * @param {string} direction Direction to sort.Default is "desc"
 */
export const getClaims = async ({
	page,
	limit,
	sortBy,
	direction,
}: {
	page: number,
	limit: number,
	sortBy: 'created_at' | 'updated_at',
	direction: 'desc' | 'asc',
}) => (
	get<Claim[]>('claims', {
		page,
		limit,
		sortBy,
		direction,
	})
)


/**
 * Fetch a Claim
 * @link https://docs.intuition.systems/api/claims/fetch-a-claim
 * 
 * `GET` request to `/claim/:id` to fetch a Claim that matches the provided `id`.
 * 
 * @param id The claim_id for the Identity you want to fetch. Example: bxxxxxxx-6xxx-4xxx-8xxx-3xxxxxxxxxxx
 */
export const getClaim = async ({
	id,
}: {
	id: ReturnType<typeof crypto.randomUUID>,
}) => (
	get<Claim>(`claim/${id}`)
)

/**
 * Create a Claim
 * @link https://docs.intuition.systems/api/claims/create-a-claim
 * 
 * `POST` request to `/claims` to create a Claim.
 * 
 * @param {string} subject The id for the Identity you're using as the subject. Example: bxxxxxxx-6xxx-4xxx-8xxx-3xxxxxxxxxxx
 * @param {string} predicate The id for the Identity you're using as the predicate. Example: bxxxxxxx-6xxx-4xxx-8xxx-3xxxxxxxxxxx
 * @param {string} object The id for the Identity you're using as the object. Example: bxxxxxxx-6xxx-4xxx-8xxx-3xxxxxxxxxxx
 * @param {string} creator The Ethereum address of the Claim creator. Example: 0x...81
 */
export const createClaim = async ({
	subject,
	predicate,
	object,
	creator,
}: {
	subject: string,
	predicate: string,
	object: string,
	creator: string,
}) => (
	post<Claim>('claims', {
		subject,
		predicate,
		object,
		creator,
	})
)



/**
 * Positions
 * @link https://docs.intuition.systems/api/positions
 */

type IdentityPosition = {
	assets: string,
	id: string,
	user: {
		wallet: string,
		id: string,
		did?: string | undefined,
		display_name?: string | undefined,
		image?: string | undefined,
	},
	conviction: string,
	updated_at: string,
	fee: string,
	delta_assets: string,
}


/**
 * Fetch Positions on an Identity
 * @link https://docs.intuition.systems/api/positions/fetch-positions-on-an-identity
 * 
 * `GET` request to `/identity/:id/positions` to fetch Identity Positions for an Identity that matches the provided `identity_id`.
 * 
 * > As we're in our Beta Testnet we're aware of potential inconsistencies with the returned response data. We encourage you to build proofs of concept that utilize this request but be mindful that the response data may be different than expected.
 * 
 * @param {string} id The `identity_id` for the Identity's Positions you want to fetch. Example: `did:intuition:ipfs:Qxxx`
 */
export const getPositions = async ({
	id,
}: {
	id: string,
}) => (
	get<PaginatedResponse<IdentityPosition>>(`identity/${id}/positions`)
)
