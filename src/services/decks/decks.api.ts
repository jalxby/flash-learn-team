import { commonApi } from '@/services/common/common.api.ts'
import { Paginated } from '@/services/common/types.ts'
import {
  ArgCreateDeck,
  ArgGetDecks,
  ArgUpdateDeck,
  Deck,
} from '@/services/decks/decks.api.types.ts'

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
    getDeck: builder.query<Deck, { id: string }>({
      query: ({ id }) => ({
        url: `/v1/decks/${id}`,
      }),
    }),
    createDeck: builder.mutation<Deck, ArgCreateDeck>({
      query: body => ({
        method: 'POST',
        url: '/v1/decks',
        body,
      }),
      invalidatesTags: ['UPDATE_DECKS'],
    }),
    removeDeck: builder.mutation<Omit<Deck, 'author'>, { id: string }>({
      query: params => ({
        method: 'DELETE',
        url: `v1/decks/${params.id}`,
      }),
      invalidatesTags: ['UPDATE_DECKS'],
    }),
    updateDeck: builder.mutation<Deck, ArgUpdateDeck>({
      query: ({ id, name, cover, isPrivate }) => ({
        method: 'PATCH',
        url: `/v1/decks/${id}`,
        body: { name, cover, isPrivate },
      }),
      invalidatesTags: ['UPDATE_DECKS'],
    }),
  }),
  overrideExisting: true,
})

export const {
  useUpdateDeckMutation,
  useGetDecksQuery,
  useCreateDeckMutation,
  useRemoveDeckMutation,
  useGetDeckQuery,
} = decksAPI
