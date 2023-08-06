import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
  page: 1,
  pageSize: '7',
  orderBy: null as null | string,
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
    setSort: (state, action: PayloadAction<{ orderBy: string | null }>) => {
      state.orderBy = action.payload.orderBy
    },
    setNameToSearch: (state, action: PayloadAction<{ name: string }>) => {
      state.nameToSearch = action.payload.name
    },
  },
})

export const cardsReducer = slice.reducer
export const cardsActions = slice.actions
