export type Paginated<T> = {
  pagination: Pagination
  items: T[]
}
export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalPages: number
  totalItems: number
}
