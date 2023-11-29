/**
 * Farcaster API V2
 * 2.0
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from "oazapfts/lib/runtime";
import * as QS from "oazapfts/lib/runtime/query";
export const defaults: Oazapfts.RequestOpts = {
    baseUrl: "https://api.neynar.com/v2",
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {
    server1: "https://api.neynar.com/v2"
};
export type SignerUuid = string;
export type Signer = {
    signer_uuid: SignerUuid;
    public_key: string;
    status: Status;
    signer_approval_url?: string;
    fid?: string;
};
export type ErrorRes = {
    code?: string;
    message: string;
    property?: string;
    status?: number;
};
export type RegisterSignerKeyReqBody = {
    signer_uuid: SignerUuid;
    signature: string;
    app_fid: number;
    deadline: number;
};
export type Fid = number;
export type Address = string;
export type User = {
    "object": Object;
    fid: Fid;
    username: string;
    display_name: string;
    custody_address?: Address;
    pfp_url: string;
    profile: {
        bio: {
            text: string;
            mentioned_profiles: string[];
        };
    };
    follower_count: number;
    following_count: number;
    verifications: Address[];
    active_status: ActiveStatus;
    viewer_context?: {
        following: boolean;
        followed_by: boolean;
    };
};
export type ProfileUrl = {
    pfp: {
        url: string;
    };
};
export type SearchedUser = User & ProfileUrl;
export type UserSearchResponse = {
    result: {
        users: SearchedUser[];
    };
};
export type BulkUsersResponse = {
    users: User[];
};
export type UpdateUserReqBody = {
    signer_uuid: SignerUuid;
    bio?: string;
    pfp_url?: string;
    url?: string;
    username?: string;
    display_name?: string;
};
export type OperationResponse = {
    success: boolean;
};
export type Timestamp = string;
export type EmbedUrl = {
    url: string;
};
export type CastId = {
    fid: number;
    hash: string;
};
export type EmbedCastId = {
    cast_id: CastId;
};
export type EmbeddedCast = EmbedUrl | EmbedCastId;
export type Cast = {
    hash: string;
    parent_hash: string | null;
    parent_url: string | null;
    parent_author: Fid & {
        fid: string | null;
    };
    author: User;
    text: string;
    timestamp: Timestamp;
    embeds: EmbeddedCast[];
    "type"?: CastNotificationType;
};
export type ReactionLike = {
    fid: Fid;
};
export type ReactionRecast = {
    fid: Fid;
    fname: string;
};
export type CastWithInteractionsReactions = {
    likes: ReactionLike[];
    recasts: ReactionRecast[];
};
export type CastWithInteractionsReplies = {
    count: number;
};
export type CastWithInteractions = Cast & {
    reactions: CastWithInteractionsReactions;
    replies: CastWithInteractionsReplies;
    thread_hash: string | null;
    mentioned_profiles: User[];
};
export type CastResponse = {
    cast: CastWithInteractions;
};
export type CastParent = string;
export type PostCastReqBody = {
    signer_uuid: SignerUuid;
    text?: string;
    embeds?: EmbeddedCast[];
    parent?: CastParent;
};
export type PostCastResponse = {
    success: boolean;
    cast: {
        hash: Address;
        author: {
            fid: Fid;
        };
        text: string;
    };
};
export type DeleteCastReqBody = {
    signer_uuid: SignerUuid;
    target_hash: Address;
};
export type CastsResponse = {
    result: {
        casts: CastWithInteractions[];
    };
};
export type NextCursor = {
    cursor: string | null;
};
export type FeedResponse = {
    casts: CastWithInteractions[];
    next: NextCursor;
};
export type ReactionReqBody = {
    signer_uuid: SignerUuid;
    reaction_type: ReactionType;
    target: string;
};
export type AddVerificationReqBody = {
    signer_uuid: SignerUuid;
    address: Address;
    block_hash: string;
    eth_signature: string;
};
export type RemoveVerificationReqBody = {
    signer_uuid: SignerUuid;
    address: Address;
};
export type FollowReqBody = {
    signer_uuid: SignerUuid;
    target_fids: Fid[];
};
export type FollowResponse = {
    success: boolean;
    target_fid: Fid;
};
export type BulkFollowResponse = {
    success: boolean;
    details: FollowResponse[];
};
export type UserResponse = {
    user: User;
};
export type Follow = {
    "object": Object2;
    user: User;
};
export type Reactions = {
    "object": Object3;
    cast: {
        hash: string;
        "object": Object4;
    };
    user: User;
};
export type Notification = {
    "object": string;
    most_recent_timestamp: string;
    "type": Type;
    follows?: Follow[];
    cast?: CastWithInteractions;
    reactions?: Reactions[];
};
export type NotificationsResponse = {
    notifications: Notification[];
    next: NextCursor;
};
export type HydratedFollower = {
    "object"?: Object5;
    user?: User;
};
export type UserDehydrated = {
    "object"?: Object6;
    fid?: Fid;
};
export type DehydratedFollower = {
    "object"?: Object5;
    user?: UserDehydrated;
};
export type RelevantFollowersResponse = {
    top_relevant_followers_hydrated: HydratedFollower[];
    all_relevant_followers_dehydrated: DehydratedFollower[];
};
export type ReactionsResponse = {
    reactions: Reactions[];
    next: NextCursor;
};
export type StorageAllocation = {
    "object"?: string;
    user?: UserDehydrated;
    units?: number;
    expiry?: string;
    timestamp?: string;
};
export type StorageAllocationsResponse = {
    total_active_units?: number;
    allocations?: StorageAllocation[];
};
export type StorageObject = {
    "object"?: string;
    used?: number;
    capacity?: number;
};
export type StorageUsageResponse = {
    "object"?: string;
    user?: UserDehydrated;
    casts?: StorageObject;
    reactions?: StorageObject;
    links?: StorageObject;
    verified_addresses?: StorageObject;
    username_proofs?: StorageObject;
    signers?: StorageObject;
    total_active_units?: number;
};
/**
 * Fetches the status of a signer
 */
export function signer(apiKey: string, signerUuid: SignerUuid, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: Signer;
    } | {
        status: 400;
        data: ErrorRes;
    } | {
        status: 403;
        data: ErrorRes;
    } | {
        status: 404;
        data: ErrorRes;
    } | {
        status: 500;
        data: ErrorRes;
    }>(`/farcaster/signer${QS.query(QS.explode({
        signer_uuid: signerUuid
    }))}`, {
        ...opts,
        headers: {
            ...opts && opts.headers,
            api_key: apiKey
        }
    }));
}
/**
 * Creates a signer and returns the signer status
 */
export function postFarcasterSigner(apiKey: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: Signer;
    } | {
        status: 500;
        data: ErrorRes;
    }>("/farcaster/signer", {
        ...opts,
        method: "POST",
        headers: {
            ...opts && opts.headers,
            api_key: apiKey
        }
    }));
}
/**
 * Register Signed Key
 */
export function postFarcasterSignerSignedKey(apiKey: string, registerSignerKeyReqBody: RegisterSignerKeyReqBody, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: Signer;
    } | {
        status: 400;
        data: ErrorRes;
    } | {
        status: 403;
        data: ErrorRes;
    } | {
        status: 404;
        data: ErrorRes;
    } | {
        status: 500;
        data: ErrorRes;
    }>("/farcaster/signer/signed_key", oazapfts.json({
        ...opts,
        method: "POST",
        body: registerSignerKeyReqBody,
        headers: {
            ...opts && opts.headers,
            api_key: apiKey
        }
    })));
}
/**
 * Search for Usernames
 */
export function getFarcasterUserSearch(apiKey: string, q: string, viewerFid: Fid, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: UserSearchResponse;
    } | {
        status: 400;
        data: ErrorRes;
    }>(`/farcaster/user/search${QS.query(QS.explode({
        q,
        viewer_fid: viewerFid
    }))}`, {
        ...opts,
        headers: {
            ...opts && opts.headers,
            api_key: apiKey
        }
    }));
}
/**
 * Fetches information about multiple users based on FIDs
 */
export function getFarcasterUserBulk(apiKey: string, fids: string, { viewerFid }: {
    viewerFid?: Fid;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: BulkUsersResponse;
    } | {
        status: 400;
        data: ErrorRes;
    } | {
        status: 404;
        data: ErrorRes;
    }>(`/farcaster/user/bulk${QS.query(QS.explode({
        fids,
        viewer_fid: viewerFid
    }))}`, {
        ...opts,
        headers: {
            ...opts && opts.headers,
            api_key: apiKey
        }
    }));
}
/**
 * Update user profile
 */
export function patchFarcasterUser(apiKey: string, updateUserReqBody: UpdateUserReqBody, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: OperationResponse;
    } | {
        status: 400;
        data: ErrorRes;
    } | {
        status: 403;
        data: ErrorRes;
    } | {
        status: 404;
        data: ErrorRes;
    } | {
        status: 500;
        data: ErrorRes;
    }>("/farcaster/user", oazapfts.json({
        ...opts,
        method: "PATCH",
        body: updateUserReqBody,
        headers: {
            ...opts && opts.headers,
            api_key: apiKey
        }
    })));
}
/**
 * Retrieve cast for a given hash or Warpcast URL
 */
export function cast(apiKey: string, identifier: string, $type: CastParamType, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: CastResponse;
    } | {
        status: 400;
        data: ErrorRes;
    }>(`/farcaster/cast${QS.query(QS.explode({
        identifier,
        "type": $type
    }))}`, {
        ...opts,
        headers: {
            ...opts && opts.headers,
            api_key: apiKey
        }
    }));
}
/**
 * Posts a cast
 */
export function postFarcasterCast(apiKey: string, postCastReqBody: PostCastReqBody, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: PostCastResponse;
    } | {
        status: 400;
        data: ErrorRes;
    } | {
        status: 403;
        data: ErrorRes;
    } | {
        status: 404;
        data: ErrorRes;
    } | {
        status: 500;
        data: ErrorRes;
    }>("/farcaster/cast", oazapfts.json({
        ...opts,
        method: "POST",
        body: postCastReqBody,
        headers: {
            ...opts && opts.headers,
            api_key: apiKey
        }
    })));
}
/**
 * Delete a cast
 */
export function deleteFarcasterCast(apiKey: string, deleteCastReqBody: DeleteCastReqBody, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: OperationResponse;
    } | {
        status: 400;
        data: ErrorRes;
    } | {
        status: 403;
        data: ErrorRes;
    } | {
        status: 404;
        data: ErrorRes;
    } | {
        status: 500;
        data: ErrorRes;
    }>("/farcaster/cast", oazapfts.json({
        ...opts,
        method: "DELETE",
        body: deleteCastReqBody,
        headers: {
            ...opts && opts.headers,
            api_key: apiKey
        }
    })));
}
/**
 * Gets information about an array of casts
 */
export function casts(apiKey: string, casts: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: CastsResponse;
    } | {
        status: 400;
        data: ErrorRes;
    }>(`/farcaster/casts${QS.query(QS.explode({
        casts
    }))}`, {
        ...opts,
        headers: {
            ...opts && opts.headers,
            api_key: apiKey
        }
    }));
}
/**
 * Retrieve casts based on filters
 */
export function feed(apiKey: string, feedType: FeedType, { filterType, fid, fids, parentUrl, withRecasts, limit, cursor }: {
    filterType?: FilterType;
    fid?: Fid;
    fids?: string;
    parentUrl?: string;
    withRecasts?: boolean;
    limit?: number;
    cursor?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: FeedResponse;
    } | {
        status: 400;
        data: ErrorRes;
    }>(`/farcaster/feed${QS.query(QS.explode({
        feed_type: feedType,
        filter_type: filterType,
        fid,
        fids,
        parent_url: parentUrl,
        with_recasts: withRecasts,
        limit,
        cursor
    }))}`, {
        ...opts,
        headers: {
            ...opts && opts.headers,
            api_key: apiKey
        }
    }));
}
/**
 * Posts a reaction
 */
export function postFarcasterReaction(apiKey: string, reactionReqBody: ReactionReqBody, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: OperationResponse;
    } | {
        status: 400;
        data: ErrorRes;
    } | {
        status: 403;
        data: ErrorRes;
    } | {
        status: 404;
        data: ErrorRes;
    } | {
        status: 500;
        data: ErrorRes;
    }>("/farcaster/reaction", oazapfts.json({
        ...opts,
        method: "POST",
        body: reactionReqBody,
        headers: {
            ...opts && opts.headers,
            api_key: apiKey
        }
    })));
}
/**
 * Delete a reaction
 */
export function deleteFarcasterReaction(apiKey: string, reactionReqBody: ReactionReqBody, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: OperationResponse;
    } | {
        status: 400;
        data: ErrorRes;
    } | {
        status: 403;
        data: ErrorRes;
    } | {
        status: 404;
        data: ErrorRes;
    } | {
        status: 500;
        data: ErrorRes;
    }>("/farcaster/reaction", oazapfts.json({
        ...opts,
        method: "DELETE",
        body: reactionReqBody,
        headers: {
            ...opts && opts.headers,
            api_key: apiKey
        }
    })));
}
/**
 * Adds verification for an eth address for the user
 */
export function postFarcasterUserVerification(apiKey: string, addVerificationReqBody: AddVerificationReqBody, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: OperationResponse;
    }>("/farcaster/user/verification", oazapfts.json({
        ...opts,
        method: "POST",
        body: addVerificationReqBody,
        headers: {
            ...opts && opts.headers,
            api_key: apiKey
        }
    })));
}
/**
 * Removes verification for an eth address for the user
 */
export function deleteFarcasterUserVerification(apiKey: string, removeVerificationReqBody: RemoveVerificationReqBody, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: OperationResponse;
    }>("/farcaster/user/verification", oazapfts.json({
        ...opts,
        method: "DELETE",
        body: removeVerificationReqBody,
        headers: {
            ...opts && opts.headers,
            api_key: apiKey
        }
    })));
}
/**
 * Follow a user
 */
export function postFarcasterUserFollow(apiKey: string, followReqBody: FollowReqBody, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: BulkFollowResponse;
    } | {
        status: 400;
        data: ErrorRes;
    } | {
        status: 403;
        data: ErrorRes;
    } | {
        status: 404;
        data: ErrorRes;
    } | {
        status: 500;
        data: ErrorRes;
    }>("/farcaster/user/follow", oazapfts.json({
        ...opts,
        method: "POST",
        body: followReqBody,
        headers: {
            ...opts && opts.headers,
            api_key: apiKey
        }
    })));
}
/**
 * Unfollow a user
 */
export function deleteFarcasterUserFollow(apiKey: string, followReqBody: FollowReqBody, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: BulkFollowResponse;
    } | {
        status: 400;
        data: ErrorRes;
    } | {
        status: 403;
        data: ErrorRes;
    } | {
        status: 404;
        data: ErrorRes;
    } | {
        status: 500;
        data: ErrorRes;
    }>("/farcaster/user/follow", oazapfts.json({
        ...opts,
        method: "DELETE",
        body: followReqBody,
        headers: {
            ...opts && opts.headers,
            api_key: apiKey
        }
    })));
}
/**
 * Lookup a user by custody-address
 */
export function getFarcasterUserCustodyAddress(apiKey: string, custodyAddress: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: UserResponse;
    } | {
        status: 400;
        data: ErrorRes;
    } | {
        status: 404;
        data: ErrorRes;
    }>(`/farcaster/user/custody-address${QS.query(QS.explode({
        custody_address: custodyAddress
    }))}`, {
        ...opts,
        headers: {
            ...opts && opts.headers,
            api_key: apiKey
        }
    }));
}
/**
 * Retrieve notifications for a given user
 */
export function notifications(apiKey: string, fid: Fid, { limit, cursor }: {
    limit?: number;
    cursor?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: NotificationsResponse;
    } | {
        status: 400;
        data: ErrorRes;
    }>(`/farcaster/notifications${QS.query(QS.explode({
        fid,
        limit,
        cursor
    }))}`, {
        ...opts,
        headers: {
            ...opts && opts.headers,
            api_key: apiKey
        }
    }));
}
/**
 * Retrieve relevant followers for a given user
 */
export function getFarcasterFollowersRelevant(apiKey: string, targetFid: Fid, viewerFid: Fid, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: RelevantFollowersResponse;
    } | {
        status: 400;
        data: ErrorRes;
    }>(`/farcaster/followers/relevant${QS.query(QS.explode({
        target_fid: targetFid,
        viewer_fid: viewerFid
    }))}`, {
        ...opts,
        headers: {
            ...opts && opts.headers,
            api_key: apiKey
        }
    }));
}
/**
 * Fetches reactions for a given user
 */
export function getFarcasterReactionsUser(apiKey: string, fid: Fid, $type: ReactionsType, { limit, cursor }: {
    limit?: number;
    cursor?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ReactionsResponse;
    } | {
        status: 400;
        data: ErrorRes;
    }>(`/farcaster/reactions/user${QS.query(QS.explode({
        fid,
        "type": $type,
        limit,
        cursor
    }))}`, {
        ...opts,
        headers: {
            ...opts && opts.headers,
            api_key: apiKey
        }
    }));
}
/**
 * Fetches storage allocations for a given user
 */
export function getFarcasterStorageAllocations(apiKey: string, fid: Fid, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: StorageAllocationsResponse;
    } | {
        status: 400;
        data: ErrorRes;
    }>(`/farcaster/storage/allocations${QS.query(QS.explode({
        fid
    }))}`, {
        ...opts,
        headers: {
            ...opts && opts.headers,
            api_key: apiKey
        }
    }));
}
/**
 * Fetches storage usage for a given user
 */
export function getFarcasterStorageUsage(apiKey: string, fid: Fid, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: StorageUsageResponse;
    } | {
        status: 400;
        data: ErrorRes;
    }>(`/farcaster/storage/usage${QS.query(QS.explode({
        fid
    }))}`, {
        ...opts,
        headers: {
            ...opts && opts.headers,
            api_key: apiKey
        }
    }));
}
export enum Status {
    Generated = "generated",
    PendingApproval = "pending_approval",
    Approved = "approved",
    Revoked = "revoked"
}
export enum Object {
    User = "user"
}
export enum ActiveStatus {
    Active = "active",
    Inactive = "inactive"
}
export enum CastParamType {
    Url = "url",
    Hash = "hash"
}
export enum CastNotificationType {
    CastMention = "cast-mention",
    CastReply = "cast-reply"
}
export enum FeedType {
    Following = "following",
    Filter = "filter"
}
export enum FilterType {
    Fids = "fids",
    ParentUrl = "parent_url",
    GlobalTrending = "global_trending"
}
export enum ReactionType {
    Like = "like",
    Recast = "recast"
}
export enum Type {
    Follows = "follows",
    Recasts = "recasts",
    Likes = "likes",
    Mention = "mention",
    Reply = "reply"
}
export enum Object2 {
    Follow = "follow"
}
export enum Object3 {
    Likes = "likes",
    Recasts = "recasts"
}
export enum Object4 {
    CastDehydrated = "cast_dehydrated"
}
export enum Object5 {
    Follow = "follow"
}
export enum Object6 {
    UserDehydrated = "user_dehydrated"
}
export enum ReactionsType {
    Likes = "likes",
    Recasts = "recasts",
    All = "all"
}