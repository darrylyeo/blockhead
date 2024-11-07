/**
 * Coinpaprika API
 * 1.7.8
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from "@oazapfts/runtime";
import * as QS from "@oazapfts/runtime/query";
export const defaults: Oazapfts.Defaults<Oazapfts.CustomHeaders> = {
    headers: {},
    baseUrl: "https://api.coinpaprika.com/v1",
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {
    server1: "https://api.coinpaprika.com/v1"
};
export type Schema = {
    /** Error description */
    error?: string;
};
export type Items = {
    /** ID of the tag */
    id?: string;
    /** Name of the tag */
    name?: string;
    /** Number of coins with this tag */
    coin_counter?: number;
    /** Number of ico projects with this tag */
    ico_counter?: number;
};
export type Schema2 = {
    /** ID not found error message */
    error?: string;
};
export type Items2 = {
    /** RFC3999 (ISO-8601) format */
    time_open?: string;
    /** RFC3999 (ISO-8601) format */
    time_close?: string;
    open?: number | null;
    high?: number | null;
    low?: number | null;
    close?: number | null;
    volume?: number | null;
    market_cap?: number | null;
};
export type Items3 = {
    url?: string;
    followers?: number;
};
export type Schema3 = {
    /** ID of the tag */
    id?: string;
    /** Name of the tag */
    name?: string;
    /** Number of coins with this tag */
    coin_counter?: number;
    /** Number of ico projects with this tag */
    ico_counter?: number;
    description?: string;
    "type"?: string;
    coins?: any | null;
    icos?: any | null;
};
export type Schema4 = {
    id?: string;
    name?: string;
    "symbol"?: string;
    rank?: number;
    circulating_supply?: number;
    total_supply?: number;
    max_supply?: number;
    beta_value?: number;
    first_data_at?: string;
    last_updated?: string;
    quotes?: {
        [key: string]: {
            price?: number;
            volume_24h?: number;
            volume_24h_change_24h?: number;
            market_cap?: number;
            market_cap_change_24h?: number;
            percent_change_1h?: number;
            percent_change_12h?: number;
            percent_change_24h?: number;
            percent_change_7d?: number;
            percent_change_30d?: number;
            percent_change_1y?: number;
            ath_price?: number;
            ath_date?: string;
            percent_from_price_ath?: number;
        };
    };
};
export type Schema5 = {
    id?: string;
    name?: string;
    active?: boolean;
    website_status?: boolean;
    api_status?: boolean;
    description?: string | null;
    message?: string;
    links?: {
        website?: any;
        twitter?: any;
    };
    markets_data_fetched?: boolean;
    adjusted_rank?: number;
    reported_rank?: number;
    currencies?: number;
    markets?: number;
    fiats?: any;
    quotes?: {
        $KEY?: {
            reported_volume_24h?: number;
            adjusted_volume_24h?: number;
            /** 7d reported volume. This value is updated once per day at midnight (UTC). For example, at 2019-04-11 11:00 AM this value is the exchange volume between 2019-04-04 00:00:00 UTC and 2019-04-11 00:00:00 UTC */
            reported_volume_7d?: number;
            /** 7d adjusted volume updated once per day at midnight (UTC). See `reported_volume_7d` description for more details */
            adjusted_volume_7d?: number;
            /** 30d reported volume. This value is updated once per day at midnight (UTC). For example, at 2019-04-11 11:00 AM this value is the exchange volume between 2019-03-12 00:00:00 UTC and 2019-04-11 00:00:00 UTC */
            reported_volume_30d?: number;
            /** 30d adjusted volume updated once per day at midnight (UTC). See `reported_volume_30d` description for more details */
            adjusted_volume_30d?: number;
        };
    };
    last_updated?: string;
};
export type Quotes = {
    $KEY?: {
        price?: number;
        volume_24h?: number;
    };
};
export type Items4 = {
    /** ID of coin on coinpaprika.com */
    id?: string;
    /** Name of the cryptocurrency */
    name?: string;
    /** Symbol of the cryptocurrency */
    "symbol"?: string;
    /** Current ranking of the cryptocurrency. If `is_active` is false the `rank` is 0 */
    rank?: number;
    /** Flag indicating if the currency was added within the last 5 days */
    is_new?: boolean;
    /** Flag indicating if the currency is active, which means that we can calculate the current price and volume */
    is_active?: boolean;
    /** Type of the cryptocurrency. Currently supported values are `coin` and `token` */
    "type"?: string;
};
export type Schema6 = {
    id?: string;
    name?: string;
    "symbol"?: string;
    rank?: string;
    price_usd?: string;
    price_btc?: string;
    volume_24h_usd?: string;
    market_cap_usd?: string;
    circulating_supply?: string;
    total_supply?: string;
    max_supply?: string;
    percent_change_1h?: string;
    percent_change_24h?: string;
    percent_change_7d?: string;
    last_updated?: string;
};
/**
 * Get API key info
 */
export function getKeyInfo(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            /** Name of the API plan */
            plan?: string;
            /** A date when the plan started in RFC3999 (ISO-8601) format */
            plan_started_at?: string;
            /** Status of the plan. There are 3 possible statuses: `active` - the subscription is active; `past_due` - the subscription payment failed. If payment is not made within 7 days, then the subscription will expire; `inactive` - the subscription is inactive. */
            plan_status?: string;
            /** API Customer Portal URL */
            portal_url?: string;
            /** Monthly usage for the API key */
            usage?: {
                /** `limited plan` if the number of requests is limited in the current plan or `unlimited plan` if there is no limit on the number of requests */
                message?: string;
                /** Requests made and left stats */
                current_month?: {
                    /** Number of requests made in the current month. If a plan has no limit on the number of requests, e.g., `Enterprise` plan, then the value of `requests_made` is -1 */
                    requests_made?: number;
                    /** Number of requests left in the  current month. If a plan has no limit on the number of requests, e.g., `Enterprise` plan, then the value of `requests_left` is -1 */
                    requests_left?: number;
                };
            };
        };
    } | {
        status: 403;
    } | {
        status: 429;
        data: Schema;
    }>("/key/info", {
        ...opts
    }));
}
/**
 * Get market overview data
 */
export function getGlobal(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            /** Total market capitalization - sum of all cryptocurrency market capitalizations in USD */
            market_cap_usd?: number;
            /** Total 24h volume - sum of all cryptocurrency volumes in USD */
            volume_24h_usd?: number;
            /** Bitcoin market capitalization as a percentage of total market capitalization */
            bitcoin_dominance_percentage?: number;
            /** This is number of active cryptocurrencies on our site (active in this case means that we have up-to-date price data for a coin). Total number of our cryptocurrencies is higher and may be obtained via counting elements in /coins endpoint. */
            cryptocurrencies_number?: number;
            /** ATH (All Time High) value of market capitalization - the highest historical value of marketcap */
            market_cap_ath_value?: number;
            /** ATH (All Time High) date of market capitalization */
            market_cap_ath_date?: string;
            /** ATH (All Time High) value of the 24h volume - the highest historical value of 24h volume */
            volume_24h_ath_value?: number;
            /** ATH (All Time High) date of volume 24h */
            volume_24h_ath_date?: string;
            /** Percentage change in the market capitalization over the last 24h */
            market_cap_change_24h?: number;
            /** Percentage change in the volume 24h over the last 24h */
            volume_24h_change_24h?: number;
            /** Timestamp of the last data update */
            last_updated?: number;
        };
    } | {
        status: 429;
        data: Schema;
    }>("/global", {
        ...opts
    }));
}
/**
 * List coins
 */
export function getCoins(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            /** ID of coin on coinpaprika.com */
            id?: string;
            /** Name of the cryptocurrency */
            name?: string;
            /** Symbol of the cryptocurrency */
            "symbol"?: string;
            /** Current ranking of the cryptocurrency. If `is_active` is false the `rank` is 0 */
            rank?: number;
            /** Flag indicating if the currency was added within the last 5 days */
            is_new?: boolean;
            /** Flag indicating if the currency is active, which means that we can calculate the current price and volume */
            is_active?: boolean;
            /** Type of the cryptocurrency. Currently supported values are `coin` and `token` */
            "type"?: string;
        }[];
    } | {
        status: 429;
        data: Schema;
    }>("/coins", {
        ...opts
    }));
}
/**
 * Get coin by ID
 */
export function getCoinById(coinId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            /** ID of coin on coinpaprika.com */
            id?: string;
            /** Name of the cryptocurrency */
            name?: string;
            /** Symbol of the cryptocurrency */
            "symbol"?: string;
            /** This field is deprecated. Use `contracts` field instead */
            parent?: any | null;
            /** Current coin ranking position on coinpaprika.com */
            rank?: number;
            /** Flag indicating if the currency was added within the last 5 days */
            is_new?: boolean;
            /** Flag indicating if the currency is active, which means that we can calculate the current price and volume */
            is_active?: boolean;
            /** Type of the cryptocurrency. Currently supported values are `coin` and `token` */
            "type"?: string;
            /** Logo image URL */
            logo?: string;
            /** The array of tags to which this coin was assigned on coinpaprika.com */
            tags?: Items[];
            /** The cryptocurrency founding and/or developing team */
            team?: {
                id?: string;
                name?: string;
                position?: string;
            }[];
            /** Text description of the cryptocurrency */
            description?: string | null;
            /** An important message about current status of the cryptocurrency */
            message?: string;
            /** Set to true if the cryptocurrency is Open Source project */
            open_source?: boolean;
            /** Set to true if the cryptocurrency is supported by any hardware wallet */
            hardware_wallet?: boolean;
            /** Launch date of the cryptocurrency */
            started_at?: string | null;
            /** Development status of the cryptocurrency - if it is a working project, beta version, just an idea, etc. */
            development_status?: string | null;
            /** Cryptocurrency proof type: Proof of Work, Proof of Stake, etc. */
            proof_type?: string | null;
            /** The cryptocurrency organization structure: centralized, decentralized, hierarchical, flat, etc. */
            org_structure?: string | null;
            /** Name of the hash algorithm used by the cryptocurrency */
            hash_algorithm?: string | null;
            /** This field is deprecated. Use `contracts` field instead */
            contract?: string | null;
            /** This field is deprecated. Use `contracts` field instead */
            platform?: string | null;
            contracts?: {
                /** The contract identifier, which is usually its address */
                contract: string;
                /** ID of the contract platform. For Ethereum contracts it is `eth-ethereum`, for Tron `trx-tron`, etc. */
                platform: string;
                /** Type of the contract. Currently supported values are: `ERC20`, `BEP2`, `TRC10`, `TRC20`, `Stellar Asset`, `Other` */
                "type": string;
            }[];
            links?: {
                /** List of links to blockchain explorers, if any */
                explorer?: any | null;
                /** List of links to Facebook pages of the cryptocurrency, if any */
                facebook?: any | null;
                /** List of links to Reddit communities and profiles, if any */
                reddit?: any | null;
                /** List of links to source code repositories, if any */
                source_code?: any | null;
                /** List of the cryptocurrency websites, if any */
                website?: any | null;
                /** List of links to Youtube channels of the cryptocurrency, if any */
                youtube?: any | null;
                /** List of links to Medium profiles of the cryptocurrency, if any */
                medium?: any | null;
            };
            /** Contains all links of the `{coin_id}` coin together with statistics for some of them, e.g. number of twitter followers, reddit subscribers, telegram members or github repository stars and contributors */
            links_extended?: {
                /** The link URL */
                url: string;
                /** Type of the link: `website`, `reddit`, `source_code`, etc. */
                "type": string;
                /** An object containing the link stats like `subscribers` (for reddit), `followers` (for twitter), `members` (for telegram), `stars`, `contributors` (for source code) */
                stats?: {
                    [key: string]: number;
                };
            }[];
            whitepaper?: {
                /** The whitepaper URL */
                link?: string;
                /** Link to the whitepaper thumbnail */
                thumbnail?: string;
            };
            /** Date of the first available ticker data for the coin. RFC3999 (ISO-8601) format */
            first_data_at?: string;
            /** Date of the last available ticker data for the coin. RFC3999 (ISO-8601) format */
            last_data_at?: string;
        };
    } | {
        status: 404;
        data: Schema2;
    } | {
        status: 429;
        data: Schema;
    }>(`/coins/${encodeURIComponent(coinId)}`, {
        ...opts
    }));
}
/**
 * Get Twitter timeline tweets for a coin
 */
export function getCoinsByCoinIdTwitter(coinId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            /** Publish date of the tweet. RFC3999 (ISO-8601) format */
            date?: string;
            /** Twitter profile user name */
            user_name?: string;
            /** Twitter profile user image URL */
            user_image_link?: string;
            /** Tweet content */
            status?: string;
            /** Flag indicating whether it is a retweet of someone else's tweet */
            is_retweet?: boolean;
            /** Number of retweets of this tweet */
            retweet_count?: number;
            /** Number of likes of this tweet */
            like_count?: number;
            /** Tweet URL */
            status_link?: string;
            /** Tweet ID */
            status_id?: string;
            media_link?: string | null;
            /** Link to Youtube video shared in this tweet */
            youtube_link?: string | null;
        }[];
    } | {
        status: 404;
        data: Schema2;
    } | {
        status: 429;
        data: Schema;
    }>(`/coins/${encodeURIComponent(coinId)}/twitter`, {
        ...opts
    }));
}
/**
 * Get coin events by coin ID
 */
export function getCoinsByCoinIdEvents(coinId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            id?: string;
            date?: string;
            date_to?: string | null;
            name?: string;
            description?: string;
            is_conference?: boolean;
            link?: string | null;
            proof_image_link?: string | null;
        }[];
    } | {
        status: 404;
        data: Schema2;
    } | {
        status: 429;
        data: Schema;
    }>(`/coins/${encodeURIComponent(coinId)}/events`, {
        ...opts
    }));
}
/**
 * Get exchanges by coin ID
 */
export function getCoinsByCoinIdExchanges(coinId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            id?: string;
            name?: string;
            fiats?: any;
            adjusted_volume_24h_share?: number;
        }[];
    } | {
        status: 404;
        data: Schema2;
    } | {
        status: 429;
        data: Schema;
    }>(`/coins/${encodeURIComponent(coinId)}/exchanges`, {
        ...opts
    }));
}
/**
 * Get markets by coin ID
 */
export function getCoinsByCoinIdMarkets(coinId: string, { quotes }: {
    quotes?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            exchange_id?: string;
            exchange_name?: string;
            pair?: string;
            base_currency_id?: string;
            base_currency_name?: string;
            quote_currency_id?: string;
            quote_currency_name?: string;
            market_url?: string;
            category?: string;
            fee_type?: string;
            outlier?: any;
            adjusted_volume_24h_share?: number;
            quotes?: {
                $KEY?: {
                    price?: number;
                    volume_24h?: number;
                };
            };
            last_updated?: string;
        }[];
    } | {
        status: 404;
        data: Schema2;
    } | {
        status: 429;
        data: Schema;
    }>(`/coins/${encodeURIComponent(coinId)}/markets${QS.query(QS.explode({
        quotes
    }))}`, {
        ...opts
    }));
}
/**
 * Get OHLC for the last full day
 */
export function getCoinsByCoinIdOhlcvLatest(coinId: string, { quote }: {
    quote?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: Items2[];
    } | {
        status: 404;
        data: Schema2;
    } | {
        status: 429;
        data: Schema;
    }>(`/coins/${encodeURIComponent(coinId)}/ohlcv/latest/${QS.query(QS.explode({
        quote
    }))}`, {
        ...opts
    }));
}
/**
 * Get historical OHLC
 */
export function getCoinsByCoinIdOhlcvHistorical(coinId: string, start: string, { end, limit, interval, quote }: {
    end?: string;
    limit?: number;
    interval?: string;
    quote?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: Items2[];
    } | {
        status: 404;
        data: Schema2;
    } | {
        status: 429;
        data: Schema;
    }>(`/coins/${encodeURIComponent(coinId)}/ohlcv/historical${QS.query(QS.explode({
        start,
        end,
        limit,
        interval,
        quote
    }))}`, {
        ...opts
    }));
}
/**
 * Get today OHLC
 */
export function getCoinsByCoinIdOhlcvToday(coinId: string, { quote }: {
    quote?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            /** RFC3999 (ISO-8601) format */
            time_open?: string;
            /** RFC3999 (ISO-8601) format */
            time_close?: string;
            open?: number | null;
            high?: number | null;
            low?: number | null;
            close?: number | null;
            volume?: number | null;
            market_cap?: number | null;
        }[];
    } | {
        status: 404;
        data: Schema2;
    } | {
        status: 429;
        data: Schema;
    }>(`/coins/${encodeURIComponent(coinId)}/ohlcv/today/${QS.query(QS.explode({
        quote
    }))}`, {
        ...opts
    }));
}
/**
 * Get person by ID
 */
export function getPeopleById(personId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            id?: string;
            name?: string;
            description?: string;
            /** Number of teams where person is a member */
            teams_count?: number;
            links?: {
                github?: {
                    url?: string;
                    followers?: number;
                }[];
                linkedin?: Items3[];
                medium?: Items3[];
                twitter?: Items3[];
                additional?: Items3[];
            };
            positions?: {
                coin_id?: string;
                coin_name?: string;
                position?: string;
            }[];
        };
    } | {
        status: 404;
        data: Schema2;
    } | {
        status: 429;
        data: Schema;
    }>(`/people/${encodeURIComponent(personId)}`, {
        ...opts
    }));
}
/**
 * List tags
 */
export function getTags({ additionalFields }: {
    additionalFields?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: Schema3[];
    } | {
        status: 429;
        data: {
            /** Error description */
            error?: string;
        };
    }>(`/tags${QS.query(QS.explode({
        additional_fields: additionalFields
    }))}`, {
        ...opts
    }));
}
/**
 * Get tag by ID
 */
export function getTagsByTagId(tagId: string, { additionalFields }: {
    additionalFields?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            /** ID of the tag */
            id?: string;
            /** Name of the tag */
            name?: string;
            /** Number of coins with this tag */
            coin_counter?: number;
            /** Number of ico projects with this tag */
            ico_counter?: number;
            description?: string;
            "type"?: string;
            coins?: any | null;
            icos?: any | null;
        };
    } | {
        status: 404;
        data: {
            /** ID not found error message */
            error?: string;
        };
    } | {
        status: 429;
        data: Schema;
    }>(`/tags/${encodeURIComponent(tagId)}${QS.query(QS.explode({
        additional_fields: additionalFields
    }))}`, {
        ...opts
    }));
}
/**
 * Get tickers for all active coins
 */
export function getTickers({ quotes }: {
    quotes?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: Schema4[];
    } | {
        status: 429;
        data: Schema;
    }>(`/tickers${QS.query(QS.explode({
        quotes
    }))}`, {
        ...opts
    }));
}
/**
 * Get ticker for a specific coin
 */
export function getTickersById(coinId: string, { quotes }: {
    quotes?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            id?: string;
            name?: string;
            "symbol"?: string;
            rank?: number;
            circulating_supply?: number;
            total_supply?: number;
            max_supply?: number;
            beta_value?: number;
            first_data_at?: string;
            last_updated?: string;
            quotes?: {
                [key: string]: {
                    price?: number;
                    volume_24h?: number;
                    volume_24h_change_24h?: number;
                    market_cap?: number;
                    market_cap_change_24h?: number;
                    percent_change_1h?: number;
                    percent_change_12h?: number;
                    percent_change_24h?: number;
                    percent_change_7d?: number;
                    percent_change_30d?: number;
                    percent_change_1y?: number;
                    ath_price?: number;
                    ath_date?: string;
                    percent_from_price_ath?: number;
                };
            };
        };
    } | {
        status: 404;
        data: Schema2;
    } | {
        status: 429;
        data: Schema;
    }>(`/tickers/${encodeURIComponent(coinId)}${QS.query(QS.explode({
        quotes
    }))}`, {
        ...opts
    }));
}
/**
 * Get historical ticks for a specific coin
 */
export function getTickersHistoricalById(coinId: string, start: string, { end, limit, quote, interval }: {
    end?: string;
    limit?: number;
    quote?: string;
    interval?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            /** RFC3999 (ISO-8601) format */
            timestamp?: string;
            price?: number;
            volume_24h?: number;
            market_cap?: number;
        }[];
    } | {
        status: 400;
    } | {
        status: 404;
        data: Schema2;
    } | {
        status: 429;
        data: Schema;
    }>(`/tickers/${encodeURIComponent(coinId)}/historical${QS.query(QS.explode({
        start,
        end,
        limit,
        quote,
        interval
    }))}`, {
        ...opts
    }));
}
/**
 * List exchanges
 */
export function getExchanges({ quotes }: {
    quotes?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: Schema5[];
    } | {
        status: 429;
        data: Schema;
    }>(`/exchanges${QS.query(QS.explode({
        quotes
    }))}`, {
        ...opts
    }));
}
/**
 * Get exchange by ID
 */
export function getExchangeById(exchangeId: string, { quotes }: {
    quotes?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            id?: string;
            name?: string;
            active?: boolean;
            website_status?: boolean;
            api_status?: boolean;
            description?: string | null;
            message?: string;
            links?: {
                website?: any;
                twitter?: any;
            };
            markets_data_fetched?: boolean;
            adjusted_rank?: number;
            reported_rank?: number;
            currencies?: number;
            markets?: number;
            fiats?: any;
            quotes?: {
                $KEY?: {
                    reported_volume_24h?: number;
                    adjusted_volume_24h?: number;
                    /** 7d reported volume. This value is updated once per day at midnight (UTC). For example, at 2019-04-11 11:00 AM this value is the exchange volume between 2019-04-04 00:00:00 UTC and 2019-04-11 00:00:00 UTC */
                    reported_volume_7d?: number;
                    /** 7d adjusted volume updated once per day at midnight (UTC). See `reported_volume_7d` description for more details */
                    adjusted_volume_7d?: number;
                    /** 30d reported volume. This value is updated once per day at midnight (UTC). For example, at 2019-04-11 11:00 AM this value is the exchange volume between 2019-03-12 00:00:00 UTC and 2019-04-11 00:00:00 UTC */
                    reported_volume_30d?: number;
                    /** 30d adjusted volume updated once per day at midnight (UTC). See `reported_volume_30d` description for more details */
                    adjusted_volume_30d?: number;
                };
            };
            last_updated?: string;
        };
    } | {
        status: 404;
        data: Schema2;
    } | {
        status: 429;
        data: Schema;
    }>(`/exchanges/${encodeURIComponent(exchangeId)}${QS.query(QS.explode({
        quotes
    }))}`, {
        ...opts
    }));
}
/**
 * List an exchange markets
 */
export function getExchangesByExchangeIdMarkets(exchangeId: string, { quotes }: {
    quotes?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            pair?: string;
            base_currency_id?: string;
            base_currency_name?: string;
            quote_currency_id?: string;
            quote_currency_name?: string;
            market_url?: string;
            category?: string;
            fee_type?: string;
            outlier?: any;
            reported_volume_24h_share?: number;
            quotes?: Quotes;
            last_updated?: string;
        }[];
    } | {
        status: 404;
        data: Schema2;
    } | {
        status: 429;
        data: Schema;
    }>(`/exchanges/${encodeURIComponent(exchangeId)}/markets${QS.query(QS.explode({
        quotes
    }))}`, {
        ...opts
    }));
}
/**
 * List contracts platforms
 */
export function getPlatforms(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: string[];
    } | {
        status: 429;
        data: Schema;
    }>("/contracts", {
        ...opts
    }));
}
/**
 * Get all contract addressess for a given platform
 */
export function getContracts(platformId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            address?: string;
            id?: string;
            "type"?: string;
        }[];
    } | {
        status: 429;
        data: Schema;
    }>(`/contracts/${encodeURIComponent(platformId)}`, {
        ...opts
    }));
}
/**
 * Redirect to Ticker by contract address
 */
export function getTicker(platformId: string, contractAddress: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 301;
    } | {
        status: 429;
        data: Schema;
    }>(`/contracts/${encodeURIComponent(platformId)}/${encodeURIComponent(contractAddress)}`, {
        ...opts
    }));
}
/**
 * Redirect to historical ticks by contract address
 */
export function getHistoricalTicker(platformId: string, contractAddress: string, start: string, { end, limit, quote, interval }: {
    end?: string;
    limit?: number;
    quote?: string;
    interval?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 301;
    } | {
        status: 429;
        data: Schema;
    }>(`/contracts/${encodeURIComponent(platformId)}/${encodeURIComponent(contractAddress)}/historical${QS.query(QS.explode({
        start,
        end,
        limit,
        quote,
        interval
    }))}`, {
        ...opts
    }));
}
/**
 * Get id changelog for all coins
 */
export function getChangelogIDs({ page }: {
    page?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            currency_id?: string;
            old_id?: string;
            new_id?: string;
            /** RFC3999 (ISO-8601) format */
            changed_at?: string;
        }[][];
    } | {
        status: 429;
        data: Schema;
    }>(`/changelog/ids${QS.query(QS.explode({
        page
    }))}`, {
        ...opts
    }));
}
/**
 * Search
 */
export function getSearch(q: string, { c, modifier, limit }: {
    c?: string;
    modifier?: string;
    limit?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            currencies?: Items4[];
            icos?: {
                id?: string;
                name?: string;
                "symbol"?: string;
                is_new?: boolean;
            }[];
            exchanges?: {
                id?: string;
                name?: string;
                rank?: number;
            }[];
            people?: {
                id?: string;
                name?: string;
                /** Number of teams where person is a member */
                teams_count?: number;
            }[];
            tags?: {
                /** ID of the tag */
                id?: string;
                /** Name of the tag */
                name?: string;
                /** Number of coins with this tag */
                coin_counter?: number;
                /** Number of ico projects with this tag */
                ico_counter?: number;
            }[];
        };
    } | {
        status: 400;
    } | {
        status: 429;
        data: Schema;
    }>(`/search${QS.query(QS.explode({
        q,
        c,
        modifier,
        limit
    }))}`, {
        ...opts
    }));
}
/**
 * Price converter
 */
export function getPriceConverter(baseCurrencyId: string, quoteCurrencyId: string, { amount }: {
    amount?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            base_currency_id?: string;
            base_currency_name?: string;
            base_price_last_updated?: string;
            quote_currency_id?: string;
            quote_currency_name?: string;
            quote_price_last_updated?: string;
            amount?: number;
            price?: number;
        };
    } | {
        status: 400;
    } | {
        status: 429;
        data: Schema;
    }>(`/price-converter${QS.query(QS.explode({
        base_currency_id: baseCurrencyId,
        quote_currency_id: quoteCurrencyId,
        amount
    }))}`, {
        ...opts
    }));
}
/**
 * Get ticker information for all coins [DEPRECATED]
 */
export function getTicker2(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: Schema6[];
    } | {
        status: 429;
    }>("/ticker", {
        ...opts
    }));
}
/**
 * Get ticker by ID [DEPRECATED]
 */
export function getTickerByCoinId(coinId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            id?: string;
            name?: string;
            "symbol"?: string;
            rank?: string;
            price_usd?: string;
            price_btc?: string;
            volume_24h_usd?: string;
            market_cap_usd?: string;
            circulating_supply?: string;
            total_supply?: string;
            max_supply?: string;
            percent_change_1h?: string;
            percent_change_24h?: string;
            percent_change_7d?: string;
            last_updated?: string;
        };
    } | {
        status: 429;
    }>(`/ticker/${encodeURIComponent(coinId)}`, {
        ...opts
    }));
}
