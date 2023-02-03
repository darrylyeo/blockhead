
import type { ENSDomainsContainingQuery$input } from '../../../artifacts/ENSDomainsContainingQuery'
                    
import type { ENSDomainQuery$input } from '../../../artifacts/ENSDomainQuery'
                    
import EnsSearchLoader from './EnsSearchLoader.svelte'
		import type { ComponentProps } from 'svelte'
type EnsSearchLoaderProps = ComponentProps<EnsSearchLoader>

export type ENSDomainQueryVariables = <_Props = EnsSearchLoaderProps>(args: { props: _Props }) => FragmentQueryVars$input
        
export type ENSDomainsContainingQueryVariables = <_Props = EnsSearchLoaderProps>(args: { props: _Props }) => FragmentQueryVars$input
        