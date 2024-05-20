// Types
import type { Cast, User, Channel } from '.'

import type { Ethereum } from '$/data/networks/types'
import type { FarcasterCast, FarcasterChannel, FarcasterUser } from '$/api/farcaster'


// Functions
import { extractCastEmbeds } from '$/api/farcaster'

export const normalizeCast = (cast: Cast): FarcasterCast => ({
	id: cast.hash as `0x${string}`,

	author: normalizeUser(cast.author),
	text: cast.content,
	timestamp: new Date(cast.timestamp).valueOf(),

	...extractCastEmbeds({
		embeds: cast.embeds.map((embed) => ({
			url: embed.url,
		})),
		text: cast.content,
	}),

	mentionedUsers: cast.mentioned_profiles.map((mention) => ({
		name: mention,
	})),

	reactions: {
		likes: cast.reactions.likes?.map((reaction) => ({
			id: reaction.fid,
			name: reaction.fname,
		})),
		recasts: cast.reactions.recasts?.map((reaction) => ({
			id: reaction.fid,
			name: reaction.fname,
		})),
	},

	repliesCount: cast.replies.count,

	...cast.root_parent_url && {
		channel: {
			url: cast.root_parent_url,
		},
	},
})

export const normalizeUser = (user: User): FarcasterUser => ({
	id: user.fid,
	name: user.username,
	displayName: user.display_name,

	avatar: {
		url: user.pfp_url,
	},

	bio: {
		text: user.bio,
	},

	custodyAddress: user.custody_address as Ethereum.Address,
	verifications: user.verifications,

	summary: {
		followerCount: user.follower_count,
		followingCount: user.following_count,
	},
})

export const normalizeChannel = (channel: Channel): FarcasterChannel => ({
	id: channel.name,
	url: channel.url,
	name: channel.display_name,
	image: channel.image_url,
	leads: [channel.lead_fid],
})
