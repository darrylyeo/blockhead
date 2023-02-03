import { ENSDomainsContainingQueryStore } from "../plugins/houdini-svelte/stores/ENSDomainsContainingQuery";
import { ENSDomainQueryStore } from "../plugins/houdini-svelte/stores/ENSDomainQuery";
import { Cache as InternalCache } from "./cache/cache";
import type { CacheTypeDef } from "./generated";
import { Cache } from "./public";
export * from "./lib";

export function graphql(
    str: "\n\t\tquery ENSDomainsContainingQuery($query: String!) {\n\t\t\tdomains(where: {name_contains: $query, name_not: $query}) {\n\t\t\t\t__typename\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tlabelName\n\t\t\t\tlabelhash\n\t\t\t\tparent { id name }\n\t\t\t\tsubdomains { id name }\n\t\t\t\tresolvedAddress {\n\t\t\t\t\t__typename\n\t\t\t\t\tid\n\t\t\t\t}\n\t\t\t\towner {\n\t\t\t\t\t__typename\n\t\t\t\t\tid\n\t\t\t\t}\n\t\t\t\tresolver {\n\t\t\t\t\t__typename\n\t\t\t\t\tid\n\t\t\t\t\tdomain { id }\n\t\t\t\t\taddress\n\t\t\t\t\taddr { id }\n\t\t\t\t\ttexts\n\t\t\t\t\tcoinTypes\n\t\t\t\t\tevents { id blockNumber transactionID }\n\t\t\t\t}\n\t\t\t\tttl\n\t\t\t\tisMigrated\n\t\t\t\tevents {\n\t\t\t\t\t__typename\n\t\t\t\t\tid\n\t\t\t\t\tblockNumber\n\t\t\t\t\ttransactionID\n\t\t\t\t\t... on Transfer {\n\t\t\t\t\t\towner { id }\n\t\t\t\t\t}\n\t\t\t\t\t... on NewOwner {\n\t\t\t\t\t\towner { id }\n\t\t\t\t\t}\n\t\t\t\t\t... on NewResolver {\n\t\t\t\t\t\tresolver { id address }\n\t\t\t\t\t}\n\t\t\t\t\t... on NewTTL {\n\t\t\t\t\t\tttl\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"
): ENSDomainsContainingQueryStore;

export function graphql(
    str: "\n\t\tquery ENSDomainQuery($name: String!) {\n\t\t\tdomains(where: {name: $name}) {\n\t\t\t\t__typename\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tlabelName\n\t\t\t\tlabelhash\n\t\t\t\tparent { id name }\n\t\t\t\tsubdomains { id name }\n\t\t\t\tresolvedAddress {\n\t\t\t\t\t__typename\n\t\t\t\t\tid\n\t\t\t\t}\n\t\t\t\towner {\n\t\t\t\t\t__typename\n\t\t\t\t\tid\n\t\t\t\t}\n\t\t\t\tresolver {\n\t\t\t\t\t__typename\n\t\t\t\t\tid\n\t\t\t\t\tdomain { id }\n\t\t\t\t\taddress\n\t\t\t\t\taddr { id }\n\t\t\t\t\ttexts\n\t\t\t\t\tcoinTypes\n\t\t\t\t\tevents { id blockNumber transactionID }\n\t\t\t\t}\n\t\t\t\tttl\n\t\t\t\tisMigrated\n\t\t\t\tevents {\n\t\t\t\t\t__typename\n\t\t\t\t\tid\n\t\t\t\t\tblockNumber\n\t\t\t\t\ttransactionID\n\t\t\t\t\t... on Transfer {\n\t\t\t\t\t\towner { id }\n\t\t\t\t\t}\n\t\t\t\t\t... on NewOwner {\n\t\t\t\t\t\towner { id }\n\t\t\t\t\t}\n\t\t\t\t\t... on NewResolver {\n\t\t\t\t\t\tresolver { id address }\n\t\t\t\t\t}\n\t\t\t\t\t... on NewTTL {\n\t\t\t\t\t\tttl\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"
): ENSDomainQueryStore;

export declare function graphql(str: string | TemplateStringsArray): any;
export declare const cache: Cache<CacheTypeDef>;
export declare function getCache(): InternalCache;