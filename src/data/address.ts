import type { Ethereum } from './networks/types'
import type { BrandedString } from '$/utils/branded'

export type NetworkAccountAddress = Ethereum.Address | BrandedString<'NetworkAccountAddress'>
