
export declare enum _SubgraphErrorPolicy_ {
    allow = "allow",
    deny = "deny"
}
 
export declare enum AbiChanged_orderBy {
    blockNumber = "blockNumber",
    contentType = "contentType",
    id = "id",
    resolver = "resolver",
    transactionID = "transactionID"
}
 
export declare enum Account_orderBy {
    domains = "domains",
    id = "id",
    registrations = "registrations"
}
 
export declare enum AddrChanged_orderBy {
    addr = "addr",
    blockNumber = "blockNumber",
    id = "id",
    resolver = "resolver",
    transactionID = "transactionID"
}
 
export declare enum AuthorisationChanged_orderBy {
    blockNumber = "blockNumber",
    id = "id",
    isAuthorized = "isAuthorized",
    owner = "owner",
    resolver = "resolver",
    target = "target",
    transactionID = "transactionID"
}
 
export declare enum ContenthashChanged_orderBy {
    blockNumber = "blockNumber",
    hash = "hash",
    id = "id",
    resolver = "resolver",
    transactionID = "transactionID"
}
 
export declare enum Domain_orderBy {
    createdAt = "createdAt",
    events = "events",
    id = "id",
    isMigrated = "isMigrated",
    labelName = "labelName",
    labelhash = "labelhash",
    name = "name",
    owner = "owner",
    parent = "parent",
    resolvedAddress = "resolvedAddress",
    resolver = "resolver",
    subdomainCount = "subdomainCount",
    subdomains = "subdomains",
    ttl = "ttl"
}
 
export declare enum DomainEvent_orderBy {
    blockNumber = "blockNumber",
    domain = "domain",
    id = "id",
    transactionID = "transactionID"
}
 
export declare enum InterfaceChanged_orderBy {
    blockNumber = "blockNumber",
    id = "id",
    implementer = "implementer",
    interfaceID = "interfaceID",
    resolver = "resolver",
    transactionID = "transactionID"
}
 
export declare enum MulticoinAddrChanged_orderBy {
    addr = "addr",
    blockNumber = "blockNumber",
    coinType = "coinType",
    id = "id",
    resolver = "resolver",
    transactionID = "transactionID"
}
 
export declare enum NameChanged_orderBy {
    blockNumber = "blockNumber",
    id = "id",
    name = "name",
    resolver = "resolver",
    transactionID = "transactionID"
}
 
export declare enum NameRegistered_orderBy {
    blockNumber = "blockNumber",
    expiryDate = "expiryDate",
    id = "id",
    registrant = "registrant",
    registration = "registration",
    transactionID = "transactionID"
}
 
export declare enum NameRenewed_orderBy {
    blockNumber = "blockNumber",
    expiryDate = "expiryDate",
    id = "id",
    registration = "registration",
    transactionID = "transactionID"
}
 
export declare enum NameTransferred_orderBy {
    blockNumber = "blockNumber",
    id = "id",
    newOwner = "newOwner",
    registration = "registration",
    transactionID = "transactionID"
}
 
export declare enum NewOwner_orderBy {
    blockNumber = "blockNumber",
    domain = "domain",
    id = "id",
    owner = "owner",
    parentDomain = "parentDomain",
    transactionID = "transactionID"
}
 
export declare enum NewResolver_orderBy {
    blockNumber = "blockNumber",
    domain = "domain",
    id = "id",
    resolver = "resolver",
    transactionID = "transactionID"
}
 
export declare enum NewTTL_orderBy {
    blockNumber = "blockNumber",
    domain = "domain",
    id = "id",
    transactionID = "transactionID",
    ttl = "ttl"
}
 
export declare enum OrderDirection {
    asc = "asc",
    desc = "desc"
}
 
export declare enum PubkeyChanged_orderBy {
    blockNumber = "blockNumber",
    id = "id",
    resolver = "resolver",
    transactionID = "transactionID",
    x = "x",
    y = "y"
}
 
export declare enum Registration_orderBy {
    cost = "cost",
    domain = "domain",
    events = "events",
    expiryDate = "expiryDate",
    id = "id",
    labelName = "labelName",
    registrant = "registrant",
    registrationDate = "registrationDate"
}
 
export declare enum RegistrationEvent_orderBy {
    blockNumber = "blockNumber",
    id = "id",
    registration = "registration",
    transactionID = "transactionID"
}
 
export declare enum Resolver_orderBy {
    addr = "addr",
    address = "address",
    coinTypes = "coinTypes",
    contentHash = "contentHash",
    domain = "domain",
    events = "events",
    id = "id",
    texts = "texts"
}
 
export declare enum ResolverEvent_orderBy {
    blockNumber = "blockNumber",
    id = "id",
    resolver = "resolver",
    transactionID = "transactionID"
}
 
export declare enum TextChanged_orderBy {
    blockNumber = "blockNumber",
    id = "id",
    key = "key",
    resolver = "resolver",
    transactionID = "transactionID"
}
 
export declare enum Transfer_orderBy {
    blockNumber = "blockNumber",
    domain = "domain",
    id = "id",
    owner = "owner",
    transactionID = "transactionID"
}
 