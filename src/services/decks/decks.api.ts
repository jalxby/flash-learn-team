import { api } from '@/services/common/common.api.ts'
import { ArgGetDecks, Decks } from '@/services/decks/decks.api.types.ts'

const decksAPI = api.injectEndpoints({
  endpoints: build => ({
    getDecks: build.query<Decks, ArgGetDecks | void>({
      query: () => {
        return {
          method: 'GET',
          url: 'v1/decks',
        }
      },
    }),
  }),
  overrideExisting: true,
})

export const { useGetDecksQuery } = decksAPI
