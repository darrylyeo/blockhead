/**
 * LlamaFolio API
 * 2024-03-11 11:13:26UTC
 * DO NOT MODIFY - This file has been generated using oazapfts.
 * See https://www.npmjs.com/package/oazapfts
 */
import * as Oazapfts from "@oazapfts/runtime";
import * as QS from "@oazapfts/runtime/query";
export const defaults: Oazapfts.Defaults<Oazapfts.CustomHeaders> = {
    headers: {},
    baseUrl: "https://api.llamafolio.com",
};
const oazapfts = Oazapfts.runtime(defaults);
export const servers = {
    llamaFolioApiProduction: ({ basePath = "" }: {
        basePath: string | number | boolean;
    }) => "https://api.llamafolio.com"
};
export function getBalancesByAddress(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/balances/${encodeURIComponent(address)}`, {
        ...opts
    }));
}
export function postBalancesByAddress(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/balances/${encodeURIComponent(address)}`, {
        ...opts,
        method: "POST"
    }));
}
export function getBalancesByAddressTokens(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/balances/${encodeURIComponent(address)}/tokens`, {
        ...opts
    }));
}
export function getBalancesByAddressTokensAndTokenChart(address: string, token: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/balances/${encodeURIComponent(address)}/tokens/${encodeURIComponent(token)}/chart`, {
        ...opts
    }));
}
export function getCalendarByAddress(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/calendar/${encodeURIComponent(address)}`, {
        ...opts
    }));
}
export function getContractsTrending(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/contracts/trending", {
        ...opts
    }));
}
export function getContractsByChainAndAddress(chain: string, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/contracts/${encodeURIComponent(chain)}/${encodeURIComponent(address)}`, {
        ...opts
    }));
}
export function getGasChart(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/gas/chart", {
        ...opts
    }));
}
export function getGasUsedByAddress(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/gas_used/${encodeURIComponent(address)}`, {
        ...opts
    }));
}
export function getHistoryByAddress(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/history/${encodeURIComponent(address)}`, {
        ...opts
    }));
}
export function getHistoryByAddressStats(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/history/${encodeURIComponent(address)}/stats`, {
        ...opts
    }));
}
export function getHoldersByAddress(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/holders/${encodeURIComponent(address)}`, {
        ...opts
    }));
}
export function getInfoStats(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/info/stats", {
        ...opts
    }));
}
export function getInfoByAddress(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/info/${encodeURIComponent(address)}`, {
        ...opts
    }));
}
export function getLabelsByAddress(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/labels/${encodeURIComponent(address)}`, {
        ...opts
    }));
}
export function getNftsHistoryByAddress(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/nfts/history/${encodeURIComponent(address)}`, {
        ...opts
    }));
}
export function getNftsByAddress(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/nfts/${encodeURIComponent(address)}`, {
        ...opts
    }));
}
export function getProtocols(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/protocols", {
        ...opts
    }));
}
export function getProtocolsLatest(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/protocols/latest", {
        ...opts
    }));
}
export function getProtocolsByProtocolContracts(protocol: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/protocols/${encodeURIComponent(protocol)}/contracts`, {
        ...opts
    }));
}
export function getProtocolsByProtocolHolders(protocol: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/protocols/${encodeURIComponent(protocol)}/holders`, {
        ...opts
    }));
}
export function getSnapshotsByAddressLatest(address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/snapshots/${encodeURIComponent(address)}/latest`, {
        ...opts
    }));
}
export function getSyncStatus(opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText("/sync_status", {
        ...opts
    }));
}
export function getTokensByChainAndAddress(chain: string, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/tokens/${encodeURIComponent(chain)}/${encodeURIComponent(address)}`, {
        ...opts
    }));
}
export function getTokensByChainAndAddressBorrow(chain: string, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/tokens/${encodeURIComponent(chain)}/${encodeURIComponent(address)}/borrow`, {
        ...opts
    }));
}
export function getTokensByChainAndAddressLend(chain: string, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/tokens/${encodeURIComponent(chain)}/${encodeURIComponent(address)}/lend`, {
        ...opts
    }));
}
export function getTokensByChainAndAddressYields(chain: string, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/tokens/${encodeURIComponent(chain)}/${encodeURIComponent(address)}/yields`, {
        ...opts
    }));
}
export function getTokensTransfersByChainAndAddressLatest(chain: string, address: string, opts?: Oazapfts.RequestOpts) {
    return oazapfts.ok(oazapfts.fetchText(`/tokens_transfers/${encodeURIComponent(chain)}/${encodeURIComponent(address)}/latest`, {
        ...opts
    }));
}
