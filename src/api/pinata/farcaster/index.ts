/**
 * Pinata - Farcaster API (2024-05-20)
 * {@link https://docs.pinata.cloud/farcaster/farcaster-api/getting-started}
 */
import * as publicEnv from '$env/static/public'

import { ConcurrentPromiseQueue } from '$/utils/ConcurrentPromiseQueue'

const queue = new ConcurrentPromiseQueue(1)

const get = async <T>(
	endpoint: string,
	params?: Record<string, string | number | boolean | undefined>,
) => {
	const searchParams = params && new URLSearchParams(
		Object.entries(params as Record<string, string>)
			.filter(([, value]) => value !== undefined)
	)
	const response = await queue.enqueue(() => (
		fetch(`https://api.pinata.cloud/v3/farcaster/${endpoint}${searchParams ? `?${searchParams}` : ''}`, {
			headers: {
				'Accept': 'application/json',
				'Authorization': `Bearer ${publicEnv.PUBLIC_PINATA_JWT}`,
			},
		})
	))

	if(!response.ok)
		throw await response.json()

	return await response.json() as T
}


// Types
type integer = number

export type CastCamelCase = {
	author: UserCamelCase,
	embeds: {
		url: string,
	}[],
	fid: number,
	hash: `0x${string}`,
	mentionedProfiles: string[],
	object: 'cast',
	parentHash?: string,
	parentUrl?: string,
	parentAuthor?: {
		fid: number | null,
	},
	reactions: {
		likes?: {
			fid: number,
			fname: string,
		}[],
		recasts?: {
			fid: number,
			fname: string,
		}[],
		likesCount?: number,
		recastsCount?: number,
	},
	replies: {
		count: number,
	},
	rootParentUrl: string,
	shortHash: `0x${string}`,
	text: string,
	threadHash: `0x${string}`,
	timestamp: string,
}

export type Cast = {
	author: User,
	embeds: {
		url: string,
	}[],
	fid: number,
	hash: `0x${string}`,
	mentioned_profiles?: User[],
	object: 'cast',
	parent_author?: {
		fid: number | null,
	},
	parent_hash?: string,
	parent_url?: string,
	reactions: {
		likes?: {
			fid: number,
			fname: string,
		}[],
		likes_count?: number,
		recasts?: {
			fid: number,
			fname: string,
		}[],
		recasts_count?: number,
	},
	replies: {
		count: number,
	},
	root_parent_url: string,
	text: string,
	thread_hash: `0x${string}`,
	timestamp: string,
}

export type CastWithReplies = Cast & {
	direct_replies: CastWithReplies[],
}

export type Conversation = {
	cast: CastWithReplies,
}

export type Channel = {
	created_at: number,
	description: string,
	follower_count: number,
	hosts: User[],
	id: string,
	image_url: string,
	lead: User,
	name: string,
	object: 'channel',
	parent_url: string,
	url: string,
}

export type User = {
	active_status: 'active' | 'inactive',
	custody_address: `0x${string}`,
	display_name: string,
	fid: number,
	follower_count: number,
	following_count: number,
	notes?: {
		active_status: string,
	},
	object: 'user',
	pfp_url: string,
	power_badge: boolean,
	profile: {
		bio: {
			text: string,
			mentioned_profiles?: User[],
		},
	},
	username: string,
	verifications: string[],
	verified_addresses: {
		eth_addresses: string[],
		sol_addresses: string[],
	},
}

export type UserCamelCase = {
	activeStatus: 'active' | 'inactive',
	custodyAddress: `0x${string}`,
	displayName: string,
	fid: number,
	followerCount: number,
	followingCount: number,
	pfp: {
		url: string,
	}
	powerBadge: boolean,
	profile: {
		bio: {
			text: string,
			mentionedProfiles: string[],
		},
	},
	username: string,
	verifications: string[],
	verifiedAddresses: {
		eth_addresses: string[],
		sol_addresses: string[],
	},
}

export type CastAddBody = {
	text: string,
	parent_url: string,
	embeds: Embed[],
	mentions: number[],
	mention_positions: number[],
	parent_cast_id: CastId,
}

export type Embed = {
	url: string,
	castId: CastId,
}

export type CastId = {
	fid: number,
	hash: string,
}

export enum CastType {
	MESSAGE_TYPE_CAST_ADD = 'MESSAGE_TYPE_CAST_ADD',
	MESSAGE_TYPE_CAST_REMOVE = 'MESSAGE_TYPE_CAST_REMOVE',
	MESSAGE_TYPE_REACTION_ADD = 'MESSAGE_TYPE_REACTION_ADD',
	MESSAGE_TYPE_REACTION_REMOVE = 'MESSAGE_TYPE_REACTION_REMOVE',
	MESSAGE_TYPE_LINK_ADD = 'MESSAGE_TYPE_LINK_ADD',
	MESSAGE_TYPE_LINK_REMOVE = 'MESSAGE_TYPE_LINK_REMOVE',
}

export type Network = 'FARCASTER_NETWORK_MAINNET' | 'FARCASTER_NETWORK_TESTNET'

export type HashScheme = 'HASH_SCHEME_BLAKE3'

export type SignatureScheme = 'SIGNATURE_SCHEME_ED25519'

export type ReactionType = 'like' | 'recast'



/**
 * Farcaster API
 */


/**
 * Cast by Hash
 * {@link https://docs.pinata.cloud/farcaster/farcaster-api/endpoint/cast-by-hash}
 */
export const getCastByHash = async ({
	hash,
}: {
	/**
	 * The full hash of the cast you want to fetch
	 */
	hash: string,
}) => get<{
	cast: Cast,
}>(`casts/${hash}`)


/**
 * Casts
 * {@link https://docs.pinata.cloud/farcaster/farcaster-api/endpoint/casts}
 * 
 * This endpoint is great for fetching a particular cast or by combining with query parameters to get specific lists of casts.
 * 
 * Casts by FID
 * `/casts?fid=6023`
 * Returns all the casts from user FID `6023`
 * 
 * Casts by Following
 * `/casts?fid=6023&following=true`
 * Returns all the casts from users that FID `6023` is following
 * 
 * Casts by Channel
 * `/casts?channel=https://warpcast.com/~/channel/pinata`
 * Returns all the casts from a specific channel, e.g. `https://warpcast.com/~/channel/pinata`
 * 
 * Casts by Parent Hash
 * Returns all the casts fror a specified parent hash
 * `/casts?parentHash=0x0ab851ba8524eedf9e164b55f6eeec751f74b539`
 */
export const getCasts = async <
	T extends {
		/**
		 * Returns casts from a specific FID
		 */
		fid?: integer,
	
		/**
		 * When used in combination of `fid` will return the casts for who that `fid` is following
		 */
		following?: boolean,
	
		/**
		 * Will reverse the results giving the most casts recent first
		 */
		reverse?: boolean,
	
		/**
		 * Specify a channel to fetch casts from
		 */
		channel?: string,
	
		/**
		 * Returns casts for a specific parent hash
		 */
		parentHash?: string,
	
		/**
		 * Token to be used for the next page of results
		 */
		pageToken?: string,
	
		/**
		 * Filter casts that have no parent hash
		 */
		topLevel?: boolean,
	
		/**
		 * Determine the number of results, if not specified default is 100
		 */
		pageSize?: integer,
	}
>({
	fid,
	following,
	reverse,
	channel,
	parentHash,
	pageToken,
	topLevel,
	pageSize = 50,
}: T) => get<(
	T extends { fid: number } ?
		{
			casts: Cast[],
			next: {
				cursor: string,
			},
		}
	: T extends { channel: string } ?
		{
			casts: Cast[],
			next: {
				cursor: string,
			},
		}
	: T extends { parentHash: string } ?
		{
			conversation: {
				cast: CastWithReplies,
			}
		}
	: {
		casts: CastCamelCase[],
		next: {
			cursor: string,
		},
	}
)>(`casts`, {
	fid,
	following,
	reverse,
	channel,
	parentHash,
	pageToken,
	topLevel,
	pageSize,
})


/**
 * Send Cast
 * {@link https://docs.pinata.cloud/farcaster/farcaster-api/endpoint/send-cast}
 */
export const sendCast = async ({
	castAddBody,
	signerId,
}: {
	/**
	 * The body of sending a cast is made up of primarily two pieces. One is the `signerId` provided by using [Farcaster Auth](https://docs.pinata.cloud/farcaster/farcaster-auth). The other is the `castAddBody` object which follows the same pattern of Farcaster Hubs when submitting a cast.
	 */
	castAddBody: CastAddBody,

	/**
	 * The signerId of the user sending a cast, already approved via Farcaster Auth
	 */
	signerId: string,
}) => get<{
	data: {
		data: {
			type: CastType.MESSAGE_TYPE_CAST_ADD,
			fid: number,
			timestamp: number,
			network: Network,
			castAddBody: CastAddBody,
		},
		hash: string,
		hashScheme: HashScheme,
		signature: string,
		signatureScheme: SignatureScheme,
		signer: string,
		dataBytes: string,
	},
}>(`casts`, {
	castAddBody: JSON.stringify(castAddBody),
	signerId,
})


/**
 * Delete Cast
 * {@link https://docs.pinata.cloud/farcaster/farcaster-api/endpoint/delete-cast}
 */
export const deleteCast = async ({
	hash,
	signerId,
}: {
	/**
	 * Hash for the cast to be deleted
	 */
	hash: string,

	/**
	 * Signer ID for the author of the cast
	 */
	signerId: string,
}) => get<{
	data: {
		data: {
			type: CastType.MESSAGE_TYPE_CAST_REMOVE,
			fid: number,
			timestamp: number,
			network: Network,
			castAddBody: {
				embedsDeprecated: null,
				mentions: null,
			},
		},
		hash: string,
		hashScheme: HashScheme,
		signature: string,
		signatureScheme: SignatureScheme,
		signer: string,
		dataBytes: string,
	},
}>(`casts/${hash}`, {
	signerId,
})


/**
 * Add Reaction to Cast
 * {@link https://docs.pinata.cloud/farcaster/farcaster-api/endpoint/add-reaction-to-cast}
 */
export const addReactionToCast = async ({
	hash,
	type,
	signerId,
}: {
	/**
	 * Hash for the cast to be deleted
	 */
	hash: string,

	/**
	 * The type of reaction, can be either "like" or "recast"
	 */
	type: ReactionType,

	/**
	 * Signer ID for the user that will react to the cast
	 */
	signerId: string,
}) => get<{
	data: {
		data: {
			type: CastType.MESSAGE_TYPE_REACTION_ADD,
			fid: number,
			timestamp: number,
			network: Network,
			castAddBody: CastAddBody,
		},
		hash: string,
		hashScheme: HashScheme,
		signature: string,
		signatureScheme: SignatureScheme,
		signer: string,
		dataBytes: string,
	},
}>(`casts/${hash}/reactions/${type}`, {
	signerId,
})


/**
 * Delete Reaction to Cast
 * {@link https://docs.pinata.cloud/farcaster/farcaster-api/endpoint/delete-reaction-to-cast}
 */
export const deleteReactionToCast = async ({
	hash,
	type,
	signerId,
}: {
	/**
	 * Hash for the target cast
	 */
	hash: string,

	/**
	 * The type of reaction, can be either "like" or "recast"
	 */
	type: ReactionType,

	/**
	 * Signer ID for the user that will remove reaction to the cast
	 */
	signerId: string,
}) => get<{
	data: {
		data: {
			type: CastType.MESSAGE_TYPE_REACTION_REMOVE,
			fid: number,
			timestamp: number,
			network: Network,
			castAddBody: {
				embedsDeprecated: null,
				mentions: null,
			},
		},
		hash: string,
		hashScheme: HashScheme,
		signature: string,
		signatureScheme: SignatureScheme,
		signer: string,
		dataBytes: string,
	},
}>(`casts/${hash}/reactions/${type}`, {
	signerId,
})


/**
 * Channels List
 * {@link https://docs.pinata.cloud/farcaster/farcaster-api/endpoint/channels-list}
 */
export const getChannels = async ({
	pageSize = 50,
	pageToken,
}: {
	/**
	 * Determine the number of results, if not specified default is 100
	 */
	pageSize?: integer,

	/**
	 * Token to be used for the next page of results
	 */
	pageToken?: string,
}) => get<{
	channels: Channel[],
	next: {
		cursor: string,
	},
}>(`channels`, {
	pageSize,
	pageToken,
})


/**
 * Channel By Name
 * {@link https://docs.pinata.cloud/farcaster/farcaster-api/endpoint/channel-by-name}
 */
export const getChannelByName = async ({
	name,
}: {
	/**
	 * Display name for the channel you are trying to fetch
	 */
	name: string,
}) => get<{
	channel: Channel,
}>(`channels/${name}`)


/**
 * Follow FID
 * {@link https://docs.pinata.cloud/farcaster/farcaster-api/endpoint/follow-fid}
 */
export const followFID = async ({
	fid,
	signerId,
}: {
	/**
	 * Target FID to follow
	 */
	fid: number,

	/**
	 * Signer ID for the user following the target FID
	 */
	signerId: string,
}) => get<{
	data: {
		data: {
			type: CastType.MESSAGE_TYPE_LINK_ADD,
			fid: number,
			timestamp: number,
			network: Network,
		},
		hash: string,
		hashScheme: HashScheme,
		signature: string,
		signatureScheme: SignatureScheme,
		signer: string,
		dataBytes: string,
	},
}>(`follow/${fid}`, {
	signerId,
})


/**
 * Unfollow FID
 * {@link https://docs.pinata.cloud/farcaster/farcaster-api/endpoint/unfollow-fid}
 */
export const unfollowFID = async ({
	fid,
	signerId,
}: {
	/**
	 * Target FID to unfollow
	 */
	fid: number,

	/**
	 * Signer ID for the user unfollowing the target FID
	 */
	signerId: string,
}) => get<{
	data: {
		data: {
			type: CastType.MESSAGE_TYPE_LINK_REMOVE,
			fid: number,
			timestamp: number,
			network: Network,
		},
		hash: string,
		hashScheme: HashScheme,
		signature: string,
		signatureScheme: SignatureScheme,
		signer: string,
		dataBytes: string,
	},
}>(`follow/${fid}`, {
	signerId,
})


/**
 * User By FID
 * {@link https://docs.pinata.cloud/farcaster/farcaster-api/endpoint/user-by-fid}
 */
export const getUserByFID = async ({
	fid,
}: {
	/**
	 * FID for the user you are trying to fetch
	 */
	fid: integer,
}) => get<{
	user: User,
}>(`users/${fid}`)


/**
 * Users
 * {@link https://docs.pinata.cloud/farcaster/farcaster-api/endpoint/users}
 * 
 * This endpoint is similar to `/casts` in that you can either fetch a specific user by FID or you can combine multiple query parameters to get specific lists of users.
 * 
 * Users Following FID
 * `/users?fid=6023&followers=true`
 * Returns all the users following a specific FID
 * 
 * Users FID Following
 * `/users?fid=6023&following=true`
 * Returns all the users a specific FID is following
 */
export const getUsers = async ({
	fid,
	followers,
	following,
	pageSize = 50,
	pageToken,
}: {
	/**
	 * Returns the user with the specified FID
	 */
	fid?: integer,

	/**
	 * When used with `fid` will return the followers of the specified `fid`
	 */
	followers?: boolean,

	/**
	 * When used with `fid` will return the users `fid` is following
	 */
	following?: boolean,

	/**
	 * Determine the number of results, if not specified default is 100
	 */
	pageSize?: integer,

	/**
	 * Token to be used for the next page of results
	 */
	pageToken?: string,
}) => get<{
	users: User[],
	next: {
		cursor: string,
	},
}>(`users`, {
	fid,
	followers,
	following,
	pageSize,
	pageToken,
})
