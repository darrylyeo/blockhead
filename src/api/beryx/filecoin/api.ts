/**
 * Beryx Filecoin API
 * 0.1.1
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from "@oazapfts/runtime";
import * as QS from "@oazapfts/runtime/query";
export const defaults: Oazapfts.RequestOpts = {
    baseUrl: "https://api.zondax.ch/fil/data/v3/mainnet",
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {
    filecoinMainnetNetwork: "https://api.zondax.ch/fil/data/v3/mainnet"
};
/**
 * Returns the balance of {address} calculated at the tip
 */
export function getAccountBalanceByAddress(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            balances?: {
                Value?: string;
                Currency?: {
                    Symbol?: string;
                    Decimals?: number;
                };
            }[];
        };
    } | {
        status: 400;
        data: {
            code?: number;
            error?: string;
            status?: string;
        };
    }>(`/account/balance/${encodeURIComponent(address)}`, {
        ...opts
    }));
}
/**
 * Returns information about {address}
 */
export function getAccountInfoByAddress(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            robust?: string;
            short?: string;
            actor_type?: string;
            created_at?: string;
            creation_tx_hash?: string;
            creator_address?: string;
            eth_address?: string;
            id?: string;
        };
    } | {
        status: 400;
        data: {
            code?: number;
            error?: string;
            status?: string;
        };
    }>(`/account/info/${encodeURIComponent(address)}`, {
        ...opts
    }));
}
/**
 * Returns vesting information about {address}
 */
export function getAccountVestingByAddress(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            address?: string;
            initial_balance?: number;
            start_epoch?: number;
            unlock_duration?: number;
            unlock_height?: number;
        };
    } | {
        status: 400;
        data: {
            code?: number;
            error?: string;
            status?: string;
        };
    }>(`/account/vesting/${encodeURIComponent(address)}`, {
        ...opts
    }));
}
/**
 * Returns the corresponding tipset information at height {height}
 */
export function getTipsetByHeight(height: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            height?: number;
            timestamp?: string;
            canonical?: boolean;
            hash?: string;
            parent_block_hash?: string;
            blocks_info?: {
                BlockCid?: string;
                Miner?: string;
            }[];
            id?: string;
        };
    } | {
        status: 400;
        data: {
            code?: number;
            error?: string;
            status?: string;
        };
    }>(`/tipset/height/${encodeURIComponent(height)}`, {
        ...opts
    }));
}
/**
 * Returns the corresponding tipset information at tip
 */
export function getTipsetLatest(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            height?: number;
            timestamp?: string;
            canonical?: boolean;
            hash?: string;
            parent_block_hash?: string;
            blocks_info?: {
                BlockCid?: string;
                Miner?: string;
            }[];
            id?: string;
        };
    } | {
        status: 400;
        data: {
            code?: number;
            error?: string;
            status?: string;
        };
    }>("/tipset/latest", {
        ...opts
    }));
}
/**
 * Returns the list of transactions that match the hash {hash}
 */
export function getTransactionsByHash(hash: string, { page }: {
    page?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            Transactions?: {
                height?: number;
                tx_timestamp?: string;
                tx_hash?: string;
                tx_from?: string;
                level?: number;
                tx_to?: string;
                id?: string;
                hash?: string;
                amount?: number;
                canonical?: boolean;
                gas_used?: number;
                status?: string;
                tx_type?: string;
            }[];
            HasNextPage?: boolean;
            NextPage?: number;
        };
    } | {
        status: 400;
        data: {
            code?: number;
            error?: string;
            status?: string;
        };
    }>(`/transactions/hash/${encodeURIComponent(hash)}${QS.query(QS.explode({
        page
    }))}`, {
        ...opts
    }));
}
/**
 * Returns the transactions stored in the tipset at height {height}
 */
export function getTransactionsByHeight(height: number, { page }: {
    page?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            Transactions?: {
                height?: number;
                tx_timestamp?: string;
                tx_hash?: string;
                tx_from?: string;
                level?: number;
                tx_to?: string;
                id?: string;
                hash?: string;
                amount?: number;
                canonical?: boolean;
                gas_used?: number;
                status?: string;
                tx_type?: string;
            }[];
            HasNextPage?: boolean;
            NextPage?: number;
        };
    } | {
        status: 400;
        data: {
            code?: number;
            error?: string;
            status?: string;
        };
    }>(`/transactions/height/${encodeURIComponent(height)}${QS.query(QS.explode({
        page
    }))}`, {
        ...opts
    }));
}
/**
 * Returns the transactions where the address {address} participated
 */
export function getTransactionsByAddress(address: string, { page }: {
    page?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            Transactions?: {
                height?: number;
                tx_timestamp?: string;
                tx_hash?: string;
                tx_from?: string;
                level?: number;
                tx_to?: string;
                id?: string;
                hash?: string;
                amount?: number;
                canonical?: boolean;
                gas_used?: number;
                status?: string;
                tx_type?: string;
            }[];
            HasNextPage?: boolean;
            NextPage?: number;
        };
    } | {
        status: 400;
        data: {
            code?: number;
            error?: string;
            status?: string;
        };
    }>(`/transactions/address/${encodeURIComponent(address)}${QS.query(QS.explode({
        page
    }))}`, {
        ...opts
    }));
}
/**
 * Returns the complete transaction information (metadata included) that corresponds to the requested id
 */
export function getTransactionsById(id: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            height?: number;
            tx_timestamp?: string;
            hash?: string;
            tx_hash?: string;
            tx_from?: string;
            tx_to?: string;
            amount?: number;
            canonical?: boolean;
            gas_used?: number;
            status?: string;
            tx_type?: string;
            tx_metadata?: object;
            id?: string;
            level?: number;
        };
    } | {
        status: 400;
        data: {
            code?: number;
            error?: string;
            status?: string;
        };
    }>(`/transactions/id/${encodeURIComponent(id)}`, {
        ...opts
    }));
}
