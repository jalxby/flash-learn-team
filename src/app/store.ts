import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { commonApi } from '@/services/common/common.api.ts'
import { decksReducer } from '@/services/decks/decks.params.slice.ts'

export const store = configureStore({
  reducer: {
    decksParams: decksReducer,
    [commonApi.reducerPath]: commonApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(commonApi.middleware),
})

setupListeners(store.dispatch)
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
