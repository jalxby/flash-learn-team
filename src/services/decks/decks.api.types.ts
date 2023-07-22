export type Author = {
  id: string
  name: string
}

export type DecksItem = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover: string | null
  rating: number
  created: string
  updated: string
  cardsCount: number
  author: Author
}

export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalPages: number
  totalItems: number
}

export type Decks = {
  items: DecksItem[]
  pagination: Pagination
  maxCardsCount: number
}

export type ArgGetDecks = {
  minCardsCount?: string
  maxCardsCount?: string
  name?: string
  authorId?: string
  orderBy?: string
  currentPage?: string
  itemsPerPage?: string
}
