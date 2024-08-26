/**
 * BlockScout API
 * 1.0.0
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from "@oazapfts/runtime";
import * as QS from "@oazapfts/runtime/query";
export const defaults: Oazapfts.Defaults<Oazapfts.CustomHeaders> = {
    headers: {},
    baseUrl: "http://blockscout.com/poa/core/api/v2/",
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {
    server1: ({ server = "blockscout.com/poa/core" }: {
        server: string | number | boolean;
    }) => `http://${server}/api/v2/`,
    swaggerHubApiAutoMocking: "https://virtserver.swaggerhub.com/NIKITOSING4/CoreBlockScoutAPI/1.0.0"
};
export type SearchResultToken = {
    address: string;
    address_url: string;
    exchange_rate: string;
    icon_url: string;
    is_smart_contract_verified: boolean;
    name: string;
    "symbol": string;
    token_type: string;
    token_url: string;
    total_supply: string;
    "type": string;
};
export type SearchResultAddressOrContract = {
    address: string;
    is_smart_contract_verified: boolean;
    name: string;
    "type": string;
    url: string;
};
export type SearchResultBlock = {
    block_hash: string;
    block_number: number;
    timestamp: string;
    "type": string;
    url: string;
};
export type SearchResultTransaction = {
    timestamp: string;
    tx_hash: string;
    "type": string;
    url: string;
};
export type SearchResultRedirect = {
    parameter: string;
    redirect: boolean;
    "type": string;
};
export type Fee = {
    "type": string;
    value: string;
};
export type AddressTag = {
    address_hash: string;
    display_name: string;
    label: string;
};
export type WatchlistName = {
    display_name: string;
    label: string;
};
export type AddressParam = {
    hash: string;
    implementation_name: string;
    name: string;
    is_contract: boolean;
    private_tags: AddressTag[];
    watchlist_names: WatchlistName[];
    public_tags: AddressTag[];
    is_verified: boolean;
};
export type TokenInfo = {
    circulating_market_cap: string;
    icon_url: string;
    name: string;
    decimals: string;
    "symbol": string;
    address: string;
    "type": string;
    holders: string;
    exchange_rate: string;
    total_supply: string;
};
export type TotalErc20 = {
    decimals: string;
    value: string;
};
export type TotalErc721 = {
    token_id: string;
};
export type TotalErc1155 = {
    token_id: string;
    decimals: string;
    value: string;
};
export type TotalErc1155Batch = TotalErc1155[];
export type TokenTransfer = {
    block_hash: string;
    "from": AddressParam;
    log_index: string;
    method: string;
    timestamp: string;
    to: AddressParam;
    token: TokenInfo;
    total: TotalErc20 | TotalErc721 | TotalErc1155 | TotalErc1155Batch;
    tx_hash: string;
    "type": string;
};
export type TransactionActionAaveV3LiquidationCall = {
    data: object;
    protocol: string;
    "type": string;
};
export type TransactionActionAaveV3Bswrf = {
    data: object;
    protocol: string;
    "type": string;
};
export type TransactionActionAaveV3EnableDisableCollateral = {
    data: object;
    protocol: string;
    "type": string;
};
export type TransactionActionUniswapV3MintNft = {
    data: object;
    protocol: string;
    "type": string;
};
export type TransactionActionUniswapV3Bcs = {
    data: object;
    protocol: string;
    "type": string;
};
export type TransactionAction = TransactionActionAaveV3LiquidationCall | TransactionActionAaveV3Bswrf | TransactionActionAaveV3EnableDisableCollateral | TransactionActionUniswapV3MintNft | TransactionActionUniswapV3Bcs;
export type DecodedInputParameter = {
    name: string;
    "type": string;
    value: string;
};
export type DecodedInput = {
    method_call: string;
    method_id: string;
    parameters: DecodedInputParameter[];
};
export type Transaction = {
    timestamp: string;
    fee: Fee;
    gas_limit: number;
    block: number;
    status: string;
    method: string;
    confirmations: number;
    "type": number;
    exchange_rate: string;
    to: AddressParam;
    tx_burnt_fee: string;
    max_fee_per_gas: string;
    result: string;
    hash: string;
    gas_price: string;
    priority_fee: string;
    base_fee_per_gas: string;
    "from": AddressParam;
    token_transfers: TokenTransfer[];
    tx_types: string[];
    gas_used: string;
    created_contract: AddressParam;
    position: number;
    nonce: number;
    has_error_in_internal_txs: boolean;
    actions: TransactionAction[];
    decoded_input: DecodedInput;
    token_transfers_overflow: boolean;
    raw_input: string;
    value: string;
    max_priority_fee_per_gas: string;
    revert_reason: string;
    confirmation_duration: object;
    tx_tag: string;
};
export type Reward = {
    reward: number;
    "type": string;
};
export type Block = {
    base_fee_per_gas: string;
    burnt_fees: string;
    burnt_fees_percentage: number;
    difficulty: string;
    extra_data: string;
    gas_limit: string;
    gas_target_percentage: number;
    gas_used: string;
    gas_used_percentage: number;
    hash: string;
    height: number;
    miner: AddressParam;
    nonce: string;
    parent_hash: string;
    priority_fee: string;
    rewards: Reward[];
    size: number;
    state_root: string;
    timestamp: string;
    total_difficulty: string;
    tx_count: number;
    tx_fees: string;
    "type": string;
    uncles_hashes: string[];
    withdrawals_count: number;
};
export type IndexingStatus = {
    finished_indexing: boolean;
    finished_indexing_blocks: boolean;
    indexed_blocks_ratio: string;
    indexed_internal_transactions_ratio: string;
};
export type StatsResponse = {
    total_blocks: string;
    total_addresses: string;
    total_transactions: string;
    average_block_time: number;
    coin_price: string;
    total_gas_used: string;
    transactions_today: string;
    gas_used_today: string;
    gas_prices: object;
    static_gas_price: string;
    market_cap: string;
    network_utilization_percentage: number;
};
export type TransactionChartItem = {
    date: string;
    tx_count: number;
};
export type MarketChartItem = {
    date: string;
    closing_price: string;
    market_cap: string;
};
export type InternalTransaction = {
    block: number;
    created_contract: AddressParam;
    error: string;
    "from": AddressParam;
    gas_limit: string;
    index: number;
    success: boolean;
    timestamp: string;
    to: AddressParam;
    transaction_hash: string;
    "type": string;
    value: string;
};
export type DecodedInputLogParameter = {
    name: string;
    "type": string;
    value: string;
    indexed: boolean;
};
export type DecodedInputLog = {
    method_call: string;
    method_id: string;
    parameters: DecodedInputLogParameter[];
};
export type Log = {
    address: AddressParam;
    block_hash?: string;
    block_number?: number;
    data: string;
    decoded: DecodedInputLog;
    index: number;
    smart_contract: AddressParam;
    topics: string[];
    tx_hash: string;
};
export type RawTraceCallAction = {
    callType: string;
    to: string;
    "from": string;
    input: string;
    gas: string;
    value: string;
};
export type RawTraceCreateAction = {
    "from": string;
    gas: string;
    init: string;
    value: string;
};
export type RawTraceSelfDestructAction = {
    address: string;
    balance: string;
    refundAddress: string;
};
export type RawTraceCallResult = {
    gasUsed: string;
    output: string;
};
export type RawTraceCreateResult = {
    address: string;
    code: string;
    gasUsed: string;
};
export type RawTrace = {
    action: RawTraceCallAction | RawTraceCreateAction | RawTraceSelfDestructAction;
    subtraces: number;
    traceAddress: number[];
    "type": string;
    error?: string;
    result?: RawTraceCallResult | RawTraceCreateResult;
};
export type NftChange = {
    direction: string;
    total: TotalErc721;
};
export type NftChangesArray = NftChange[];
export type Erc20Or1155OrCoinChange = string;
export type StateChange = {
    token?: TokenInfo;
    "type": string;
    is_miner: boolean;
    address: AddressParam;
    balance_before?: string;
    balance_after?: string;
    token_id?: string;
    change?: NftChangesArray | Erc20Or1155OrCoinChange;
};
export type Withdrawal = {
    index: number;
    amount: string;
    validator_index: number;
    receiver?: AddressParam;
    block_number?: number;
    timestamp?: string;
};
export type Address = {
    creator_address_hash?: string;
    creation_tx_hash?: string;
    token?: TokenInfo;
    coin_balance?: string;
    exchange_rate?: string;
    implementation_address?: string;
    block_number_balance_updated_at?: number;
    hash: string;
    implementation_name?: string;
    name?: string;
    is_contract?: boolean;
    private_tags?: AddressTag[];
    watchlist_names?: WatchlistName[];
    public_tags?: AddressTag[];
    is_verified?: boolean;
    has_beacon_chain_withdrawals?: boolean;
    has_custom_methods_read?: boolean;
    has_custom_methods_write?: boolean;
    has_decompiled_code?: boolean;
    has_logs?: boolean;
    has_methods_read?: boolean;
    has_methods_write?: boolean;
    has_methods_read_proxy?: boolean;
    has_methods_write_proxy?: boolean;
    has_token_transfers?: boolean;
    has_tokens?: boolean;
    has_validated_blocks?: boolean;
};
export type AddressWithTxCount = Address & {
    tx_count: string;
};
export type AddressCounters = {
    transactions_count: string;
    token_transfers_count: string;
    gas_usage_count: string;
    validations_count: string;
};
export type NftInstance = {
    is_unique: boolean;
    id: string;
    holder_address_hash?: string;
    image_url?: string;
    animation_url?: string;
    external_app_url?: string;
    metadata?: object;
    owner: AddressParam;
    token: TokenInfo;
};
export type Token = {
    name: string;
    decimals: string;
    "symbol": string;
    address: string;
    "type": string;
    holders: number;
    exchange_rate: string;
    total_supply: string;
};
export type TokenBalance = {
    token_instance?: NftInstance;
    value: string;
    token_id: string;
    token: Token;
};
export type CoinBalanceHistoryEntry = {
    transaction_hash?: string;
    block_number: number;
    block_timestamp: string;
    delta: string;
    value: string;
};
export type CoinBalanceHistoryByDaysEntry = {
    date: string;
    value: number;
};
export type AddressNftInstance = {
    is_unique: boolean;
    id: string;
    holder_address_hash?: string;
    image_url?: string;
    animation_url?: string;
    external_app_url?: string;
    metadata?: object;
    owner: AddressParam;
    token: TokenInfo;
    token_type: string;
    value: string;
};
export type AddressNftInstanceCollection = {
    is_unique: boolean;
    id: string;
    holder_address_hash?: string;
    image_url?: string;
    animation_url?: string;
    external_app_url?: string;
    metadata?: object;
    owner: AddressParam;
    token?: object;
    token_type: string;
    value: string;
};
export type AddressNftCollection = {
    token: TokenInfo;
    amount?: string;
    token_instances: AddressNftInstanceCollection[];
};
export type Holder = {
    address: AddressParam;
    value: string;
    token_id?: string;
    token: TokenInfo;
};
export type TokenCounters = {
    token_holders_count: string;
    transfers_count: string;
};
export type RecaptchaBody = {
    recaptcha_response: string;
};
export type SmartContractForList = {
    address: AddressParam;
    coin_balance: string;
    compiler_version: string;
    language: string;
    has_constructor_args: boolean;
    optimization_enabled: boolean;
    tx_count: number;
    verified_at: string;
    market_cap?: number;
};
export type ContractSource = {
    file_path?: string;
    source_code?: string;
};
export type ConstructorArguments = object;
export type ExternalLibrary = {
    name: string;
    address_hash: string;
};
export type SmartContract = {
    verified_twin_address_hash?: string;
    is_verified?: boolean;
    is_changed_bytecode?: boolean;
    is_partially_verified?: boolean;
    is_fully_verified?: boolean;
    is_verified_via_sourcify?: boolean;
    is_verified_via_eth_bytecode_db?: boolean;
    is_vyper_contract?: boolean;
    is_self_destructed?: boolean;
    can_be_visualized_via_sol2uml?: boolean;
    minimal_proxy_address_hash?: string;
    sourcify_repo_url?: string;
    name?: string;
    optimization_enabled?: boolean;
    optimizations_runs?: number;
    compiler_version?: string;
    evm_version?: string;
    verified_at?: string;
    abi?: string;
    source_code?: string;
    file_path?: string;
    compiler_settings?: object;
    constructor_args?: string;
    additional_sources?: ContractSource[];
    decoded_constructor_args?: ConstructorArguments[];
    deployed_bytecode?: string;
    creation_bytecode?: string;
    external_libraries?: ExternalLibrary[];
    language?: string;
};
export type ReadMethodWithValue = object;
export type ReadMethodWithoutValue = object;
export type WriteMethod = object;
export type ReadMethodQueryBody = {
    args: any;
    method_id: string;
    "from"?: string;
    contract_type?: string;
};
export type ExtendedRevertReasonAsMap = {
    raw: string;
    code: number;
    message: string;
};
export type Error = {
    error: string;
};
export type CodeAndMessage = {
    code: number;
    message: string;
};
export type OutputAndNames = {
    output: any;
    names: any;
};
export type ReadMethodResponse = {
    is_error: boolean;
    result: ExtendedRevertReasonAsMap | Error | DecodedInput | CodeAndMessage | OutputAndNames;
};
/**
 * search
 */
export function search({ q }: {
    q?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: (SearchResultToken | SearchResultAddressOrContract | SearchResultBlock | SearchResultTransaction)[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/search${QS.query(QS.explode({
        q
    }))}`, {
        ...opts
    }));
}
/**
 * search redirect
 */
export function searchRedirect({ q }: {
    q?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: SearchResultRedirect;
    } | {
        status: 400;
    }>(`/search/check-redirect${QS.query(QS.explode({
        q
    }))}`, {
        ...opts
    }));
}
/**
 * get txs
 */
export function getTxs({ filter, $type, method }: {
    filter?: string;
    $type?: string;
    method?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: Transaction[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/transactions${QS.query(QS.explode({
        filter,
        "type": $type,
        method
    }))}`, {
        ...opts
    }));
}
/**
 * get blocks
 */
export function getBlocks({ $type }: {
    $type?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: Block[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/blocks${QS.query(QS.explode({
        "type": $type
    }))}`, {
        ...opts
    }));
}
/**
 * get main page txs
 */
export function getMainPageTxs(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: Transaction[];
    }>("/main-page/transactions", {
        ...opts
    }));
}
/**
 * get main page blocks
 */
export function getMainPageTokens(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: Block[];
    }>("/main-page/blocks", {
        ...opts
    }));
}
/**
 * get indexing status
 */
export function getIndexingStatus(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: IndexingStatus;
    }>("/main-page/indexing-status", {
        ...opts
    }));
}
/**
 * get stats counters
 */
export function getStats(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: StatsResponse;
    }>("/stats", {
        ...opts
    }));
}
/**
 * get txs chart
 */
export function getTxsChart(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            chart_data: TransactionChartItem[];
        };
    }>("/stats/charts/transactions", {
        ...opts
    }));
}
/**
 * get market chart
 */
export function getMarketChart(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            available_supply: string;
            chart_data: MarketChartItem[];
        };
    }>("/stats/charts/market", {
        ...opts
    }));
}
/**
 * get tx info
 */
export function getTx(transactionHash: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: Transaction;
    } | {
        status: 400;
    }>(`/transactions/${encodeURIComponent(transactionHash)}`, {
        ...opts
    }));
}
/**
 * get token transfers
 */
export function getTokenTransfers(transactionHash: string, { $type }: {
    $type?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: TokenTransfer[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/transactions/${encodeURIComponent(transactionHash)}/token-transfers${QS.query(QS.explode({
        "type": $type
    }))}`, {
        ...opts
    }));
}
/**
 * get internal txs
 */
export function getInternalTxs(transactionHash: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: InternalTransaction[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/transactions/${encodeURIComponent(transactionHash)}/internal-transactions`, {
        ...opts
    }));
}
/**
 * get logs
 */
export function getLogs(transactionHash: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: Log[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/transactions/${encodeURIComponent(transactionHash)}/logs`, {
        ...opts
    }));
}
/**
 * get raw trace
 */
export function getRawTrace(transactionHash: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: RawTrace[];
    } | {
        status: 400;
    }>(`/transactions/${encodeURIComponent(transactionHash)}/raw-trace`, {
        ...opts
    }));
}
/**
 * get state changes
 */
export function getStateChanges(transactionHash: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: StateChange[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/transactions/${encodeURIComponent(transactionHash)}/state-changes`, {
        ...opts
    }));
}
/**
 * get block info
 */
export function getBlock(blockNumberOrHash: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: Block;
    } | {
        status: 400;
    }>(`/blocks/${encodeURIComponent(blockNumberOrHash)}`, {
        ...opts
    }));
}
/**
 * get block txs
 */
export function getBlockTxs(blockNumberOrHash: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: Transaction[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/blocks/${encodeURIComponent(blockNumberOrHash)}/transactions`, {
        ...opts
    }));
}
/**
 * get block withdrawals
 */
export function getBlockWithdrawals(blockNumberOrHash: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: Withdrawal[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/blocks/${encodeURIComponent(blockNumberOrHash)}/withdrawals`, {
        ...opts
    }));
}
/**
 * get native coin holders list
 */
export function getAddresses(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            exchange_rate: string;
            total_supply: string;
            items: AddressWithTxCount[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>("/addresses", {
        ...opts
    }));
}
/**
 * get address info
 */
export function getAddress(addressHash: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: Address;
    } | {
        status: 400;
    }>(`/addresses/${encodeURIComponent(addressHash)}`, {
        ...opts
    }));
}
/**
 * get address counters
 */
export function getAddressCounters(addressHash: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: AddressCounters;
    } | {
        status: 400;
    }>(`/addresses/${encodeURIComponent(addressHash)}/counters`, {
        ...opts
    }));
}
/**
 * get address txs
 */
export function getAddressTxs(addressHash: string, { filter }: {
    filter?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: Transaction[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/addresses/${encodeURIComponent(addressHash)}/transactions${QS.query(QS.explode({
        filter
    }))}`, {
        ...opts
    }));
}
/**
 * get address token transfers
 */
export function getAddressTokenTransfers(addressHash: string, { $type, filter, token }: {
    $type?: string;
    filter?: string;
    token?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: TokenTransfer[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/addresses/${encodeURIComponent(addressHash)}/token-transfers${QS.query(QS.explode({
        "type": $type,
        filter,
        token
    }))}`, {
        ...opts
    }));
}
/**
 * get address internal txs
 */
export function getAddressInternalTxs(addressHash: string, { filter }: {
    filter?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: InternalTransaction[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/addresses/${encodeURIComponent(addressHash)}/internal-transactions${QS.query(QS.explode({
        filter
    }))}`, {
        ...opts
    }));
}
/**
 * get address logs
 */
export function getAddressLogs(addressHash: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: Log[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/addresses/${encodeURIComponent(addressHash)}/logs`, {
        ...opts
    }));
}
/**
 * get blocks validated by address
 */
export function getAddressBlocksValidated(addressHash: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: Block[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/addresses/${encodeURIComponent(addressHash)}/blocks-validated`, {
        ...opts
    }));
}
/**
 * get all tokens balances for the address
 */
export function getAddressTokenBalances(addressHash: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: TokenBalance[];
    } | {
        status: 400;
    }>(`/addresses/${encodeURIComponent(addressHash)}/token-balances`, {
        ...opts
    }));
}
/**
 * token balances with filtering and pagination
 */
export function getAddressTokens(addressHash: string, { $type }: {
    $type?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: TokenBalance[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/addresses/${encodeURIComponent(addressHash)}/tokens${QS.query(QS.explode({
        "type": $type
    }))}`, {
        ...opts
    }));
}
/**
 * get address coin balance history
 */
export function getAddressCoinBalanceHistory(addressHash: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: CoinBalanceHistoryEntry[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/addresses/${encodeURIComponent(addressHash)}/coin-balance-history`, {
        ...opts
    }));
}
/**
 * get address coin balance history by day
 */
export function getAddressCoinBalanceHistoryByDay(addressHash: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: CoinBalanceHistoryByDaysEntry[];
    } | {
        status: 400;
    }>(`/addresses/${encodeURIComponent(addressHash)}/coin-balance-history-by-day`, {
        ...opts
    }));
}
/**
 * get address withdrawals
 */
export function getAddressWithdrawals(addressHash: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: Withdrawal[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/addresses/${encodeURIComponent(addressHash)}/withdrawals`, {
        ...opts
    }));
}
/**
 * get list of NFT owned by address
 */
export function getAddressNft(addressHash: string, { $type }: {
    $type?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: AddressNftInstance[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/addresses/${encodeURIComponent(addressHash)}/nft${QS.query(QS.explode({
        "type": $type
    }))}`, {
        ...opts
    }));
}
/**
 * get list of NFT owned by address, grouped by collection
 */
export function getAddressNftCollections(addressHash: string, { $type }: {
    $type?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: AddressNftCollection[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/addresses/${encodeURIComponent(addressHash)}/nft/collections${QS.query(QS.explode({
        "type": $type
    }))}`, {
        ...opts
    }));
}
/**
 * get tokens list
 */
export function getTokensList({ q, $type }: {
    q?: string;
    $type?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: TokenInfo[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/tokens${QS.query(QS.explode({
        q,
        "type": $type
    }))}`, {
        ...opts
    }));
}
/**
 * get token info
 */
export function getToken(addressHash: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: TokenInfo;
    } | {
        status: 400;
    }>(`/tokens/${encodeURIComponent(addressHash)}`, {
        ...opts
    }));
}
/**
 * get token token transfers
 */
export function getTokenTokenTransfers(addressHash: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: TokenTransfer[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/tokens/${encodeURIComponent(addressHash)}/transfers`, {
        ...opts
    }));
}
/**
 * get token holders
 */
export function getTokenHolders(addressHash: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: Holder[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/tokens/${encodeURIComponent(addressHash)}/holders`, {
        ...opts
    }));
}
/**
 * get token holders
 */
export function getTokenCounters(addressHash: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: TokenCounters;
    } | {
        status: 400;
    }>(`/tokens/${encodeURIComponent(addressHash)}/counters`, {
        ...opts
    }));
}
/**
 * get NFT instances
 */
export function getNftInstances(addressHash: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: NftInstance[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/tokens/${encodeURIComponent(addressHash)}/instances`, {
        ...opts
    }));
}
/**
 * get NFT instance by id
 */
export function getNftInstance(addressHash: string, id: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: NftInstance;
    } | {
        status: 400;
    }>(`/tokens/${encodeURIComponent(addressHash)}/instances/${encodeURIComponent(id)}`, {
        ...opts
    }));
}
/**
 * get transfers of NFT instance
 */
export function getNftInstanceTransfers(addressHash: string, id: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: TokenTransfer[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/tokens/${encodeURIComponent(addressHash)}/instances/${encodeURIComponent(id)}/transfers`, {
        ...opts
    }));
}
/**
 * get token instance holders
 */
export function getTokenInstanceHolders(addressHash: string, id: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: Holder[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/tokens/${encodeURIComponent(addressHash)}/instances/${encodeURIComponent(id)}/holders`, {
        ...opts
    }));
}
/**
 * get transfers count of NFT instance
 */
export function getNftInstanceTransfersCount(addressHash: string, id: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            transfers_count: number;
        };
    } | {
        status: 400;
    }>(`/tokens/${encodeURIComponent(addressHash)}/instances/${encodeURIComponent(id)}/transfers-count`, {
        ...opts
    }));
}
/**
 * re-fetch token instance metadata
 */
export function refetchTokenInstanceMetadata(addressHash: string, id: number, recaptchaBody: RecaptchaBody, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            message?: string;
        };
    } | {
        status: 403;
        data: {
            message?: string;
        };
    }>(`/tokens/${encodeURIComponent(addressHash)}/instances/${encodeURIComponent(id)}/refetch-metadata`, oazapfts.json({
        ...opts,
        method: "PATCH",
        body: recaptchaBody
    })));
}
/**
 * get verified smart contracts
 */
export function getSmartContracts({ q, filter }: {
    q?: string;
    filter?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: SmartContractForList[];
            next_page_params: object;
        };
    } | {
        status: 400;
    }>(`/smart-contracts${QS.query(QS.explode({
        q,
        filter
    }))}`, {
        ...opts
    }));
}
/**
 * get verified smart contracts counters
 */
export function getSmartContractsCounters(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            new_smart_contracts_24h: string;
            new_verified_smart_contracts_24h: string;
            smart_contracts: string;
            verified_smart_contracts: string;
        };
    } | {
        status: 400;
    }>("/smart-contracts/counters", {
        ...opts
    }));
}
/**
 * get smart contract
 */
export function getSmartContract(addressHash: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: SmartContract;
    } | {
        status: 400;
    }>(`/smart-contracts/${encodeURIComponent(addressHash)}`, {
        ...opts
    }));
}
/**
 * get read methods
 */
export function getReadMethods(addressHash: string, { isCustomAbi, $from }: {
    isCustomAbi?: string;
    $from?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: (ReadMethodWithValue | ReadMethodWithoutValue)[];
    } | {
        status: 400;
    }>(`/smart-contracts/${encodeURIComponent(addressHash)}/methods-read${QS.query(QS.explode({
        is_custom_abi: isCustomAbi,
        "from": $from
    }))}`, {
        ...opts
    }));
}
/**
 * get read methods proxy
 */
export function getReadMethodsProxy(addressHash: string, { isCustomAbi, $from }: {
    isCustomAbi?: string;
    $from?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: (ReadMethodWithValue | ReadMethodWithoutValue)[];
    }>(`/smart-contracts/${encodeURIComponent(addressHash)}/methods-read-proxy${QS.query(QS.explode({
        is_custom_abi: isCustomAbi,
        "from": $from
    }))}`, {
        ...opts
    }));
}
/**
 * get write methods
 */
export function getWriteMethods(addressHash: string, { isCustomAbi }: {
    isCustomAbi?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: (WriteMethod)[];
    } | {
        status: 400;
    }>(`/smart-contracts/${encodeURIComponent(addressHash)}/methods-write${QS.query(QS.explode({
        is_custom_abi: isCustomAbi
    }))}`, {
        ...opts
    }));
}
/**
 * get write methods proxy
 */
export function getWriteMethodsProxy(addressHash: string, { isCustomAbi }: {
    isCustomAbi?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: (WriteMethod)[];
    } | {
        status: 400;
    }>(`/smart-contracts/${encodeURIComponent(addressHash)}/methods-write-proxy${QS.query(QS.explode({
        is_custom_abi: isCustomAbi
    }))}`, {
        ...opts
    }));
}
/**
 * query read method
 */
export function queryReadMethod(addressHash: string, readMethodQueryBody: ReadMethodQueryBody, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: (ReadMethodResponse)[];
    } | {
        status: 400;
    }>(`/smart-contracts/${encodeURIComponent(addressHash)}/query-read-method`, oazapfts.json({
        ...opts,
        method: "POST",
        body: readMethodQueryBody
    })));
}
/**
 * get json rpc url
 */
export function getJsonRpcUrl(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            json_rpc_url: string;
        };
    }>("/config/json-rpc-url", {
        ...opts
    }));
}
/**
 * get withdrawals
 */
export function getWithdrawals(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: {
            items: Withdrawal[];
            next_page_params: object;
        };
    }>("/withdrawals", {
        ...opts
    }));
}
