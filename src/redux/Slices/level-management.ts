import { createSlice } from '@reduxjs/toolkit'

import { ILevelDetail } from '@interfaces'
import { RootState } from '.'
import { getAllLevelsAction, getLevelByIdAction, updateLevelByIdAction } from '../actions'
interface ILevelsState {
  levels: ILevelDetail[] | null
  level: ILevelDetail | null
  levelsCurrentPage: string | number
  levelsTotalPage: string | number
  levelsTotalItems: string | number
  selectedLevel: ILevelDetail | null

  loadings: Record<string, boolean | undefined>
}

const initialState: ILevelsState = {
  levels: [],
  level: null,
  levelsCurrentPage: 0,
  levelsTotalPage: 0,
  levelsTotalItems: 0,
  selectedLevel: null,
  loadings: {},
}

const levelsSlice = createSlice({
  name: 'levels',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllLevelsAction.pending, (state) => {
      state.loadings[`getAllLevelsActionLoading`] = true
    })
    builder.addCase(getAllLevelsAction.fulfilled, (state, action) => {
      state.loadings[`getAllLevelsActionLoading`] = false
      state.levels = action.payload?.items ?? []
      state.levelsCurrentPage = action.payload?.page ?? 0
      state.levelsTotalPage = action.payload?.limit ?? 0
      state.levelsTotalItems = action.payload?.total ?? 0
    })
    builder.addCase(getAllLevelsAction.rejected, (state) => {
      state.loadings[`getAllLevelsActionLoading`] = false
    })
    builder.addCase(getLevelByIdAction.pending, (state) => {
      state.loadings[`getLevelByIdActionLoading`] = true
    })
    builder.addCase(getLevelByIdAction.fulfilled, (state, action) => {
      state.loadings[`getLevelByIdActionLoading`] = false
      state.level = action.payload ?? {}
    })
    builder.addCase(getLevelByIdAction.rejected, (state) => {
      state.loadings[`getLevelByIdActionLoading`] = false
    })
    builder.addCase(updateLevelByIdAction.pending, (state) => {
      state.loadings[`updateLevelByIdActionLoading`] = true
    })
    builder.addCase(updateLevelByIdAction.fulfilled, (state, action) => {
      state.loadings[`updateLevelByIdActionLoading`] = false
      state.selectedLevel = action.payload
    })
    builder.addCase(updateLevelByIdAction.rejected, (state) => {
      state.loadings[`updateLevelByIdActionLoading`] = false
    })
  },
})

export const levelsActions = {
  ...levelsSlice.actions,
}

export const selectLevelsLoading = (state: RootState, name: string) =>
  state.plans.loadings[`${name}Loading`]

export default levelsSlice.reducer
