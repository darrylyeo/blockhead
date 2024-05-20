// Types
import type { Ethereum } from '$/data/networks/types'

import type { FarcasterUser, FarcasterUserId, FarcasterCast, FarcasterChannel, FarcasterCastId } from '../farcaster'

import { ActiveStatus, type User as UserV1, type Cast as CastV1, type CastWithInteractions as CastWithInteractionsV1 } from './v1'
import type { Cast as CastV2, CastWithInteractions as CastWithInteractionsV2, User as UserV2, Channel as ChannelV2 } from './v2'
import type { Channel as ChannelOld } from './channels'


// Functions
import { extractCastEmbeds } from '../farcaster'

export const normalizeUserV1 = (
	user: UserV1,
	viewerUserId?: FarcasterUserId,
): FarcasterUser => ({
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

	isActive: user.activeStatus === ActiveStatus.Active,

	custodyAddress: user.custodyAddress as Ethereum.Address,
	verifications: user.verifications,

	summary: {
		followerCount: user.followerCount,
		followingCount: user.followingCount,
	},

	context: user.viewerContext && viewerUserId !== undefined
		? {
			[viewerUserId]: {
				following: user.viewerContext.following,
				followedBy: user.viewerContext.followedBy,
				liked: user.viewerContext.liked,
				recasted: user.viewerContext.recasted,
			},
		}
		: undefined,
})

export const normalizeUserV2 = (
	user: UserV2,
	viewerUserId?: FarcasterUserId,
): FarcasterUser => ({
	id: user.fid,
	name: user.username,
	displayName: user.display_name,

	avatar: {
		url: user.pfp_url,
	},

	bio: user.profile && {
		text: user.profile.bio.text,
		mentionedUsers: user.profile.bio.mentioned_profiles,
	},

	isActive: user.active_status === ActiveStatus.Active,

	verifications: user.verifications,

	summary: {
		followerCount: user.follower_count,
		followingCount: user.following_count,
	},

	context: user.viewer_context && viewerUserId !== undefined
		? {
			[viewerUserId]: {
				following: user.viewer_context.following,
				followedBy: user.viewer_context.followed_by,
			},
		}
		: undefined,
})

export const normalizeChannelOld = (channel: ChannelOld): FarcasterChannel => ({
	id: channel.channel_id,
	url: channel.parent_url,
	name: channel.name,
	image: channel.image,
	...channel.lead_fid && {
		leads: [channel.lead_fid],
	},
})

export const normalizeChannel = (channel: ChannelV2): FarcasterChannel => ({
	id: channel.id,
	url: channel.url,
	name: channel.name,
	description: channel.description,
	image: channel.image_url,
	...channel.created_at && {
		createdAt: new Date(channel.created_at * 1000).valueOf(),
	},
	...channel.lead && {
		leads: (
			channel.hosts ?
				channel.hosts.map(host => host.fid) :
				[channel.lead.fid]
		),
	},
})

export const normalizeCastWithInteractions = (cast: CastWithInteractionsV1): CastWithInteractionsV2 => ({
	hash: cast.hash,
	parent_hash: cast.parentHash,
	parent_url: cast.parentUrl,
	parent_author: cast.parentAuthor,
	author: cast.author,
	text: cast.text,
	timestamp: cast.timestamp,
	embeds: cast.embeds,
	reactions: {
		likes: Array.from({ length: cast.reactions.count }, (_, i) => ({
			fid: cast.reactions.fids[i],
			fname: cast.reactions.fnames[i],
		})),
	},
})


export const normalizeCastV1 = (cast: CastV1 | CastWithInteractionsV1): FarcasterCast => ({
	id: cast.hash as FarcasterCastId,
	text: cast.text,
	...extractCastEmbeds({
		embeds: cast.embeds.map(embed => ({
			url: embed.url,
		})),
		text: cast.text,
	}),

	author: normalizeUserV1(cast.author),

	timestamp: new Date(cast.timestamp).valueOf(),

	reactions: {
		...'reactions' in cast && {
			likes: cast.reactions.fids.map((fid, i) => ({
				id: fid,
				name: cast.reactions.fnames[i],
			})),
		},
		...'recasts' in cast && {
			recasts: cast.recasts.fids.map((fid, i) => ({
				id: fid,
				name: cast.recasters[i],
			})),
		},
	},

	parentCast: {
		id: cast.parentHash as FarcasterCastId,
	},

	...cast.parentUrl && {
		channel: {
			url: cast.parentUrl,
		},
	},
})

export const normalizeCastWithRepliesV1 = (casts: CastWithInteractionsV1[]): FarcasterCast => {
	const normalizedCasts = casts.map(cast => normalizeCastV1(cast))

	const castsByParentHash = Object.groupBy(normalizedCasts, cast => cast.parent.id)

	for(const cast of normalizedCasts){
		cast.replies = castsByParentHash[cast.id]
		cast.repliesCount = castsByParentHash[cast.id]?.length
	}

	return normalizedCasts[0]
}

export const normalizeCastV2 = (cast: CastV2 | CastWithInteractionsV2): FarcasterCast => ({
	id: cast.hash as FarcasterCastId,
	text: cast.text,
	...extractCastEmbeds({
		embeds: cast.embeds.map(embed => (
			'cast_id' in embed
				? {
					userId: embed.cast_id.fid,
					castId: embed.cast_id.hash,
				}
				: {
					url: embed.url,
				}
		)),
		text: cast.text,
	}),

	author: normalizeUserV2(cast.author),

	timestamp: new Date(cast.timestamp).valueOf(),

	...'mentioned_profiles' in cast && {
		mentionedUsers: cast.mentioned_profiles.map(user => normalizeUserV2(user)),
	},

	...'reactions' in cast && {
		reactions: {
			likes: cast.reactions.likes.map(reaction => ({
				id: reaction.fid,
			})),
			recasts: cast.reactions.recasts.map(reaction => ({
				id: reaction.fid,
				name: reaction.fname,
			})),
		},
	},

	parentCast: {
		id: cast.parent_hash as FarcasterCastId,
		author: {
			id: Number(cast.parent_author?.fid) ?? undefined as FarcasterUserId | undefined,
		}
	},

	...(cast.parent_url || cast.root_parent_url) && {
		channel: {
			url: cast.parent_url || cast.root_parent_url,
		},
	},

	...'replies' in cast && {
		repliesCount: cast.replies.count,
	},
})
