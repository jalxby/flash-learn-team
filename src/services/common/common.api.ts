import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'

export const commonApi = createApi({
  reducerPath: 'commonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_API_URL,
    credentials: 'include',
  }),
  tagTypes: ['ME', 'UPDATE_DECKS'],
  endpoints: () => ({}),
})
