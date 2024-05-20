// Types
import type { Cast, CastCamelCase, CastWithReplies, Conversation, User, UserCamelCase, Channel } from '.'

import type { Ethereum } from '$/data/networks/types'
import type { FarcasterCast, FarcasterChannel, FarcasterUser } from '$/api/farcaster'


// Functions
import { extractCastEmbeds } from '$/api/farcaster'

export const normalizeCastCamelCase = (cast: CastCamelCase): FarcasterCast => ({
	id: cast.hash as `0x${string}`,

	author: normalizeUserCamelCase(cast.author),
	text: cast.text,
	timestamp: new Date(cast.timestamp).valueOf(),

	...extractCastEmbeds({
		embeds: cast.embeds.map((embed) => ({
			url: embed.url,
		})),
		text: cast.text,
	}),

	...cast.mentionedProfiles && {
		mentionedUsers: cast.mentionedProfiles.map((mention) => ({
			name: mention,
		})),
	},

	reactions: {
		likes: cast.reactions.likes?.map((reaction) => ({
			id: reaction.fid,
			name: reaction.fname,
		})),
		likesCount: cast.reactions.likesCount,

		recasts: cast.reactions.recasts?.map((reaction) => ({
			id: reaction.fid,
			name: reaction.fname,
		})),
		recastsCount: cast.reactions.recastsCount,
	},

	repliesCount: cast.replies.count,

	rootCast: {
		id: cast.threadHash,
	},

	...cast.rootParentUrl && {
		channel: {
			url: cast.rootParentUrl,
		},
	},
})

export const normalizeCast = (cast: Cast): FarcasterCast => ({
	id: cast.hash as `0x${string}`,

	author: normalizeUser(cast.author),
	text: cast.text,
	timestamp: new Date(cast.timestamp).valueOf(),

	...extractCastEmbeds({
		embeds: cast.embeds.map((embed) => ({
			url: embed.url,
		})),
		text: cast.text,
	}),

	mentionedUsers: cast.mentioned_profiles?.map((mention) => ({
		name: mention,
	})),

	reactions: {
		likes: cast.reactions.likes?.map((reaction) => ({
			id: reaction.fid,
			name: reaction.fname,
		})),
		likesCount: cast.reactions.likes_count,

		recasts: cast.reactions.recasts?.map((reaction) => ({
			id: reaction.fid,
			name: reaction.fname,
		})),
		recastsCount: cast.reactions.recasts_count,
	},

	repliesCount: cast.replies.count,

	rootCast: {
		id: cast.thread_hash,
	},

	...cast.root_parent_url && {
		channel: {
			url: cast.root_parent_url,
		},
	},
})

export const normalizeCastWithReplies = (cast: CastWithReplies): FarcasterCast & { replies: NonNullable<FarcasterCast['replies']> } => ({
	...normalizeCast(cast),

	replies: (
		cast.direct_replies
			.map(normalizeCastWithReplies)
	),
})

export const normalizeConversation = (conversation: Conversation) => (
	normalizeCastWithReplies(conversation.cast)
		.replies
)

export const normalizeUserCamelCase = (user: UserCamelCase): FarcasterUser => ({
	id: user.fid,
	name: user.username,
	displayName: user.displayName,

	avatar: {
		url: user.pfp.url,
	},

	bio: {
		text: user.profile.bio.text,
		mentionedUsers: user.profile.bio.mentionedProfiles,
	},

	...user.verifiedAddresses && {
		verifiedAddresses: {
			ethereum: user.verifiedAddresses.eth_addresses as Ethereum.Address[],
			solana: user.verifiedAddresses.sol_addresses as string[],
		},
	},

	summary: {
		followerCount: user.followerCount,
		followingCount: user.followingCount,
	},

	isActive: user.activeStatus === 'active',
	isPowerUser: user.powerBadge,
})

export const normalizeUser = (user: User): FarcasterUser => ({
	id: user.fid,
	name: user.username,
	displayName: user.display_name,

	avatar: {
		url: user.pfp_url,
	},

	bio: {
		text: user.profile.bio.text,
		mentionedUsers: user.profile.bio.mentioned_profiles,
	},

	...user.verified_addresses && {
		verifiedAddresses: {
			ethereum: user.verified_addresses.eth_addresses as Ethereum.Address[],
			solana: user.verified_addresses.sol_addresses as string[],
		},
	},

	summary: {
		followerCount: user.follower_count,
		followingCount: user.following_count,
	},

	isActive: user.active_status === 'active',
	isPowerUser: user.power_badge,
})

export const normalizeChannel = (channel: Channel): FarcasterChannel => ({
	id: channel.id,

	url: channel.url || channel.parent_url,
	createdAt: channel.created_at,

	name: channel.name,
	description: channel.description,
	image: channel.image_url,

	leads: (
		(channel.hosts || channel.lead && [channel.lead])
			.map(normalizeUser)
			.map(user => user.id)
	),

	summary: {
		followerCount: channel.follower_count,
	},
})
