import { RootState } from '@/app/store.ts'

export const selectPage = (state: RootState) => state.decksParams.page
export const selectPageSize = (state: RootState) => state.decksParams.pageSize
export const selectSort = (state: RootState) => state.decksParams.sort
export const selectNameToSearch = (state: RootState) => state.decksParams.nameToSearch
export const selectMinSlider = (state: RootState) => state.decksParams.minSlider
export const selectMaxSlider = (state: RootState) => state.decksParams.maxSlider
export const selectIsMyDecks = (state: RootState) => state.decksParams.isMyDecks
