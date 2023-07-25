import { GradeType } from '@/components'

export type Author = {
  id: string
  name: string
}

export type Deck = {
  id: string
  userId: string
  name: string
  isPrivate: boolean
  shots: number
  cover?: any
  rating: number
  isDeleted?: any
  isBlocked?: any
  created: string
  updated: string
  cardsCount: number
  author: Author
}
export type Decks = Deck[]
export type DecksParams = {
  minCardsCount?: string
  maxCardsCount?: string
  name?: string
  authorId?: string
}
export type ArgCreateDeck = {
  cover?: string
  name: string
  isPrivate?: boolean
}
export type ArgUpdateDeck = ArgCreateDeck & { id: string }
export type CardsParams = {
  id: string
  question?: string
  answer?: string
}

export type ArgCreateCard = {
  id: string
  question: string
  answer: string
  questionImg?: string
  answerImg?: string
  questionVideo?: string
  answerVideo?: string
}

export type Card = {
  userId: string
  shots: number
  comments?: any
  type?: any
  rating: number
  moreId?: any
  grade: GradeType
} & LearnCard
export type ArgGradeUpdate = {
  id: string
  cardId: string
  grade: GradeType
}
export type LearnCard = {
  id: string
  question: string
  answer: string
  deckId: string
  questionImg?: any
  answerImg?: any
  questionVideo?: any
  answerVideo?: any
  created: string
  updated: string
}
