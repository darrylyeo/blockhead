
type ValuesOf<T> = T[keyof T]
	
export declare const _SubgraphErrorPolicy_: {
    readonly allow: "allow";
    readonly deny: "deny";
}

export type _SubgraphErrorPolicy_$options = ValuesOf<typeof _SubgraphErrorPolicy_>
 
export declare const AbiChanged_orderBy: {
    readonly blockNumber: "blockNumber";
    readonly contentType: "contentType";
    readonly id: "id";
    readonly resolver: "resolver";
    readonly transactionID: "transactionID";
}

export type AbiChanged_orderBy$options = ValuesOf<typeof AbiChanged_orderBy>
 
export declare const Account_orderBy: {
    readonly domains: "domains";
    readonly id: "id";
    readonly registrations: "registrations";
    readonly wrappedDomains: "wrappedDomains";
}

export type Account_orderBy$options = ValuesOf<typeof Account_orderBy>
 
export declare const AddrChanged_orderBy: {
    readonly addr: "addr";
    readonly blockNumber: "blockNumber";
    readonly id: "id";
    readonly resolver: "resolver";
    readonly transactionID: "transactionID";
}

export type AddrChanged_orderBy$options = ValuesOf<typeof AddrChanged_orderBy>
 
export declare const AuthorisationChanged_orderBy: {
    readonly blockNumber: "blockNumber";
    readonly id: "id";
    readonly isAuthorized: "isAuthorized";
    readonly owner: "owner";
    readonly resolver: "resolver";
    readonly target: "target";
    readonly transactionID: "transactionID";
}

export type AuthorisationChanged_orderBy$options = ValuesOf<typeof AuthorisationChanged_orderBy>
 
export declare const ContenthashChanged_orderBy: {
    readonly blockNumber: "blockNumber";
    readonly hash: "hash";
    readonly id: "id";
    readonly resolver: "resolver";
    readonly transactionID: "transactionID";
}

export type ContenthashChanged_orderBy$options = ValuesOf<typeof ContenthashChanged_orderBy>
 
export declare const Domain_orderBy: {
    readonly createdAt: "createdAt";
    readonly events: "events";
    readonly id: "id";
    readonly isMigrated: "isMigrated";
    readonly labelName: "labelName";
    readonly labelhash: "labelhash";
    readonly name: "name";
    readonly owner: "owner";
    readonly parent: "parent";
    readonly registration: "registration";
    readonly resolvedAddress: "resolvedAddress";
    readonly resolver: "resolver";
    readonly subdomainCount: "subdomainCount";
    readonly subdomains: "subdomains";
    readonly ttl: "ttl";
    readonly wrappedDomain: "wrappedDomain";
}

export type Domain_orderBy$options = ValuesOf<typeof Domain_orderBy>
 
export declare const DomainEvent_orderBy: {
    readonly blockNumber: "blockNumber";
    readonly domain: "domain";
    readonly id: "id";
    readonly transactionID: "transactionID";
}

export type DomainEvent_orderBy$options = ValuesOf<typeof DomainEvent_orderBy>
 
export declare const FusesSet_orderBy: {
    readonly blockNumber: "blockNumber";
    readonly domain: "domain";
    readonly expiry: "expiry";
    readonly fuses: "fuses";
    readonly id: "id";
    readonly transactionID: "transactionID";
}

export type FusesSet_orderBy$options = ValuesOf<typeof FusesSet_orderBy>
 
export declare const InterfaceChanged_orderBy: {
    readonly blockNumber: "blockNumber";
    readonly id: "id";
    readonly implementer: "implementer";
    readonly interfaceID: "interfaceID";
    readonly resolver: "resolver";
    readonly transactionID: "transactionID";
}

export type InterfaceChanged_orderBy$options = ValuesOf<typeof InterfaceChanged_orderBy>
 
export declare const MulticoinAddrChanged_orderBy: {
    readonly addr: "addr";
    readonly blockNumber: "blockNumber";
    readonly coinType: "coinType";
    readonly id: "id";
    readonly resolver: "resolver";
    readonly transactionID: "transactionID";
}

export type MulticoinAddrChanged_orderBy$options = ValuesOf<typeof MulticoinAddrChanged_orderBy>
 
export declare const NameChanged_orderBy: {
    readonly blockNumber: "blockNumber";
    readonly id: "id";
    readonly name: "name";
    readonly resolver: "resolver";
    readonly transactionID: "transactionID";
}

export type NameChanged_orderBy$options = ValuesOf<typeof NameChanged_orderBy>
 
export declare const NameRegistered_orderBy: {
    readonly blockNumber: "blockNumber";
    readonly expiryDate: "expiryDate";
    readonly id: "id";
    readonly registrant: "registrant";
    readonly registration: "registration";
    readonly transactionID: "transactionID";
}

export type NameRegistered_orderBy$options = ValuesOf<typeof NameRegistered_orderBy>
 
export declare const NameRenewed_orderBy: {
    readonly blockNumber: "blockNumber";
    readonly expiryDate: "expiryDate";
    readonly id: "id";
    readonly registration: "registration";
    readonly transactionID: "transactionID";
}

export type NameRenewed_orderBy$options = ValuesOf<typeof NameRenewed_orderBy>
 
export declare const NameTransferred_orderBy: {
    readonly blockNumber: "blockNumber";
    readonly id: "id";
    readonly newOwner: "newOwner";
    readonly registration: "registration";
    readonly transactionID: "transactionID";
}

export type NameTransferred_orderBy$options = ValuesOf<typeof NameTransferred_orderBy>
 
export declare const NameUnwrapped_orderBy: {
    readonly blockNumber: "blockNumber";
    readonly domain: "domain";
    readonly id: "id";
    readonly owner: "owner";
    readonly transactionID: "transactionID";
}

export type NameUnwrapped_orderBy$options = ValuesOf<typeof NameUnwrapped_orderBy>
 
export declare const NameWrapped_orderBy: {
    readonly blockNumber: "blockNumber";
    readonly domain: "domain";
    readonly expiry: "expiry";
    readonly fuses: "fuses";
    readonly id: "id";
    readonly name: "name";
    readonly owner: "owner";
    readonly transactionID: "transactionID";
}

export type NameWrapped_orderBy$options = ValuesOf<typeof NameWrapped_orderBy>
 
export declare const NewOwner_orderBy: {
    readonly blockNumber: "blockNumber";
    readonly domain: "domain";
    readonly id: "id";
    readonly owner: "owner";
    readonly parentDomain: "parentDomain";
    readonly transactionID: "transactionID";
}

export type NewOwner_orderBy$options = ValuesOf<typeof NewOwner_orderBy>
 
export declare const NewResolver_orderBy: {
    readonly blockNumber: "blockNumber";
    readonly domain: "domain";
    readonly id: "id";
    readonly resolver: "resolver";
    readonly transactionID: "transactionID";
}

export type NewResolver_orderBy$options = ValuesOf<typeof NewResolver_orderBy>
 
export declare const NewTTL_orderBy: {
    readonly blockNumber: "blockNumber";
    readonly domain: "domain";
    readonly id: "id";
    readonly transactionID: "transactionID";
    readonly ttl: "ttl";
}

export type NewTTL_orderBy$options = ValuesOf<typeof NewTTL_orderBy>
 
export declare const OrderDirection: {
    readonly asc: "asc";
    readonly desc: "desc";
}

export type OrderDirection$options = ValuesOf<typeof OrderDirection>
 
export declare const PubkeyChanged_orderBy: {
    readonly blockNumber: "blockNumber";
    readonly id: "id";
    readonly resolver: "resolver";
    readonly transactionID: "transactionID";
    readonly x: "x";
    readonly y: "y";
}

export type PubkeyChanged_orderBy$options = ValuesOf<typeof PubkeyChanged_orderBy>
 
export declare const Registration_orderBy: {
    readonly cost: "cost";
    readonly domain: "domain";
    readonly events: "events";
    readonly expiryDate: "expiryDate";
    readonly id: "id";
    readonly labelName: "labelName";
    readonly registrant: "registrant";
    readonly registrationDate: "registrationDate";
}

export type Registration_orderBy$options = ValuesOf<typeof Registration_orderBy>
 
export declare const RegistrationEvent_orderBy: {
    readonly blockNumber: "blockNumber";
    readonly id: "id";
    readonly registration: "registration";
    readonly transactionID: "transactionID";
}

export type RegistrationEvent_orderBy$options = ValuesOf<typeof RegistrationEvent_orderBy>
 
export declare const Resolver_orderBy: {
    readonly addr: "addr";
    readonly address: "address";
    readonly coinTypes: "coinTypes";
    readonly contentHash: "contentHash";
    readonly domain: "domain";
    readonly events: "events";
    readonly id: "id";
    readonly texts: "texts";
}

export type Resolver_orderBy$options = ValuesOf<typeof Resolver_orderBy>
 
export declare const ResolverEvent_orderBy: {
    readonly blockNumber: "blockNumber";
    readonly id: "id";
    readonly resolver: "resolver";
    readonly transactionID: "transactionID";
}

export type ResolverEvent_orderBy$options = ValuesOf<typeof ResolverEvent_orderBy>
 
export declare const TextChanged_orderBy: {
    readonly blockNumber: "blockNumber";
    readonly id: "id";
    readonly key: "key";
    readonly resolver: "resolver";
    readonly transactionID: "transactionID";
    readonly value: "value";
}

export type TextChanged_orderBy$options = ValuesOf<typeof TextChanged_orderBy>
 
export declare const Transfer_orderBy: {
    readonly blockNumber: "blockNumber";
    readonly domain: "domain";
    readonly id: "id";
    readonly owner: "owner";
    readonly transactionID: "transactionID";
}

export type Transfer_orderBy$options = ValuesOf<typeof Transfer_orderBy>
 
export declare const VersionChanged_orderBy: {
    readonly blockNumber: "blockNumber";
    readonly id: "id";
    readonly resolver: "resolver";
    readonly transactionID: "transactionID";
    readonly version: "version";
}

export type VersionChanged_orderBy$options = ValuesOf<typeof VersionChanged_orderBy>
 
export declare const WrappedDomain_orderBy: {
    readonly domain: "domain";
    readonly expiryDate: "expiryDate";
    readonly fuses: "fuses";
    readonly id: "id";
    readonly labelName: "labelName";
    readonly owner: "owner";
}

export type WrappedDomain_orderBy$options = ValuesOf<typeof WrappedDomain_orderBy>
 
export declare const WrappedTransfer_orderBy: {
    readonly blockNumber: "blockNumber";
    readonly domain: "domain";
    readonly id: "id";
    readonly owner: "owner";
    readonly transactionID: "transactionID";
}

export type WrappedTransfer_orderBy$options = ValuesOf<typeof WrappedTransfer_orderBy>
 