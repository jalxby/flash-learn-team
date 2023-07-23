import { commonApi } from '@/services/common/common.api.ts'
import { Paginated } from '@/services/common/types.ts'
import { ArgCreateDeck, ArgGetDecks, Deck } from '@/services/decks/decks.api.types.ts'

export const decksAPI = commonApi.injectEndpoints({
  endpoints: builder => ({
    getDecks: builder.query<Paginated<Deck> & { maxCardsCount: number }, ArgGetDecks>({
      query: params => ({
        method: 'GET',
        url: 'v1/decks',
        params: params ?? undefined,
      }),
      providesTags: ['UPDATE_DECKS'],
    }),
    createDeck: builder.mutation<Deck, ArgCreateDeck>({
      query: body => ({
        method: 'POST',
        url: '/v1/decks',
        body,
      }),
      invalidatesTags: ['UPDATE_DECKS'],
    }),
  }),
  overrideExisting: true,
})

export const { useGetDecksQuery, useCreateDeckMutation } = decksAPI
