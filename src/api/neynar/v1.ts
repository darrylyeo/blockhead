/**
 * Farcaster API V1
 * 1.0
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from "oazapfts/lib/runtime";
import * as QS from "oazapfts/lib/runtime/query";
export const defaults: Oazapfts.Defaults<Oazapfts.CustomHeaders> = {
    headers: {},
    baseUrl: "https://api.neynar.com/v1",
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {
    server1: "https://api.neynar.com/v1"
};
export type Fid = number;
export type Address = string;
export type ViewerContext = {
    following: boolean;
    followedBy: boolean;
    liked?: boolean;
    recasted?: boolean;
};
export type User = {
    fid: Fid;
    /** The username of the user. */
    username: string;
    /** Custody Address of the user. */
    custodyAddress: string;
    /** The display of the reactor. */
    displayName: string;
    pfp: {
        /** The URL of the user's profile picture. */
        url: string;
    };
    profile: {
        bio: {
            text: string;
            mentionedProfiles: string[];
        };
    };
    /** The number of followers the user has. */
    followerCount: number;
    /** The number of users the user is following. */
    followingCount: number;
    verifications: Address[];
    activeStatus: ActiveStatus;
    viewerContext?: ViewerContext;
};
export type UserResponse = {
    result: {
        user: User;
    };
};
export type ErrorRes = {
    code?: string;
    message: string;
    property?: string;
};
export type EmbedUrl = {
    url: string;
};
export type ReactionWithCastMeta = {
    reaction: {
        reactor_fid: Fid;
        reaction_type: ReactionType;
        reaction_hash: string;
        reaction_target_hash: string;
        reaction_timestamp: string;
    };
    cast?: {
        cast_fid: Fid;
        cast_hash: string;
        cast_text: string;
        cast_embeds: EmbedUrl[];
        cast_timestamp: string;
    };
    cast_author?: User;
};
export type NextCursor = {
    cursor: string | null;
};
export type UserCastLikeResponse = {
    result: {
        reactor: User;
        likes: ReactionWithCastMeta[];
        next: NextCursor;
    };
};
export type RecentUsersResponse = {
    result: {
        users: User[];
        next: NextCursor;
    };
};
export type CustodyAddressResponse = {
    result: {
        fid: Fid;
        custodyAddress: string | null;
    };
};
export type CastHash = string;
export type Timestamp = string;
export type Cast = {
    hash: string;
    parentHash: string | null;
    parentUrl: string | null;
    threadHash: string;
    parentAuthor: Fid & {
        fid: string | null;
    };
    mentionedProfiles: User[];
    author: User | {
        fid: string;
    };
    text: string;
    timestamp: Timestamp;
    embeds: EmbedUrl[];
    "type"?: CastType;
};
export type CastWithInteractionsReactions = {
    count: number;
    fids: Fid[];
    fnames: string[];
};
export type CastWithInteractionsRecasts = {
    count: number;
    fids: Fid[];
};
export type CastWithInteractionsReplies = {
    count: number;
};
export type CastWithInteractions = Cast & {
    reactions: CastWithInteractionsReactions;
    recasts: CastWithInteractionsRecasts;
    recasters: string[];
    viewerContext?: ViewerContext;
    replies: CastWithInteractionsReplies;
};
export type CastResponse = {
    result: {
        cast: CastWithInteractions;
    };
};
export type AllCastsInThreadResponse = {
    result: {
        casts: CastWithInteractions[];
    };
};
export type CastsResponse = {
    result: {
        casts: CastWithInteractions[];
        next: NextCursor;
    };
};
export type RecentCastsResponse = {
    result: {
        casts: CastWithInteractions[];
        next: NextCursor;
    };
};
export type VerificationResponse = {
    result: {
        fid: string;
        username: string;
        display_name: string;
        verifications: string[];
    };
};
export type MentionsAndRepliesResponse = {
    result: {
        notifications: CastWithInteractions[];
        next: NextCursor;
    };
};
export type ReactionsAndRecastsNotification = Cast & {
    reactors?: User[];
    reactionType?: ReactionType;
};
export type ReactionsAndRecastsResponse = {
    result: {
        notifications: ReactionsAndRecastsNotification[];
        next: NextCursor;
    };
};
export type Reactor = {
    /** The unique identifier of the reactor. */
    fid: number;
    /** The username of the reactor. */
    username: string;
    /** The display name of the reactor. */
    displayName: string;
    pfp: {
        /** The URL of the reactor's profile picture. */
        url: string;
    };
    /** The number of followers the reactor has. */
    followerCount: number;
    /** The number of users the reactor is following. */
    followingCount: number;
    viewerContext?: {
        /** Indicates if the viewer is following the reactor. */
        following: boolean;
        /** Indicates if the reactor is followed by the viewer. */
        followedBy: boolean;
    };
};
export type Reaction = {
    "type": ReactionType;
    hash: Address;
    reactor: Reactor;
    timestamp: Timestamp;
    castHash: CastHash;
};
export type CastLikesResponse = {
    result: {
        likes: Reaction[];
        next: NextCursor;
    };
};
export type CastReactionsResponse = {
    result: {
        casts: Reaction[];
        next: NextCursor;
    };
};
export type Recaster = {
    /** The unique identifier of the recaster. */
    fid: number;
    /** The username of the recaster. */
    username: string;
    /** The display name of the recaster. */
    displayName: string;
    pfp: {
        /** The URL of the recaster's profile picture. */
        url: string;
    };
    profile: {
        bio: {
            text: string;
            mentions: {}[];
        };
    };
    /** The number of followers the recaster has. */
    followerCount: number;
    /** The number of users the recaster is following. */
    followingCount: number;
    timestamp: Timestamp;
    viewerContext?: {
        /** Indicates if the viewer is following the recaster. */
        following: boolean;
        /** Indicates if the recaster is followed by the viewer. */
        followedBy: boolean;
    };
};
export type CastRecasterResponse = {
    result: {
        users: Recaster[];
        next: NextCursor;
    };
};
export type FollowResponseUser = User & {
    timestamp: string;
};
export type FollowResponse = {
    result: {
        users: FollowResponseUser[];
        next: NextCursor;
    };
};
/**
 * DEPRECATED - Get User Information by FID
 */
export function user(apiKey: string, fid: Fid, { viewerFid }: {
    viewerFid?: Fid;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: UserResponse;
    } | {
        status: 400;
        data: ErrorRes;
    } | {
        status: 404;
        data: ErrorRes;
    }>(`/farcaster/user${QS.query(QS.explode({
        fid,
        viewerFid
    }))}`, {
        ...opts,
        headers: oazapfts.mergeHeaders(opts?.headers, {
            api_key: apiKey
        })
    }));
}
/**
 * Get User Information by username
 */
export function getFarcasterUserByUsername(apiKey: string, username: string, { viewerFid }: {
    viewerFid?: Fid;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: UserResponse;
    } | {
        status: 400;
        data: ErrorRes;
    } | {
        status: 404;
        data: ErrorRes;
    }>(`/farcaster/user-by-username${QS.query(QS.explode({
        username,
        viewerFid
    }))}`, {
        ...opts,
        headers: oazapfts.mergeHeaders(opts?.headers, {
            api_key: apiKey
        })
    }));
}
/**
 * DEPRECATED -- Get User Cast Likes
 */
export function getFarcasterUserCastLikes(apiKey: string, fid: Fid, { viewerFid, limit, cursor }: {
    viewerFid?: Fid;
    limit?: number;
    cursor?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: UserCastLikeResponse;
    } | {
        status: 400;
        data: ErrorRes;
    }>(`/farcaster/user-cast-likes${QS.query(QS.explode({
        fid,
        viewerFid,
        limit,
        cursor
    }))}`, {
        ...opts,
        headers: oazapfts.mergeHeaders(opts?.headers, {
            api_key: apiKey
        })
    }));
}
/**
 * Get Recent Users
 */
export function getFarcasterRecentUsers(apiKey: string, { viewerFid, limit, cursor }: {
    viewerFid?: Fid;
    limit?: number;
    cursor?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: RecentUsersResponse;
    } | {
        status: 400;
        data: ErrorRes;
    }>(`/farcaster/recent-users${QS.query(QS.explode({
        viewerFid,
        limit,
        cursor
    }))}`, {
        ...opts,
        headers: oazapfts.mergeHeaders(opts?.headers, {
            api_key: apiKey
        })
    }));
}
/**
 * DEPRECATED - Get the custody address for a given FID
 */
export function getFarcasterCustodyAddress(apiKey: string, fid: Fid, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: CustodyAddressResponse;
    } | {
        status: 400;
        data: ErrorRes;
    }>(`/farcaster/custody-address${QS.query(QS.explode({
        fid
    }))}`, {
        ...opts,
        headers: oazapfts.mergeHeaders(opts?.headers, {
            api_key: apiKey
        })
    }));
}
/**
 * DEPRECATED - Retrieve cast for a given hash
 */
export function cast(apiKey: string, hash: CastHash, { viewerFid }: {
    viewerFid?: Fid;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: CastResponse;
    } | {
        status: 400;
        data: ErrorRes;
    }>(`/farcaster/cast${QS.query(QS.explode({
        hash,
        viewerFid
    }))}`, {
        ...opts,
        headers: oazapfts.mergeHeaders(opts?.headers, {
            api_key: apiKey
        })
    }));
}
/**
 * DEPRECATED - Retrieve all casts in a given thread hash
 */
export function getFarcasterAllCastsInThread(apiKey: string, threadHash: CastHash, { viewerFid }: {
    viewerFid?: Fid;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AllCastsInThreadResponse;
    }>(`/farcaster/all-casts-in-thread${QS.query(QS.explode({
        threadHash,
        viewerFid
    }))}`, {
        ...opts,
        headers: oazapfts.mergeHeaders(opts?.headers, {
            api_key: apiKey
        })
    }));
}
/**
 * Retrieve casts for a given user
 */
export function casts(apiKey: string, fid: Fid, { parentUrl, viewerFid, limit, cursor }: {
    parentUrl?: string;
    viewerFid?: Fid;
    limit?: number;
    cursor?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: CastsResponse;
    } | {
        status: 400;
        data: ErrorRes;
    }>(`/farcaster/casts${QS.query(QS.explode({
        fid,
        parent_url: parentUrl,
        viewerFid,
        limit,
        cursor
    }))}`, {
        ...opts,
        headers: oazapfts.mergeHeaders(opts?.headers, {
            api_key: apiKey
        })
    }));
}
/**
 * Get Recent Casts
 */
export function getFarcasterRecentCasts(apiKey: string, { viewerFid, limit, cursor }: {
    viewerFid?: Fid;
    limit?: number;
    cursor?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: RecentCastsResponse;
    } | {
        status: 400;
        data: ErrorRes;
    }>(`/farcaster/recent-casts${QS.query(QS.explode({
        viewerFid,
        limit,
        cursor
    }))}`, {
        ...opts,
        headers: oazapfts.mergeHeaders(opts?.headers, {
            api_key: apiKey
        })
    }));
}
/**
 * DEPRECATED - Retrieve verifications for a given FID
 */
export function verifications(apiKey: string, fid: Fid, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: VerificationResponse;
    } | {
        status: 400;
        data: ErrorRes;
    }>(`/farcaster/verifications${QS.query(QS.explode({
        fid
    }))}`, {
        ...opts,
        headers: oazapfts.mergeHeaders(opts?.headers, {
            api_key: apiKey
        })
    }));
}
/**
 * DEPRECATED - Retrieve user for a given ethereum address
 */
export function getFarcasterUserByVerification(apiKey: string, address: Address, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: UserResponse;
    } | {
        status: 400;
        data: ErrorRes;
    }>(`/farcaster/user-by-verification${QS.query(QS.explode({
        address
    }))}`, {
        ...opts,
        headers: oazapfts.mergeHeaders(opts?.headers, {
            api_key: apiKey
        })
    }));
}
/**
 * Get mentions and replies
 */
export function getFarcasterMentionsAndReplies(apiKey: string, fid: Fid, { viewerFid, cursor }: {
    viewerFid?: Fid;
    cursor?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: MentionsAndRepliesResponse;
    } | {
        status: 400;
        data: ErrorRes;
    }>(`/farcaster/mentions-and-replies${QS.query(QS.explode({
        fid,
        viewerFid,
        cursor
    }))}`, {
        ...opts,
        headers: oazapfts.mergeHeaders(opts?.headers, {
            api_key: apiKey
        })
    }));
}
/**
 * Get reactions and recasts
 */
export function getFarcasterReactionsAndRecasts(apiKey: string, fid: Fid, { viewerFid, limit, cursor }: {
    viewerFid?: Fid;
    limit?: number;
    cursor?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ReactionsAndRecastsResponse;
    } | {
        status: 400;
        data: ErrorRes;
    }>(`/farcaster/reactions-and-recasts${QS.query(QS.explode({
        fid,
        viewerFid,
        limit,
        cursor
    }))}`, {
        ...opts,
        headers: oazapfts.mergeHeaders(opts?.headers, {
            api_key: apiKey
        })
    }));
}
/**
 * DEPRECATED - Get all like reactions for a specific cast
 */
export function getFarcasterCastLikes(apiKey: string, castHash: CastHash, { viewerFid, limit, cursor }: {
    viewerFid?: Fid;
    limit?: number;
    cursor?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: CastLikesResponse;
    } | {
        status: 400;
        data: ErrorRes;
    }>(`/farcaster/cast-likes${QS.query(QS.explode({
        castHash,
        viewerFid,
        limit,
        cursor
    }))}`, {
        ...opts,
        headers: oazapfts.mergeHeaders(opts?.headers, {
            api_key: apiKey
        })
    }));
}
/**
 * DEPRECATED - Get all reactions for a specific cast
 */
export function getFarcasterCastReactions(apiKey: string, castHash: CastHash, { viewerFid, limit, cursor }: {
    viewerFid?: Fid;
    limit?: number;
    cursor?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: CastReactionsResponse;
    } | {
        status: 400;
        data: ErrorRes;
    }>(`/farcaster/cast-reactions${QS.query(QS.explode({
        castHash,
        viewerFid,
        limit,
        cursor
    }))}`, {
        ...opts,
        headers: oazapfts.mergeHeaders(opts?.headers, {
            api_key: apiKey
        })
    }));
}
/**
 * DEPRECATED - Get all recasters for a specific cast
 */
export function getFarcasterCastRecasters(apiKey: string, castHash: CastHash, { viewerFid, limit, cursor }: {
    viewerFid?: Fid;
    limit?: number;
    cursor?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: CastRecasterResponse;
    } | {
        status: 400;
        data: ErrorRes;
    }>(`/farcaster/cast-recasters${QS.query(QS.explode({
        castHash,
        viewerFid,
        limit,
        cursor
    }))}`, {
        ...opts,
        headers: oazapfts.mergeHeaders(opts?.headers, {
            api_key: apiKey
        })
    }));
}
/**
 * Gets all followers for a given FID
 */
export function followers(apiKey: string, fid: Fid, { viewerFid, limit, cursor }: {
    viewerFid?: Fid;
    limit?: number;
    cursor?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: FollowResponse;
    } | {
        status: 400;
        data: ErrorRes;
    }>(`/farcaster/followers${QS.query(QS.explode({
        fid,
        viewerFid,
        limit,
        cursor
    }))}`, {
        ...opts,
        headers: oazapfts.mergeHeaders(opts?.headers, {
            api_key: apiKey
        })
    }));
}
/**
 * Gets all following users of a FID
 */
export function following(apiKey: string, fid: Fid, { viewerFid, limit, cursor }: {
    viewerFid?: Fid;
    limit?: number;
    cursor?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: FollowResponse;
    } | {
        status: 400;
        data: ErrorRes;
    }>(`/farcaster/following${QS.query(QS.explode({
        fid,
        viewerFid,
        limit,
        cursor
    }))}`, {
        ...opts,
        headers: oazapfts.mergeHeaders(opts?.headers, {
            api_key: apiKey
        })
    }));
}
export enum ActiveStatus {
    Active = "active",
    Inactive = "inactive"
}
export enum ReactionType {
    Like = "like",
    Recast = "recast"
}
export enum CastType {
    CastMention = "cast-mention",
    CastReply = "cast-reply"
}
