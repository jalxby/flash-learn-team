import { commonApi } from '@/services/common/common.api.ts'
import { GetArgs, Paginated } from '@/services/common/types.ts'
import {
  ArgCreateCard,
  ArgCreateDeck,
  ArgUpdateDeck,
  Card,
  CardsParams,
  Deck,
  DecksParams,
} from '@/services/decks/decks.api.types.ts'

export const decksAPI = commonApi.injectEndpoints({
  endpoints: builder => ({
    getDecks: builder.query<Paginated<Deck> & { maxCardsCount: number }, GetArgs<DecksParams>>({
      query: params => ({
        method: 'GET',
        url: 'v1/decks',
        params: params ?? undefined,
      }),
      providesTags: ['UPDATE_DECKS'],
    }),
    getCards: builder.query<Paginated<Card>, GetArgs<CardsParams>>({
      query: ({ id, ...rest }) => ({
        method: 'GET',
        url: `/v1/decks/${id}/cards`,
        params: { ...rest },
      }),
      providesTags: ['UPDATE_CARDS'],
    }),
    getDeck: builder.query<Omit<Deck, 'author'>, { id: string }>({
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
      query: ({ id, ...rest }) => ({
        method: 'PATCH',
        url: `/v1/decks/${id}`,
        body: { ...rest },
      }),
      invalidatesTags: ['UPDATE_DECKS'],
    }),
    createCard: builder.mutation<any, ArgCreateCard>({
      query: ({ id, ...body }) => {
        return {
          method: 'POST',
          url: `/v1/decks/${id}/cards`,
          body,
        }
      },
      invalidatesTags: ['UPDATE_CARDS'],
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
  useGetCardsQuery,
  useCreateCardMutation,
} = decksAPI
