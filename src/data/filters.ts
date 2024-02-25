export const TREE_FILTERS = ['created', 'A-Z', 'opened','updated'] as const
export type TreeFilters =typeof TREE_FILTERS[number]