/**
 * Farcaster Graph by Karma3Labs
 * 1.0.0
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from "oazapfts/lib/runtime";
import * as QS from "oazapfts/lib/runtime/query";
export const defaults: Oazapfts.Defaults<Oazapfts.CustomHeaders> = {
    headers: {},
    baseUrl: "https://graph.cast.k3l.io",
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {
    server1: "https://graph.cast.k3l.io"
};
export type ValidationError = {
    loc: (string | number)[];
    msg: string;
    "type": string;
};
export type HttpValidationError = {
    detail?: ValidationError[];
};
/**
 * Get Direct Engagement For Handles
 */
export function getDirectEngagementForHandlesLinksEngagementHandlesPost(body: string[], { limit }: {
    limit?: number | null;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/links/engagement/handles${QS.query(QS.explode({
        limit
    }))}`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Direct Following For Handles
 */
export function getDirectFollowingForHandlesLinksFollowingHandlesPost(body: string[], { limit }: {
    limit?: number | null;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/links/following/handles${QS.query(QS.explode({
        limit
    }))}`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Direct Engagement For Fids
 */
export function getDirectEngagementForFidsLinksEngagementFidsPost(body: number[], { limit }: {
    limit?: number | null;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/links/engagement/fids${QS.query(QS.explode({
        limit
    }))}`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Direct Following For Fids
 */
export function getDirectFollowingForFidsLinksFollowingFidsPost(body: number[], { limit }: {
    limit?: number | null;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/links/following/fids${QS.query(QS.explode({
        limit
    }))}`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Neighbors Engagement
 */
export function getNeighborsEngagementGraphNeighborsEngagementAddressesPost(body: string[], { k, limit }: {
    k?: number;
    limit?: number | null;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/graph/neighbors/engagement/addresses${QS.query(QS.explode({
        k,
        limit
    }))}`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Neighbors Following
 */
export function getNeighborsFollowingGraphNeighborsFollowingAddressesPost(body: string[], { k, limit }: {
    k?: number;
    limit?: number | null;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/graph/neighbors/following/addresses${QS.query(QS.explode({
        k,
        limit
    }))}`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Neighbors Engagement For Handles
 */
export function getNeighborsEngagementForHandlesGraphNeighborsEngagementHandlesPost(body: string[], { k, limit }: {
    k?: number;
    limit?: number | null;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/graph/neighbors/engagement/handles${QS.query(QS.explode({
        k,
        limit
    }))}`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Neighbors Following For Handles
 */
export function getNeighborsFollowingForHandlesGraphNeighborsFollowingHandlesPost(body: string[], { k, limit }: {
    k?: number;
    limit?: number | null;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/graph/neighbors/following/handles${QS.query(QS.explode({
        k,
        limit
    }))}`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Neighbors Engagement For Fids
 */
export function getNeighborsEngagementForFidsGraphNeighborsEngagementFidsPost(body: number[], { k, lite, limit }: {
    k?: number;
    lite?: boolean;
    limit?: number | null;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/graph/neighbors/engagement/fids${QS.query(QS.explode({
        k,
        lite,
        limit
    }))}`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Neighbors Following For Fids
 */
export function getNeighborsFollowingForFidsGraphNeighborsFollowingFidsPost(body: number[], { k, limit, lite }: {
    k?: number;
    limit?: number | null;
    lite?: boolean;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/graph/neighbors/following/fids${QS.query(QS.explode({
        k,
        limit,
        lite
    }))}`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Handles For Addresses
 */
export function getHandlesForAddressesMetadataHandlesPost(body: string[], opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>("/metadata/handles", oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Fids For Addresses
 */
export function getFidsForAddressesMetadataFidsPost(body: string[], opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>("/metadata/fids", oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Addresses For Fidss
 */
export function getAddressesForFidssMetadataAddressesFidsPost(body: number[], opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>("/metadata/addresses/fids", oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Addresses For Handles
 */
export function getAddressesForHandlesMetadataAddressesPost(body: string[], opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>("/metadata/addresses", oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Addresses For Handles
 */
export function getAddressesForHandlesMetadataAddressesHandlesPost(body: string[], opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>("/metadata/addresses/handles", oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Personalized Engagement For Addresses
 */
export function getPersonalizedEngagementForAddressesScoresPersonalizedEngagementAddressesPost(body: string[], { k, limit }: {
    k?: number;
    limit?: number | null;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/scores/personalized/engagement/addresses${QS.query(QS.explode({
        k,
        limit
    }))}`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Personalized Following For Addresses
 */
export function getPersonalizedFollowingForAddressesScoresPersonalizedFollowingAddressesPost(body: string[], { k, limit }: {
    k?: number;
    limit?: number | null;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/scores/personalized/following/addresses${QS.query(QS.explode({
        k,
        limit
    }))}`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Personalized Engagement For Handles
 */
export function getPersonalizedEngagementForHandlesScoresPersonalizedEngagementHandlesPost(body: string[], { k, limit }: {
    k?: number;
    limit?: number | null;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/scores/personalized/engagement/handles${QS.query(QS.explode({
        k,
        limit
    }))}`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Personalized Following For Handles
 */
export function getPersonalizedFollowingForHandlesScoresPersonalizedFollowingHandlesPost(body: string[], { k, limit }: {
    k?: number;
    limit?: number | null;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/scores/personalized/following/handles${QS.query(QS.explode({
        k,
        limit
    }))}`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Personalized Engagement For Fids
 */
export function getPersonalizedEngagementForFidsScoresPersonalizedEngagementFidsPost(body: number[], { k, limit, lite }: {
    k?: number;
    limit?: number | null;
    lite?: boolean;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/scores/personalized/engagement/fids${QS.query(QS.explode({
        k,
        limit,
        lite
    }))}`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Personalized Following For Fids
 */
export function getPersonalizedFollowingForFidsScoresPersonalizedFollowingFidsPost(body: number[], { k, limit, lite }: {
    k?: number;
    limit?: number | null;
    lite?: boolean;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/scores/personalized/following/fids${QS.query(QS.explode({
        k,
        limit,
        lite
    }))}`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Top Following Profiles
 */
export function getTopFollowingProfilesScoresGlobalFollowingRankingsGet({ offset, limit }: {
    offset?: number | null;
    limit?: number | null;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/scores/global/following/rankings${QS.query(QS.explode({
        offset,
        limit
    }))}`, {
        ...opts
    }));
}
/**
 * Get Top Engagement Profiles
 */
export function getTopEngagementProfilesScoresGlobalEngagementRankingsGet({ offset, limit }: {
    offset?: number | null;
    limit?: number | null;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/scores/global/engagement/rankings${QS.query(QS.explode({
        offset,
        limit
    }))}`, {
        ...opts
    }));
}
/**
 * Get Following Rank For Fids
 */
export function getFollowingRankForFidsScoresGlobalFollowingFidsPost(body: number[], opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>("/scores/global/following/fids", oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Following Rank For Handles
 */
export function getFollowingRankForHandlesScoresGlobalFollowingHandlesPost(body: string[], opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>("/scores/global/following/handles", oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Engagement Rank For Fids
 */
export function getEngagementRankForFidsScoresGlobalEngagementFidsPost(body: number[], opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>("/scores/global/engagement/fids", oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Engagement Rank For Handles
 */
export function getEngagementRankForHandlesScoresGlobalEngagementHandlesPost(body: string[], opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>("/scores/global/engagement/handles", oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Top Frames
 */
export function getTopFramesFramesGlobalRankingsGet({ agg, weights, details, offset, limit, recent }: {
    agg?: ScoreAgg | null;
    weights?: string | null;
    details?: boolean | null;
    offset?: number | null;
    limit?: number | null;
    recent?: boolean | null;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/frames/global/rankings${QS.query(QS.explode({
        agg,
        weights,
        details,
        offset,
        limit,
        recent
    }))}`, {
        ...opts
    }));
}
/**
 * Get Personalized Frames For Fids
 */
export function getPersonalizedFramesForFidsFramesPersonalizedRankingsFidsPost(body: number[], { agg, weights, voting, k, limit, recent }: {
    agg?: ScoreAgg | null;
    weights?: string | null;
    voting?: Voting | null;
    k?: number;
    limit?: number | null;
    recent?: boolean | null;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/frames/personalized/rankings/fids${QS.query(QS.explode({
        agg,
        weights,
        voting,
        k,
        limit,
        recent
    }))}`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Personalized Frames For Handles
 */
export function getPersonalizedFramesForHandlesFramesPersonalizedRankingsHandlesPost(body: string[], { agg, weights, voting, k, limit, recent }: {
    agg?: ScoreAgg | null;
    weights?: string | null;
    voting?: Voting | null;
    k?: number;
    limit?: number | null;
    recent?: boolean | null;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/frames/personalized/rankings/handles${QS.query(QS.explode({
        agg,
        weights,
        voting,
        k,
        limit,
        recent
    }))}`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Popular Casts For Fid
 */
export function getPopularCastsForFidCastsPersonalizedPopularFidGet(fid: number, { agg, weights, k, offset, limit, graphLimit, lite }: {
    agg?: ScoreAgg | null;
    weights?: string | null;
    k?: number;
    offset?: number | null;
    limit?: number | null;
    graphLimit?: number | null;
    lite?: boolean;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/casts/personalized/popular/${encodeURIComponent(fid)}${QS.query(QS.explode({
        agg,
        weights,
        k,
        offset,
        limit,
        graph_limit: graphLimit,
        lite
    }))}`, {
        ...opts
    }));
}
/**
 * Get Recent Casts For Fid
 */
export function getRecentCastsForFidCastsPersonalizedRecentFidGet(fid: number, { k, offset, limit, graphLimit, lite }: {
    k?: number;
    offset?: number | null;
    limit?: number | null;
    graphLimit?: number | null;
    lite?: boolean;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/casts/personalized/recent/${encodeURIComponent(fid)}${QS.query(QS.explode({
        k,
        offset,
        limit,
        graph_limit: graphLimit,
        lite
    }))}`, {
        ...opts
    }));
}
/**
 * Get Top Channel Profiles
 */
export function getTopChannelProfilesChannelsRankingsChannelGet(channel: Channel, { offset, limit, lite }: {
    offset?: number | null;
    limit?: number | null;
    lite?: boolean;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/channels/rankings/${encodeURIComponent(channel)}${QS.query(QS.explode({
        offset,
        limit,
        lite
    }))}`, {
        ...opts
    }));
}
/**
 * Get Channel Rank For Fids
 */
export function getChannelRankForFidsChannelsRankingsChannelFidsPost(channel: Channel, body: number[], { lite }: {
    lite?: boolean;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/channels/rankings/${encodeURIComponent(channel)}/fids${QS.query(QS.explode({
        lite
    }))}`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Channel Rank For Handles
 */
export function getChannelRankForHandlesChannelsRankingsChannelHandlesPost(channel: Channel, body: string[], opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/channels/rankings/${encodeURIComponent(channel)}/handles`, oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
/**
 * Get Popular Channel Casts
 */
export function getPopularChannelCastsChannelsCastsPopularChannelGet(channel: Channel, { agg, weights, offset, limit, lite }: {
    agg?: ScoreAgg | null;
    weights?: string | null;
    offset?: number | null;
    limit?: number | null;
    lite?: boolean;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    } | {
        status: 422;
        data: HttpValidationError;
    }>(`/channels/casts/popular/${encodeURIComponent(channel)}${QS.query(QS.explode({
        agg,
        weights,
        offset,
        limit,
        lite
    }))}`, {
        ...opts
    }));
}
/**
 * Get Health
 */
export function getHealthHealthGet(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: any;
    }>("/_health", {
        ...opts
    }));
}
export enum ScoreAgg {
    Rms = "rms",
    Sumsquare = "sumsquare",
    Sum = "sum"
}
export enum Voting {
    Single = "single",
    Multiple = "multiple"
}
export enum Channel {
    Degen = "degen",
    Base = "base",
    Optimism = "optimism",
    Founders = "founders",
    Farcaster = "farcaster",
    OpStack = "op-stack"
}
