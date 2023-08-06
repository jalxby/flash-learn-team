import { RootState } from '@/app/store.ts'
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
  GetDeckType,
  LearnCard,
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
    getDeck: builder.query<GetDeckType, { id: string }>({
      query: ({ id }) => ({
        url: `/v1/decks/${id}`,
      }),
    }),
    learnCard: builder.query<LearnCard, { id: string }>({
      query: ({ id }) => ({
        method: 'GET',
        url: `v1/decks/${id}/learn`,
      }),
      providesTags: ['LEARN_CARD'],
    }),
    createDeck: builder.mutation<Deck, ArgCreateDeck>({
      query: body => {
        return {
          method: 'POST',
          url: '/v1/decks',
          body,
        }
      },
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
      query: data => {
        return {
          method: 'PATCH',
          url: `/v1/decks/${data.id}`,
          body: data.formData,
        }
      },
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
      async onQueryStarted({ id, grade, cardId }, { dispatch, queryFulfilled, getState }) {
        const state = getState() as RootState
        const patchResult = dispatch(
          decksAPI.util.updateQueryData(
            'getCards',
            {
              id,
              itemsPerPage: +state.cardsParams.pageSize,
              currentPage: state.cardsParams.page,
              orderBy: state.cardsParams.orderBy,
              answer: state.cardsParams.nameToSearch,
            },
            draft => {
              const card = draft.items.find(card => {
                return card.id === cardId
              })

              if (card) card.grade = grade
            }
          )
        )

        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: ['UPDATE_CARDS', 'LEARN_CARD'],
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
