/**
 * Beryx Filecoin API
 * 3.2.1
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from "@oazapfts/runtime";
import * as QS from "@oazapfts/runtime/query";
export const defaults: Oazapfts.Defaults<Oazapfts.CustomHeaders> = {
    headers: {},
    baseUrl: "https://api.zondax.ch/fil/data/v3/mainnet",
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {
    filecoinMainnetNetwork: "https://api.zondax.ch/fil/data/v3/mainnet"
};
export type AccountBalance = {
    /** token amount */
    Value?: string;
    Currency?: {
        /** Canonical symbol associated with a currency */
        Symbol?: string;
        /** Number of decimal places in the standard unit representation of the amount */
        Decimals?: number;
    };
};
export type Error = {
    /** application-level error message, for debugging */
    error?: string;
    /** user-level status message */
    status?: string;
};
export type AccountInfo = {
    /** Account address in robust format */
    robust?: string;
    /** Account address in short format */
    short?: string;
    /** Actor type of this account */
    actor_type?: string;
    /** If the actor type is "evm", it indicates when the contract was deployed */
    created_at?: string;
    /** If the actor type is "evm", it indicates when the bloch has where the contract was deployed */
    creation_tx_hash?: string;
    /** If the actor type is "evm", it indicates the address responsable for the contract deployment */
    creator_address?: string;
    /** If the actor type is "evm", it indicates the ethereum contract address format. */
    eth_address?: string;
    actor_cid?: string;
};
export type BlockInfo = {
    BlockCid?: string;
    Miner?: string;
};
export type TipsetInfo = {
    /** Tipset height */
    height?: number;
    /** List of blocks cid included on this tipset */
    blocks_cid?: string[];
    /** Whether the tipset is final or not */
    canonical?: boolean;
    /** The base fee for the tipset */
    base_fee?: number;
    /** Tipset timestamp with time zone */
    timestamp?: string;
    tipset_cid?: any;
    id?: any;
    parent_tipset_cid?: any;
    blocks_info?: BlockInfo[];
    /** Total quantity of main transactions in this tipset */
    total_txs?: number;
};
export type Transaction = {
    /** Height at which the transaction was executed */
    height?: number;
    /** Whether the transaction is final or not */
    canonical?: boolean;
    /** Tipset timestamp with time zone */
    tx_timestamp?: string;
    /** Tipset cid where the transaction was included */
    tipset_cid?: string;
    /** Block cid where the transaction was included */
    block_cid?: string;
    /** Indicates how nested this transaction is in another transaction. */
    level?: number;
    /** Amount of gas used to process the transaction */
    gas_used?: string;
    /** Transaction CID */
    tx_cid?: string;
    /** Unique id that identifies the tx internally */
    id?: string;
    /** ID of the parent transaction, if any. All zeros if the tx is not an internal transaction */
    parent_id?: string;
    /** ID used to request more info about this specific transaction using the transaction by address service */
    search_id?: string;
    /** Transaction address emitter */
    tx_from?: string;
    /** Transaction address receiver */
    tx_to?: string;
    /** Amount of tokens involved in the transaction */
    amount?: number;
    /** Transaction status [OK - FAIL] */
    status?: string;
    /** Transaction type */
    tx_type?: string;
};
export type StandardValidationError = {
    status?: string;
    error?: string;
    metadata?: {
        count_canonical?: number;
        count_latest?: number;
        max_allowed_transactions_limit?: number;
    };
    error_code?: number;
};
export type Erc20Contract = {
    /** Ticker symbol of the ERC20 token */
    ticker?: string;
    /** The Ethereum address of the ERC20 contract */
    contract_address?: string;
    /** Description of the ERC20 token */
    description?: string;
    /** The number of decimals the token uses */
    decimals?: number;
    /** Total supply of the token */
    total_supply?: number;
    /** The date the token was created */
    creation_date?: string;
    /** Number of addresses holding the token */
    holders_count?: number;
};
export type Erc20TransfersAndApprovals = {
    id?: string;
    height?: number;
    "type"?: string;
    to?: string;
    "from"?: string;
    amount?: number;
    contract_address?: string;
}[];
export type TransactionWithMetadata = {
    /** Height at which the transaction was executed */
    height?: number;
    /** Whether the transaction is final or not */
    canonical?: boolean;
    /** Tipset timestamp with time zone */
    tx_timestamp?: string;
    /** Tipset cid where the transaction was included */
    tipset_cid?: string;
    /** Block cid where the transaction was included */
    block_cid?: string;
    /** Indicates how nested this transaction is in another transaction. */
    level?: number;
    /** Amount of gas used to process the transaction */
    gas_used?: string;
    /** Transaction CID */
    tx_cid?: string;
    /** Unique id that identifies the tx internally */
    id?: string;
    /** ID of the parent transaction, if any. All zeros if the tx is not an internal transaction */
    parent_id?: string;
    /** ID used to request more info about this specific transaction using the transaction by address service */
    search_id?: string;
    /** Transaction address emitter */
    tx_from?: string;
    /** Transaction address receiver */
    tx_to?: string;
    /** Amount of tokens involved in the transaction */
    amount?: number;
    /** Transaction status [OK - FAIL] */
    status?: string;
    /** Transaction type */
    tx_type?: string;
    /** Misc metadata */
    tx_metadata?: object;
};
export type EventWithMetadata = {
    /** Height at which the event was executed */
    height?: number;
    /** Whether the event is final or not */
    canonical?: boolean;
    /** The event metadata */
    metadata?: object;
    /** Tipset cid where the event was included */
    tipset_cid?: string;
    /** Indicates the index of the event in the transaction. */
    log_index?: number;
    /** Transaction CID */
    tx_cid?: string;
    /** Unique id that identifies the event internally */
    id?: string;
    /** ID used to request more info about this specific event */
    search_id?: string;
    /** The address of the event emitter */
    emitter?: string;
    /** The selector hash of the event */
    selector_id?: string;
    /** Signature of the selector id of the event */
    selector_sig?: string;
    /** If event is reverted */
    reverted?: boolean;
    /** Event type */
    "type"?: string;
};
export type Event = {
    /** Height at which the event was executed */
    height?: number;
    /** Whether the event is final or not */
    canonical?: boolean;
    /** Tipset cid where the event was included */
    tipset_cid?: string;
    /** Indicates the index of the event in the transaction. */
    log_index?: number;
    /** Transaction CID */
    tx_cid?: string;
    /** Unique id that identifies the event internally */
    id?: string;
    /** ID used to request more info about this specific event */
    search_id?: string;
    /** The address of the event emitter */
    emitter?: string;
    /** The selector hash of the event */
    selector_id?: string;
    /** Signature of the selector id of the event */
    selector_sig?: string;
    /** If event is reverted */
    reverted?: boolean;
    /** Event type */
    "type"?: string;
};
export type CountStats = {
    bucket?: string;
    count?: number;
}[];
export type FirstInvokeStats = {
    bucket?: string;
    tx_from?: string;
}[];
export type GasUsedStats = {
    bucket?: string;
    gas_used?: string;
}[];
export type BalanceStats = {
    height?: number;
    balance?: string;
}[];
export type ValueFlowStats = {
    height?: number;
    value?: string;
}[];
export type ValueExchangedStats = {
    height?: number;
    inbound?: string;
    outbound?: string;
}[];
export type RichListStats = {
    unified_account?: string;
    actor_type?: string;
    last_seen_height?: number;
    balance?: string;
    /** Represents the account's balance as a percentage of the total system balance. For instance, if an account holds 10% of the total funds in the system, its 'ratio' value would be 10%. */
    ratio?: number;
    /** Indicates the timestamp when the account first appeared in the system. */
    first_seen?: string;
    /** Denotes the most recent timestamp when the account was active, based on the latest block height where the account had recorded activity. */
    last_seen?: string;
}[];
export type RichListErc20Stats = {
    account?: string;
    balance?: string;
    /** Represents the account's balance as a percentage of the total system balance. For instance, if an account holds 10% of the total funds in the system, its 'ratio' value would be 10%. */
    ratio?: number;
    height?: number;
}[];
export type TopContractsStats = {
    /** The number of invokes for the contract. */
    count?: number;
    /** The contract address. */
    tx_to?: string;
}[];
export type TopGasUsedStats = {
    /** Amount of gas used to process the transaction */
    gas_used?: number;
    tx_from?: string;
}[];
export type ResultFullSearchSchema = {
    chain?: string;
    network?: string;
    result?: {
        "type"?: string;
        sub_type?: string;
        indexed?: boolean;
    }[];
};
export type ResultLightSearchSchema = {
    chain?: string;
    network?: string;
    result?: {
        "type"?: string;
    }[];
};
/**
 * Returns the balance of {address} calculated at the tip
 */
export function getAccountBalanceByAddress(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            balances?: AccountBalance[];
        };
    } | {
        status: 400;
        data: Error;
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
        data: AccountInfo;
    } | {
        status: 400;
        data: Error;
    }>(`/account/info/${encodeURIComponent(address)}`, {
        ...opts
    }));
}
/**
 * Returns the corresponding tipset information at height {height}
 */
export function getTipsetByHeight(height: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: TipsetInfo[];
    } | {
        status: 400;
        data: Error;
    }>(`/tipset/height/${encodeURIComponent(height)}`, {
        ...opts
    }));
}
/**
 * Returns the corresponding tipset with hash {hash}
 */
export function getTipsetByHash(hash: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: TipsetInfo[];
    } | {
        status: 400;
        data: Error;
    }>(`/tipset/hash/${encodeURIComponent(hash)}`, {
        ...opts
    }));
}
/**
 * Returns the corresponding tipset where the given block cid {cid} is located
 */
export function getTipsetByBlockCid(cid: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: TipsetInfo[];
    } | {
        status: 400;
        data: Error;
    }>(`/tipset/block-cid/${encodeURIComponent(cid)}`, {
        ...opts
    }));
}
/**
 * Returns the corresponding tipset information at tip
 */
export function getTipsetLatest(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: TipsetInfo[];
    } | {
        status: 400;
        data: Error;
    }>("/tipset/latest", {
        ...opts
    }));
}
/**
 * Returns the list of transactions that match the hash {hash}
 */
export function getTransactionsByHash(hash: string, { limit, cursor, removeInternalTxs, removeFeeTxs, sortBy }: {
    limit?: number;
    cursor?: string;
    removeInternalTxs?: string;
    removeFeeTxs?: string;
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            transactions?: Transaction[];
            next_cursor?: string;
            /** Total count of items across all pages, irrespective of the pagination limit. Used for calculating total number of pages. */
            total_items?: number;
            /** Total count of transactions */
            total_txs?: number;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/transactions/hash/${encodeURIComponent(hash)}${QS.query(QS.explode({
        limit,
        cursor,
        remove_internal_txs: removeInternalTxs,
        remove_fee_txs: removeFeeTxs,
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Returns the transactions stored in the tipset at height {height}
 */
export function getTransactionsByHeight(height: number, { limit, cursor, removeInternalTxs, removeFeeTxs, sortBy }: {
    limit?: number;
    cursor?: string;
    removeInternalTxs?: string;
    removeFeeTxs?: string;
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            transactions?: Transaction[];
            next_cursor?: string;
            /** Total count of items across all pages, irrespective of the pagination limit. Used for calculating total number of pages. */
            total_items?: number;
            /** Total count of transactions */
            total_txs?: number;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/transactions/height/${encodeURIComponent(height)}${QS.query(QS.explode({
        limit,
        cursor,
        remove_internal_txs: removeInternalTxs,
        remove_fee_txs: removeFeeTxs,
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Returns the transactions stored in the block with cid {cid}
 */
export function getTransactionsByBlock(cid: string, { limit, cursor, removeInternalTxs, removeFeeTxs, sortBy }: {
    limit?: number;
    cursor?: string;
    removeInternalTxs?: string;
    removeFeeTxs?: string;
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            transactions?: Transaction[];
            next_cursor?: string;
            /** Total count of items across all pages, irrespective of the pagination limit. Used for calculating total number of pages. */
            total_items?: number;
            /** Total count of transactions */
            total_txs?: number;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/transactions/block-cid/${encodeURIComponent(cid)}${QS.query(QS.explode({
        limit,
        cursor,
        remove_internal_txs: removeInternalTxs,
        remove_fee_txs: removeFeeTxs,
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Returns the transactions where the address {address} participated as a receiver
 */
export function getTransactionsByReceiverAddress(address: string, { limit, cursor, removeInternalTxs, removeFeeTxs, sortBy }: {
    limit?: number;
    cursor?: string;
    removeInternalTxs?: string;
    removeFeeTxs?: string;
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            transactions?: Transaction[];
            next_cursor?: string;
            /** Total count of items across all pages, irrespective of the pagination limit. Used for calculating total number of pages. */
            total_items?: number;
            /** Total count of transactions */
            total_txs?: number;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/transactions/address/${encodeURIComponent(address)}/receiver${QS.query(QS.explode({
        limit,
        cursor,
        remove_internal_txs: removeInternalTxs,
        remove_fee_txs: removeFeeTxs,
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Returns the transactions where the address {address} participated as a sender
 */
export function getTransactionsBySenderAddress(address: string, { limit, cursor, removeInternalTxs, removeFeeTxs, sortBy }: {
    limit?: number;
    cursor?: string;
    removeInternalTxs?: string;
    removeFeeTxs?: string;
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            transactions?: Transaction[];
            next_cursor?: string;
            /** Total count of items across all pages, irrespective of the pagination limit. Used for calculating total number of pages. */
            total_items?: number;
            /** Total count of transactions */
            total_txs?: number;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/transactions/address/${encodeURIComponent(address)}/sender${QS.query(QS.explode({
        limit,
        cursor,
        remove_internal_txs: removeInternalTxs,
        remove_fee_txs: removeFeeTxs,
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Returns the transactions where the address {address} participated either as a sender or a receiver
 */
export function getTransactionsAllAddress(address: string, { limit, cursor, removeInternalTxs, removeFeeTxs, sortBy }: {
    limit?: number;
    cursor?: string;
    removeInternalTxs?: string;
    removeFeeTxs?: string;
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            transactions?: Transaction[];
            next_cursor?: string;
            /** Total count of items across all pages, irrespective of the pagination limit. Used for calculating total number of pages. */
            total_items?: number;
            /** Total count of transactions */
            total_txs?: number;
        };
    } | {
        status: 400;
        data: StandardValidationError;
    }>(`/transactions/address/${encodeURIComponent(address)}${QS.query(QS.explode({
        limit,
        cursor,
        remove_internal_txs: removeInternalTxs,
        remove_fee_txs: removeFeeTxs,
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Fetches a list of ERC20 contracts with options to sort by attributes such as 'holders' and order them in 'asc' or 'desc'.
 */
export function getErc20Contracts({ sort, order }: {
    sort?: string;
    order?: "asc" | "desc";
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: Erc20Contract[];
    } | {
        status: 400;
        data: StandardValidationError;
    }>(`/erc20/contracts${QS.query(QS.explode({
        sort,
        order
    }))}`, {
        ...opts
    }));
}
/**
 * Returns all ERC20 token transactions where the address {address} participated either as a sender or a receiver.
 */
export function getAllErc20TransactionsByAddress(address: string, { limit, cursor, removeInternalTxs, removeFeeTxs, sortBy }: {
    limit?: number;
    cursor?: string;
    removeInternalTxs?: string;
    removeFeeTxs?: string;
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: {
                id?: string;
                height?: number;
                "type"?: string;
                to?: string;
                "from"?: string;
                amount?: number;
                contract_address?: string;
                origin?: string;
            }[];
        };
    } | {
        status: 400;
        data: StandardValidationError;
    }>(`/transactions/erc20/address/${encodeURIComponent(address)}/all${QS.query(QS.explode({
        limit,
        cursor,
        remove_internal_txs: removeInternalTxs,
        remove_fee_txs: removeFeeTxs,
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Returns all ERC20 transfer transactions for the specified address.
 */
export function getAllErc20TransfersByAddress(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            transfers?: Erc20TransfersAndApprovals[];
        };
    } | {
        status: 400;
        data: StandardValidationError;
    }>(`/transactions/erc20/address/${encodeURIComponent(address)}/transfers`, {
        ...opts
    }));
}
/**
 * Returns all ERC20 approval transactions for the specified address.
 */
export function getAllErc20ApprovalsByAddress(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            approvals?: Erc20TransfersAndApprovals[];
        };
    } | {
        status: 400;
        data: StandardValidationError;
    }>(`/transactions/erc20/address/${encodeURIComponent(address)}/approvals`, {
        ...opts
    }));
}
/**
 * Returns ERC20 transfer transactions for a specific contract and address.
 */
export function getErc20TransfersByContractAndAddress(contractAddress: string, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            transfers?: Erc20TransfersAndApprovals[];
        };
    } | {
        status: 400;
        data: StandardValidationError;
    }>(`/transactions/erc20/contract/${encodeURIComponent(contractAddress)}/address/${encodeURIComponent(address)}/transfers`, {
        ...opts
    }));
}
/**
 * Returns ERC20 approval transactions for a specific contract and address.
 */
export function getErc20ApprovalsByContractAndAddress(contractAddress: string, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            approvals?: Erc20TransfersAndApprovals[];
        };
    } | {
        status: 400;
        data: StandardValidationError;
    }>(`/transactions/erc20/contract/${encodeURIComponent(contractAddress)}/address/${encodeURIComponent(address)}/approvals`, {
        ...opts
    }));
}
/**
 * Returns ERC20 token transactions for a specific contract where the address {address} participated either as a sender or a receiver.
 */
export function getErc20TransactionsByContractAndAddress(contractAddress: string, address: string, { limit, cursor, removeInternalTxs, removeFeeTxs, sortBy }: {
    limit?: number;
    cursor?: string;
    removeInternalTxs?: string;
    removeFeeTxs?: string;
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: {
                id?: string;
                height?: number;
                "type"?: string;
                to?: string;
                "from"?: string;
                amount?: number;
                contract_address?: string;
                origin?: string;
            }[];
        };
    } | {
        status: 400;
        data: StandardValidationError;
    }>(`/transactions/erc20/contract/${encodeURIComponent(contractAddress)}/address/${encodeURIComponent(address)}${QS.query(QS.explode({
        limit,
        cursor,
        remove_internal_txs: removeInternalTxs,
        remove_fee_txs: removeFeeTxs,
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Returns all information about a specific ERC20 token, identified by its ticker, for a given wallet address.
 */
export function getErc20AllByAddressAndTicker(ticker: string, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: Erc20TransfersAndApprovals[];
        };
    } | {
        status: 400;
        data: Error;
    }>(`/transactions/erc20/ticker/${encodeURIComponent(ticker)}/address/${encodeURIComponent(address)}`, {
        ...opts
    }));
}
/**
 * Provides a history of all transfers for a specific ERC20 token, identified by its ticker, associated with a given wallet address, with the address acting as either sender or receiver.
 */
export function getErc20TransfersByAddressAndTicker(ticker: string, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: Blob;
    }>(`/transactions/erc20/ticker/${encodeURIComponent(ticker)}/address/${encodeURIComponent(address)}/transfers`, {
        ...opts
    }));
}
/**
 * Returns a list of all ERC20 token approvals, identified by its ticker, for a specific wallet address. This includes events where the address has approved others to spend tokens on its behalf.
 */
export function getErc20ApprovalsByAddressAndTicker(ticker: string, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            approvals?: Erc20TransfersAndApprovals[];
        };
    } | {
        status: 400;
        data: Error;
    }>(`/transactions/erc20/ticker/${encodeURIComponent(ticker)}/address/${encodeURIComponent(address)}/approvals`, {
        ...opts
    }));
}
/**
 * Returns the transactions stored in the tipset at height {height}
 */
export function getTransactionsEvmByHeight(height: number, { limit, cursor, removeInternalTxs, removeFeeTxs, sortBy }: {
    limit?: number;
    cursor?: string;
    removeInternalTxs?: string;
    removeFeeTxs?: string;
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            transactions?: Transaction[];
            next_cursor?: string;
            /** Total count of items across all pages, irrespective of the pagination limit. Used for calculating total number of pages. */
            total_items?: number;
            /** Total count of transactions */
            total_txs?: number;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/transactions/evm/height/${encodeURIComponent(height)}${QS.query(QS.explode({
        limit,
        cursor,
        remove_internal_txs: removeInternalTxs,
        remove_fee_txs: removeFeeTxs,
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Returns the transactions stored in the block with cid {cid}
 */
export function getTransactionsEvmByBlock(cid: string, { limit, cursor, removeInternalTxs, removeFeeTxs, sortBy }: {
    limit?: number;
    cursor?: string;
    removeInternalTxs?: string;
    removeFeeTxs?: string;
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            transactions?: Transaction[];
            next_cursor?: string;
            /** Total count of items across all pages, irrespective of the pagination limit. Used for calculating total number of pages. */
            total_items?: number;
            /** Total count of transactions */
            total_txs?: number;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/transactions/evm/block-cid/${encodeURIComponent(cid)}${QS.query(QS.explode({
        limit,
        cursor,
        remove_internal_txs: removeInternalTxs,
        remove_fee_txs: removeFeeTxs,
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Returns the transactions where the address {address} participated as a receiver
 */
export function getTransactionsEvmByReceiverAddress(address: string, { limit, cursor, removeInternalTxs, removeFeeTxs, sortBy }: {
    limit?: number;
    cursor?: string;
    removeInternalTxs?: string;
    removeFeeTxs?: string;
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            transactions?: Transaction[];
            next_cursor?: string;
            /** Total count of items across all pages, irrespective of the pagination limit. Used for calculating total number of pages. */
            total_items?: number;
            /** Total count of transactions */
            total_txs?: number;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/transactions/evm/address/${encodeURIComponent(address)}/receiver${QS.query(QS.explode({
        limit,
        cursor,
        remove_internal_txs: removeInternalTxs,
        remove_fee_txs: removeFeeTxs,
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Returns the transactions where the address {address} participated as a sender
 */
export function getTransactionsEvmBySenderAddress(address: string, { limit, cursor, removeInternalTxs, removeFeeTxs, sortBy }: {
    limit?: number;
    cursor?: string;
    removeInternalTxs?: string;
    removeFeeTxs?: string;
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            transactions?: Transaction[];
            next_cursor?: string;
            /** Total count of items across all pages, irrespective of the pagination limit. Used for calculating total number of pages. */
            total_items?: number;
            /** Total count of transactions */
            total_txs?: number;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/transactions/evm/address/${encodeURIComponent(address)}/sender${QS.query(QS.explode({
        limit,
        cursor,
        remove_internal_txs: removeInternalTxs,
        remove_fee_txs: removeFeeTxs,
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Returns the transactions where the address {address} participated either as a sender or a receiver
 */
export function getTransactionsEvmAllAddress(address: string, { limit, cursor, removeInternalTxs, removeFeeTxs, sortBy }: {
    limit?: number;
    cursor?: string;
    removeInternalTxs?: string;
    removeFeeTxs?: string;
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            transactions?: Transaction[];
            next_cursor?: string;
            /** Total count of items across all pages, irrespective of the pagination limit. Used for calculating total number of pages. */
            total_items?: number;
            /** Total count of transactions */
            total_txs?: number;
        };
    } | {
        status: 400;
        data: StandardValidationError;
    }>(`/transactions/evm/address/${encodeURIComponent(address)}${QS.query(QS.explode({
        limit,
        cursor,
        remove_internal_txs: removeInternalTxs,
        remove_fee_txs: removeFeeTxs,
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Returns a list of EVM transactions filtered by the specified query parameters.
 */
export function getTransactionsEvmByQuery({ datetimeFrom, datetimeTo, limit, cursor }: {
    datetimeFrom?: string;
    datetimeTo?: string;
    limit?: number;
    cursor?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            transactions?: Transaction[];
            next_cursor?: string;
            /** Total count of items across all pages, irrespective of the pagination limit. Used for calculating total number of pages. */
            total_items?: number;
            /** Total count of transactions */
            total_txs?: number;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/transactions/evm${QS.query(QS.explode({
        datetime_from: datetimeFrom,
        datetime_to: datetimeTo,
        limit,
        cursor
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
        data: TransactionWithMetadata;
    } | {
        status: 400;
        data: Error;
    }>(`/transactions/id/${encodeURIComponent(id)}`, {
        ...opts
    }));
}
/**
 * Returns the complete event information (metadata included) that corresponds to the requested id
 */
export function getEventsById(id: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: EventWithMetadata;
    } | {
        status: 400;
        data: Error;
    }>(`/events/id/${encodeURIComponent(id)}`, {
        ...opts
    }));
}
/**
 * Returns the events stored in the tipset at height {height}
 */
export function getEventsByHeight(height: number, { limit, cursor, sortBy }: {
    limit?: number;
    cursor?: string;
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            transactions?: Event[];
            next_cursor?: string;
            /** Total count of items across all pages, irrespective of the pagination limit. Used for calculating total number of pages. */
            total_items?: number;
            /** Total count of transactions */
            total_events?: number;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/events/height/${encodeURIComponent(height)}${QS.query(QS.explode({
        limit,
        cursor,
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Returns the evnts stored in the transaction with cid {tx-cid}
 */
export function getEventsByTxCid(txCid: string, { limit, cursor, sortBy }: {
    limit?: number;
    cursor?: string;
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            transactions?: Event[];
            next_cursor?: string;
            /** Total count of items across all pages, irrespective of the pagination limit. Used for calculating total number of pages. */
            total_items?: number;
            /** Total count of transactions */
            total_events?: number;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/events/tx-cid/${encodeURIComponent(txCid)}${QS.query(QS.explode({
        limit,
        cursor,
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Returns the events emitted by {emitter}
 */
export function getEventsByEmitter(emitter: string, { limit, cursor, sortBy }: {
    limit?: number;
    cursor?: string;
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            transactions?: Event[];
            next_cursor?: string;
            /** Total count of items across all pages, irrespective of the pagination limit. Used for calculating total number of pages. */
            total_items?: number;
            /** Total count of transactions */
            total_events?: number;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/events/emitter/${encodeURIComponent(emitter)}${QS.query(QS.explode({
        limit,
        cursor,
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Returns the events with the selector_id {selector}
 */
export function getEventsBySelector(selector: string, { limit, cursor, sortBy }: {
    limit?: number;
    cursor?: string;
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            transactions?: Event[];
            next_cursor?: string;
            /** Total count of items across all pages, irrespective of the pagination limit. Used for calculating total number of pages. */
            total_items?: number;
            /** Total count of transactions */
            total_events?: number;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/events/selector/${encodeURIComponent(selector)}${QS.query(QS.explode({
        limit,
        cursor,
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Returns the events with the type {type}
 */
export function getEventsByType($type: string, { limit, cursor, sortBy }: {
    limit?: number;
    cursor?: string;
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            transactions?: Event[];
            next_cursor?: string;
            /** Total count of items across all pages, irrespective of the pagination limit. Used for calculating total number of pages. */
            total_items?: number;
            /** Total count of transactions */
            total_events?: number;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/events/type/${encodeURIComponent($type)}${QS.query(QS.explode({
        limit,
        cursor,
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Gives created contracts by any address at fixed frequency
 */
export function contractGlobalCreate(frequency: StatisticFrequency, { sortBy }: {
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: CountStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/contract/global/create/${encodeURIComponent(frequency)}${QS.query(QS.explode({
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Gives cumulative created contracts by any address at fixed frequency
 */
export function contractGlobalCreateCumulative(frequency: StatisticFrequency, { sortBy }: {
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: CountStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/contract/global/create/${encodeURIComponent(frequency)}/cumulative${QS.query(QS.explode({
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Gives created contracts by an address (creator) at fixed frequency
 */
export function contractCreateByAddress(frequency: StatisticFrequency, address: string, { sortBy }: {
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: CountStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/contract/${encodeURIComponent(address)}/create/${encodeURIComponent(frequency)}${QS.query(QS.explode({
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Gives cumulative created contracts by an address (creator) at fixed frequency
 */
export function contractCreateByAddressCumulative(frequency: StatisticFrequency, address: string, { sortBy }: {
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: CountStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/contract/${encodeURIComponent(address)}/create/${encodeURIComponent(frequency)}/cumulative${QS.query(QS.explode({
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Gives invokes to all contract at fixed frequency
 */
export function contractGlobalInvokes(frequency: StatisticFrequency, { sortBy }: {
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: CountStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/contract/global/invoke/${encodeURIComponent(frequency)}${QS.query(QS.explode({
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Gives cumulative invokes to all contract at fixed frequency
 */
export function contractGlobalInvokeCumulative(frequency: StatisticFrequency, { sortBy }: {
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: CountStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/contract/global/invoke/${encodeURIComponent(frequency)}/cumulative${QS.query(QS.explode({
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Gives first invoke (by invoker address) to certain contract
 */
export function contractFirstInvokeByContract(address: string, { sortBy }: {
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: FirstInvokeStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/contract/${encodeURIComponent(address)}/invoke/first${QS.query(QS.explode({
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Gives unique invokes (by invoker address) to certain contract at fixed frequency
 */
export function contractUniqueInvokesByContract(frequency: StatisticFrequency, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: CountStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/contract/${encodeURIComponent(address)}/invoke/unique/${encodeURIComponent(frequency)}`, {
        ...opts
    }));
}
/**
 * Gives cumulative unique invokes (by invoker address) to certain contract at fixed frequency
 */
export function contractUniqueInvokeByContractCumulative(frequency: StatisticFrequency, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: CountStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/contract/${encodeURIComponent(address)}/invoke/unique/${encodeURIComponent(frequency)}/cumulative`, {
        ...opts
    }));
}
/**
 * Gives invokes to certain contract at fixed frequency
 */
export function contractInvokesByContract(frequency: StatisticFrequency, address: string, { sortBy }: {
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: CountStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/contract/${encodeURIComponent(address)}/invoke/${encodeURIComponent(frequency)}${QS.query(QS.explode({
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Gives cumulative invokes to certain contract at fixed frequency
 */
export function contractInvokeByContractCumulative(frequency: StatisticFrequency, address: string, { sortBy }: {
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: CountStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/contract/${encodeURIComponent(address)}/invoke/${encodeURIComponent(frequency)}/cumulative${QS.query(QS.explode({
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Gives gas used in txs for all addresses at fixed frequency
 */
export function gasUsedGlobal(frequency: StatisticFrequency, { sortBy }: {
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: GasUsedStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/gas-used/global/${encodeURIComponent(frequency)}${QS.query(QS.explode({
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Gives cumulative gas used in txs for all addresses at fixed frequency
 */
export function gasUsedGlobalCumulative(frequency: StatisticFrequency, { sortBy }: {
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: GasUsedStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/gas-used/global/${encodeURIComponent(frequency)}/cumulative${QS.query(QS.explode({
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Gives gas used in txs for an address at fixed frequency
 */
export function gasUsedByAddress(frequency: StatisticFrequency, address: string, { sortBy }: {
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: GasUsedStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/gas-used/${encodeURIComponent(address)}/${encodeURIComponent(frequency)}${QS.query(QS.explode({
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Gives cumulative gas used in txs for an address at fixed frequency
 */
export function gasUsedByAddressCumulative(frequency: StatisticFrequency, address: string, { sortBy }: {
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: GasUsedStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/gas-used/${encodeURIComponent(address)}/${encodeURIComponent(frequency)}/cumulative${QS.query(QS.explode({
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Gives account balance at latest canonical tipset height
 */
export function balanceByAddressAtLatest(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: {
                height?: number;
                balance?: string;
            };
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/balance/${encodeURIComponent(address)}/latest`, {
        ...opts
    }));
}
/**
 * Provides the latest balance for all ERC20 tokens for a specified address.
 */
export function balanceErc20AllByAddressAtLatest(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: {
                height?: number;
                balance?: string;
            };
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/balance/erc20/all/${encodeURIComponent(address)}/latest`, {
        ...opts
    }));
}
/**
 * Provides the latest balance for a specified ERC20 token and address.
 */
export function balanceErc20ByContractAndAddressAtLatest(contractAddress: string, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: {
                height?: number;
                balance?: string;
            };
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/balance/erc20/contract/${encodeURIComponent(contractAddress)}/address/${encodeURIComponent(address)}/latest`, {
        ...opts
    }));
}
/**
 * Provides the latest balance for a specified ERC20 token and address.
 */
export function balanceErc20ByTickerAndAddressAtLatest(ticker: string, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: {
                height?: number;
                balance?: string;
            };
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/balance/erc20/ticker/${encodeURIComponent(ticker)}/address/${encodeURIComponent(address)}/latest`, {
        ...opts
    }));
}
/**
 * Gives cumulative account value flow at latest canonical tipset height
 */
export function cumulativeValueFlowByAddressAtLatest(address: string, { dataPoints }: {
    dataPoints?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: BalanceStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-flow/${encodeURIComponent(address)}/latest/cumulative${QS.query(QS.explode({
        data_points: dataPoints
    }))}`, {
        ...opts
    }));
}
/**
 * Gives cumulative value flow for all ERC20 tokens for a specified address at the latest block height.
 */
export function cumulativeValueFlowErc20AllByAddressAtLatest(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: BalanceStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-flow/erc20/all/${encodeURIComponent(address)}/latest/cumulative`, {
        ...opts
    }));
}
/**
 * Gives cumulative value flow for a specified ERC20 token and address at the latest block height.
 */
export function cumulativeValueFlowErc20ByContractAndAddressAtLatest(contractAddress: string, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: BalanceStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-flow/erc20/contract/${encodeURIComponent(contractAddress)}/address/${encodeURIComponent(address)}/latest/cumulative`, {
        ...opts
    }));
}
/**
 * Gives cumulative value flow for a specified ERC20 ticker and address at the latest block height.
 */
export function cumulativeValueFlowErc20ByTickerAndAddressAtLatest(ticker: string, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: BalanceStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-flow/erc20/ticker/${encodeURIComponent(ticker)}/address/${encodeURIComponent(address)}/latest/cumulative`, {
        ...opts
    }));
}
/**
 * Gives account balance at given canonical tipset height
 */
export function balanceByAddressAtHeight(height: number, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: {
                balance?: string;
            };
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/balance/${encodeURIComponent(address)}/height/${encodeURIComponent(height)}`, {
        ...opts
    }));
}
/**
 * Provides the balance for all ERC20 tokens for a specified address at a given block height.
 */
export function balanceErc20AllByAddressAtHeight(address: string, height: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: {
                balance?: string;
            };
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/balance/erc20/all/${encodeURIComponent(address)}/height/${encodeURIComponent(height)}`, {
        ...opts
    }));
}
/**
 * Provides the balance for a specified ERC20 token and address at a given block height.
 */
export function balanceErc20ByContractAndAddressAtHeight(contractAddress: string, address: string, height: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: {
                balance?: string;
            };
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/balance/erc20/contract/${encodeURIComponent(contractAddress)}/address/${encodeURIComponent(address)}/height/${encodeURIComponent(height)}`, {
        ...opts
    }));
}
/**
 * Provides the balance for a specified ERC20 ticker and address at a given block height.
 */
export function balanceErc20ByTickerAndAddressAtHeight(ticker: string, address: string, height: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: {
                balance?: string;
            };
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/balance/erc20/ticker/${encodeURIComponent(ticker)}/address/${encodeURIComponent(address)}/height/${encodeURIComponent(height)}`, {
        ...opts
    }));
}
/**
 * Gives cumulative account value flow at given canonical tipset height
 */
export function cumulativeValueFlowByAddressAtHeight(height: number, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: BalanceStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-flow/${encodeURIComponent(address)}/height/${encodeURIComponent(height)}/cumulative`, {
        ...opts
    }));
}
/**
 * Provides the cumulative value flow for all ERC20 tokens for a specified address at a given block height.
 */
export function cumulativeValueFlowErc20AllByAddressAtHeight(address: string, height: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: BalanceStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-flow/erc20/all/${encodeURIComponent(address)}/height/${encodeURIComponent(height)}/cumulative`, {
        ...opts
    }));
}
/**
 * Provides the cumulative value flow for a specified ERC20 token and address at a given block height.
 */
export function cumulativeValueFlowErc20ByContractAndAddressAtHeight(contractAddress: string, address: string, height: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: BalanceStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-flow/erc20/contract/${encodeURIComponent(contractAddress)}/address/${encodeURIComponent(address)}/height/${encodeURIComponent(height)}/cumulative`, {
        ...opts
    }));
}
/**
 * Provides the cumulative value flow for a specified ERC20 ticker and address at a given block height.
 */
export function cumulativeValueFlowErc20ByTickerAndAddressAtHeight(ticker: string, address: string, height: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: BalanceStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-flow/erc20/ticker/${encodeURIComponent(ticker)}/address/${encodeURIComponent(address)}/height/${encodeURIComponent(height)}/cumulative`, {
        ...opts
    }));
}
/**
 * Gives account value flow at latest canonical tipset height
 */
export function valueFlowByAddressAtLatest(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: ValueFlowStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-flow/${encodeURIComponent(address)}/latest`, {
        ...opts
    }));
}
/**
 * Provides the latest value flow for all ERC20 tokens for a specified address.
 */
export function valueFlowErc20AllByAddressAtLatest(address: string, { dataPoints }: {
    dataPoints?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: ValueFlowStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-flow/erc20/all/${encodeURIComponent(address)}/latest${QS.query(QS.explode({
        data_points: dataPoints
    }))}`, {
        ...opts
    }));
}
/**
 * Provides the latest value flow for a specified ERC20 token and address.
 */
export function valueFlowErc20ByContractAndAddressAtLatest(contractAddress: string, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: ValueFlowStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-flow/erc20/contract/${encodeURIComponent(contractAddress)}/address/${encodeURIComponent(address)}/latest`, {
        ...opts
    }));
}
/**
 * Provides the latest value flow for a specified ERC20 ticker and address.
 */
export function valueFlowErc20ByTickerAndAddressAtLatest(ticker: string, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: ValueFlowStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-flow/erc20/ticker/${encodeURIComponent(ticker)}/address/${encodeURIComponent(address)}/latest`, {
        ...opts
    }));
}
/**
 * Gives account value flow at given canonical tipset height
 */
export function valueFlowByAddressAtHeight(height: number, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: ValueFlowStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-flow/${encodeURIComponent(address)}/height/${encodeURIComponent(height)}`, {
        ...opts
    }));
}
/**
 * Provides the value flow for all ERC20 tokens for a specified address at a given block height.
 */
export function valueFlowErc20AllByAddressAtHeight(address: string, height: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: ValueFlowStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-flow/erc20/all/${encodeURIComponent(address)}/height/${encodeURIComponent(height)}`, {
        ...opts
    }));
}
/**
 * Provides the value flow for a specified ERC20 token and address at a given block height.
 */
export function valueFlowErc20ByContractAndAddressAtHeight(contractAddress: string, address: string, height: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: ValueFlowStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-flow/erc20/contract/${encodeURIComponent(contractAddress)}/address/${encodeURIComponent(address)}/height/${encodeURIComponent(height)}`, {
        ...opts
    }));
}
/**
 * Provides the value flow for a specified ERC20 ticker and address at a given block height.
 */
export function valueFlowErc20ByTickerAndAddressAtHeight(ticker: string, address: string, height: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: ValueFlowStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-flow/erc20/ticker/${encodeURIComponent(ticker)}/address/${encodeURIComponent(address)}/height/${encodeURIComponent(height)}`, {
        ...opts
    }));
}
/**
 * Gives cumulative account value Exchanged at latest canonical tipset height
 */
export function cumulativeValueExchangedByAddressAtLatest(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: ValueExchangedStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-exchanged/${encodeURIComponent(address)}/latest/cumulative`, {
        ...opts
    }));
}
/**
 * Gives cumulative account value exchanged at given canonical tipset height
 */
export function cumulativeValueExchangedByAddressAtHeight(height: number, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: ValueExchangedStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-exchanged/${encodeURIComponent(address)}/height/${encodeURIComponent(height)}/cumulative`, {
        ...opts
    }));
}
/**
 * Gives account value exchanged at latest canonical tipset height
 */
export function valueExchangedByAddressAtLatest(address: string, { dataPoints }: {
    dataPoints?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: ValueExchangedStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-exchanged/${encodeURIComponent(address)}/latest${QS.query(QS.explode({
        data_points: dataPoints
    }))}`, {
        ...opts
    }));
}
/**
 * Gives account value exchanged at given canonical tipset height
 */
export function valueExchangedByAddressAtHeight(height: number, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: ValueExchangedStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-exchanged/${encodeURIComponent(address)}/height/${encodeURIComponent(height)}`, {
        ...opts
    }));
}
/**
 * Gives cumulative value exchanged for all ERC20 tokens for a specified address at the latest block height.
 */
export function cumulativeValueExchangedErc20AllByAddressAtLatest(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: ValueExchangedStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-exchanged/erc20/all/${encodeURIComponent(address)}/latest/cumulative`, {
        ...opts
    }));
}
/**
 * Gives cumulative value exchanged for a specified ERC20 token and address at the latest block height.
 */
export function cumulativeValueExchangedErc20ByContractAndAddressAtLatest(contractAddress: string, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: ValueExchangedStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-exchanged/erc20/contract/${encodeURIComponent(contractAddress)}/address/${encodeURIComponent(address)}/latest/cumulative`, {
        ...opts
    }));
}
/**
 * Provides the value exchanged for a specified ERC20 contract and address at a specific block height, not cumulative.
 */
export function valueExchangedErc20ByContractAndAddressAtHeight(contractAddress: string, address: string, height: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: ValueExchangedStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-exchanged/erc20/contract/${encodeURIComponent(contractAddress)}/address/${encodeURIComponent(address)}/height/${encodeURIComponent(height)}`, {
        ...opts
    }));
}
/**
 * Gives cumulative value exchanged for a specified ERC20 contract and address at a specific block height.
 */
export function cumulativeValueExchangedErc20ByContractAndAddress(contractAddress: string, address: string, height: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: ValueExchangedStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-exchanged/erc20/contract/${encodeURIComponent(contractAddress)}/address/${encodeURIComponent(address)}/height/${encodeURIComponent(height)}/cumulative`, {
        ...opts
    }));
}
/**
 * Gives cumulative value exchanged for a specified ERC20 ticker and address at the latest block height.
 */
export function cumulativeValueExchangedErc20ByTickerAndAddressAtLatest(ticker: string, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: ValueExchangedStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-exchanged/erc20/ticker/${encodeURIComponent(ticker)}/address/${encodeURIComponent(address)}/latest/cumulative`, {
        ...opts
    }));
}
/**
 * Provides the value exchanged for a specified ERC20 ticker and address at a specific block height, not cumulative.
 */
export function valueExchangedErc20ByTickerAndAddressAtHeight(ticker: string, address: string, height: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: ValueExchangedStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-exchanged/erc20/ticker/${encodeURIComponent(ticker)}/address/${encodeURIComponent(address)}/height/${encodeURIComponent(height)}`, {
        ...opts
    }));
}
/**
 * Gives cumulative value exchanged for a specified ERC20 ticker and address at a specific block height.
 */
export function cumulativeValueExchangedErc20ByTickerAndAddress(ticker: string, address: string, height: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: ValueExchangedStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/value-exchanged/erc20/ticker/${encodeURIComponent(ticker)}/address/${encodeURIComponent(address)}/height/${encodeURIComponent(height)}/cumulative`, {
        ...opts
    }));
}
/**
 * Gives list of richest address on the blockchain
 */
export function richList(items: number, { sortBy }: {
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: RichListStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/rich-list/${encodeURIComponent(items)}${QS.query(QS.explode({
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Gives a list of the richest addresses holding any ERC20 tokens on the blockchain.
 */
export function richListErc20All(items: number, { sortBy }: {
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: RichListErc20Stats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/rich-list/erc20/all/${encodeURIComponent(items)}${QS.query(QS.explode({
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Gives a list of the richest addresses for a specific ERC20 token identified by its contract address or ticker symbol on the blockchain.
 */
export function richListErc20Specific(contractAddressTicker: string, items: number, { sortBy }: {
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: RichListErc20Stats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/rich-list/erc20/${encodeURIComponent(contractAddressTicker)}/${encodeURIComponent(items)}${QS.query(QS.explode({
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Retrieves the top contracts ordered by the number of unique users.
 */
export function topContractsByUniqueUsers({ limit }: {
    limit?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: TopContractsStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/contract/top/unique-users${QS.query(QS.explode({
        limit
    }))}`, {
        ...opts
    }));
}
/**
 * Retrieves the top contracts ordered by the number of invokes.
 */
export function topContractsByInvokes({ limit, cursor }: {
    limit?: number;
    cursor?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: TopContractsStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/contract/top/invokes${QS.query(QS.explode({
        limit,
        cursor
    }))}`, {
        ...opts
    }));
}
/**
 * Retrieves the top accounts ordered by the gas used.
 */
export function topAccountsByGasUsed({ limit }: {
    limit?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: TopGasUsedStats[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/gas-used/top/accounts${QS.query(QS.explode({
        limit
    }))}`, {
        ...opts
    }));
}
/**
 * Retrieves global base fee statistics for a specified period.
 */
export function getGlobalBaseFeeByPeriod(period: "hourly" | "daily" | "weekly" | "monthly", { limit, cursor, sortBy }: {
    limit?: number;
    cursor?: string;
    sortBy?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            results?: {
                /** The starting point of the period for which statistics are aggregated. */
                bucket?: string;
                /** The average base fee for the period. */
                base_fee_avg?: number;
                /** The maximum base fee for the period. */
                base_fee_max?: number;
                /** The minimum base fee for the period. */
                base_fee_min?: number;
            }[];
            next_cursor?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/fees/base/global/${encodeURIComponent(period)}${QS.query(QS.explode({
        limit,
        cursor,
        sort_by: sortBy
    }))}`, {
        ...opts
    }));
}
/**
 * Retrieves fee suggestions based on the specified method.
 */
export function getFeeSuggestion(method: "Send" | "InvokeContract", opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            gas_probabilities?: {
                probability?: number;
                gas_limit?: number;
                gas_premium?: number;
            }[];
            date_time?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>(`/stats/fees/estimate/${encodeURIComponent(method)}`, {
        ...opts
    }));
}
/**
 * Retrieves the complete dynamic configuration provided by Beryx, including a list of allowed estimation methods among other settings.
 */
export function getDynamicConfig(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            fees?: {
                estimate?: {
                    allowed_methods?: {
                        method_name?: string;
                    }[];
                };
            };
        };
    } | {
        status: 400;
        data: Error;
    }>("/dynamic-config", {
        ...opts
    }));
}
/**
 * Returns detailed information about the identifier, including its type and, if applicable, subtype.
 */
export function getSearchFullByIdentifier(identifier: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ResultFullSearchSchema;
    } | {
        status: 400;
        data: Error;
    }>(`/search/full/${encodeURIComponent(identifier)}`, {
        ...opts
    }));
}
/**
 * Returns a light list of objects associated with the given identifier.
 */
export function getSearchLightByIdentifier(identifier: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ResultLightSearchSchema;
    } | {
        status: 400;
        data: Error;
    }>(`/search/light/${encodeURIComponent(identifier)}`, {
        ...opts
    }));
}
/**
 * Pushes a new transaction to the mempool.
 */
export function postMempoolPush(body: {
    Message?: {
        To?: string;
        From?: string;
        Nonce?: number;
        Value?: string;
        Params?: string;
        GasFeeCap?: string;
        GasPremium?: string;
        GasLimit?: number;
        Method?: number;
    };
    Signature?: {
        Type?: number;
        Data?: string;
    };
}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            cid?: string;
        };
    } | {
        status: 400;
        data: Error;
    }>("/mempool/push", oazapfts.json({
        ...opts,
        method: "POST",
        body
    })));
}
export enum StatisticFrequency {
    Hourly = "hourly",
    Daily = "daily",
    Weekly = "weekly",
    Monthly = "monthly"
}
