/**
 * REST API
 * v1
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from "@oazapfts/runtime";
import * as QS from "@oazapfts/runtime/query";
export const defaults: Oazapfts.Defaults<Oazapfts.CustomHeaders> = {
    headers: {},
    baseUrl: "https://rest.coinapi.io",
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {
    server1: "https://rest.coinapi.io"
};
export type V1ChainNetworkAddress = {
    /** Gets or sets chain id */
    chain_id?: string | null;
    /** Gets or sets network id */
    network_id?: string | null;
    /** Gets or sets chain address */
    address?: string | null;
};
export type V1Asset = {
    /** Gets or sets the asset ID. */
    asset_id?: string | null;
    /** Gets or sets the name of the asset. */
    name?: string | null;
    /** Gets or sets a value indicating whether the asset is a cryptocurrency. */
    type_is_crypto?: number;
    /** Gets or sets the start date of quote data. */
    data_quote_start?: string | null;
    /** Gets or sets the end date of quote data. */
    data_quote_end?: string | null;
    /** Gets or sets the start date of order book data. */
    data_orderbook_start?: string | null;
    /** Gets or sets the end date of order book data. */
    data_orderbook_end?: string | null;
    /** Gets or sets the start date of trade data. */
    data_trade_start?: string | null;
    /** Gets or sets the end date of trade data. */
    data_trade_end?: string | null;
    /** Gets or sets the number of symbols. */
    data_symbols_count?: number | null;
    /** Gets or sets the USD volume in the last 1 hour. */
    volume_1hrs_usd?: number | null;
    /** Gets or sets the USD volume in the last 1 day. */
    volume_1day_usd?: number | null;
    /** Gets or sets the USD volume in the last 1 month. */
    volume_1mth_usd?: number | null;
    /** Gets or sets the USD price of the asset. */
    price_usd?: number | null;
    /** Gets or sets the ID of the icon for the asset. */
    id_icon?: string | null;
    /** Gets or sets the current supply of the asset. */
    supply_current?: number | null;
    /** Gets or sets the total supply of the asset. */
    supply_total?: number | null;
    /** Gets or sets the maximum supply of the asset. */
    supply_max?: number | null;
    chain_addresses?: V1ChainNetworkAddress[] | null;
};
export type V1AssetRead = {
    /** Gets or sets the asset ID. */
    asset_id?: string | null;
    /** Gets or sets the name of the asset. */
    name?: string | null;
    /** Gets or sets a value indicating whether the asset is a cryptocurrency. */
    type_is_crypto?: number;
    /** Gets or sets the start date of quote data. */
    data_quote_start?: string | null;
    /** Gets or sets the end date of quote data. */
    data_quote_end?: string | null;
    /** Gets or sets the start date of order book data. */
    data_orderbook_start?: string | null;
    /** Gets or sets the end date of order book data. */
    data_orderbook_end?: string | null;
    /** Gets or sets the start date of trade data. */
    data_trade_start?: string | null;
    /** Gets or sets the end date of trade data. */
    data_trade_end?: string | null;
    /** Gets or sets the number of symbols. */
    data_symbols_count?: number | null;
    /** Gets or sets the USD volume in the last 1 hour. */
    volume_1hrs_usd?: number | null;
    /** Gets or sets the USD volume in the last 1 day. */
    volume_1day_usd?: number | null;
    /** Gets or sets the USD volume in the last 1 month. */
    volume_1mth_usd?: number | null;
    /** Gets or sets the USD price of the asset. */
    price_usd?: number | null;
    /** Gets or sets the ID of the icon for the asset. */
    id_icon?: string | null;
    /** Gets or sets the current supply of the asset. */
    supply_current?: number | null;
    /** Gets or sets the total supply of the asset. */
    supply_total?: number | null;
    /** Gets or sets the maximum supply of the asset. */
    supply_max?: number | null;
    chain_addresses?: V1ChainNetworkAddress[] | null;
    data_start?: string | null;
    data_end?: string | null;
};
export type V1Icon = {
    /** Gets or sets the exchange ID associated with the icon. */
    exchange_id?: string | null;
    /** Gets or sets the asset ID associated with the icon. */
    asset_id?: string | null;
    /** Gets or sets the URL of the icon. */
    url?: string | null;
};
export type ModelVwap24RefRate = {
    time?: string;
    asset?: string | null;
    rate?: number;
    volume?: number;
};
export type V1ExchangeRate = {
    /** Gets or sets the time of the exchange rate. */
    time?: string;
    /** Gets or sets the base asset ID of the exchange rate. */
    asset_id_base?: string | null;
    /** Gets or sets the quote asset ID of the exchange rate. */
    asset_id_quote?: string | null;
    /** Gets or sets the exchange rate value. */
    rate?: number;
    /** Gets or sets the VWAP24 reference rates for the base asset. */
    src_side_base?: ModelVwap24RefRate[] | null;
    /** Gets or sets the VWAP24 reference rates for the quote asset. */
    src_side_quote?: ModelVwap24RefRate[] | null;
};
export type V1ExchangeRatesRate = {
    /** Gets or sets the time of the exchange rate. */
    time?: string;
    /** Gets or sets the quote asset ID of the exchange rate. */
    asset_id_quote?: string | null;
    /** Gets or sets the exchange rate value. */
    rate?: number;
};
export type V1ExchangeRates601 = {
    /** Gets or sets the base asset ID. */
    asset_id_base?: string | null;
    /** Gets or sets the list of exchange rates. */
    rates?: V1ExchangeRatesRate[] | null;
};
export type V1TimeseriesPeriod = {
    /** The period ID. */
    period_id?: string | null;
    /** The length of the period in seconds. */
    length_seconds?: number;
    /** The length of the period in months. */
    length_months?: number;
    /** The unit count. */
    unit_count?: number | null;
    /** The unit name. */
    unit_name?: string | null;
    /** The display name of the timeseries period. */
    display_name?: string | null;
};
export type V1ExchangeRatesTimeseriesItem = {
    /** Gets or sets the start time of the period. */
    time_period_start?: string;
    /** Gets or sets the end time of the period. */
    time_period_end?: string;
    /** Gets or sets the opening time of the period. */
    time_open?: string | null;
    /** Gets or sets the closing time of the period. */
    time_close?: string | null;
    /** Gets or sets the opening rate for the period. */
    rate_open?: number | null;
    /** Gets or sets the highest rate for the period. */
    rate_high?: number | null;
    /** Gets or sets the lowest rate for the period. */
    rate_low?: number | null;
    /** Gets or sets the closing rate for the period. */
    rate_close?: number | null;
};
export type V1Exchange = {
    /** Gets or sets the exchange ID. */
    exchange_id?: string | null;
    /** Gets or sets the website URL of the exchange. */
    website?: string | null;
    /** Gets or sets the name of the exchange. */
    name?: string | null;
    /** Gets or sets the start date of quote data. */
    data_quote_start?: string | null;
    /** Gets or sets the end date of quote data. */
    data_quote_end?: string | null;
    /** Gets or sets the start date of order book data. */
    data_orderbook_start?: string | null;
    /** Gets or sets the end date of order book data. */
    data_orderbook_end?: string | null;
    /** Gets or sets the start date of trade data. */
    data_trade_start?: string | null;
    /** Gets or sets the end date of trade data. */
    data_trade_end?: string | null;
    /** Gets or sets the number of trades. */
    data_trade_count?: number | null;
    /** Gets or sets the number of symbols. */
    data_symbols_count?: number | null;
    /** Gets or sets the USD volume in the last 1 hour. */
    volume_1hrs_usd?: number | null;
    /** Gets or sets the USD volume in the last 1 day. */
    volume_1day_usd?: number | null;
    /** Gets or sets the USD volume in the last 1 month. */
    volume_1mth_usd?: number | null;
    /** Gets or sets the list of metric IDs. */
    metric_id?: string[] | null;
};
export type V1ExchangeRead = {
    /** Gets or sets the exchange ID. */
    exchange_id?: string | null;
    /** Gets or sets the website URL of the exchange. */
    website?: string | null;
    /** Gets or sets the name of the exchange. */
    name?: string | null;
    data_start?: string | null;
    data_end?: string | null;
    /** Gets or sets the start date of quote data. */
    data_quote_start?: string | null;
    /** Gets or sets the end date of quote data. */
    data_quote_end?: string | null;
    /** Gets or sets the start date of order book data. */
    data_orderbook_start?: string | null;
    /** Gets or sets the end date of order book data. */
    data_orderbook_end?: string | null;
    /** Gets or sets the start date of trade data. */
    data_trade_start?: string | null;
    /** Gets or sets the end date of trade data. */
    data_trade_end?: string | null;
    /** Gets or sets the number of trades. */
    data_trade_count?: number | null;
    /** Gets or sets the number of symbols. */
    data_symbols_count?: number | null;
    /** Gets or sets the USD volume in the last 1 hour. */
    volume_1hrs_usd?: number | null;
    /** Gets or sets the USD volume in the last 1 day. */
    volume_1day_usd?: number | null;
    /** Gets or sets the USD volume in the last 1 month. */
    volume_1mth_usd?: number | null;
    /** Gets or sets the list of metric IDs. */
    metric_id?: string[] | null;
    /** Gets or sets the list of icons for the exchange. */
    icons?: V1Icon[] | null;
};
export type V1Index = {
    /** Gets or sets the index ID associated with the index. */
    index_id?: string | null;
    /** Gets or sets the name associated with the index. */
    name?: string | null;
    /** Gets or sets the descripion of the index. */
    description?: string | null;
};
export type V1IndexValueComponent = {
    component_id?: string | null;
    component_value?: number;
};
export type V1IndexValue = {
    timestamp?: string;
    value?: number;
    composition?: V1IndexValueComponent[] | null;
};
export type V1IndexTimeseriesItem = {
    /** The start time of the time period. */
    time_period_start?: string;
    /** The end time of the time period. */
    time_period_end?: string;
    /** The time when the value opened. */
    time_open?: string | null;
    /** The time when the value closed. */
    time_close?: string | null;
    /** The opening value. */
    value_open?: number | null;
    /** The highest value during the time period. */
    value_high?: number | null;
    /** The lowest value during the time period. */
    value_low?: number | null;
    /** The closing value. */
    value_close?: number | null;
    /** The number of values during the time period. */
    value_count?: number;
};
export type V1Metric = {
    /** Gets or sets the metric ID. */
    metric_id?: string | null;
    /** Gets or sets the metric description. */
    description?: string | null;
};
export type V1ListingItem = {
    /** Gets or sets the metric ID. */
    metric_id?: string | null;
    /** Gets or sets the symbol ID. */
    symbol_id?: string | null;
    /** Gets or sets the symbol ID from the exchange. */
    symbol_id_external?: string | null;
    /** Gets or sets the exchange ID. */
    exchange_id?: string | null;
    /** Gets or sets the asset ID. */
    asset_id?: string | null;
    /** Gets or sets the asset ID from the exchange. */
    asset_id_external?: string | null;
    /** Gets or sets the chain id. */
    chain_id?: string | null;
    /** Gets or sets the network id. */
    network_id?: string | null;
};
export type V1GeneralData = {
    /** Gets or sets the entry time for the data point. */
    entry_time?: string;
    /** Gets or sets the received time for the data point. */
    recv_time?: string;
    /** Gets or sets the identifier for the exchange. */
    exchange_id?: string | null;
    /** Gets or sets the identifier for the asset. */
    asset_id?: string | null;
    /** Gets or sets the identifier for the symbol. */
    symbol_id?: string | null;
    /** Gets or sets the identifier for the metric. */
    metric_id?: string | null;
    /** Gets or sets the decimal value for the metric. */
    value_decimal?: number | null;
    /** Gets or sets the textual representation of the value for the metric. */
    value_text?: string | null;
    /** Gets or sets the timestamp value for the metric. */
    value_time?: string | null;
};
export type V1MetricData = {
    /** Gets or sets the symbol id. */
    symbol_id?: string | null;
    /** Gets or sets the time at which the value is recorded. */
    time?: string;
    /** Gets or sets the value of the metric. */
    value?: number;
};
export type V1OrderBookDepth = {
    /** The symbol identifier. */
    symbol_id?: string | null;
    /** The exchange time of the order book. */
    time_exchange?: string;
    /** The CoinAPI time when the order book was received. */
    time_coinapi?: string;
    /** The number of ask levels in the order book. */
    ask_levels?: number;
    /** The number of bid levels in the order book. */
    bid_levels?: number;
    /** The depth of the ask side of the order book. */
    ask_depth?: number;
    /** The depth of the bid side of the order book. */
    bid_depth?: number;
};
export type V1OrderBook = {
    /** The symbol identifier. */
    symbol_id?: string | null;
    /** The exchange time of the order book. */
    time_exchange?: string;
    /** The CoinAPI time when the order book was received. */
    time_coinapi?: string;
    /** The asks made by market makers. */
    asks?: any | null;
    /** The bids made by market makers. */
    bids?: any | null;
};
export type V1OrderBookBase = {
    /** The symbol identifier. */
    symbol_id?: string | null;
    /** The exchange time of the order book. */
    time_exchange?: string;
    /** The CoinAPI time when the order book was received. */
    time_coinapi?: string;
    /** The asks made by market makers. */
    asks?: any | null;
    /** The bids made by market makers. */
    bids?: any | null;
};
export type V1Quote = {
    /** The symbol identifier. */
    symbol_id?: string | null;
    /** The exchange time of the quote. */
    time_exchange?: string;
    /** The CoinAPI time when the quote was received. */
    time_coinapi?: string;
    /** The best asking price. */
    ask_price?: number | null;
    /** The volume resting on the best ask. If the value is equal to zero, then the size is unknown. */
    ask_size?: number | null;
    /** The best bidding price. */
    bid_price?: number | null;
    /** The volume resting on the best bid. If the value is equal to zero, then the size is unknown. */
    bid_size?: number | null;
};
export type V1LastTrade = {
    /** The exchange time of the last trade. */
    time_exchange?: string;
    /** The CoinAPI time when the last trade was received. */
    time_coinapi?: string;
    /** The UUID of the last trade. */
    uuid?: string;
    /** The price of the last trade. */
    price?: number;
    /** The size of the last trade. */
    size?: number;
    /** The taker side of the last trade. */
    taker_side?: string | null;
};
export type V1QuoteTrade = {
    /** The symbol identifier. */
    symbol_id?: string | null;
    /** The exchange time of the quote trade. */
    time_exchange?: string;
    /** The CoinAPI time when the quote trade was received. */
    time_coinapi?: string;
    /** The best asking price. */
    ask_price?: number | null;
    /** The volume resting on the best ask. If the value is equal to zero, then the size is unknown. */
    ask_size?: number | null;
    /** The best bidding price. */
    bid_price?: number | null;
    /** The volume resting on the best bid. If the value is equal to zero, then the size is unknown. */
    bid_size?: number | null;
    last_trade?: V1LastTrade;
};
export type V1Symbol = {
    /** The symbol identifier. */
    symbol_id?: string | null;
    /** The exchange identifier. */
    exchange_id?: string | null;
    /** The symbol type. */
    symbol_type?: string | null;
    /** The base asset identifier. */
    asset_id_base?: string | null;
    /** The quote asset identifier. */
    asset_id_quote?: string | null;
    /** The unit asset identifier. */
    asset_id_unit?: string | null;
    /** The contract unit for futures. */
    future_contract_unit?: number | null;
    /** The asset used as the unit for futures contract. */
    future_contract_unit_asset?: string | null;
    /** The future delivery time for futures contract. */
    future_delivery_time?: string | null;
    /** Indicates whether the option type is a call. */
    option_type_is_call?: boolean | null;
    /** The strike price for options. */
    option_strike_price?: number | null;
    /** The contract unit for options. */
    option_contract_unit?: number | null;
    /** The exercise style for options. */
    option_exercise_style?: string | null;
    /** The expiration time for options. */
    option_expiration_time?: string | null;
    /** The delivery time for contracts. */
    contract_delivery_time?: string | null;
    /** The contract unit for contracts. */
    contract_unit?: number | null;
    /** The asset used as the unit for contracts. */
    contract_unit_asset?: string | null;
    /** The contract identifier. */
    contract_id?: string | null;
    /** The display name of the contract. */
    contract_display_name?: string | null;
    /** The display description of the contract. */
    contract_display_description?: string | null;
    /** The start date of quote data. */
    data_quote_start?: string | null;
    /** The end date of quote data. */
    data_quote_end?: string | null;
    /** The start date of order book data. */
    data_orderbook_start?: string | null;
    /** The end date of order book data. */
    data_orderbook_end?: string | null;
    /** The start date of trade data. */
    data_trade_start?: string | null;
    /** The end date of trade data. */
    data_trade_end?: string | null;
    /** The index identifier. */
    index_id?: string | null;
    /** The display name of the index. */
    index_display_name?: string | null;
    /** The display description of the index. */
    index_display_description?: string | null;
    /** The volume in the last 1 hour. */
    volume_1hrs?: number | null;
    /** The volume in USD in the last 1 hour. */
    volume_1hrs_usd?: number | null;
    /** The volume in the last 1 day. */
    volume_1day?: number | null;
    /** The volume in USD in the last 1 day. */
    volume_1day_usd?: number | null;
    /** The volume in the last 1 month. */
    volume_1mth?: number | null;
    /** The volume in USD in the last 1 month. */
    volume_1mth_usd?: number | null;
    /** The price. */
    price?: number | null;
    /** The symbol identifier in the exchange. */
    symbol_id_exchange?: string | null;
    /** The base asset identifier in the exchange. */
    asset_id_base_exchange?: string | null;
    /** The quote asset identifier in the exchange. */
    asset_id_quote_exchange?: string | null;
    /** The price precision. */
    price_precision?: number | null;
    /** The size precision. */
    size_precision?: number | null;
    /** Not normalized raw kvp data. */
    raw_kvp?: {
        [key: string]: string;
    } | null;
};
export type V1SymbolRead = {
    /** The symbol identifier. */
    symbol_id?: string | null;
    /** The exchange identifier. */
    exchange_id?: string | null;
    /** The symbol type. */
    symbol_type?: string | null;
    /** The base asset identifier. */
    asset_id_base?: string | null;
    /** The quote asset identifier. */
    asset_id_quote?: string | null;
    /** The unit asset identifier. */
    asset_id_unit?: string | null;
    /** The contract unit for futures. */
    future_contract_unit?: number | null;
    /** The asset used as the unit for futures contract. */
    future_contract_unit_asset?: string | null;
    /** The future delivery time for futures contract. */
    future_delivery_time?: string | null;
    /** Indicates whether the option type is a call. */
    option_type_is_call?: boolean | null;
    /** The strike price for options. */
    option_strike_price?: number | null;
    /** The contract unit for options. */
    option_contract_unit?: number | null;
    /** The exercise style for options. */
    option_exercise_style?: string | null;
    /** The expiration time for options. */
    option_expiration_time?: string | null;
    /** The delivery time for contracts. */
    contract_delivery_time?: string | null;
    /** The contract unit for contracts. */
    contract_unit?: number | null;
    /** The asset used as the unit for contracts. */
    contract_unit_asset?: string | null;
    /** The contract identifier. */
    contract_id?: string | null;
    /** The display name of the contract. */
    contract_display_name?: string | null;
    /** The display description of the contract. */
    contract_display_description?: string | null;
    data_start?: string | null;
    data_end?: string | null;
    /** The start date of quote data. */
    data_quote_start?: string | null;
    /** The end date of quote data. */
    data_quote_end?: string | null;
    /** The start date of order book data. */
    data_orderbook_start?: string | null;
    /** The end date of order book data. */
    data_orderbook_end?: string | null;
    /** The start date of trade data. */
    data_trade_start?: string | null;
    /** The end date of trade data. */
    data_trade_end?: string | null;
    /** The index identifier. */
    index_id?: string | null;
    /** The display name of the index. */
    index_display_name?: string | null;
    /** The display description of the index. */
    index_display_description?: string | null;
    /** The volume in the last 1 hour. */
    volume_1hrs?: number | null;
    /** The volume in USD in the last 1 hour. */
    volume_1hrs_usd?: number | null;
    /** The volume in the last 1 day. */
    volume_1day?: number | null;
    /** The volume in USD in the last 1 day. */
    volume_1day_usd?: number | null;
    /** The volume in the last 1 month. */
    volume_1mth?: number | null;
    /** The volume in USD in the last 1 month. */
    volume_1mth_usd?: number | null;
    /** The price. */
    price?: number | null;
    /** The symbol identifier in the exchange. */
    symbol_id_exchange?: string | null;
    /** The base asset identifier in the exchange. */
    asset_id_base_exchange?: string | null;
    /** The quote asset identifier in the exchange. */
    asset_id_quote_exchange?: string | null;
    /** The price precision. */
    price_precision?: number | null;
    /** The size precision. */
    size_precision?: number | null;
    /** Not normalized raw kvp data. */
    raw_kvp?: {
        [key: string]: string;
    } | null;
};
export type V1SymbolMapping = {
    /** The symbol ID. */
    symbol_id?: string | null;
    /** The exchange-specific symbol ID. */
    symbol_id_exchange?: string | null;
    /** The exchange-specific base asset ID. */
    asset_id_base_exchange?: string | null;
    /** The exchange-specific quote asset ID. */
    asset_id_quote_exchange?: string | null;
    /** The base asset ID. */
    asset_id_base?: string | null;
    /** The quote asset ID. */
    asset_id_quote?: string | null;
    /** The price precision. */
    price_precision?: number | null;
    /** The size precision. */
    size_precision?: number | null;
};
export type V1TimeseriesItem = {
    /** The start time of the time period. */
    time_period_start?: string;
    /** The end time of the time period. */
    time_period_end?: string;
    /** The time when the price opened. */
    time_open?: string | null;
    /** The time when the price closed. */
    time_close?: string | null;
    /** The opening price. */
    price_open?: number | null;
    /** The highest price during the time period. */
    price_high?: number | null;
    /** The lowest price during the time period. */
    price_low?: number | null;
    /** The closing price. */
    price_close?: number | null;
    /** The total volume traded during the time period. */
    volume_traded?: number;
    /** The number of trades executed during the time period. */
    trades_count?: number;
};
export type ModelsExchangeTimeseriesItem = {
    /** The start time of the time period. */
    time_period_start?: string;
    /** The end time of the time period. */
    time_period_end?: string;
    /** The time when the price opened. */
    time_open?: string | null;
    /** The time when the price closed. */
    time_close?: string | null;
    /** The opening price. */
    price_open?: number | null;
    /** The highest price during the time period. */
    price_high?: number | null;
    /** The lowest price during the time period. */
    price_low?: number | null;
    /** The closing price. */
    price_close?: number | null;
    /** The total volume traded during the time period. */
    volume_traded?: number;
    /** The number of trades executed during the time period. */
    trades_count?: number;
    symbol_id_exchange?: string | null;
    symbol_id_coinapi?: string | null;
};
export type V1Trade = {
    /** The symbol identifier. */
    symbol_id?: string | null;
    /** The time of trade reported by the exchange. */
    time_exchange?: string;
    /** The time when the trade was received by CoinAPI. */
    time_coinapi?: string;
    /** The unique identifier for the trade. */
    uuid?: string;
    /** The price of the transaction. */
    price?: number;
    /** The base asset amount traded in the transaction. */
    size?: number;
    /** The aggressor side of the transaction (BUY/SELL/BUY_ESTIMATED/SELL_ESTIMATED/UNKNOWN). */
    taker_side?: string | null;
    /** The trade identifier. */
    id_trade?: string | null;
    /** The order maker identifier. */
    id_order_maker?: string | null;
    /** The order taker identifier. */
    id_order_taker?: string | null;
};
/**
 * List all assets
 */
export function getV1Assets({ filterAssetId }: {
    filterAssetId?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1AssetRead[];
    }>(`/v1/assets${QS.query(QS.explode({
        filter_asset_id: filterAssetId
    }))}`, {
        ...opts
    }));
}
/**
 * List all assets by asset ID
 */
export function getV1AssetsByAssetId(assetId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1AssetRead[];
    }>(`/v1/assets/${encodeURIComponent(assetId)}`, {
        ...opts
    }));
}
/**
 * List all asset icons
 */
export function getV1AssetsIconsBySize(size: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1Icon[];
    }>(`/v1/assets/icons/${encodeURIComponent(size)}`, {
        ...opts
    }));
}
/**
 * [exchange rates] Get specific rate
 */
export function getSpecificRate(assetIdBase: string, assetIdQuote: string, { time }: {
    time?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1ExchangeRate;
    }>(`/v1/exchangerate/${encodeURIComponent(assetIdBase)}/${encodeURIComponent(assetIdQuote)}${QS.query(QS.explode({
        time
    }))}`, {
        ...opts
    }));
}
/**
 * [exchange rates] Get all current rates
 */
export function getV1ExchangerateByAssetIdBase(assetIdBase: string, { filterAssetId, invert, time }: {
    filterAssetId?: string;
    invert?: boolean;
    time?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1ExchangeRates601;
    }>(`/v1/exchangerate/${encodeURIComponent(assetIdBase)}${QS.query(QS.explode({
        filter_asset_id: filterAssetId,
        invert,
        time
    }))}`, {
        ...opts
    }));
}
/**
 * [exchange rates] Timeseries periods
 */
export function getV1ExchangerateHistoryPeriods(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1TimeseriesPeriod[];
    }>("/v1/exchangerate/history/periods", {
        ...opts
    }));
}
/**
 * [exchange rates] Timeseries data
 */
export function getV1ExchangerateByAssetIdBaseAndAssetIdQuoteHistory(assetIdBase: string, assetIdQuote: string, { periodId, timeStart, timeEnd, limit }: {
    periodId?: string;
    timeStart?: string;
    timeEnd?: string;
    limit?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1ExchangeRatesTimeseriesItem[];
    }>(`/v1/exchangerate/${encodeURIComponent(assetIdBase)}/${encodeURIComponent(assetIdQuote)}/history${QS.query(QS.explode({
        period_id: periodId,
        time_start: timeStart,
        time_end: timeEnd,
        limit
    }))}`, {
        ...opts
    }));
}
/**
 * List all exchanges
 */
export function getV1Exchanges({ filterExchangeId }: {
    filterExchangeId?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1ExchangeRead[];
    }>(`/v1/exchanges${QS.query(QS.explode({
        filter_exchange_id: filterExchangeId
    }))}`, {
        ...opts
    }));
}
/**
 * List all exchanges by exchange_id
 */
export function getV1ExchangesByExchangeId(exchangeId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1ExchangeRead[];
    }>(`/v1/exchanges/${encodeURIComponent(exchangeId)}`, {
        ...opts
    }));
}
/**
 * List of icons for the exchanges
 */
export function getV1ExchangesIconsBySize(size: number, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1Icon[];
    }>(`/v1/exchanges/icons/${encodeURIComponent(size)}`, {
        ...opts
    }));
}
/**
 * List indexes
 */
export function getV1Indexes(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1Index[];
    }>("/v1/indexes", {
        ...opts
    }));
}
/**
 * Historical Index Value w/Composition
 */
export function getV1IndexesByIndexIdHistory(indexId: string, { timeStart, timeEnd, limit }: {
    timeStart?: string;
    timeEnd?: string;
    limit?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1IndexValue[];
    }>(`/v1/indexes/${encodeURIComponent(indexId)}/history${QS.query(QS.explode({
        time_start: timeStart,
        time_end: timeEnd,
        limit
    }))}`, {
        ...opts
    }));
}
/**
 * Timeseries Index Value
 */
export function getV1IndexesByIndexIdTimeseries(indexId: string, periodId: string, timeStart: string, timeEnd: string, { limit }: {
    limit?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1IndexTimeseriesItem[];
    }>(`/v1/indexes/${encodeURIComponent(indexId)}/timeseries${QS.query(QS.explode({
        period_id: periodId,
        time_start: timeStart,
        time_end: timeEnd,
        limit
    }))}`, {
        ...opts
    }));
}
/**
 * Listing of all supported metrics by CoinAPI
 */
export function getV1MetricsListing(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1Metric[];
    }>("/v1/metrics/listing", {
        ...opts
    }));
}
/**
 * Listing of all supported exchange metrics
 */
export function getV1MetricsExchangeListing(exchangeId: string, { metricId }: {
    metricId?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1ListingItem[];
    }>(`/v1/metrics/exchange/listing${QS.query(QS.explode({
        metric_id: metricId,
        exchange_id: exchangeId
    }))}`, {
        ...opts
    }));
}
/**
 * Current metrics for given exchange
 */
export function getV1MetricsExchangeCurrent(exchangeId: string, { metricId }: {
    metricId?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1GeneralData[];
    }>(`/v1/metrics/exchange/current${QS.query(QS.explode({
        metric_id: metricId,
        exchange_id: exchangeId
    }))}`, {
        ...opts
    }));
}
/**
 * Historical metrics for the exchange
 */
export function getV1MetricsExchangeHistory(metricId: string, exchangeId: string, { timeStart, timeEnd, timeFormat, periodId, limit }: {
    timeStart?: string;
    timeEnd?: string;
    timeFormat?: string;
    periodId?: string;
    limit?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1MetricData[];
    }>(`/v1/metrics/exchange/history${QS.query(QS.explode({
        metric_id: metricId,
        exchange_id: exchangeId,
        time_start: timeStart,
        time_end: timeEnd,
        time_format: timeFormat,
        period_id: periodId,
        limit
    }))}`, {
        ...opts
    }));
}
/**
 * Listing of all supported metrics for symbol
 */
export function getV1MetricsSymbolListing({ metricId, exchangeId, symbolId }: {
    metricId?: string;
    exchangeId?: string;
    symbolId?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1ListingItem[];
    }>(`/v1/metrics/symbol/listing${QS.query(QS.explode({
        metric_id: metricId,
        exchange_id: exchangeId,
        symbol_id: symbolId
    }))}`, {
        ...opts
    }));
}
/**
 * Current metrics for given symbol
 */
export function getV1MetricsSymbolCurrent({ metricId, symbolId, exchangeId }: {
    metricId?: string;
    symbolId?: string;
    exchangeId?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1GeneralData[];
    }>(`/v1/metrics/symbol/current${QS.query(QS.explode({
        metric_id: metricId,
        symbol_id: symbolId,
        exchange_id: exchangeId
    }))}`, {
        ...opts
    }));
}
/**
 * Historical metrics for symbol
 */
export function getV1MetricsSymbolHistory(metricId: string, symbolId: string, { timeStart, timeEnd, timeFormat, periodId, limit }: {
    timeStart?: string;
    timeEnd?: string;
    timeFormat?: string;
    periodId?: string;
    limit?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1MetricData[];
    }>(`/v1/metrics/symbol/history${QS.query(QS.explode({
        metric_id: metricId,
        symbol_id: symbolId,
        time_start: timeStart,
        time_end: timeEnd,
        time_format: timeFormat,
        period_id: periodId,
        limit
    }))}`, {
        ...opts
    }));
}
/**
 * Listing of all supported metrics for asset
 */
export function getV1MetricsAssetListing({ metricId, exchangeId, chainId, networkId, assetId, assetIdExternal }: {
    metricId?: string;
    exchangeId?: string;
    chainId?: string;
    networkId?: string;
    assetId?: string;
    assetIdExternal?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1ListingItem[];
    }>(`/v1/metrics/asset/listing${QS.query(QS.explode({
        metric_id: metricId,
        exchange_id: exchangeId,
        chain_id: chainId,
        network_id: networkId,
        asset_id: assetId,
        asset_id_external: assetIdExternal
    }))}`, {
        ...opts
    }));
}
/**
 * Current metrics for given asset
 */
export function getV1MetricsAssetCurrent({ metricId, assetId, assetIdExternal, exchangeId }: {
    metricId?: string;
    assetId?: string;
    assetIdExternal?: string;
    exchangeId?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1GeneralData[];
    }>(`/v1/metrics/asset/current${QS.query(QS.explode({
        metric_id: metricId,
        asset_id: assetId,
        asset_id_external: assetIdExternal,
        exchange_id: exchangeId
    }))}`, {
        ...opts
    }));
}
/**
 * Historical metrics for asset
 */
export function getV1MetricsAssetHistory(metricId: string, exchangeId: string, { assetId, assetIdExternal, timeStart, timeEnd, timeFormat, periodId, limit }: {
    assetId?: string;
    assetIdExternal?: string;
    timeStart?: string;
    timeEnd?: string;
    timeFormat?: string;
    periodId?: string;
    limit?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1MetricData[];
    }>(`/v1/metrics/asset/history${QS.query(QS.explode({
        metric_id: metricId,
        asset_id: assetId,
        asset_id_external: assetIdExternal,
        exchange_id: exchangeId,
        time_start: timeStart,
        time_end: timeEnd,
        time_format: timeFormat,
        period_id: periodId,
        limit
    }))}`, {
        ...opts
    }));
}
/**
 * [order book] Current depth of the order book
 */
export function getV1OrderbooksBySymbolIdDepthCurrent(symbolId: string, { limitLevels }: {
    limitLevels?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1OrderBookDepth;
    }>(`/v1/orderbooks/${encodeURIComponent(symbolId)}/depth/current${QS.query(QS.explode({
        limit_levels: limitLevels
    }))}`, {
        ...opts
    }));
}
/**
 * [order book] Historical data
 */
export function getV1OrderbooksBySymbolIdHistory(symbolId: string, { date, timeStart, timeEnd, limit, limitLevels }: {
    date?: string;
    timeStart?: string;
    timeEnd?: string;
    limit?: number;
    limitLevels?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1OrderBook[];
    }>(`/v1/orderbooks/${encodeURIComponent(symbolId)}/history${QS.query(QS.explode({
        date,
        time_start: timeStart,
        time_end: timeEnd,
        limit,
        limit_levels: limitLevels
    }))}`, {
        ...opts
    }));
}
/**
 * Get current order book
 */
export function getV1OrderbooksBySymbolIdCurrent(symbolId: string, { limitLevels }: {
    limitLevels?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1OrderBookBase;
    }>(`/v1/orderbooks/${encodeURIComponent(symbolId)}/current${QS.query(QS.explode({
        limit_levels: limitLevels
    }))}`, {
        ...opts
    }));
}
/**
 * [order book] Latest data
 */
export function getV1OrderbooksBySymbolIdLatest(symbolId: string, { limit, limitLevels }: {
    limit?: number;
    limitLevels?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1OrderBook[];
    }>(`/v1/orderbooks/${encodeURIComponent(symbolId)}/latest${QS.query(QS.explode({
        limit,
        limit_levels: limitLevels
    }))}`, {
        ...opts
    }));
}
/**
 * [order book l3] Current order books
 */
export function getV1Orderbooks3Current({ filterSymbolId, limitLevels }: {
    filterSymbolId?: string;
    limitLevels?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1OrderBookBase[];
    }>(`/v1/orderbooks3/current${QS.query(QS.explode({
        filter_symbol_id: filterSymbolId,
        limit_levels: limitLevels
    }))}`, {
        ...opts
    }));
}
/**
 * [order book l3] Current order book by symbol_id
 */
export function getV1Orderbooks3BySymbolIdCurrent(symbolId: string, { limitLevels }: {
    limitLevels?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1OrderBookBase;
    }>(`/v1/orderbooks3/${encodeURIComponent(symbolId)}/current${QS.query(QS.explode({
        limit_levels: limitLevels
    }))}`, {
        ...opts
    }));
}
/**
 * [quotes] Historical data
 */
export function getV1QuotesBySymbolIdHistory(symbolId: string, { date, timeStart, timeEnd, limit }: {
    date?: string;
    timeStart?: string;
    timeEnd?: string;
    limit?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1Quote[];
    }>(`/v1/quotes/${encodeURIComponent(symbolId)}/history${QS.query(QS.explode({
        date,
        time_start: timeStart,
        time_end: timeEnd,
        limit
    }))}`, {
        ...opts
    }));
}
/**
 * [quotes] Current data
 */
export function getV1QuotesCurrent({ filterSymbolId }: {
    filterSymbolId?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1QuoteTrade[];
    }>(`/v1/quotes/current${QS.query(QS.explode({
        filter_symbol_id: filterSymbolId
    }))}`, {
        ...opts
    }));
}
/**
 * [quotes] Current quotes for a specific symbol
 */
export function getV1QuotesBySymbolIdCurrent(symbolId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1QuoteTrade;
    }>(`/v1/quotes/${encodeURIComponent(symbolId)}/current`, {
        ...opts
    }));
}
/**
 * [quotes] Latest data
 */
export function getV1QuotesLatest({ filterSymbolId, limit }: {
    filterSymbolId?: string;
    limit?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1Quote[];
    }>(`/v1/quotes/latest${QS.query(QS.explode({
        filter_symbol_id: filterSymbolId,
        limit
    }))}`, {
        ...opts
    }));
}
/**
 * [quotes] Latest quote updates for a specific symbol
 */
export function getV1QuotesBySymbolIdLatest(symbolId: string, { limit }: {
    limit?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1Quote[];
    }>(`/v1/quotes/${encodeURIComponent(symbolId)}/latest${QS.query(QS.explode({
        limit
    }))}`, {
        ...opts
    }));
}
/**
 * List all symbols
 */
export function getV1Symbols({ filterSymbolId, filterExchangeId, filterAssetId }: {
    filterSymbolId?: string;
    filterExchangeId?: string;
    filterAssetId?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1SymbolRead[];
    }>(`/v1/symbols${QS.query(QS.explode({
        filter_symbol_id: filterSymbolId,
        filter_exchange_id: filterExchangeId,
        filter_asset_id: filterAssetId
    }))}`, {
        ...opts
    }));
}
/**
 * List symbol mapping for the exchange
 */
export function getV1SymbolsMapByExchangeId(exchangeId: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1SymbolMapping[];
    }>(`/v1/symbols/map/${encodeURIComponent(exchangeId)}`, {
        ...opts
    }));
}
/**
 * List of symbols for the exchange
 */
export function getV1SymbolsByExchangeId(exchangeId: string, { filterSymbolId, filterAssetId }: {
    filterSymbolId?: string;
    filterAssetId?: string;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1SymbolRead[];
    }>(`/v1/symbols/${encodeURIComponent(exchangeId)}${QS.query(QS.explode({
        filter_symbol_id: filterSymbolId,
        filter_asset_id: filterAssetId
    }))}`, {
        ...opts
    }));
}
/**
 * [ohlcv] List all periods
 */
export function getV1OhlcvPeriods(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1TimeseriesPeriod[];
    }>("/v1/ohlcv/periods", {
        ...opts
    }));
}
/**
 * [ohlcv] Historical data
 */
export function getV1OhlcvBySymbolIdHistory(symbolId: string, periodId: string, { timeStart, timeEnd, limit, includeEmptyItems }: {
    timeStart?: string;
    timeEnd?: string;
    limit?: number;
    includeEmptyItems?: boolean;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1TimeseriesItem[];
    }>(`/v1/ohlcv/${encodeURIComponent(symbolId)}/history${QS.query(QS.explode({
        period_id: periodId,
        time_start: timeStart,
        time_end: timeEnd,
        limit,
        include_empty_items: includeEmptyItems
    }))}`, {
        ...opts
    }));
}
/**
 * [ohlcv] Historical data by exchange
 */
export function getV1OhlcvExchangesByExchangeIdHistory(exchangeId: string, periodId: string, timeStart: string, timeEnd: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: ModelsExchangeTimeseriesItem[];
    }>(`/v1/ohlcv/exchanges/${encodeURIComponent(exchangeId)}/history${QS.query(QS.explode({
        period_id: periodId,
        time_start: timeStart,
        time_end: timeEnd
    }))}`, {
        ...opts
    }));
}
/**
 * [ohlcv] Latest data
 */
export function getV1OhlcvBySymbolIdLatest(symbolId: string, periodId: string, { limit, includeEmptyItems }: {
    limit?: number;
    includeEmptyItems?: boolean;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1TimeseriesItem[];
    }>(`/v1/ohlcv/${encodeURIComponent(symbolId)}/latest${QS.query(QS.explode({
        period_id: periodId,
        limit,
        include_empty_items: includeEmptyItems
    }))}`, {
        ...opts
    }));
}
/**
 * [trades] Historical data
 */
export function getV1TradesBySymbolIdHistory(symbolId: string, { date, timeStart, timeEnd, limit, includeId }: {
    date?: string;
    timeStart?: string;
    timeEnd?: string;
    limit?: number;
    includeId?: boolean;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1Trade[];
    }>(`/v1/trades/${encodeURIComponent(symbolId)}/history${QS.query(QS.explode({
        date,
        time_start: timeStart,
        time_end: timeEnd,
        limit,
        include_id: includeId
    }))}`, {
        ...opts
    }));
}
/**
 * [trades] Latest data by symbol_id
 */
export function getV1TradesBySymbolIdLatest(symbolId: string, { limit, includeId }: {
    limit?: number;
    includeId?: boolean;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1Trade[];
    }>(`/v1/trades/${encodeURIComponent(symbolId)}/latest${QS.query(QS.explode({
        limit,
        include_id: includeId
    }))}`, {
        ...opts
    }));
}
/**
 * [trades] Latest data
 */
export function getV1TradesLatest({ filterSymbolId, includeId, limit }: {
    filterSymbolId?: string;
    includeId?: boolean;
    limit?: number;
} = {}, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchJson<{
        status: 200;
        data: V1Trade[];
    }>(`/v1/trades/latest${QS.query(QS.explode({
        filter_symbol_id: filterSymbolId,
        include_id: includeId,
        limit
    }))}`, {
        ...opts
    }));
}
