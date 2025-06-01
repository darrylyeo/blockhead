import { DataSource } from '$/data'

// Global store for the selected datasource
export const selectedDatasource = $state({
	current: DataSource.Blockscout
}) 