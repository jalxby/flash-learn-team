import { commonApi } from '@/services/common/common.api.ts'
import { GetArgs, Paginated } from '@/services/common/common.api.types.ts'
import {
  ArgCreateCard,
  ArgCreateDeck,
  ArgGradeUpdate,
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
    learnCard: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        method: 'GET',
        url: `v1/decks/${id}/learn`,
      }),
      // providesTags: ['LEARN_CARD'],
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
    createCard: builder.mutation<Card, ArgCreateCard>({
      query: ({ id, ...body }) => {
        return {
          method: 'POST',
          url: `/v1/decks/${id}/cards`,
          body,
        }
      },
      invalidatesTags: ['UPDATE_CARDS'],
    }),
    updateCardGrade: builder.mutation<Paginated<Card>, ArgGradeUpdate>({
      query: ({ id, ...body }) => ({
        method: 'POST',
        url: `/v1/decks/${id}/learn`,
        body,
      }),
      async onQueryStarted({ id, grade, cardId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          decksAPI.util.updateQueryData('getCards', { id }, draft => {
            const card = draft.items.find(card => card.id === cardId)

            if (card) card.grade = grade
          })
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: ['UPDATE_CARDS'],
    }),
  }),
  overrideExisting: true,
})

export const {
  useLearnCardQuery,
  useUpdateDeckMutation,
  useGetDecksQuery,
  useCreateDeckMutation,
  useRemoveDeckMutation,
  useGetDeckQuery,
  useGetCardsQuery,
  useCreateCardMutation,
  useUpdateCardGradeMutation,
} = decksAPI
