import type { Record } from "./public/record";
import { ENSDomainsContainingQuery$result, ENSDomainsContainingQuery$input } from "../artifacts/ENSDomainsContainingQuery";
import { ENSDomainsContainingQueryStore } from "../plugins/houdini-svelte/stores/ENSDomainsContainingQuery";
import { ENSDomainQuery$result, ENSDomainQuery$input } from "../artifacts/ENSDomainQuery";
import { ENSDomainQueryStore } from "../plugins/houdini-svelte/stores/ENSDomainQuery";
import type { WrappedTransfer_orderBy } from "$houdini/graphql/enums";
import type { VersionChanged_orderBy } from "$houdini/graphql/enums";
import type { Transfer_orderBy } from "$houdini/graphql/enums";
import type { TextChanged_orderBy } from "$houdini/graphql/enums";
import type { Resolver_orderBy } from "$houdini/graphql/enums";
import type { ResolverEvent_orderBy } from "$houdini/graphql/enums";
import type { RegistrationEvent_orderBy } from "$houdini/graphql/enums";
import type { PubkeyChanged_orderBy } from "$houdini/graphql/enums";
import type { NewTTL_orderBy } from "$houdini/graphql/enums";
import type { NewResolver_orderBy } from "$houdini/graphql/enums";
import type { NewOwner_orderBy } from "$houdini/graphql/enums";
import type { NameWrapped_orderBy } from "$houdini/graphql/enums";
import type { NameUnwrapped_orderBy } from "$houdini/graphql/enums";
import type { NameTransferred_orderBy } from "$houdini/graphql/enums";
import type { NameRenewed_orderBy } from "$houdini/graphql/enums";
import type { NameRegistered_orderBy } from "$houdini/graphql/enums";
import type { NameChanged_orderBy } from "$houdini/graphql/enums";
import type { MulticoinAddrChanged_orderBy } from "$houdini/graphql/enums";
import type { InterfaceChanged_orderBy } from "$houdini/graphql/enums";
import type { FusesSet_orderBy } from "$houdini/graphql/enums";
import type { ContenthashChanged_orderBy } from "$houdini/graphql/enums";
import type { AuthorisationChanged_orderBy } from "$houdini/graphql/enums";
import type { AddrChanged_orderBy } from "$houdini/graphql/enums";
import type { Account_orderBy } from "$houdini/graphql/enums";
import type { AbiChanged_orderBy } from "$houdini/graphql/enums";
import type { _SubgraphErrorPolicy_ } from "$houdini/graphql/enums";
import type { DomainEvent_orderBy } from "$houdini/graphql/enums";
import type { WrappedDomain_orderBy } from "$houdini/graphql/enums";
import type { Registration_orderBy } from "$houdini/graphql/enums";
import type { OrderDirection } from "$houdini/graphql/enums";
import type { ValueOf } from "$houdini/runtime/lib/types";
import type { Domain_orderBy } from "$houdini/graphql/enums";

type BlockChangedFilter = {
    number_gte: number;
};

type DomainEvent_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (DomainEvent_filter | null | undefined)[] | null | undefined;
    blockNumber?: number | null | undefined;
    blockNumber_gt?: number | null | undefined;
    blockNumber_gte?: number | null | undefined;
    blockNumber_in?: (number)[] | null | undefined;
    blockNumber_lt?: number | null | undefined;
    blockNumber_lte?: number | null | undefined;
    blockNumber_not?: number | null | undefined;
    blockNumber_not_in?: (number)[] | null | undefined;
    domain?: string | null | undefined;
    domain_?: Domain_filter | null | undefined;
    domain_contains?: string | null | undefined;
    domain_contains_nocase?: string | null | undefined;
    domain_ends_with?: string | null | undefined;
    domain_ends_with_nocase?: string | null | undefined;
    domain_gt?: string | null | undefined;
    domain_gte?: string | null | undefined;
    domain_in?: (string)[] | null | undefined;
    domain_lt?: string | null | undefined;
    domain_lte?: string | null | undefined;
    domain_not?: string | null | undefined;
    domain_not_contains?: string | null | undefined;
    domain_not_contains_nocase?: string | null | undefined;
    domain_not_ends_with?: string | null | undefined;
    domain_not_ends_with_nocase?: string | null | undefined;
    domain_not_in?: (string)[] | null | undefined;
    domain_not_starts_with?: string | null | undefined;
    domain_not_starts_with_nocase?: string | null | undefined;
    domain_starts_with?: string | null | undefined;
    domain_starts_with_nocase?: string | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    or?: (DomainEvent_filter | null | undefined)[] | null | undefined;
    transactionID?: string | null | undefined;
    transactionID_contains?: string | null | undefined;
    transactionID_gt?: string | null | undefined;
    transactionID_gte?: string | null | undefined;
    transactionID_in?: (string)[] | null | undefined;
    transactionID_lt?: string | null | undefined;
    transactionID_lte?: string | null | undefined;
    transactionID_not?: string | null | undefined;
    transactionID_not_contains?: string | null | undefined;
    transactionID_not_in?: (string)[] | null | undefined;
};

type RegistrationEvent_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (RegistrationEvent_filter | null | undefined)[] | null | undefined;
    blockNumber?: number | null | undefined;
    blockNumber_gt?: number | null | undefined;
    blockNumber_gte?: number | null | undefined;
    blockNumber_in?: (number)[] | null | undefined;
    blockNumber_lt?: number | null | undefined;
    blockNumber_lte?: number | null | undefined;
    blockNumber_not?: number | null | undefined;
    blockNumber_not_in?: (number)[] | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    or?: (RegistrationEvent_filter | null | undefined)[] | null | undefined;
    registration?: string | null | undefined;
    registration_?: Registration_filter | null | undefined;
    registration_contains?: string | null | undefined;
    registration_contains_nocase?: string | null | undefined;
    registration_ends_with?: string | null | undefined;
    registration_ends_with_nocase?: string | null | undefined;
    registration_gt?: string | null | undefined;
    registration_gte?: string | null | undefined;
    registration_in?: (string)[] | null | undefined;
    registration_lt?: string | null | undefined;
    registration_lte?: string | null | undefined;
    registration_not?: string | null | undefined;
    registration_not_contains?: string | null | undefined;
    registration_not_contains_nocase?: string | null | undefined;
    registration_not_ends_with?: string | null | undefined;
    registration_not_ends_with_nocase?: string | null | undefined;
    registration_not_in?: (string)[] | null | undefined;
    registration_not_starts_with?: string | null | undefined;
    registration_not_starts_with_nocase?: string | null | undefined;
    registration_starts_with?: string | null | undefined;
    registration_starts_with_nocase?: string | null | undefined;
    transactionID?: string | null | undefined;
    transactionID_contains?: string | null | undefined;
    transactionID_gt?: string | null | undefined;
    transactionID_gte?: string | null | undefined;
    transactionID_in?: (string)[] | null | undefined;
    transactionID_lt?: string | null | undefined;
    transactionID_lte?: string | null | undefined;
    transactionID_not?: string | null | undefined;
    transactionID_not_contains?: string | null | undefined;
    transactionID_not_in?: (string)[] | null | undefined;
};

type Registration_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (Registration_filter | null | undefined)[] | null | undefined;
    cost?: string | null | undefined;
    cost_gt?: string | null | undefined;
    cost_gte?: string | null | undefined;
    cost_in?: (string)[] | null | undefined;
    cost_lt?: string | null | undefined;
    cost_lte?: string | null | undefined;
    cost_not?: string | null | undefined;
    cost_not_in?: (string)[] | null | undefined;
    domain?: string | null | undefined;
    domain_?: Domain_filter | null | undefined;
    domain_contains?: string | null | undefined;
    domain_contains_nocase?: string | null | undefined;
    domain_ends_with?: string | null | undefined;
    domain_ends_with_nocase?: string | null | undefined;
    domain_gt?: string | null | undefined;
    domain_gte?: string | null | undefined;
    domain_in?: (string)[] | null | undefined;
    domain_lt?: string | null | undefined;
    domain_lte?: string | null | undefined;
    domain_not?: string | null | undefined;
    domain_not_contains?: string | null | undefined;
    domain_not_contains_nocase?: string | null | undefined;
    domain_not_ends_with?: string | null | undefined;
    domain_not_ends_with_nocase?: string | null | undefined;
    domain_not_in?: (string)[] | null | undefined;
    domain_not_starts_with?: string | null | undefined;
    domain_not_starts_with_nocase?: string | null | undefined;
    domain_starts_with?: string | null | undefined;
    domain_starts_with_nocase?: string | null | undefined;
    events_?: RegistrationEvent_filter | null | undefined;
    expiryDate?: string | null | undefined;
    expiryDate_gt?: string | null | undefined;
    expiryDate_gte?: string | null | undefined;
    expiryDate_in?: (string)[] | null | undefined;
    expiryDate_lt?: string | null | undefined;
    expiryDate_lte?: string | null | undefined;
    expiryDate_not?: string | null | undefined;
    expiryDate_not_in?: (string)[] | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    labelName?: string | null | undefined;
    labelName_contains?: string | null | undefined;
    labelName_contains_nocase?: string | null | undefined;
    labelName_ends_with?: string | null | undefined;
    labelName_ends_with_nocase?: string | null | undefined;
    labelName_gt?: string | null | undefined;
    labelName_gte?: string | null | undefined;
    labelName_in?: (string)[] | null | undefined;
    labelName_lt?: string | null | undefined;
    labelName_lte?: string | null | undefined;
    labelName_not?: string | null | undefined;
    labelName_not_contains?: string | null | undefined;
    labelName_not_contains_nocase?: string | null | undefined;
    labelName_not_ends_with?: string | null | undefined;
    labelName_not_ends_with_nocase?: string | null | undefined;
    labelName_not_in?: (string)[] | null | undefined;
    labelName_not_starts_with?: string | null | undefined;
    labelName_not_starts_with_nocase?: string | null | undefined;
    labelName_starts_with?: string | null | undefined;
    labelName_starts_with_nocase?: string | null | undefined;
    or?: (Registration_filter | null | undefined)[] | null | undefined;
    registrant?: string | null | undefined;
    registrant_?: Account_filter | null | undefined;
    registrant_contains?: string | null | undefined;
    registrant_contains_nocase?: string | null | undefined;
    registrant_ends_with?: string | null | undefined;
    registrant_ends_with_nocase?: string | null | undefined;
    registrant_gt?: string | null | undefined;
    registrant_gte?: string | null | undefined;
    registrant_in?: (string)[] | null | undefined;
    registrant_lt?: string | null | undefined;
    registrant_lte?: string | null | undefined;
    registrant_not?: string | null | undefined;
    registrant_not_contains?: string | null | undefined;
    registrant_not_contains_nocase?: string | null | undefined;
    registrant_not_ends_with?: string | null | undefined;
    registrant_not_ends_with_nocase?: string | null | undefined;
    registrant_not_in?: (string)[] | null | undefined;
    registrant_not_starts_with?: string | null | undefined;
    registrant_not_starts_with_nocase?: string | null | undefined;
    registrant_starts_with?: string | null | undefined;
    registrant_starts_with_nocase?: string | null | undefined;
    registrationDate?: string | null | undefined;
    registrationDate_gt?: string | null | undefined;
    registrationDate_gte?: string | null | undefined;
    registrationDate_in?: (string)[] | null | undefined;
    registrationDate_lt?: string | null | undefined;
    registrationDate_lte?: string | null | undefined;
    registrationDate_not?: string | null | undefined;
    registrationDate_not_in?: (string)[] | null | undefined;
};

type WrappedDomain_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (WrappedDomain_filter | null | undefined)[] | null | undefined;
    domain?: string | null | undefined;
    domain_?: Domain_filter | null | undefined;
    domain_contains?: string | null | undefined;
    domain_contains_nocase?: string | null | undefined;
    domain_ends_with?: string | null | undefined;
    domain_ends_with_nocase?: string | null | undefined;
    domain_gt?: string | null | undefined;
    domain_gte?: string | null | undefined;
    domain_in?: (string)[] | null | undefined;
    domain_lt?: string | null | undefined;
    domain_lte?: string | null | undefined;
    domain_not?: string | null | undefined;
    domain_not_contains?: string | null | undefined;
    domain_not_contains_nocase?: string | null | undefined;
    domain_not_ends_with?: string | null | undefined;
    domain_not_ends_with_nocase?: string | null | undefined;
    domain_not_in?: (string)[] | null | undefined;
    domain_not_starts_with?: string | null | undefined;
    domain_not_starts_with_nocase?: string | null | undefined;
    domain_starts_with?: string | null | undefined;
    domain_starts_with_nocase?: string | null | undefined;
    expiryDate?: string | null | undefined;
    expiryDate_gt?: string | null | undefined;
    expiryDate_gte?: string | null | undefined;
    expiryDate_in?: (string)[] | null | undefined;
    expiryDate_lt?: string | null | undefined;
    expiryDate_lte?: string | null | undefined;
    expiryDate_not?: string | null | undefined;
    expiryDate_not_in?: (string)[] | null | undefined;
    fuses?: string | null | undefined;
    fuses_gt?: string | null | undefined;
    fuses_gte?: string | null | undefined;
    fuses_in?: (string)[] | null | undefined;
    fuses_lt?: string | null | undefined;
    fuses_lte?: string | null | undefined;
    fuses_not?: string | null | undefined;
    fuses_not_in?: (string)[] | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    labelName?: string | null | undefined;
    labelName_contains?: string | null | undefined;
    labelName_contains_nocase?: string | null | undefined;
    labelName_ends_with?: string | null | undefined;
    labelName_ends_with_nocase?: string | null | undefined;
    labelName_gt?: string | null | undefined;
    labelName_gte?: string | null | undefined;
    labelName_in?: (string)[] | null | undefined;
    labelName_lt?: string | null | undefined;
    labelName_lte?: string | null | undefined;
    labelName_not?: string | null | undefined;
    labelName_not_contains?: string | null | undefined;
    labelName_not_contains_nocase?: string | null | undefined;
    labelName_not_ends_with?: string | null | undefined;
    labelName_not_ends_with_nocase?: string | null | undefined;
    labelName_not_in?: (string)[] | null | undefined;
    labelName_not_starts_with?: string | null | undefined;
    labelName_not_starts_with_nocase?: string | null | undefined;
    labelName_starts_with?: string | null | undefined;
    labelName_starts_with_nocase?: string | null | undefined;
    or?: (WrappedDomain_filter | null | undefined)[] | null | undefined;
    owner?: string | null | undefined;
    owner_?: Account_filter | null | undefined;
    owner_contains?: string | null | undefined;
    owner_contains_nocase?: string | null | undefined;
    owner_ends_with?: string | null | undefined;
    owner_ends_with_nocase?: string | null | undefined;
    owner_gt?: string | null | undefined;
    owner_gte?: string | null | undefined;
    owner_in?: (string)[] | null | undefined;
    owner_lt?: string | null | undefined;
    owner_lte?: string | null | undefined;
    owner_not?: string | null | undefined;
    owner_not_contains?: string | null | undefined;
    owner_not_contains_nocase?: string | null | undefined;
    owner_not_ends_with?: string | null | undefined;
    owner_not_ends_with_nocase?: string | null | undefined;
    owner_not_in?: (string)[] | null | undefined;
    owner_not_starts_with?: string | null | undefined;
    owner_not_starts_with_nocase?: string | null | undefined;
    owner_starts_with?: string | null | undefined;
    owner_starts_with_nocase?: string | null | undefined;
};

type Account_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (Account_filter | null | undefined)[] | null | undefined;
    domains_?: Domain_filter | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    or?: (Account_filter | null | undefined)[] | null | undefined;
    registrations_?: Registration_filter | null | undefined;
    wrappedDomains_?: WrappedDomain_filter | null | undefined;
};

type ResolverEvent_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (ResolverEvent_filter | null | undefined)[] | null | undefined;
    blockNumber?: number | null | undefined;
    blockNumber_gt?: number | null | undefined;
    blockNumber_gte?: number | null | undefined;
    blockNumber_in?: (number)[] | null | undefined;
    blockNumber_lt?: number | null | undefined;
    blockNumber_lte?: number | null | undefined;
    blockNumber_not?: number | null | undefined;
    blockNumber_not_in?: (number)[] | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    or?: (ResolverEvent_filter | null | undefined)[] | null | undefined;
    resolver?: string | null | undefined;
    resolver_?: Resolver_filter | null | undefined;
    resolver_contains?: string | null | undefined;
    resolver_contains_nocase?: string | null | undefined;
    resolver_ends_with?: string | null | undefined;
    resolver_ends_with_nocase?: string | null | undefined;
    resolver_gt?: string | null | undefined;
    resolver_gte?: string | null | undefined;
    resolver_in?: (string)[] | null | undefined;
    resolver_lt?: string | null | undefined;
    resolver_lte?: string | null | undefined;
    resolver_not?: string | null | undefined;
    resolver_not_contains?: string | null | undefined;
    resolver_not_contains_nocase?: string | null | undefined;
    resolver_not_ends_with?: string | null | undefined;
    resolver_not_ends_with_nocase?: string | null | undefined;
    resolver_not_in?: (string)[] | null | undefined;
    resolver_not_starts_with?: string | null | undefined;
    resolver_not_starts_with_nocase?: string | null | undefined;
    resolver_starts_with?: string | null | undefined;
    resolver_starts_with_nocase?: string | null | undefined;
    transactionID?: string | null | undefined;
    transactionID_contains?: string | null | undefined;
    transactionID_gt?: string | null | undefined;
    transactionID_gte?: string | null | undefined;
    transactionID_in?: (string)[] | null | undefined;
    transactionID_lt?: string | null | undefined;
    transactionID_lte?: string | null | undefined;
    transactionID_not?: string | null | undefined;
    transactionID_not_contains?: string | null | undefined;
    transactionID_not_in?: (string)[] | null | undefined;
};

type Resolver_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    addr?: string | null | undefined;
    addr_?: Account_filter | null | undefined;
    addr_contains?: string | null | undefined;
    addr_contains_nocase?: string | null | undefined;
    addr_ends_with?: string | null | undefined;
    addr_ends_with_nocase?: string | null | undefined;
    addr_gt?: string | null | undefined;
    addr_gte?: string | null | undefined;
    addr_in?: (string)[] | null | undefined;
    addr_lt?: string | null | undefined;
    addr_lte?: string | null | undefined;
    addr_not?: string | null | undefined;
    addr_not_contains?: string | null | undefined;
    addr_not_contains_nocase?: string | null | undefined;
    addr_not_ends_with?: string | null | undefined;
    addr_not_ends_with_nocase?: string | null | undefined;
    addr_not_in?: (string)[] | null | undefined;
    addr_not_starts_with?: string | null | undefined;
    addr_not_starts_with_nocase?: string | null | undefined;
    addr_starts_with?: string | null | undefined;
    addr_starts_with_nocase?: string | null | undefined;
    address?: string | null | undefined;
    address_contains?: string | null | undefined;
    address_gt?: string | null | undefined;
    address_gte?: string | null | undefined;
    address_in?: (string)[] | null | undefined;
    address_lt?: string | null | undefined;
    address_lte?: string | null | undefined;
    address_not?: string | null | undefined;
    address_not_contains?: string | null | undefined;
    address_not_in?: (string)[] | null | undefined;
    and?: (Resolver_filter | null | undefined)[] | null | undefined;
    coinTypes?: (string)[] | null | undefined;
    coinTypes_contains?: (string)[] | null | undefined;
    coinTypes_contains_nocase?: (string)[] | null | undefined;
    coinTypes_not?: (string)[] | null | undefined;
    coinTypes_not_contains?: (string)[] | null | undefined;
    coinTypes_not_contains_nocase?: (string)[] | null | undefined;
    contentHash?: string | null | undefined;
    contentHash_contains?: string | null | undefined;
    contentHash_gt?: string | null | undefined;
    contentHash_gte?: string | null | undefined;
    contentHash_in?: (string)[] | null | undefined;
    contentHash_lt?: string | null | undefined;
    contentHash_lte?: string | null | undefined;
    contentHash_not?: string | null | undefined;
    contentHash_not_contains?: string | null | undefined;
    contentHash_not_in?: (string)[] | null | undefined;
    domain?: string | null | undefined;
    domain_?: Domain_filter | null | undefined;
    domain_contains?: string | null | undefined;
    domain_contains_nocase?: string | null | undefined;
    domain_ends_with?: string | null | undefined;
    domain_ends_with_nocase?: string | null | undefined;
    domain_gt?: string | null | undefined;
    domain_gte?: string | null | undefined;
    domain_in?: (string)[] | null | undefined;
    domain_lt?: string | null | undefined;
    domain_lte?: string | null | undefined;
    domain_not?: string | null | undefined;
    domain_not_contains?: string | null | undefined;
    domain_not_contains_nocase?: string | null | undefined;
    domain_not_ends_with?: string | null | undefined;
    domain_not_ends_with_nocase?: string | null | undefined;
    domain_not_in?: (string)[] | null | undefined;
    domain_not_starts_with?: string | null | undefined;
    domain_not_starts_with_nocase?: string | null | undefined;
    domain_starts_with?: string | null | undefined;
    domain_starts_with_nocase?: string | null | undefined;
    events_?: ResolverEvent_filter | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    or?: (Resolver_filter | null | undefined)[] | null | undefined;
    texts?: (string)[] | null | undefined;
    texts_contains?: (string)[] | null | undefined;
    texts_contains_nocase?: (string)[] | null | undefined;
    texts_not?: (string)[] | null | undefined;
    texts_not_contains?: (string)[] | null | undefined;
    texts_not_contains_nocase?: (string)[] | null | undefined;
};

type Domain_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (Domain_filter | null | undefined)[] | null | undefined;
    createdAt?: string | null | undefined;
    createdAt_gt?: string | null | undefined;
    createdAt_gte?: string | null | undefined;
    createdAt_in?: (string)[] | null | undefined;
    createdAt_lt?: string | null | undefined;
    createdAt_lte?: string | null | undefined;
    createdAt_not?: string | null | undefined;
    createdAt_not_in?: (string)[] | null | undefined;
    events_?: DomainEvent_filter | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    isMigrated?: boolean | null | undefined;
    isMigrated_in?: (boolean)[] | null | undefined;
    isMigrated_not?: boolean | null | undefined;
    isMigrated_not_in?: (boolean)[] | null | undefined;
    labelName?: string | null | undefined;
    labelName_contains?: string | null | undefined;
    labelName_contains_nocase?: string | null | undefined;
    labelName_ends_with?: string | null | undefined;
    labelName_ends_with_nocase?: string | null | undefined;
    labelName_gt?: string | null | undefined;
    labelName_gte?: string | null | undefined;
    labelName_in?: (string)[] | null | undefined;
    labelName_lt?: string | null | undefined;
    labelName_lte?: string | null | undefined;
    labelName_not?: string | null | undefined;
    labelName_not_contains?: string | null | undefined;
    labelName_not_contains_nocase?: string | null | undefined;
    labelName_not_ends_with?: string | null | undefined;
    labelName_not_ends_with_nocase?: string | null | undefined;
    labelName_not_in?: (string)[] | null | undefined;
    labelName_not_starts_with?: string | null | undefined;
    labelName_not_starts_with_nocase?: string | null | undefined;
    labelName_starts_with?: string | null | undefined;
    labelName_starts_with_nocase?: string | null | undefined;
    labelhash?: string | null | undefined;
    labelhash_contains?: string | null | undefined;
    labelhash_gt?: string | null | undefined;
    labelhash_gte?: string | null | undefined;
    labelhash_in?: (string)[] | null | undefined;
    labelhash_lt?: string | null | undefined;
    labelhash_lte?: string | null | undefined;
    labelhash_not?: string | null | undefined;
    labelhash_not_contains?: string | null | undefined;
    labelhash_not_in?: (string)[] | null | undefined;
    name?: string | null | undefined;
    name_contains?: string | null | undefined;
    name_contains_nocase?: string | null | undefined;
    name_ends_with?: string | null | undefined;
    name_ends_with_nocase?: string | null | undefined;
    name_gt?: string | null | undefined;
    name_gte?: string | null | undefined;
    name_in?: (string)[] | null | undefined;
    name_lt?: string | null | undefined;
    name_lte?: string | null | undefined;
    name_not?: string | null | undefined;
    name_not_contains?: string | null | undefined;
    name_not_contains_nocase?: string | null | undefined;
    name_not_ends_with?: string | null | undefined;
    name_not_ends_with_nocase?: string | null | undefined;
    name_not_in?: (string)[] | null | undefined;
    name_not_starts_with?: string | null | undefined;
    name_not_starts_with_nocase?: string | null | undefined;
    name_starts_with?: string | null | undefined;
    name_starts_with_nocase?: string | null | undefined;
    or?: (Domain_filter | null | undefined)[] | null | undefined;
    owner?: string | null | undefined;
    owner_?: Account_filter | null | undefined;
    owner_contains?: string | null | undefined;
    owner_contains_nocase?: string | null | undefined;
    owner_ends_with?: string | null | undefined;
    owner_ends_with_nocase?: string | null | undefined;
    owner_gt?: string | null | undefined;
    owner_gte?: string | null | undefined;
    owner_in?: (string)[] | null | undefined;
    owner_lt?: string | null | undefined;
    owner_lte?: string | null | undefined;
    owner_not?: string | null | undefined;
    owner_not_contains?: string | null | undefined;
    owner_not_contains_nocase?: string | null | undefined;
    owner_not_ends_with?: string | null | undefined;
    owner_not_ends_with_nocase?: string | null | undefined;
    owner_not_in?: (string)[] | null | undefined;
    owner_not_starts_with?: string | null | undefined;
    owner_not_starts_with_nocase?: string | null | undefined;
    owner_starts_with?: string | null | undefined;
    owner_starts_with_nocase?: string | null | undefined;
    parent?: string | null | undefined;
    parent_?: Domain_filter | null | undefined;
    parent_contains?: string | null | undefined;
    parent_contains_nocase?: string | null | undefined;
    parent_ends_with?: string | null | undefined;
    parent_ends_with_nocase?: string | null | undefined;
    parent_gt?: string | null | undefined;
    parent_gte?: string | null | undefined;
    parent_in?: (string)[] | null | undefined;
    parent_lt?: string | null | undefined;
    parent_lte?: string | null | undefined;
    parent_not?: string | null | undefined;
    parent_not_contains?: string | null | undefined;
    parent_not_contains_nocase?: string | null | undefined;
    parent_not_ends_with?: string | null | undefined;
    parent_not_ends_with_nocase?: string | null | undefined;
    parent_not_in?: (string)[] | null | undefined;
    parent_not_starts_with?: string | null | undefined;
    parent_not_starts_with_nocase?: string | null | undefined;
    parent_starts_with?: string | null | undefined;
    parent_starts_with_nocase?: string | null | undefined;
    registration_?: Registration_filter | null | undefined;
    resolvedAddress?: string | null | undefined;
    resolvedAddress_?: Account_filter | null | undefined;
    resolvedAddress_contains?: string | null | undefined;
    resolvedAddress_contains_nocase?: string | null | undefined;
    resolvedAddress_ends_with?: string | null | undefined;
    resolvedAddress_ends_with_nocase?: string | null | undefined;
    resolvedAddress_gt?: string | null | undefined;
    resolvedAddress_gte?: string | null | undefined;
    resolvedAddress_in?: (string)[] | null | undefined;
    resolvedAddress_lt?: string | null | undefined;
    resolvedAddress_lte?: string | null | undefined;
    resolvedAddress_not?: string | null | undefined;
    resolvedAddress_not_contains?: string | null | undefined;
    resolvedAddress_not_contains_nocase?: string | null | undefined;
    resolvedAddress_not_ends_with?: string | null | undefined;
    resolvedAddress_not_ends_with_nocase?: string | null | undefined;
    resolvedAddress_not_in?: (string)[] | null | undefined;
    resolvedAddress_not_starts_with?: string | null | undefined;
    resolvedAddress_not_starts_with_nocase?: string | null | undefined;
    resolvedAddress_starts_with?: string | null | undefined;
    resolvedAddress_starts_with_nocase?: string | null | undefined;
    resolver?: string | null | undefined;
    resolver_?: Resolver_filter | null | undefined;
    resolver_contains?: string | null | undefined;
    resolver_contains_nocase?: string | null | undefined;
    resolver_ends_with?: string | null | undefined;
    resolver_ends_with_nocase?: string | null | undefined;
    resolver_gt?: string | null | undefined;
    resolver_gte?: string | null | undefined;
    resolver_in?: (string)[] | null | undefined;
    resolver_lt?: string | null | undefined;
    resolver_lte?: string | null | undefined;
    resolver_not?: string | null | undefined;
    resolver_not_contains?: string | null | undefined;
    resolver_not_contains_nocase?: string | null | undefined;
    resolver_not_ends_with?: string | null | undefined;
    resolver_not_ends_with_nocase?: string | null | undefined;
    resolver_not_in?: (string)[] | null | undefined;
    resolver_not_starts_with?: string | null | undefined;
    resolver_not_starts_with_nocase?: string | null | undefined;
    resolver_starts_with?: string | null | undefined;
    resolver_starts_with_nocase?: string | null | undefined;
    subdomainCount?: number | null | undefined;
    subdomainCount_gt?: number | null | undefined;
    subdomainCount_gte?: number | null | undefined;
    subdomainCount_in?: (number)[] | null | undefined;
    subdomainCount_lt?: number | null | undefined;
    subdomainCount_lte?: number | null | undefined;
    subdomainCount_not?: number | null | undefined;
    subdomainCount_not_in?: (number)[] | null | undefined;
    subdomains_?: Domain_filter | null | undefined;
    ttl?: string | null | undefined;
    ttl_gt?: string | null | undefined;
    ttl_gte?: string | null | undefined;
    ttl_in?: (string)[] | null | undefined;
    ttl_lt?: string | null | undefined;
    ttl_lte?: string | null | undefined;
    ttl_not?: string | null | undefined;
    ttl_not_in?: (string)[] | null | undefined;
    wrappedDomain_?: WrappedDomain_filter | null | undefined;
};

type Block_height = {
    hash?: string | null | undefined;
    number?: number | null | undefined;
    number_gte?: number | null | undefined;
};

type AbiChanged_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (AbiChanged_filter | null | undefined)[] | null | undefined;
    blockNumber?: number | null | undefined;
    blockNumber_gt?: number | null | undefined;
    blockNumber_gte?: number | null | undefined;
    blockNumber_in?: (number)[] | null | undefined;
    blockNumber_lt?: number | null | undefined;
    blockNumber_lte?: number | null | undefined;
    blockNumber_not?: number | null | undefined;
    blockNumber_not_in?: (number)[] | null | undefined;
    contentType?: string | null | undefined;
    contentType_gt?: string | null | undefined;
    contentType_gte?: string | null | undefined;
    contentType_in?: (string)[] | null | undefined;
    contentType_lt?: string | null | undefined;
    contentType_lte?: string | null | undefined;
    contentType_not?: string | null | undefined;
    contentType_not_in?: (string)[] | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    or?: (AbiChanged_filter | null | undefined)[] | null | undefined;
    resolver?: string | null | undefined;
    resolver_?: Resolver_filter | null | undefined;
    resolver_contains?: string | null | undefined;
    resolver_contains_nocase?: string | null | undefined;
    resolver_ends_with?: string | null | undefined;
    resolver_ends_with_nocase?: string | null | undefined;
    resolver_gt?: string | null | undefined;
    resolver_gte?: string | null | undefined;
    resolver_in?: (string)[] | null | undefined;
    resolver_lt?: string | null | undefined;
    resolver_lte?: string | null | undefined;
    resolver_not?: string | null | undefined;
    resolver_not_contains?: string | null | undefined;
    resolver_not_contains_nocase?: string | null | undefined;
    resolver_not_ends_with?: string | null | undefined;
    resolver_not_ends_with_nocase?: string | null | undefined;
    resolver_not_in?: (string)[] | null | undefined;
    resolver_not_starts_with?: string | null | undefined;
    resolver_not_starts_with_nocase?: string | null | undefined;
    resolver_starts_with?: string | null | undefined;
    resolver_starts_with_nocase?: string | null | undefined;
    transactionID?: string | null | undefined;
    transactionID_contains?: string | null | undefined;
    transactionID_gt?: string | null | undefined;
    transactionID_gte?: string | null | undefined;
    transactionID_in?: (string)[] | null | undefined;
    transactionID_lt?: string | null | undefined;
    transactionID_lte?: string | null | undefined;
    transactionID_not?: string | null | undefined;
    transactionID_not_contains?: string | null | undefined;
    transactionID_not_in?: (string)[] | null | undefined;
};

type AddrChanged_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    addr?: string | null | undefined;
    addr_?: Account_filter | null | undefined;
    addr_contains?: string | null | undefined;
    addr_contains_nocase?: string | null | undefined;
    addr_ends_with?: string | null | undefined;
    addr_ends_with_nocase?: string | null | undefined;
    addr_gt?: string | null | undefined;
    addr_gte?: string | null | undefined;
    addr_in?: (string)[] | null | undefined;
    addr_lt?: string | null | undefined;
    addr_lte?: string | null | undefined;
    addr_not?: string | null | undefined;
    addr_not_contains?: string | null | undefined;
    addr_not_contains_nocase?: string | null | undefined;
    addr_not_ends_with?: string | null | undefined;
    addr_not_ends_with_nocase?: string | null | undefined;
    addr_not_in?: (string)[] | null | undefined;
    addr_not_starts_with?: string | null | undefined;
    addr_not_starts_with_nocase?: string | null | undefined;
    addr_starts_with?: string | null | undefined;
    addr_starts_with_nocase?: string | null | undefined;
    and?: (AddrChanged_filter | null | undefined)[] | null | undefined;
    blockNumber?: number | null | undefined;
    blockNumber_gt?: number | null | undefined;
    blockNumber_gte?: number | null | undefined;
    blockNumber_in?: (number)[] | null | undefined;
    blockNumber_lt?: number | null | undefined;
    blockNumber_lte?: number | null | undefined;
    blockNumber_not?: number | null | undefined;
    blockNumber_not_in?: (number)[] | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    or?: (AddrChanged_filter | null | undefined)[] | null | undefined;
    resolver?: string | null | undefined;
    resolver_?: Resolver_filter | null | undefined;
    resolver_contains?: string | null | undefined;
    resolver_contains_nocase?: string | null | undefined;
    resolver_ends_with?: string | null | undefined;
    resolver_ends_with_nocase?: string | null | undefined;
    resolver_gt?: string | null | undefined;
    resolver_gte?: string | null | undefined;
    resolver_in?: (string)[] | null | undefined;
    resolver_lt?: string | null | undefined;
    resolver_lte?: string | null | undefined;
    resolver_not?: string | null | undefined;
    resolver_not_contains?: string | null | undefined;
    resolver_not_contains_nocase?: string | null | undefined;
    resolver_not_ends_with?: string | null | undefined;
    resolver_not_ends_with_nocase?: string | null | undefined;
    resolver_not_in?: (string)[] | null | undefined;
    resolver_not_starts_with?: string | null | undefined;
    resolver_not_starts_with_nocase?: string | null | undefined;
    resolver_starts_with?: string | null | undefined;
    resolver_starts_with_nocase?: string | null | undefined;
    transactionID?: string | null | undefined;
    transactionID_contains?: string | null | undefined;
    transactionID_gt?: string | null | undefined;
    transactionID_gte?: string | null | undefined;
    transactionID_in?: (string)[] | null | undefined;
    transactionID_lt?: string | null | undefined;
    transactionID_lte?: string | null | undefined;
    transactionID_not?: string | null | undefined;
    transactionID_not_contains?: string | null | undefined;
    transactionID_not_in?: (string)[] | null | undefined;
};

type AuthorisationChanged_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (AuthorisationChanged_filter | null | undefined)[] | null | undefined;
    blockNumber?: number | null | undefined;
    blockNumber_gt?: number | null | undefined;
    blockNumber_gte?: number | null | undefined;
    blockNumber_in?: (number)[] | null | undefined;
    blockNumber_lt?: number | null | undefined;
    blockNumber_lte?: number | null | undefined;
    blockNumber_not?: number | null | undefined;
    blockNumber_not_in?: (number)[] | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    isAuthorized?: boolean | null | undefined;
    isAuthorized_in?: (boolean)[] | null | undefined;
    isAuthorized_not?: boolean | null | undefined;
    isAuthorized_not_in?: (boolean)[] | null | undefined;
    or?: (AuthorisationChanged_filter | null | undefined)[] | null | undefined;
    owner?: string | null | undefined;
    owner_contains?: string | null | undefined;
    owner_gt?: string | null | undefined;
    owner_gte?: string | null | undefined;
    owner_in?: (string)[] | null | undefined;
    owner_lt?: string | null | undefined;
    owner_lte?: string | null | undefined;
    owner_not?: string | null | undefined;
    owner_not_contains?: string | null | undefined;
    owner_not_in?: (string)[] | null | undefined;
    resolver?: string | null | undefined;
    resolver_?: Resolver_filter | null | undefined;
    resolver_contains?: string | null | undefined;
    resolver_contains_nocase?: string | null | undefined;
    resolver_ends_with?: string | null | undefined;
    resolver_ends_with_nocase?: string | null | undefined;
    resolver_gt?: string | null | undefined;
    resolver_gte?: string | null | undefined;
    resolver_in?: (string)[] | null | undefined;
    resolver_lt?: string | null | undefined;
    resolver_lte?: string | null | undefined;
    resolver_not?: string | null | undefined;
    resolver_not_contains?: string | null | undefined;
    resolver_not_contains_nocase?: string | null | undefined;
    resolver_not_ends_with?: string | null | undefined;
    resolver_not_ends_with_nocase?: string | null | undefined;
    resolver_not_in?: (string)[] | null | undefined;
    resolver_not_starts_with?: string | null | undefined;
    resolver_not_starts_with_nocase?: string | null | undefined;
    resolver_starts_with?: string | null | undefined;
    resolver_starts_with_nocase?: string | null | undefined;
    target?: string | null | undefined;
    target_contains?: string | null | undefined;
    target_gt?: string | null | undefined;
    target_gte?: string | null | undefined;
    target_in?: (string)[] | null | undefined;
    target_lt?: string | null | undefined;
    target_lte?: string | null | undefined;
    target_not?: string | null | undefined;
    target_not_contains?: string | null | undefined;
    target_not_in?: (string)[] | null | undefined;
    transactionID?: string | null | undefined;
    transactionID_contains?: string | null | undefined;
    transactionID_gt?: string | null | undefined;
    transactionID_gte?: string | null | undefined;
    transactionID_in?: (string)[] | null | undefined;
    transactionID_lt?: string | null | undefined;
    transactionID_lte?: string | null | undefined;
    transactionID_not?: string | null | undefined;
    transactionID_not_contains?: string | null | undefined;
    transactionID_not_in?: (string)[] | null | undefined;
};

type ContenthashChanged_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (ContenthashChanged_filter | null | undefined)[] | null | undefined;
    blockNumber?: number | null | undefined;
    blockNumber_gt?: number | null | undefined;
    blockNumber_gte?: number | null | undefined;
    blockNumber_in?: (number)[] | null | undefined;
    blockNumber_lt?: number | null | undefined;
    blockNumber_lte?: number | null | undefined;
    blockNumber_not?: number | null | undefined;
    blockNumber_not_in?: (number)[] | null | undefined;
    hash?: string | null | undefined;
    hash_contains?: string | null | undefined;
    hash_gt?: string | null | undefined;
    hash_gte?: string | null | undefined;
    hash_in?: (string)[] | null | undefined;
    hash_lt?: string | null | undefined;
    hash_lte?: string | null | undefined;
    hash_not?: string | null | undefined;
    hash_not_contains?: string | null | undefined;
    hash_not_in?: (string)[] | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    or?: (ContenthashChanged_filter | null | undefined)[] | null | undefined;
    resolver?: string | null | undefined;
    resolver_?: Resolver_filter | null | undefined;
    resolver_contains?: string | null | undefined;
    resolver_contains_nocase?: string | null | undefined;
    resolver_ends_with?: string | null | undefined;
    resolver_ends_with_nocase?: string | null | undefined;
    resolver_gt?: string | null | undefined;
    resolver_gte?: string | null | undefined;
    resolver_in?: (string)[] | null | undefined;
    resolver_lt?: string | null | undefined;
    resolver_lte?: string | null | undefined;
    resolver_not?: string | null | undefined;
    resolver_not_contains?: string | null | undefined;
    resolver_not_contains_nocase?: string | null | undefined;
    resolver_not_ends_with?: string | null | undefined;
    resolver_not_ends_with_nocase?: string | null | undefined;
    resolver_not_in?: (string)[] | null | undefined;
    resolver_not_starts_with?: string | null | undefined;
    resolver_not_starts_with_nocase?: string | null | undefined;
    resolver_starts_with?: string | null | undefined;
    resolver_starts_with_nocase?: string | null | undefined;
    transactionID?: string | null | undefined;
    transactionID_contains?: string | null | undefined;
    transactionID_gt?: string | null | undefined;
    transactionID_gte?: string | null | undefined;
    transactionID_in?: (string)[] | null | undefined;
    transactionID_lt?: string | null | undefined;
    transactionID_lte?: string | null | undefined;
    transactionID_not?: string | null | undefined;
    transactionID_not_contains?: string | null | undefined;
    transactionID_not_in?: (string)[] | null | undefined;
};

type FusesSet_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (FusesSet_filter | null | undefined)[] | null | undefined;
    blockNumber?: number | null | undefined;
    blockNumber_gt?: number | null | undefined;
    blockNumber_gte?: number | null | undefined;
    blockNumber_in?: (number)[] | null | undefined;
    blockNumber_lt?: number | null | undefined;
    blockNumber_lte?: number | null | undefined;
    blockNumber_not?: number | null | undefined;
    blockNumber_not_in?: (number)[] | null | undefined;
    domain?: string | null | undefined;
    domain_?: Domain_filter | null | undefined;
    domain_contains?: string | null | undefined;
    domain_contains_nocase?: string | null | undefined;
    domain_ends_with?: string | null | undefined;
    domain_ends_with_nocase?: string | null | undefined;
    domain_gt?: string | null | undefined;
    domain_gte?: string | null | undefined;
    domain_in?: (string)[] | null | undefined;
    domain_lt?: string | null | undefined;
    domain_lte?: string | null | undefined;
    domain_not?: string | null | undefined;
    domain_not_contains?: string | null | undefined;
    domain_not_contains_nocase?: string | null | undefined;
    domain_not_ends_with?: string | null | undefined;
    domain_not_ends_with_nocase?: string | null | undefined;
    domain_not_in?: (string)[] | null | undefined;
    domain_not_starts_with?: string | null | undefined;
    domain_not_starts_with_nocase?: string | null | undefined;
    domain_starts_with?: string | null | undefined;
    domain_starts_with_nocase?: string | null | undefined;
    expiry?: string | null | undefined;
    expiry_gt?: string | null | undefined;
    expiry_gte?: string | null | undefined;
    expiry_in?: (string)[] | null | undefined;
    expiry_lt?: string | null | undefined;
    expiry_lte?: string | null | undefined;
    expiry_not?: string | null | undefined;
    expiry_not_in?: (string)[] | null | undefined;
    fuses?: string | null | undefined;
    fuses_gt?: string | null | undefined;
    fuses_gte?: string | null | undefined;
    fuses_in?: (string)[] | null | undefined;
    fuses_lt?: string | null | undefined;
    fuses_lte?: string | null | undefined;
    fuses_not?: string | null | undefined;
    fuses_not_in?: (string)[] | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    or?: (FusesSet_filter | null | undefined)[] | null | undefined;
    transactionID?: string | null | undefined;
    transactionID_contains?: string | null | undefined;
    transactionID_gt?: string | null | undefined;
    transactionID_gte?: string | null | undefined;
    transactionID_in?: (string)[] | null | undefined;
    transactionID_lt?: string | null | undefined;
    transactionID_lte?: string | null | undefined;
    transactionID_not?: string | null | undefined;
    transactionID_not_contains?: string | null | undefined;
    transactionID_not_in?: (string)[] | null | undefined;
};

type InterfaceChanged_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (InterfaceChanged_filter | null | undefined)[] | null | undefined;
    blockNumber?: number | null | undefined;
    blockNumber_gt?: number | null | undefined;
    blockNumber_gte?: number | null | undefined;
    blockNumber_in?: (number)[] | null | undefined;
    blockNumber_lt?: number | null | undefined;
    blockNumber_lte?: number | null | undefined;
    blockNumber_not?: number | null | undefined;
    blockNumber_not_in?: (number)[] | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    implementer?: string | null | undefined;
    implementer_contains?: string | null | undefined;
    implementer_gt?: string | null | undefined;
    implementer_gte?: string | null | undefined;
    implementer_in?: (string)[] | null | undefined;
    implementer_lt?: string | null | undefined;
    implementer_lte?: string | null | undefined;
    implementer_not?: string | null | undefined;
    implementer_not_contains?: string | null | undefined;
    implementer_not_in?: (string)[] | null | undefined;
    interfaceID?: string | null | undefined;
    interfaceID_contains?: string | null | undefined;
    interfaceID_gt?: string | null | undefined;
    interfaceID_gte?: string | null | undefined;
    interfaceID_in?: (string)[] | null | undefined;
    interfaceID_lt?: string | null | undefined;
    interfaceID_lte?: string | null | undefined;
    interfaceID_not?: string | null | undefined;
    interfaceID_not_contains?: string | null | undefined;
    interfaceID_not_in?: (string)[] | null | undefined;
    or?: (InterfaceChanged_filter | null | undefined)[] | null | undefined;
    resolver?: string | null | undefined;
    resolver_?: Resolver_filter | null | undefined;
    resolver_contains?: string | null | undefined;
    resolver_contains_nocase?: string | null | undefined;
    resolver_ends_with?: string | null | undefined;
    resolver_ends_with_nocase?: string | null | undefined;
    resolver_gt?: string | null | undefined;
    resolver_gte?: string | null | undefined;
    resolver_in?: (string)[] | null | undefined;
    resolver_lt?: string | null | undefined;
    resolver_lte?: string | null | undefined;
    resolver_not?: string | null | undefined;
    resolver_not_contains?: string | null | undefined;
    resolver_not_contains_nocase?: string | null | undefined;
    resolver_not_ends_with?: string | null | undefined;
    resolver_not_ends_with_nocase?: string | null | undefined;
    resolver_not_in?: (string)[] | null | undefined;
    resolver_not_starts_with?: string | null | undefined;
    resolver_not_starts_with_nocase?: string | null | undefined;
    resolver_starts_with?: string | null | undefined;
    resolver_starts_with_nocase?: string | null | undefined;
    transactionID?: string | null | undefined;
    transactionID_contains?: string | null | undefined;
    transactionID_gt?: string | null | undefined;
    transactionID_gte?: string | null | undefined;
    transactionID_in?: (string)[] | null | undefined;
    transactionID_lt?: string | null | undefined;
    transactionID_lte?: string | null | undefined;
    transactionID_not?: string | null | undefined;
    transactionID_not_contains?: string | null | undefined;
    transactionID_not_in?: (string)[] | null | undefined;
};

type MulticoinAddrChanged_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    addr?: string | null | undefined;
    addr_contains?: string | null | undefined;
    addr_gt?: string | null | undefined;
    addr_gte?: string | null | undefined;
    addr_in?: (string)[] | null | undefined;
    addr_lt?: string | null | undefined;
    addr_lte?: string | null | undefined;
    addr_not?: string | null | undefined;
    addr_not_contains?: string | null | undefined;
    addr_not_in?: (string)[] | null | undefined;
    and?: (MulticoinAddrChanged_filter | null | undefined)[] | null | undefined;
    blockNumber?: number | null | undefined;
    blockNumber_gt?: number | null | undefined;
    blockNumber_gte?: number | null | undefined;
    blockNumber_in?: (number)[] | null | undefined;
    blockNumber_lt?: number | null | undefined;
    blockNumber_lte?: number | null | undefined;
    blockNumber_not?: number | null | undefined;
    blockNumber_not_in?: (number)[] | null | undefined;
    coinType?: string | null | undefined;
    coinType_gt?: string | null | undefined;
    coinType_gte?: string | null | undefined;
    coinType_in?: (string)[] | null | undefined;
    coinType_lt?: string | null | undefined;
    coinType_lte?: string | null | undefined;
    coinType_not?: string | null | undefined;
    coinType_not_in?: (string)[] | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    or?: (MulticoinAddrChanged_filter | null | undefined)[] | null | undefined;
    resolver?: string | null | undefined;
    resolver_?: Resolver_filter | null | undefined;
    resolver_contains?: string | null | undefined;
    resolver_contains_nocase?: string | null | undefined;
    resolver_ends_with?: string | null | undefined;
    resolver_ends_with_nocase?: string | null | undefined;
    resolver_gt?: string | null | undefined;
    resolver_gte?: string | null | undefined;
    resolver_in?: (string)[] | null | undefined;
    resolver_lt?: string | null | undefined;
    resolver_lte?: string | null | undefined;
    resolver_not?: string | null | undefined;
    resolver_not_contains?: string | null | undefined;
    resolver_not_contains_nocase?: string | null | undefined;
    resolver_not_ends_with?: string | null | undefined;
    resolver_not_ends_with_nocase?: string | null | undefined;
    resolver_not_in?: (string)[] | null | undefined;
    resolver_not_starts_with?: string | null | undefined;
    resolver_not_starts_with_nocase?: string | null | undefined;
    resolver_starts_with?: string | null | undefined;
    resolver_starts_with_nocase?: string | null | undefined;
    transactionID?: string | null | undefined;
    transactionID_contains?: string | null | undefined;
    transactionID_gt?: string | null | undefined;
    transactionID_gte?: string | null | undefined;
    transactionID_in?: (string)[] | null | undefined;
    transactionID_lt?: string | null | undefined;
    transactionID_lte?: string | null | undefined;
    transactionID_not?: string | null | undefined;
    transactionID_not_contains?: string | null | undefined;
    transactionID_not_in?: (string)[] | null | undefined;
};

type NameChanged_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (NameChanged_filter | null | undefined)[] | null | undefined;
    blockNumber?: number | null | undefined;
    blockNumber_gt?: number | null | undefined;
    blockNumber_gte?: number | null | undefined;
    blockNumber_in?: (number)[] | null | undefined;
    blockNumber_lt?: number | null | undefined;
    blockNumber_lte?: number | null | undefined;
    blockNumber_not?: number | null | undefined;
    blockNumber_not_in?: (number)[] | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    name?: string | null | undefined;
    name_contains?: string | null | undefined;
    name_contains_nocase?: string | null | undefined;
    name_ends_with?: string | null | undefined;
    name_ends_with_nocase?: string | null | undefined;
    name_gt?: string | null | undefined;
    name_gte?: string | null | undefined;
    name_in?: (string)[] | null | undefined;
    name_lt?: string | null | undefined;
    name_lte?: string | null | undefined;
    name_not?: string | null | undefined;
    name_not_contains?: string | null | undefined;
    name_not_contains_nocase?: string | null | undefined;
    name_not_ends_with?: string | null | undefined;
    name_not_ends_with_nocase?: string | null | undefined;
    name_not_in?: (string)[] | null | undefined;
    name_not_starts_with?: string | null | undefined;
    name_not_starts_with_nocase?: string | null | undefined;
    name_starts_with?: string | null | undefined;
    name_starts_with_nocase?: string | null | undefined;
    or?: (NameChanged_filter | null | undefined)[] | null | undefined;
    resolver?: string | null | undefined;
    resolver_?: Resolver_filter | null | undefined;
    resolver_contains?: string | null | undefined;
    resolver_contains_nocase?: string | null | undefined;
    resolver_ends_with?: string | null | undefined;
    resolver_ends_with_nocase?: string | null | undefined;
    resolver_gt?: string | null | undefined;
    resolver_gte?: string | null | undefined;
    resolver_in?: (string)[] | null | undefined;
    resolver_lt?: string | null | undefined;
    resolver_lte?: string | null | undefined;
    resolver_not?: string | null | undefined;
    resolver_not_contains?: string | null | undefined;
    resolver_not_contains_nocase?: string | null | undefined;
    resolver_not_ends_with?: string | null | undefined;
    resolver_not_ends_with_nocase?: string | null | undefined;
    resolver_not_in?: (string)[] | null | undefined;
    resolver_not_starts_with?: string | null | undefined;
    resolver_not_starts_with_nocase?: string | null | undefined;
    resolver_starts_with?: string | null | undefined;
    resolver_starts_with_nocase?: string | null | undefined;
    transactionID?: string | null | undefined;
    transactionID_contains?: string | null | undefined;
    transactionID_gt?: string | null | undefined;
    transactionID_gte?: string | null | undefined;
    transactionID_in?: (string)[] | null | undefined;
    transactionID_lt?: string | null | undefined;
    transactionID_lte?: string | null | undefined;
    transactionID_not?: string | null | undefined;
    transactionID_not_contains?: string | null | undefined;
    transactionID_not_in?: (string)[] | null | undefined;
};

type NameRegistered_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (NameRegistered_filter | null | undefined)[] | null | undefined;
    blockNumber?: number | null | undefined;
    blockNumber_gt?: number | null | undefined;
    blockNumber_gte?: number | null | undefined;
    blockNumber_in?: (number)[] | null | undefined;
    blockNumber_lt?: number | null | undefined;
    blockNumber_lte?: number | null | undefined;
    blockNumber_not?: number | null | undefined;
    blockNumber_not_in?: (number)[] | null | undefined;
    expiryDate?: string | null | undefined;
    expiryDate_gt?: string | null | undefined;
    expiryDate_gte?: string | null | undefined;
    expiryDate_in?: (string)[] | null | undefined;
    expiryDate_lt?: string | null | undefined;
    expiryDate_lte?: string | null | undefined;
    expiryDate_not?: string | null | undefined;
    expiryDate_not_in?: (string)[] | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    or?: (NameRegistered_filter | null | undefined)[] | null | undefined;
    registrant?: string | null | undefined;
    registrant_?: Account_filter | null | undefined;
    registrant_contains?: string | null | undefined;
    registrant_contains_nocase?: string | null | undefined;
    registrant_ends_with?: string | null | undefined;
    registrant_ends_with_nocase?: string | null | undefined;
    registrant_gt?: string | null | undefined;
    registrant_gte?: string | null | undefined;
    registrant_in?: (string)[] | null | undefined;
    registrant_lt?: string | null | undefined;
    registrant_lte?: string | null | undefined;
    registrant_not?: string | null | undefined;
    registrant_not_contains?: string | null | undefined;
    registrant_not_contains_nocase?: string | null | undefined;
    registrant_not_ends_with?: string | null | undefined;
    registrant_not_ends_with_nocase?: string | null | undefined;
    registrant_not_in?: (string)[] | null | undefined;
    registrant_not_starts_with?: string | null | undefined;
    registrant_not_starts_with_nocase?: string | null | undefined;
    registrant_starts_with?: string | null | undefined;
    registrant_starts_with_nocase?: string | null | undefined;
    registration?: string | null | undefined;
    registration_?: Registration_filter | null | undefined;
    registration_contains?: string | null | undefined;
    registration_contains_nocase?: string | null | undefined;
    registration_ends_with?: string | null | undefined;
    registration_ends_with_nocase?: string | null | undefined;
    registration_gt?: string | null | undefined;
    registration_gte?: string | null | undefined;
    registration_in?: (string)[] | null | undefined;
    registration_lt?: string | null | undefined;
    registration_lte?: string | null | undefined;
    registration_not?: string | null | undefined;
    registration_not_contains?: string | null | undefined;
    registration_not_contains_nocase?: string | null | undefined;
    registration_not_ends_with?: string | null | undefined;
    registration_not_ends_with_nocase?: string | null | undefined;
    registration_not_in?: (string)[] | null | undefined;
    registration_not_starts_with?: string | null | undefined;
    registration_not_starts_with_nocase?: string | null | undefined;
    registration_starts_with?: string | null | undefined;
    registration_starts_with_nocase?: string | null | undefined;
    transactionID?: string | null | undefined;
    transactionID_contains?: string | null | undefined;
    transactionID_gt?: string | null | undefined;
    transactionID_gte?: string | null | undefined;
    transactionID_in?: (string)[] | null | undefined;
    transactionID_lt?: string | null | undefined;
    transactionID_lte?: string | null | undefined;
    transactionID_not?: string | null | undefined;
    transactionID_not_contains?: string | null | undefined;
    transactionID_not_in?: (string)[] | null | undefined;
};

type NameRenewed_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (NameRenewed_filter | null | undefined)[] | null | undefined;
    blockNumber?: number | null | undefined;
    blockNumber_gt?: number | null | undefined;
    blockNumber_gte?: number | null | undefined;
    blockNumber_in?: (number)[] | null | undefined;
    blockNumber_lt?: number | null | undefined;
    blockNumber_lte?: number | null | undefined;
    blockNumber_not?: number | null | undefined;
    blockNumber_not_in?: (number)[] | null | undefined;
    expiryDate?: string | null | undefined;
    expiryDate_gt?: string | null | undefined;
    expiryDate_gte?: string | null | undefined;
    expiryDate_in?: (string)[] | null | undefined;
    expiryDate_lt?: string | null | undefined;
    expiryDate_lte?: string | null | undefined;
    expiryDate_not?: string | null | undefined;
    expiryDate_not_in?: (string)[] | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    or?: (NameRenewed_filter | null | undefined)[] | null | undefined;
    registration?: string | null | undefined;
    registration_?: Registration_filter | null | undefined;
    registration_contains?: string | null | undefined;
    registration_contains_nocase?: string | null | undefined;
    registration_ends_with?: string | null | undefined;
    registration_ends_with_nocase?: string | null | undefined;
    registration_gt?: string | null | undefined;
    registration_gte?: string | null | undefined;
    registration_in?: (string)[] | null | undefined;
    registration_lt?: string | null | undefined;
    registration_lte?: string | null | undefined;
    registration_not?: string | null | undefined;
    registration_not_contains?: string | null | undefined;
    registration_not_contains_nocase?: string | null | undefined;
    registration_not_ends_with?: string | null | undefined;
    registration_not_ends_with_nocase?: string | null | undefined;
    registration_not_in?: (string)[] | null | undefined;
    registration_not_starts_with?: string | null | undefined;
    registration_not_starts_with_nocase?: string | null | undefined;
    registration_starts_with?: string | null | undefined;
    registration_starts_with_nocase?: string | null | undefined;
    transactionID?: string | null | undefined;
    transactionID_contains?: string | null | undefined;
    transactionID_gt?: string | null | undefined;
    transactionID_gte?: string | null | undefined;
    transactionID_in?: (string)[] | null | undefined;
    transactionID_lt?: string | null | undefined;
    transactionID_lte?: string | null | undefined;
    transactionID_not?: string | null | undefined;
    transactionID_not_contains?: string | null | undefined;
    transactionID_not_in?: (string)[] | null | undefined;
};

type NameTransferred_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (NameTransferred_filter | null | undefined)[] | null | undefined;
    blockNumber?: number | null | undefined;
    blockNumber_gt?: number | null | undefined;
    blockNumber_gte?: number | null | undefined;
    blockNumber_in?: (number)[] | null | undefined;
    blockNumber_lt?: number | null | undefined;
    blockNumber_lte?: number | null | undefined;
    blockNumber_not?: number | null | undefined;
    blockNumber_not_in?: (number)[] | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    newOwner?: string | null | undefined;
    newOwner_?: Account_filter | null | undefined;
    newOwner_contains?: string | null | undefined;
    newOwner_contains_nocase?: string | null | undefined;
    newOwner_ends_with?: string | null | undefined;
    newOwner_ends_with_nocase?: string | null | undefined;
    newOwner_gt?: string | null | undefined;
    newOwner_gte?: string | null | undefined;
    newOwner_in?: (string)[] | null | undefined;
    newOwner_lt?: string | null | undefined;
    newOwner_lte?: string | null | undefined;
    newOwner_not?: string | null | undefined;
    newOwner_not_contains?: string | null | undefined;
    newOwner_not_contains_nocase?: string | null | undefined;
    newOwner_not_ends_with?: string | null | undefined;
    newOwner_not_ends_with_nocase?: string | null | undefined;
    newOwner_not_in?: (string)[] | null | undefined;
    newOwner_not_starts_with?: string | null | undefined;
    newOwner_not_starts_with_nocase?: string | null | undefined;
    newOwner_starts_with?: string | null | undefined;
    newOwner_starts_with_nocase?: string | null | undefined;
    or?: (NameTransferred_filter | null | undefined)[] | null | undefined;
    registration?: string | null | undefined;
    registration_?: Registration_filter | null | undefined;
    registration_contains?: string | null | undefined;
    registration_contains_nocase?: string | null | undefined;
    registration_ends_with?: string | null | undefined;
    registration_ends_with_nocase?: string | null | undefined;
    registration_gt?: string | null | undefined;
    registration_gte?: string | null | undefined;
    registration_in?: (string)[] | null | undefined;
    registration_lt?: string | null | undefined;
    registration_lte?: string | null | undefined;
    registration_not?: string | null | undefined;
    registration_not_contains?: string | null | undefined;
    registration_not_contains_nocase?: string | null | undefined;
    registration_not_ends_with?: string | null | undefined;
    registration_not_ends_with_nocase?: string | null | undefined;
    registration_not_in?: (string)[] | null | undefined;
    registration_not_starts_with?: string | null | undefined;
    registration_not_starts_with_nocase?: string | null | undefined;
    registration_starts_with?: string | null | undefined;
    registration_starts_with_nocase?: string | null | undefined;
    transactionID?: string | null | undefined;
    transactionID_contains?: string | null | undefined;
    transactionID_gt?: string | null | undefined;
    transactionID_gte?: string | null | undefined;
    transactionID_in?: (string)[] | null | undefined;
    transactionID_lt?: string | null | undefined;
    transactionID_lte?: string | null | undefined;
    transactionID_not?: string | null | undefined;
    transactionID_not_contains?: string | null | undefined;
    transactionID_not_in?: (string)[] | null | undefined;
};

type NameUnwrapped_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (NameUnwrapped_filter | null | undefined)[] | null | undefined;
    blockNumber?: number | null | undefined;
    blockNumber_gt?: number | null | undefined;
    blockNumber_gte?: number | null | undefined;
    blockNumber_in?: (number)[] | null | undefined;
    blockNumber_lt?: number | null | undefined;
    blockNumber_lte?: number | null | undefined;
    blockNumber_not?: number | null | undefined;
    blockNumber_not_in?: (number)[] | null | undefined;
    domain?: string | null | undefined;
    domain_?: Domain_filter | null | undefined;
    domain_contains?: string | null | undefined;
    domain_contains_nocase?: string | null | undefined;
    domain_ends_with?: string | null | undefined;
    domain_ends_with_nocase?: string | null | undefined;
    domain_gt?: string | null | undefined;
    domain_gte?: string | null | undefined;
    domain_in?: (string)[] | null | undefined;
    domain_lt?: string | null | undefined;
    domain_lte?: string | null | undefined;
    domain_not?: string | null | undefined;
    domain_not_contains?: string | null | undefined;
    domain_not_contains_nocase?: string | null | undefined;
    domain_not_ends_with?: string | null | undefined;
    domain_not_ends_with_nocase?: string | null | undefined;
    domain_not_in?: (string)[] | null | undefined;
    domain_not_starts_with?: string | null | undefined;
    domain_not_starts_with_nocase?: string | null | undefined;
    domain_starts_with?: string | null | undefined;
    domain_starts_with_nocase?: string | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    or?: (NameUnwrapped_filter | null | undefined)[] | null | undefined;
    owner?: string | null | undefined;
    owner_?: Account_filter | null | undefined;
    owner_contains?: string | null | undefined;
    owner_contains_nocase?: string | null | undefined;
    owner_ends_with?: string | null | undefined;
    owner_ends_with_nocase?: string | null | undefined;
    owner_gt?: string | null | undefined;
    owner_gte?: string | null | undefined;
    owner_in?: (string)[] | null | undefined;
    owner_lt?: string | null | undefined;
    owner_lte?: string | null | undefined;
    owner_not?: string | null | undefined;
    owner_not_contains?: string | null | undefined;
    owner_not_contains_nocase?: string | null | undefined;
    owner_not_ends_with?: string | null | undefined;
    owner_not_ends_with_nocase?: string | null | undefined;
    owner_not_in?: (string)[] | null | undefined;
    owner_not_starts_with?: string | null | undefined;
    owner_not_starts_with_nocase?: string | null | undefined;
    owner_starts_with?: string | null | undefined;
    owner_starts_with_nocase?: string | null | undefined;
    transactionID?: string | null | undefined;
    transactionID_contains?: string | null | undefined;
    transactionID_gt?: string | null | undefined;
    transactionID_gte?: string | null | undefined;
    transactionID_in?: (string)[] | null | undefined;
    transactionID_lt?: string | null | undefined;
    transactionID_lte?: string | null | undefined;
    transactionID_not?: string | null | undefined;
    transactionID_not_contains?: string | null | undefined;
    transactionID_not_in?: (string)[] | null | undefined;
};

type NameWrapped_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (NameWrapped_filter | null | undefined)[] | null | undefined;
    blockNumber?: number | null | undefined;
    blockNumber_gt?: number | null | undefined;
    blockNumber_gte?: number | null | undefined;
    blockNumber_in?: (number)[] | null | undefined;
    blockNumber_lt?: number | null | undefined;
    blockNumber_lte?: number | null | undefined;
    blockNumber_not?: number | null | undefined;
    blockNumber_not_in?: (number)[] | null | undefined;
    domain?: string | null | undefined;
    domain_?: Domain_filter | null | undefined;
    domain_contains?: string | null | undefined;
    domain_contains_nocase?: string | null | undefined;
    domain_ends_with?: string | null | undefined;
    domain_ends_with_nocase?: string | null | undefined;
    domain_gt?: string | null | undefined;
    domain_gte?: string | null | undefined;
    domain_in?: (string)[] | null | undefined;
    domain_lt?: string | null | undefined;
    domain_lte?: string | null | undefined;
    domain_not?: string | null | undefined;
    domain_not_contains?: string | null | undefined;
    domain_not_contains_nocase?: string | null | undefined;
    domain_not_ends_with?: string | null | undefined;
    domain_not_ends_with_nocase?: string | null | undefined;
    domain_not_in?: (string)[] | null | undefined;
    domain_not_starts_with?: string | null | undefined;
    domain_not_starts_with_nocase?: string | null | undefined;
    domain_starts_with?: string | null | undefined;
    domain_starts_with_nocase?: string | null | undefined;
    expiry?: string | null | undefined;
    expiry_gt?: string | null | undefined;
    expiry_gte?: string | null | undefined;
    expiry_in?: (string)[] | null | undefined;
    expiry_lt?: string | null | undefined;
    expiry_lte?: string | null | undefined;
    expiry_not?: string | null | undefined;
    expiry_not_in?: (string)[] | null | undefined;
    fuses?: string | null | undefined;
    fuses_gt?: string | null | undefined;
    fuses_gte?: string | null | undefined;
    fuses_in?: (string)[] | null | undefined;
    fuses_lt?: string | null | undefined;
    fuses_lte?: string | null | undefined;
    fuses_not?: string | null | undefined;
    fuses_not_in?: (string)[] | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    name?: string | null | undefined;
    name_contains?: string | null | undefined;
    name_contains_nocase?: string | null | undefined;
    name_ends_with?: string | null | undefined;
    name_ends_with_nocase?: string | null | undefined;
    name_gt?: string | null | undefined;
    name_gte?: string | null | undefined;
    name_in?: (string)[] | null | undefined;
    name_lt?: string | null | undefined;
    name_lte?: string | null | undefined;
    name_not?: string | null | undefined;
    name_not_contains?: string | null | undefined;
    name_not_contains_nocase?: string | null | undefined;
    name_not_ends_with?: string | null | undefined;
    name_not_ends_with_nocase?: string | null | undefined;
    name_not_in?: (string)[] | null | undefined;
    name_not_starts_with?: string | null | undefined;
    name_not_starts_with_nocase?: string | null | undefined;
    name_starts_with?: string | null | undefined;
    name_starts_with_nocase?: string | null | undefined;
    or?: (NameWrapped_filter | null | undefined)[] | null | undefined;
    owner?: string | null | undefined;
    owner_?: Account_filter | null | undefined;
    owner_contains?: string | null | undefined;
    owner_contains_nocase?: string | null | undefined;
    owner_ends_with?: string | null | undefined;
    owner_ends_with_nocase?: string | null | undefined;
    owner_gt?: string | null | undefined;
    owner_gte?: string | null | undefined;
    owner_in?: (string)[] | null | undefined;
    owner_lt?: string | null | undefined;
    owner_lte?: string | null | undefined;
    owner_not?: string | null | undefined;
    owner_not_contains?: string | null | undefined;
    owner_not_contains_nocase?: string | null | undefined;
    owner_not_ends_with?: string | null | undefined;
    owner_not_ends_with_nocase?: string | null | undefined;
    owner_not_in?: (string)[] | null | undefined;
    owner_not_starts_with?: string | null | undefined;
    owner_not_starts_with_nocase?: string | null | undefined;
    owner_starts_with?: string | null | undefined;
    owner_starts_with_nocase?: string | null | undefined;
    transactionID?: string | null | undefined;
    transactionID_contains?: string | null | undefined;
    transactionID_gt?: string | null | undefined;
    transactionID_gte?: string | null | undefined;
    transactionID_in?: (string)[] | null | undefined;
    transactionID_lt?: string | null | undefined;
    transactionID_lte?: string | null | undefined;
    transactionID_not?: string | null | undefined;
    transactionID_not_contains?: string | null | undefined;
    transactionID_not_in?: (string)[] | null | undefined;
};

type NewOwner_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (NewOwner_filter | null | undefined)[] | null | undefined;
    blockNumber?: number | null | undefined;
    blockNumber_gt?: number | null | undefined;
    blockNumber_gte?: number | null | undefined;
    blockNumber_in?: (number)[] | null | undefined;
    blockNumber_lt?: number | null | undefined;
    blockNumber_lte?: number | null | undefined;
    blockNumber_not?: number | null | undefined;
    blockNumber_not_in?: (number)[] | null | undefined;
    domain?: string | null | undefined;
    domain_?: Domain_filter | null | undefined;
    domain_contains?: string | null | undefined;
    domain_contains_nocase?: string | null | undefined;
    domain_ends_with?: string | null | undefined;
    domain_ends_with_nocase?: string | null | undefined;
    domain_gt?: string | null | undefined;
    domain_gte?: string | null | undefined;
    domain_in?: (string)[] | null | undefined;
    domain_lt?: string | null | undefined;
    domain_lte?: string | null | undefined;
    domain_not?: string | null | undefined;
    domain_not_contains?: string | null | undefined;
    domain_not_contains_nocase?: string | null | undefined;
    domain_not_ends_with?: string | null | undefined;
    domain_not_ends_with_nocase?: string | null | undefined;
    domain_not_in?: (string)[] | null | undefined;
    domain_not_starts_with?: string | null | undefined;
    domain_not_starts_with_nocase?: string | null | undefined;
    domain_starts_with?: string | null | undefined;
    domain_starts_with_nocase?: string | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    or?: (NewOwner_filter | null | undefined)[] | null | undefined;
    owner?: string | null | undefined;
    owner_?: Account_filter | null | undefined;
    owner_contains?: string | null | undefined;
    owner_contains_nocase?: string | null | undefined;
    owner_ends_with?: string | null | undefined;
    owner_ends_with_nocase?: string | null | undefined;
    owner_gt?: string | null | undefined;
    owner_gte?: string | null | undefined;
    owner_in?: (string)[] | null | undefined;
    owner_lt?: string | null | undefined;
    owner_lte?: string | null | undefined;
    owner_not?: string | null | undefined;
    owner_not_contains?: string | null | undefined;
    owner_not_contains_nocase?: string | null | undefined;
    owner_not_ends_with?: string | null | undefined;
    owner_not_ends_with_nocase?: string | null | undefined;
    owner_not_in?: (string)[] | null | undefined;
    owner_not_starts_with?: string | null | undefined;
    owner_not_starts_with_nocase?: string | null | undefined;
    owner_starts_with?: string | null | undefined;
    owner_starts_with_nocase?: string | null | undefined;
    parentDomain?: string | null | undefined;
    parentDomain_?: Domain_filter | null | undefined;
    parentDomain_contains?: string | null | undefined;
    parentDomain_contains_nocase?: string | null | undefined;
    parentDomain_ends_with?: string | null | undefined;
    parentDomain_ends_with_nocase?: string | null | undefined;
    parentDomain_gt?: string | null | undefined;
    parentDomain_gte?: string | null | undefined;
    parentDomain_in?: (string)[] | null | undefined;
    parentDomain_lt?: string | null | undefined;
    parentDomain_lte?: string | null | undefined;
    parentDomain_not?: string | null | undefined;
    parentDomain_not_contains?: string | null | undefined;
    parentDomain_not_contains_nocase?: string | null | undefined;
    parentDomain_not_ends_with?: string | null | undefined;
    parentDomain_not_ends_with_nocase?: string | null | undefined;
    parentDomain_not_in?: (string)[] | null | undefined;
    parentDomain_not_starts_with?: string | null | undefined;
    parentDomain_not_starts_with_nocase?: string | null | undefined;
    parentDomain_starts_with?: string | null | undefined;
    parentDomain_starts_with_nocase?: string | null | undefined;
    transactionID?: string | null | undefined;
    transactionID_contains?: string | null | undefined;
    transactionID_gt?: string | null | undefined;
    transactionID_gte?: string | null | undefined;
    transactionID_in?: (string)[] | null | undefined;
    transactionID_lt?: string | null | undefined;
    transactionID_lte?: string | null | undefined;
    transactionID_not?: string | null | undefined;
    transactionID_not_contains?: string | null | undefined;
    transactionID_not_in?: (string)[] | null | undefined;
};

type NewResolver_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (NewResolver_filter | null | undefined)[] | null | undefined;
    blockNumber?: number | null | undefined;
    blockNumber_gt?: number | null | undefined;
    blockNumber_gte?: number | null | undefined;
    blockNumber_in?: (number)[] | null | undefined;
    blockNumber_lt?: number | null | undefined;
    blockNumber_lte?: number | null | undefined;
    blockNumber_not?: number | null | undefined;
    blockNumber_not_in?: (number)[] | null | undefined;
    domain?: string | null | undefined;
    domain_?: Domain_filter | null | undefined;
    domain_contains?: string | null | undefined;
    domain_contains_nocase?: string | null | undefined;
    domain_ends_with?: string | null | undefined;
    domain_ends_with_nocase?: string | null | undefined;
    domain_gt?: string | null | undefined;
    domain_gte?: string | null | undefined;
    domain_in?: (string)[] | null | undefined;
    domain_lt?: string | null | undefined;
    domain_lte?: string | null | undefined;
    domain_not?: string | null | undefined;
    domain_not_contains?: string | null | undefined;
    domain_not_contains_nocase?: string | null | undefined;
    domain_not_ends_with?: string | null | undefined;
    domain_not_ends_with_nocase?: string | null | undefined;
    domain_not_in?: (string)[] | null | undefined;
    domain_not_starts_with?: string | null | undefined;
    domain_not_starts_with_nocase?: string | null | undefined;
    domain_starts_with?: string | null | undefined;
    domain_starts_with_nocase?: string | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    or?: (NewResolver_filter | null | undefined)[] | null | undefined;
    resolver?: string | null | undefined;
    resolver_?: Resolver_filter | null | undefined;
    resolver_contains?: string | null | undefined;
    resolver_contains_nocase?: string | null | undefined;
    resolver_ends_with?: string | null | undefined;
    resolver_ends_with_nocase?: string | null | undefined;
    resolver_gt?: string | null | undefined;
    resolver_gte?: string | null | undefined;
    resolver_in?: (string)[] | null | undefined;
    resolver_lt?: string | null | undefined;
    resolver_lte?: string | null | undefined;
    resolver_not?: string | null | undefined;
    resolver_not_contains?: string | null | undefined;
    resolver_not_contains_nocase?: string | null | undefined;
    resolver_not_ends_with?: string | null | undefined;
    resolver_not_ends_with_nocase?: string | null | undefined;
    resolver_not_in?: (string)[] | null | undefined;
    resolver_not_starts_with?: string | null | undefined;
    resolver_not_starts_with_nocase?: string | null | undefined;
    resolver_starts_with?: string | null | undefined;
    resolver_starts_with_nocase?: string | null | undefined;
    transactionID?: string | null | undefined;
    transactionID_contains?: string | null | undefined;
    transactionID_gt?: string | null | undefined;
    transactionID_gte?: string | null | undefined;
    transactionID_in?: (string)[] | null | undefined;
    transactionID_lt?: string | null | undefined;
    transactionID_lte?: string | null | undefined;
    transactionID_not?: string | null | undefined;
    transactionID_not_contains?: string | null | undefined;
    transactionID_not_in?: (string)[] | null | undefined;
};

type NewTTL_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (NewTTL_filter | null | undefined)[] | null | undefined;
    blockNumber?: number | null | undefined;
    blockNumber_gt?: number | null | undefined;
    blockNumber_gte?: number | null | undefined;
    blockNumber_in?: (number)[] | null | undefined;
    blockNumber_lt?: number | null | undefined;
    blockNumber_lte?: number | null | undefined;
    blockNumber_not?: number | null | undefined;
    blockNumber_not_in?: (number)[] | null | undefined;
    domain?: string | null | undefined;
    domain_?: Domain_filter | null | undefined;
    domain_contains?: string | null | undefined;
    domain_contains_nocase?: string | null | undefined;
    domain_ends_with?: string | null | undefined;
    domain_ends_with_nocase?: string | null | undefined;
    domain_gt?: string | null | undefined;
    domain_gte?: string | null | undefined;
    domain_in?: (string)[] | null | undefined;
    domain_lt?: string | null | undefined;
    domain_lte?: string | null | undefined;
    domain_not?: string | null | undefined;
    domain_not_contains?: string | null | undefined;
    domain_not_contains_nocase?: string | null | undefined;
    domain_not_ends_with?: string | null | undefined;
    domain_not_ends_with_nocase?: string | null | undefined;
    domain_not_in?: (string)[] | null | undefined;
    domain_not_starts_with?: string | null | undefined;
    domain_not_starts_with_nocase?: string | null | undefined;
    domain_starts_with?: string | null | undefined;
    domain_starts_with_nocase?: string | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    or?: (NewTTL_filter | null | undefined)[] | null | undefined;
    transactionID?: string | null | undefined;
    transactionID_contains?: string | null | undefined;
    transactionID_gt?: string | null | undefined;
    transactionID_gte?: string | null | undefined;
    transactionID_in?: (string)[] | null | undefined;
    transactionID_lt?: string | null | undefined;
    transactionID_lte?: string | null | undefined;
    transactionID_not?: string | null | undefined;
    transactionID_not_contains?: string | null | undefined;
    transactionID_not_in?: (string)[] | null | undefined;
    ttl?: string | null | undefined;
    ttl_gt?: string | null | undefined;
    ttl_gte?: string | null | undefined;
    ttl_in?: (string)[] | null | undefined;
    ttl_lt?: string | null | undefined;
    ttl_lte?: string | null | undefined;
    ttl_not?: string | null | undefined;
    ttl_not_in?: (string)[] | null | undefined;
};

type PubkeyChanged_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (PubkeyChanged_filter | null | undefined)[] | null | undefined;
    blockNumber?: number | null | undefined;
    blockNumber_gt?: number | null | undefined;
    blockNumber_gte?: number | null | undefined;
    blockNumber_in?: (number)[] | null | undefined;
    blockNumber_lt?: number | null | undefined;
    blockNumber_lte?: number | null | undefined;
    blockNumber_not?: number | null | undefined;
    blockNumber_not_in?: (number)[] | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    or?: (PubkeyChanged_filter | null | undefined)[] | null | undefined;
    resolver?: string | null | undefined;
    resolver_?: Resolver_filter | null | undefined;
    resolver_contains?: string | null | undefined;
    resolver_contains_nocase?: string | null | undefined;
    resolver_ends_with?: string | null | undefined;
    resolver_ends_with_nocase?: string | null | undefined;
    resolver_gt?: string | null | undefined;
    resolver_gte?: string | null | undefined;
    resolver_in?: (string)[] | null | undefined;
    resolver_lt?: string | null | undefined;
    resolver_lte?: string | null | undefined;
    resolver_not?: string | null | undefined;
    resolver_not_contains?: string | null | undefined;
    resolver_not_contains_nocase?: string | null | undefined;
    resolver_not_ends_with?: string | null | undefined;
    resolver_not_ends_with_nocase?: string | null | undefined;
    resolver_not_in?: (string)[] | null | undefined;
    resolver_not_starts_with?: string | null | undefined;
    resolver_not_starts_with_nocase?: string | null | undefined;
    resolver_starts_with?: string | null | undefined;
    resolver_starts_with_nocase?: string | null | undefined;
    transactionID?: string | null | undefined;
    transactionID_contains?: string | null | undefined;
    transactionID_gt?: string | null | undefined;
    transactionID_gte?: string | null | undefined;
    transactionID_in?: (string)[] | null | undefined;
    transactionID_lt?: string | null | undefined;
    transactionID_lte?: string | null | undefined;
    transactionID_not?: string | null | undefined;
    transactionID_not_contains?: string | null | undefined;
    transactionID_not_in?: (string)[] | null | undefined;
    x?: string | null | undefined;
    x_contains?: string | null | undefined;
    x_gt?: string | null | undefined;
    x_gte?: string | null | undefined;
    x_in?: (string)[] | null | undefined;
    x_lt?: string | null | undefined;
    x_lte?: string | null | undefined;
    x_not?: string | null | undefined;
    x_not_contains?: string | null | undefined;
    x_not_in?: (string)[] | null | undefined;
    y?: string | null | undefined;
    y_contains?: string | null | undefined;
    y_gt?: string | null | undefined;
    y_gte?: string | null | undefined;
    y_in?: (string)[] | null | undefined;
    y_lt?: string | null | undefined;
    y_lte?: string | null | undefined;
    y_not?: string | null | undefined;
    y_not_contains?: string | null | undefined;
    y_not_in?: (string)[] | null | undefined;
};

type TextChanged_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (TextChanged_filter | null | undefined)[] | null | undefined;
    blockNumber?: number | null | undefined;
    blockNumber_gt?: number | null | undefined;
    blockNumber_gte?: number | null | undefined;
    blockNumber_in?: (number)[] | null | undefined;
    blockNumber_lt?: number | null | undefined;
    blockNumber_lte?: number | null | undefined;
    blockNumber_not?: number | null | undefined;
    blockNumber_not_in?: (number)[] | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    key?: string | null | undefined;
    key_contains?: string | null | undefined;
    key_contains_nocase?: string | null | undefined;
    key_ends_with?: string | null | undefined;
    key_ends_with_nocase?: string | null | undefined;
    key_gt?: string | null | undefined;
    key_gte?: string | null | undefined;
    key_in?: (string)[] | null | undefined;
    key_lt?: string | null | undefined;
    key_lte?: string | null | undefined;
    key_not?: string | null | undefined;
    key_not_contains?: string | null | undefined;
    key_not_contains_nocase?: string | null | undefined;
    key_not_ends_with?: string | null | undefined;
    key_not_ends_with_nocase?: string | null | undefined;
    key_not_in?: (string)[] | null | undefined;
    key_not_starts_with?: string | null | undefined;
    key_not_starts_with_nocase?: string | null | undefined;
    key_starts_with?: string | null | undefined;
    key_starts_with_nocase?: string | null | undefined;
    or?: (TextChanged_filter | null | undefined)[] | null | undefined;
    resolver?: string | null | undefined;
    resolver_?: Resolver_filter | null | undefined;
    resolver_contains?: string | null | undefined;
    resolver_contains_nocase?: string | null | undefined;
    resolver_ends_with?: string | null | undefined;
    resolver_ends_with_nocase?: string | null | undefined;
    resolver_gt?: string | null | undefined;
    resolver_gte?: string | null | undefined;
    resolver_in?: (string)[] | null | undefined;
    resolver_lt?: string | null | undefined;
    resolver_lte?: string | null | undefined;
    resolver_not?: string | null | undefined;
    resolver_not_contains?: string | null | undefined;
    resolver_not_contains_nocase?: string | null | undefined;
    resolver_not_ends_with?: string | null | undefined;
    resolver_not_ends_with_nocase?: string | null | undefined;
    resolver_not_in?: (string)[] | null | undefined;
    resolver_not_starts_with?: string | null | undefined;
    resolver_not_starts_with_nocase?: string | null | undefined;
    resolver_starts_with?: string | null | undefined;
    resolver_starts_with_nocase?: string | null | undefined;
    transactionID?: string | null | undefined;
    transactionID_contains?: string | null | undefined;
    transactionID_gt?: string | null | undefined;
    transactionID_gte?: string | null | undefined;
    transactionID_in?: (string)[] | null | undefined;
    transactionID_lt?: string | null | undefined;
    transactionID_lte?: string | null | undefined;
    transactionID_not?: string | null | undefined;
    transactionID_not_contains?: string | null | undefined;
    transactionID_not_in?: (string)[] | null | undefined;
    value?: string | null | undefined;
    value_contains?: string | null | undefined;
    value_contains_nocase?: string | null | undefined;
    value_ends_with?: string | null | undefined;
    value_ends_with_nocase?: string | null | undefined;
    value_gt?: string | null | undefined;
    value_gte?: string | null | undefined;
    value_in?: (string)[] | null | undefined;
    value_lt?: string | null | undefined;
    value_lte?: string | null | undefined;
    value_not?: string | null | undefined;
    value_not_contains?: string | null | undefined;
    value_not_contains_nocase?: string | null | undefined;
    value_not_ends_with?: string | null | undefined;
    value_not_ends_with_nocase?: string | null | undefined;
    value_not_in?: (string)[] | null | undefined;
    value_not_starts_with?: string | null | undefined;
    value_not_starts_with_nocase?: string | null | undefined;
    value_starts_with?: string | null | undefined;
    value_starts_with_nocase?: string | null | undefined;
};

type Transfer_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (Transfer_filter | null | undefined)[] | null | undefined;
    blockNumber?: number | null | undefined;
    blockNumber_gt?: number | null | undefined;
    blockNumber_gte?: number | null | undefined;
    blockNumber_in?: (number)[] | null | undefined;
    blockNumber_lt?: number | null | undefined;
    blockNumber_lte?: number | null | undefined;
    blockNumber_not?: number | null | undefined;
    blockNumber_not_in?: (number)[] | null | undefined;
    domain?: string | null | undefined;
    domain_?: Domain_filter | null | undefined;
    domain_contains?: string | null | undefined;
    domain_contains_nocase?: string | null | undefined;
    domain_ends_with?: string | null | undefined;
    domain_ends_with_nocase?: string | null | undefined;
    domain_gt?: string | null | undefined;
    domain_gte?: string | null | undefined;
    domain_in?: (string)[] | null | undefined;
    domain_lt?: string | null | undefined;
    domain_lte?: string | null | undefined;
    domain_not?: string | null | undefined;
    domain_not_contains?: string | null | undefined;
    domain_not_contains_nocase?: string | null | undefined;
    domain_not_ends_with?: string | null | undefined;
    domain_not_ends_with_nocase?: string | null | undefined;
    domain_not_in?: (string)[] | null | undefined;
    domain_not_starts_with?: string | null | undefined;
    domain_not_starts_with_nocase?: string | null | undefined;
    domain_starts_with?: string | null | undefined;
    domain_starts_with_nocase?: string | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    or?: (Transfer_filter | null | undefined)[] | null | undefined;
    owner?: string | null | undefined;
    owner_?: Account_filter | null | undefined;
    owner_contains?: string | null | undefined;
    owner_contains_nocase?: string | null | undefined;
    owner_ends_with?: string | null | undefined;
    owner_ends_with_nocase?: string | null | undefined;
    owner_gt?: string | null | undefined;
    owner_gte?: string | null | undefined;
    owner_in?: (string)[] | null | undefined;
    owner_lt?: string | null | undefined;
    owner_lte?: string | null | undefined;
    owner_not?: string | null | undefined;
    owner_not_contains?: string | null | undefined;
    owner_not_contains_nocase?: string | null | undefined;
    owner_not_ends_with?: string | null | undefined;
    owner_not_ends_with_nocase?: string | null | undefined;
    owner_not_in?: (string)[] | null | undefined;
    owner_not_starts_with?: string | null | undefined;
    owner_not_starts_with_nocase?: string | null | undefined;
    owner_starts_with?: string | null | undefined;
    owner_starts_with_nocase?: string | null | undefined;
    transactionID?: string | null | undefined;
    transactionID_contains?: string | null | undefined;
    transactionID_gt?: string | null | undefined;
    transactionID_gte?: string | null | undefined;
    transactionID_in?: (string)[] | null | undefined;
    transactionID_lt?: string | null | undefined;
    transactionID_lte?: string | null | undefined;
    transactionID_not?: string | null | undefined;
    transactionID_not_contains?: string | null | undefined;
    transactionID_not_in?: (string)[] | null | undefined;
};

type VersionChanged_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (VersionChanged_filter | null | undefined)[] | null | undefined;
    blockNumber?: number | null | undefined;
    blockNumber_gt?: number | null | undefined;
    blockNumber_gte?: number | null | undefined;
    blockNumber_in?: (number)[] | null | undefined;
    blockNumber_lt?: number | null | undefined;
    blockNumber_lte?: number | null | undefined;
    blockNumber_not?: number | null | undefined;
    blockNumber_not_in?: (number)[] | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    or?: (VersionChanged_filter | null | undefined)[] | null | undefined;
    resolver?: string | null | undefined;
    resolver_?: Resolver_filter | null | undefined;
    resolver_contains?: string | null | undefined;
    resolver_contains_nocase?: string | null | undefined;
    resolver_ends_with?: string | null | undefined;
    resolver_ends_with_nocase?: string | null | undefined;
    resolver_gt?: string | null | undefined;
    resolver_gte?: string | null | undefined;
    resolver_in?: (string)[] | null | undefined;
    resolver_lt?: string | null | undefined;
    resolver_lte?: string | null | undefined;
    resolver_not?: string | null | undefined;
    resolver_not_contains?: string | null | undefined;
    resolver_not_contains_nocase?: string | null | undefined;
    resolver_not_ends_with?: string | null | undefined;
    resolver_not_ends_with_nocase?: string | null | undefined;
    resolver_not_in?: (string)[] | null | undefined;
    resolver_not_starts_with?: string | null | undefined;
    resolver_not_starts_with_nocase?: string | null | undefined;
    resolver_starts_with?: string | null | undefined;
    resolver_starts_with_nocase?: string | null | undefined;
    transactionID?: string | null | undefined;
    transactionID_contains?: string | null | undefined;
    transactionID_gt?: string | null | undefined;
    transactionID_gte?: string | null | undefined;
    transactionID_in?: (string)[] | null | undefined;
    transactionID_lt?: string | null | undefined;
    transactionID_lte?: string | null | undefined;
    transactionID_not?: string | null | undefined;
    transactionID_not_contains?: string | null | undefined;
    transactionID_not_in?: (string)[] | null | undefined;
    version?: string | null | undefined;
    version_gt?: string | null | undefined;
    version_gte?: string | null | undefined;
    version_in?: (string)[] | null | undefined;
    version_lt?: string | null | undefined;
    version_lte?: string | null | undefined;
    version_not?: string | null | undefined;
    version_not_in?: (string)[] | null | undefined;
};

type WrappedTransfer_filter = {
    _change_block?: BlockChangedFilter | null | undefined;
    and?: (WrappedTransfer_filter | null | undefined)[] | null | undefined;
    blockNumber?: number | null | undefined;
    blockNumber_gt?: number | null | undefined;
    blockNumber_gte?: number | null | undefined;
    blockNumber_in?: (number)[] | null | undefined;
    blockNumber_lt?: number | null | undefined;
    blockNumber_lte?: number | null | undefined;
    blockNumber_not?: number | null | undefined;
    blockNumber_not_in?: (number)[] | null | undefined;
    domain?: string | null | undefined;
    domain_?: Domain_filter | null | undefined;
    domain_contains?: string | null | undefined;
    domain_contains_nocase?: string | null | undefined;
    domain_ends_with?: string | null | undefined;
    domain_ends_with_nocase?: string | null | undefined;
    domain_gt?: string | null | undefined;
    domain_gte?: string | null | undefined;
    domain_in?: (string)[] | null | undefined;
    domain_lt?: string | null | undefined;
    domain_lte?: string | null | undefined;
    domain_not?: string | null | undefined;
    domain_not_contains?: string | null | undefined;
    domain_not_contains_nocase?: string | null | undefined;
    domain_not_ends_with?: string | null | undefined;
    domain_not_ends_with_nocase?: string | null | undefined;
    domain_not_in?: (string)[] | null | undefined;
    domain_not_starts_with?: string | null | undefined;
    domain_not_starts_with_nocase?: string | null | undefined;
    domain_starts_with?: string | null | undefined;
    domain_starts_with_nocase?: string | null | undefined;
    id?: string | null | undefined;
    id_gt?: string | null | undefined;
    id_gte?: string | null | undefined;
    id_in?: (string)[] | null | undefined;
    id_lt?: string | null | undefined;
    id_lte?: string | null | undefined;
    id_not?: string | null | undefined;
    id_not_in?: (string)[] | null | undefined;
    or?: (WrappedTransfer_filter | null | undefined)[] | null | undefined;
    owner?: string | null | undefined;
    owner_?: Account_filter | null | undefined;
    owner_contains?: string | null | undefined;
    owner_contains_nocase?: string | null | undefined;
    owner_ends_with?: string | null | undefined;
    owner_ends_with_nocase?: string | null | undefined;
    owner_gt?: string | null | undefined;
    owner_gte?: string | null | undefined;
    owner_in?: (string)[] | null | undefined;
    owner_lt?: string | null | undefined;
    owner_lte?: string | null | undefined;
    owner_not?: string | null | undefined;
    owner_not_contains?: string | null | undefined;
    owner_not_contains_nocase?: string | null | undefined;
    owner_not_ends_with?: string | null | undefined;
    owner_not_ends_with_nocase?: string | null | undefined;
    owner_not_in?: (string)[] | null | undefined;
    owner_not_starts_with?: string | null | undefined;
    owner_not_starts_with_nocase?: string | null | undefined;
    owner_starts_with?: string | null | undefined;
    owner_starts_with_nocase?: string | null | undefined;
    transactionID?: string | null | undefined;
    transactionID_contains?: string | null | undefined;
    transactionID_gt?: string | null | undefined;
    transactionID_gte?: string | null | undefined;
    transactionID_in?: (string)[] | null | undefined;
    transactionID_lt?: string | null | undefined;
    transactionID_lte?: string | null | undefined;
    transactionID_not?: string | null | undefined;
    transactionID_not_contains?: string | null | undefined;
    transactionID_not_in?: (string)[] | null | undefined;
};

export declare type CacheTypeDef = {
    types: {
        AbiChanged: {
            idFields: {
                id: string;
            };
            fields: {
                blockNumber: {
                    type: number;
                    args: never;
                };
                contentType: {
                    type: string;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                resolver: {
                    type: Record<CacheTypeDef, "Resolver">;
                    args: never;
                };
                transactionID: {
                    type: string;
                    args: never;
                };
            };
            fragments: [];
        };
        Account: {
            idFields: {
                id: string;
            };
            fields: {
                domains: {
                    type: (Record<CacheTypeDef, "Domain">)[];
                    args: {
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof Domain_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        where?: Domain_filter | null | undefined;
                    };
                };
                id: {
                    type: string;
                    args: never;
                };
                registrations: {
                    type: (Record<CacheTypeDef, "Registration">)[] | null;
                    args: {
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof Registration_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        where?: Registration_filter | null | undefined;
                    };
                };
                wrappedDomains: {
                    type: (Record<CacheTypeDef, "WrappedDomain">)[] | null;
                    args: {
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof WrappedDomain_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        where?: WrappedDomain_filter | null | undefined;
                    };
                };
            };
            fragments: [];
        };
        AddrChanged: {
            idFields: {
                id: string;
            };
            fields: {
                addr: {
                    type: Record<CacheTypeDef, "Account">;
                    args: never;
                };
                blockNumber: {
                    type: number;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                resolver: {
                    type: Record<CacheTypeDef, "Resolver">;
                    args: never;
                };
                transactionID: {
                    type: string;
                    args: never;
                };
            };
            fragments: [];
        };
        AuthorisationChanged: {
            idFields: {
                id: string;
            };
            fields: {
                blockNumber: {
                    type: number;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                isAuthorized: {
                    type: boolean;
                    args: never;
                };
                owner: {
                    type: string;
                    args: never;
                };
                resolver: {
                    type: Record<CacheTypeDef, "Resolver">;
                    args: never;
                };
                target: {
                    type: string;
                    args: never;
                };
                transactionID: {
                    type: string;
                    args: never;
                };
            };
            fragments: [];
        };
        ContenthashChanged: {
            idFields: {
                id: string;
            };
            fields: {
                blockNumber: {
                    type: number;
                    args: never;
                };
                hash: {
                    type: string;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                resolver: {
                    type: Record<CacheTypeDef, "Resolver">;
                    args: never;
                };
                transactionID: {
                    type: string;
                    args: never;
                };
            };
            fragments: [];
        };
        Domain: {
            idFields: {
                id: string;
            };
            fields: {
                createdAt: {
                    type: string;
                    args: never;
                };
                events: {
                    type: (Record<CacheTypeDef, "FusesSet"> | Record<CacheTypeDef, "NameUnwrapped"> | Record<CacheTypeDef, "NameWrapped"> | Record<CacheTypeDef, "NewOwner"> | Record<CacheTypeDef, "NewResolver"> | Record<CacheTypeDef, "NewTTL"> | Record<CacheTypeDef, "Transfer"> | Record<CacheTypeDef, "WrappedTransfer">)[];
                    args: {
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof DomainEvent_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        where?: DomainEvent_filter | null | undefined;
                    };
                };
                id: {
                    type: string;
                    args: never;
                };
                isMigrated: {
                    type: boolean;
                    args: never;
                };
                labelName: {
                    type: string | null;
                    args: never;
                };
                labelhash: {
                    type: string | null;
                    args: never;
                };
                name: {
                    type: string | null;
                    args: never;
                };
                owner: {
                    type: Record<CacheTypeDef, "Account">;
                    args: never;
                };
                parent: {
                    type: Record<CacheTypeDef, "Domain"> | null;
                    args: never;
                };
                registration: {
                    type: Record<CacheTypeDef, "Registration"> | null;
                    args: never;
                };
                resolvedAddress: {
                    type: Record<CacheTypeDef, "Account"> | null;
                    args: never;
                };
                resolver: {
                    type: Record<CacheTypeDef, "Resolver"> | null;
                    args: never;
                };
                subdomainCount: {
                    type: number;
                    args: never;
                };
                subdomains: {
                    type: (Record<CacheTypeDef, "Domain">)[];
                    args: {
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof Domain_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        where?: Domain_filter | null | undefined;
                    };
                };
                ttl: {
                    type: string | null;
                    args: never;
                };
                wrappedDomain: {
                    type: Record<CacheTypeDef, "WrappedDomain"> | null;
                    args: never;
                };
            };
            fragments: [];
        };
        FusesSet: {
            idFields: {
                id: string;
            };
            fields: {
                blockNumber: {
                    type: number;
                    args: never;
                };
                domain: {
                    type: Record<CacheTypeDef, "Domain">;
                    args: never;
                };
                expiry: {
                    type: string;
                    args: never;
                };
                fuses: {
                    type: string;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                transactionID: {
                    type: string;
                    args: never;
                };
            };
            fragments: [];
        };
        InterfaceChanged: {
            idFields: {
                id: string;
            };
            fields: {
                blockNumber: {
                    type: number;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                implementer: {
                    type: string;
                    args: never;
                };
                interfaceID: {
                    type: string;
                    args: never;
                };
                resolver: {
                    type: Record<CacheTypeDef, "Resolver">;
                    args: never;
                };
                transactionID: {
                    type: string;
                    args: never;
                };
            };
            fragments: [];
        };
        MulticoinAddrChanged: {
            idFields: {
                id: string;
            };
            fields: {
                addr: {
                    type: string;
                    args: never;
                };
                blockNumber: {
                    type: number;
                    args: never;
                };
                coinType: {
                    type: string;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                resolver: {
                    type: Record<CacheTypeDef, "Resolver">;
                    args: never;
                };
                transactionID: {
                    type: string;
                    args: never;
                };
            };
            fragments: [];
        };
        NameChanged: {
            idFields: {
                id: string;
            };
            fields: {
                blockNumber: {
                    type: number;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                name: {
                    type: string;
                    args: never;
                };
                resolver: {
                    type: Record<CacheTypeDef, "Resolver">;
                    args: never;
                };
                transactionID: {
                    type: string;
                    args: never;
                };
            };
            fragments: [];
        };
        NameRegistered: {
            idFields: {
                id: string;
            };
            fields: {
                blockNumber: {
                    type: number;
                    args: never;
                };
                expiryDate: {
                    type: string;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                registrant: {
                    type: Record<CacheTypeDef, "Account">;
                    args: never;
                };
                registration: {
                    type: Record<CacheTypeDef, "Registration">;
                    args: never;
                };
                transactionID: {
                    type: string;
                    args: never;
                };
            };
            fragments: [];
        };
        NameRenewed: {
            idFields: {
                id: string;
            };
            fields: {
                blockNumber: {
                    type: number;
                    args: never;
                };
                expiryDate: {
                    type: string;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                registration: {
                    type: Record<CacheTypeDef, "Registration">;
                    args: never;
                };
                transactionID: {
                    type: string;
                    args: never;
                };
            };
            fragments: [];
        };
        NameTransferred: {
            idFields: {
                id: string;
            };
            fields: {
                blockNumber: {
                    type: number;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                newOwner: {
                    type: Record<CacheTypeDef, "Account">;
                    args: never;
                };
                registration: {
                    type: Record<CacheTypeDef, "Registration">;
                    args: never;
                };
                transactionID: {
                    type: string;
                    args: never;
                };
            };
            fragments: [];
        };
        NameUnwrapped: {
            idFields: {
                id: string;
            };
            fields: {
                blockNumber: {
                    type: number;
                    args: never;
                };
                domain: {
                    type: Record<CacheTypeDef, "Domain">;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                owner: {
                    type: Record<CacheTypeDef, "Account">;
                    args: never;
                };
                transactionID: {
                    type: string;
                    args: never;
                };
            };
            fragments: [];
        };
        NameWrapped: {
            idFields: {
                id: string;
            };
            fields: {
                blockNumber: {
                    type: number;
                    args: never;
                };
                domain: {
                    type: Record<CacheTypeDef, "Domain">;
                    args: never;
                };
                expiry: {
                    type: string;
                    args: never;
                };
                fuses: {
                    type: string;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                name: {
                    type: string;
                    args: never;
                };
                owner: {
                    type: Record<CacheTypeDef, "Account">;
                    args: never;
                };
                transactionID: {
                    type: string;
                    args: never;
                };
            };
            fragments: [];
        };
        NewOwner: {
            idFields: {
                id: string;
            };
            fields: {
                blockNumber: {
                    type: number;
                    args: never;
                };
                domain: {
                    type: Record<CacheTypeDef, "Domain">;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                owner: {
                    type: Record<CacheTypeDef, "Account">;
                    args: never;
                };
                parentDomain: {
                    type: Record<CacheTypeDef, "Domain">;
                    args: never;
                };
                transactionID: {
                    type: string;
                    args: never;
                };
            };
            fragments: [];
        };
        NewResolver: {
            idFields: {
                id: string;
            };
            fields: {
                blockNumber: {
                    type: number;
                    args: never;
                };
                domain: {
                    type: Record<CacheTypeDef, "Domain">;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                resolver: {
                    type: Record<CacheTypeDef, "Resolver">;
                    args: never;
                };
                transactionID: {
                    type: string;
                    args: never;
                };
            };
            fragments: [];
        };
        NewTTL: {
            idFields: {
                id: string;
            };
            fields: {
                blockNumber: {
                    type: number;
                    args: never;
                };
                domain: {
                    type: Record<CacheTypeDef, "Domain">;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                transactionID: {
                    type: string;
                    args: never;
                };
                ttl: {
                    type: string;
                    args: never;
                };
            };
            fragments: [];
        };
        PubkeyChanged: {
            idFields: {
                id: string;
            };
            fields: {
                blockNumber: {
                    type: number;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                resolver: {
                    type: Record<CacheTypeDef, "Resolver">;
                    args: never;
                };
                transactionID: {
                    type: string;
                    args: never;
                };
                x: {
                    type: string;
                    args: never;
                };
                y: {
                    type: string;
                    args: never;
                };
            };
            fragments: [];
        };
        __ROOT__: {
            idFields: {};
            fields: {
                _meta: {
                    type: Record<CacheTypeDef, "_Meta_"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                    };
                };
                abiChanged: {
                    type: Record<CacheTypeDef, "AbiChanged"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                abiChangeds: {
                    type: (Record<CacheTypeDef, "AbiChanged">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof AbiChanged_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: AbiChanged_filter | null | undefined;
                    };
                };
                account: {
                    type: Record<CacheTypeDef, "Account"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                accounts: {
                    type: (Record<CacheTypeDef, "Account">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof Account_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: Account_filter | null | undefined;
                    };
                };
                addrChanged: {
                    type: Record<CacheTypeDef, "AddrChanged"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                addrChangeds: {
                    type: (Record<CacheTypeDef, "AddrChanged">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof AddrChanged_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: AddrChanged_filter | null | undefined;
                    };
                };
                authorisationChanged: {
                    type: Record<CacheTypeDef, "AuthorisationChanged"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                authorisationChangeds: {
                    type: (Record<CacheTypeDef, "AuthorisationChanged">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof AuthorisationChanged_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: AuthorisationChanged_filter | null | undefined;
                    };
                };
                contenthashChanged: {
                    type: Record<CacheTypeDef, "ContenthashChanged"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                contenthashChangeds: {
                    type: (Record<CacheTypeDef, "ContenthashChanged">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof ContenthashChanged_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: ContenthashChanged_filter | null | undefined;
                    };
                };
                domain: {
                    type: Record<CacheTypeDef, "Domain"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                domainEvent: {
                    type: Record<CacheTypeDef, "FusesSet"> | Record<CacheTypeDef, "NameUnwrapped"> | Record<CacheTypeDef, "NameWrapped"> | Record<CacheTypeDef, "NewOwner"> | Record<CacheTypeDef, "NewResolver"> | Record<CacheTypeDef, "NewTTL"> | Record<CacheTypeDef, "Transfer"> | Record<CacheTypeDef, "WrappedTransfer"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                domainEvents: {
                    type: (Record<CacheTypeDef, "FusesSet"> | Record<CacheTypeDef, "NameUnwrapped"> | Record<CacheTypeDef, "NameWrapped"> | Record<CacheTypeDef, "NewOwner"> | Record<CacheTypeDef, "NewResolver"> | Record<CacheTypeDef, "NewTTL"> | Record<CacheTypeDef, "Transfer"> | Record<CacheTypeDef, "WrappedTransfer">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof DomainEvent_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: DomainEvent_filter | null | undefined;
                    };
                };
                domains: {
                    type: (Record<CacheTypeDef, "Domain">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof Domain_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: Domain_filter | null | undefined;
                    };
                };
                fusesSet: {
                    type: Record<CacheTypeDef, "FusesSet"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                fusesSets: {
                    type: (Record<CacheTypeDef, "FusesSet">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof FusesSet_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: FusesSet_filter | null | undefined;
                    };
                };
                interfaceChanged: {
                    type: Record<CacheTypeDef, "InterfaceChanged"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                interfaceChangeds: {
                    type: (Record<CacheTypeDef, "InterfaceChanged">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof InterfaceChanged_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: InterfaceChanged_filter | null | undefined;
                    };
                };
                multicoinAddrChanged: {
                    type: Record<CacheTypeDef, "MulticoinAddrChanged"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                multicoinAddrChangeds: {
                    type: (Record<CacheTypeDef, "MulticoinAddrChanged">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof MulticoinAddrChanged_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: MulticoinAddrChanged_filter | null | undefined;
                    };
                };
                nameChanged: {
                    type: Record<CacheTypeDef, "NameChanged"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                nameChangeds: {
                    type: (Record<CacheTypeDef, "NameChanged">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof NameChanged_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: NameChanged_filter | null | undefined;
                    };
                };
                nameRegistered: {
                    type: Record<CacheTypeDef, "NameRegistered"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                nameRegistereds: {
                    type: (Record<CacheTypeDef, "NameRegistered">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof NameRegistered_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: NameRegistered_filter | null | undefined;
                    };
                };
                nameRenewed: {
                    type: Record<CacheTypeDef, "NameRenewed"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                nameReneweds: {
                    type: (Record<CacheTypeDef, "NameRenewed">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof NameRenewed_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: NameRenewed_filter | null | undefined;
                    };
                };
                nameTransferred: {
                    type: Record<CacheTypeDef, "NameTransferred"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                nameTransferreds: {
                    type: (Record<CacheTypeDef, "NameTransferred">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof NameTransferred_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: NameTransferred_filter | null | undefined;
                    };
                };
                nameUnwrapped: {
                    type: Record<CacheTypeDef, "NameUnwrapped"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                nameUnwrappeds: {
                    type: (Record<CacheTypeDef, "NameUnwrapped">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof NameUnwrapped_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: NameUnwrapped_filter | null | undefined;
                    };
                };
                nameWrapped: {
                    type: Record<CacheTypeDef, "NameWrapped"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                nameWrappeds: {
                    type: (Record<CacheTypeDef, "NameWrapped">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof NameWrapped_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: NameWrapped_filter | null | undefined;
                    };
                };
                newOwner: {
                    type: Record<CacheTypeDef, "NewOwner"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                newOwners: {
                    type: (Record<CacheTypeDef, "NewOwner">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof NewOwner_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: NewOwner_filter | null | undefined;
                    };
                };
                newResolver: {
                    type: Record<CacheTypeDef, "NewResolver"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                newResolvers: {
                    type: (Record<CacheTypeDef, "NewResolver">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof NewResolver_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: NewResolver_filter | null | undefined;
                    };
                };
                newTTL: {
                    type: Record<CacheTypeDef, "NewTTL"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                newTTLs: {
                    type: (Record<CacheTypeDef, "NewTTL">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof NewTTL_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: NewTTL_filter | null | undefined;
                    };
                };
                pubkeyChanged: {
                    type: Record<CacheTypeDef, "PubkeyChanged"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                pubkeyChangeds: {
                    type: (Record<CacheTypeDef, "PubkeyChanged">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof PubkeyChanged_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: PubkeyChanged_filter | null | undefined;
                    };
                };
                registration: {
                    type: Record<CacheTypeDef, "Registration"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                registrationEvent: {
                    type: Record<CacheTypeDef, "NameRegistered"> | Record<CacheTypeDef, "NameRenewed"> | Record<CacheTypeDef, "NameTransferred"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                registrationEvents: {
                    type: (Record<CacheTypeDef, "NameRegistered"> | Record<CacheTypeDef, "NameRenewed"> | Record<CacheTypeDef, "NameTransferred">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof RegistrationEvent_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: RegistrationEvent_filter | null | undefined;
                    };
                };
                registrations: {
                    type: (Record<CacheTypeDef, "Registration">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof Registration_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: Registration_filter | null | undefined;
                    };
                };
                resolver: {
                    type: Record<CacheTypeDef, "Resolver"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                resolverEvent: {
                    type: Record<CacheTypeDef, "AbiChanged"> | Record<CacheTypeDef, "AddrChanged"> | Record<CacheTypeDef, "AuthorisationChanged"> | Record<CacheTypeDef, "ContenthashChanged"> | Record<CacheTypeDef, "InterfaceChanged"> | Record<CacheTypeDef, "MulticoinAddrChanged"> | Record<CacheTypeDef, "NameChanged"> | Record<CacheTypeDef, "PubkeyChanged"> | Record<CacheTypeDef, "TextChanged"> | Record<CacheTypeDef, "VersionChanged"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                resolverEvents: {
                    type: (Record<CacheTypeDef, "AbiChanged"> | Record<CacheTypeDef, "AddrChanged"> | Record<CacheTypeDef, "AuthorisationChanged"> | Record<CacheTypeDef, "ContenthashChanged"> | Record<CacheTypeDef, "InterfaceChanged"> | Record<CacheTypeDef, "MulticoinAddrChanged"> | Record<CacheTypeDef, "NameChanged"> | Record<CacheTypeDef, "PubkeyChanged"> | Record<CacheTypeDef, "TextChanged"> | Record<CacheTypeDef, "VersionChanged">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof ResolverEvent_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: ResolverEvent_filter | null | undefined;
                    };
                };
                resolvers: {
                    type: (Record<CacheTypeDef, "Resolver">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof Resolver_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: Resolver_filter | null | undefined;
                    };
                };
                textChanged: {
                    type: Record<CacheTypeDef, "TextChanged"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                textChangeds: {
                    type: (Record<CacheTypeDef, "TextChanged">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof TextChanged_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: TextChanged_filter | null | undefined;
                    };
                };
                transfer: {
                    type: Record<CacheTypeDef, "Transfer"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                transfers: {
                    type: (Record<CacheTypeDef, "Transfer">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof Transfer_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: Transfer_filter | null | undefined;
                    };
                };
                versionChanged: {
                    type: Record<CacheTypeDef, "VersionChanged"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                versionChangeds: {
                    type: (Record<CacheTypeDef, "VersionChanged">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof VersionChanged_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: VersionChanged_filter | null | undefined;
                    };
                };
                wrappedDomain: {
                    type: Record<CacheTypeDef, "WrappedDomain"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                wrappedDomains: {
                    type: (Record<CacheTypeDef, "WrappedDomain">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof WrappedDomain_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: WrappedDomain_filter | null | undefined;
                    };
                };
                wrappedTransfer: {
                    type: Record<CacheTypeDef, "WrappedTransfer"> | null;
                    args: {
                        block?: Block_height | null | undefined;
                        id: string;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                    };
                };
                wrappedTransfers: {
                    type: (Record<CacheTypeDef, "WrappedTransfer">)[];
                    args: {
                        block?: Block_height | null | undefined;
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof WrappedTransfer_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        subgraphError: ValueOf<typeof _SubgraphErrorPolicy_>;
                        where?: WrappedTransfer_filter | null | undefined;
                    };
                };
            };
            fragments: [];
        };
        Registration: {
            idFields: {
                id: string;
            };
            fields: {
                cost: {
                    type: string | null;
                    args: never;
                };
                domain: {
                    type: Record<CacheTypeDef, "Domain">;
                    args: never;
                };
                events: {
                    type: (Record<CacheTypeDef, "NameRegistered"> | Record<CacheTypeDef, "NameRenewed"> | Record<CacheTypeDef, "NameTransferred">)[];
                    args: {
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof RegistrationEvent_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        where?: RegistrationEvent_filter | null | undefined;
                    };
                };
                expiryDate: {
                    type: string;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                labelName: {
                    type: string | null;
                    args: never;
                };
                registrant: {
                    type: Record<CacheTypeDef, "Account">;
                    args: never;
                };
                registrationDate: {
                    type: string;
                    args: never;
                };
            };
            fragments: [];
        };
        Resolver: {
            idFields: {
                id: string;
            };
            fields: {
                addr: {
                    type: Record<CacheTypeDef, "Account"> | null;
                    args: never;
                };
                address: {
                    type: string;
                    args: never;
                };
                coinTypes: {
                    type: (string)[] | null;
                    args: never;
                };
                contentHash: {
                    type: string | null;
                    args: never;
                };
                domain: {
                    type: Record<CacheTypeDef, "Domain"> | null;
                    args: never;
                };
                events: {
                    type: (Record<CacheTypeDef, "AbiChanged"> | Record<CacheTypeDef, "AddrChanged"> | Record<CacheTypeDef, "AuthorisationChanged"> | Record<CacheTypeDef, "ContenthashChanged"> | Record<CacheTypeDef, "InterfaceChanged"> | Record<CacheTypeDef, "MulticoinAddrChanged"> | Record<CacheTypeDef, "NameChanged"> | Record<CacheTypeDef, "PubkeyChanged"> | Record<CacheTypeDef, "TextChanged"> | Record<CacheTypeDef, "VersionChanged">)[];
                    args: {
                        first?: number | null | undefined;
                        orderBy?: ValueOf<typeof ResolverEvent_orderBy> | null | undefined;
                        orderDirection?: ValueOf<typeof OrderDirection> | null | undefined;
                        skip?: number | null | undefined;
                        where?: ResolverEvent_filter | null | undefined;
                    };
                };
                id: {
                    type: string;
                    args: never;
                };
                texts: {
                    type: (string)[] | null;
                    args: never;
                };
            };
            fragments: [];
        };
        TextChanged: {
            idFields: {
                id: string;
            };
            fields: {
                blockNumber: {
                    type: number;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                key: {
                    type: string;
                    args: never;
                };
                resolver: {
                    type: Record<CacheTypeDef, "Resolver">;
                    args: never;
                };
                transactionID: {
                    type: string;
                    args: never;
                };
                value: {
                    type: string | null;
                    args: never;
                };
            };
            fragments: [];
        };
        Transfer: {
            idFields: {
                id: string;
            };
            fields: {
                blockNumber: {
                    type: number;
                    args: never;
                };
                domain: {
                    type: Record<CacheTypeDef, "Domain">;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                owner: {
                    type: Record<CacheTypeDef, "Account">;
                    args: never;
                };
                transactionID: {
                    type: string;
                    args: never;
                };
            };
            fragments: [];
        };
        VersionChanged: {
            idFields: {
                id: string;
            };
            fields: {
                blockNumber: {
                    type: number;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                resolver: {
                    type: Record<CacheTypeDef, "Resolver">;
                    args: never;
                };
                transactionID: {
                    type: string;
                    args: never;
                };
                version: {
                    type: string;
                    args: never;
                };
            };
            fragments: [];
        };
        WrappedDomain: {
            idFields: {
                id: string;
            };
            fields: {
                domain: {
                    type: Record<CacheTypeDef, "Domain">;
                    args: never;
                };
                expiryDate: {
                    type: string;
                    args: never;
                };
                fuses: {
                    type: string;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                labelName: {
                    type: string | null;
                    args: never;
                };
                owner: {
                    type: Record<CacheTypeDef, "Account">;
                    args: never;
                };
            };
            fragments: [];
        };
        WrappedTransfer: {
            idFields: {
                id: string;
            };
            fields: {
                blockNumber: {
                    type: number;
                    args: never;
                };
                domain: {
                    type: Record<CacheTypeDef, "Domain">;
                    args: never;
                };
                id: {
                    type: string;
                    args: never;
                };
                owner: {
                    type: Record<CacheTypeDef, "Account">;
                    args: never;
                };
                transactionID: {
                    type: string;
                    args: never;
                };
            };
            fragments: [];
        };
        _Block_: {
            idFields: never;
            fields: {
                hash: {
                    type: string | null;
                    args: never;
                };
                number: {
                    type: number;
                    args: never;
                };
                timestamp: {
                    type: number | null;
                    args: never;
                };
            };
            fragments: [];
        };
        _Meta_: {
            idFields: never;
            fields: {
                block: {
                    type: Record<CacheTypeDef, "_Block_">;
                    args: never;
                };
                deployment: {
                    type: string;
                    args: never;
                };
                hasIndexingErrors: {
                    type: boolean;
                    args: never;
                };
            };
            fragments: [];
        };
    };
    lists: {};
    queries: [[ENSDomainQueryStore, ENSDomainQuery$result, ENSDomainQuery$input], [ENSDomainsContainingQueryStore, ENSDomainsContainingQuery$result, ENSDomainsContainingQuery$input]];
};