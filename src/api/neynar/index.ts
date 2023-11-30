import type { FarcasterUser, FarcasterUserId, FarcasterChannel } from '../farcaster'
import { ActiveStatus, type User as UserV1 } from './v1'
import type { User as UserV2 } from './v2'

type Channel = {
	name: string;
	parent_url: string;
	image: string;
	channelId: string;
	lead_fid: FarcasterUserId;
}


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
		mentions: user.profile.bio.mentions,
	},

	isActive: user.activeStatus === ActiveStatus.Active,

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

	bio: {
		text: user.profile.bio.text,
		mentions: user.profile.bio.mentioned_profiles,
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

export const normalizeChannel = (channel: Channel): FarcasterChannel => ({
	id: channel.channelId,
	url: channel.parent_url,
	name: channel.name,
	image: channel.image,
	leads: [channel.lead_fid],
})
