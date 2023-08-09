import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Sort } from '@/components'

const initialState = {
  page: 1,
  pageSize: '7',
  sort: null as null | Sort,
  nameToSearch: '',
}

const slice = createSlice({
  name: 'cardsParams',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<{ page: number }>) => {
      state.page = action.payload.page
    },
    setPageSize: (state, action: PayloadAction<{ pageSize: string }>) => {
      state.pageSize = action.payload.pageSize
    },
    setSort: (state, action: PayloadAction<{ sort: Sort }>) => {
      state.sort = action.payload.sort
    },
    setNameToSearch: (state, action: PayloadAction<{ name: string }>) => {
      state.nameToSearch = action.payload.name
    },
  },
})

export const cardsReducer = slice.reducer
export const cardsActions = slice.actions
