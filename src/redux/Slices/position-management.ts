import { createSlice } from '@reduxjs/toolkit'

import { IPositionDetail } from '@interfaces'
import { RootState } from '.'
import { getAllPositionsAction, getPositionByIdAction, updatePositionByIdAction } from '../actions'
interface IPositionsState {
  positions: IPositionDetail[] | null
  position: IPositionDetail | null
  positionsCurrentPage: string | number
  positionsTotalPage: string | number
  positionsTotalItems: string | number
  selectedPosition: IPositionDetail | null

  loadings: Record<string, boolean | undefined>
}

const initialState: IPositionsState = {
  positions: [],
  position: null,
  positionsCurrentPage: 0,
  positionsTotalPage: 0,
  positionsTotalItems: 0,
  selectedPosition: null,
  loadings: {},
}

const positionsSlice = createSlice({
  name: 'positions',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPositionsAction.pending, (state) => {
      state.loadings[`getAllPositionsActionLoading`] = true
    })
    builder.addCase(getAllPositionsAction.fulfilled, (state, action) => {
      state.loadings[`getAllPositionsActionLoading`] = false
      state.positions = action.payload?.items ?? []
      state.positionsCurrentPage = action.payload?.page ?? 0
      state.positionsTotalPage = action.payload?.limit ?? 0
      state.positionsTotalItems = action.payload?.total ?? 0
    })
    builder.addCase(getAllPositionsAction.rejected, (state) => {
      state.loadings[`getAllPositionsActionLoading`] = false
    })
    builder.addCase(getPositionByIdAction.pending, (state) => {
      state.loadings[`getPositionByIdActionLoading`] = true
    })
    builder.addCase(getPositionByIdAction.fulfilled, (state, action) => {
      state.loadings[`getPositionByIdActionLoading`] = false
      state.position = action.payload ?? {}
    })
    builder.addCase(getPositionByIdAction.rejected, (state) => {
      state.loadings[`getPositionByIdActionLoading`] = false
    })
    builder.addCase(updatePositionByIdAction.pending, (state) => {
      state.loadings[`updatePositionByIdActionLoading`] = true
    })
    builder.addCase(updatePositionByIdAction.fulfilled, (state, action) => {
      state.loadings[`updatePositionByIdActionLoading`] = false
      state.selectedPosition = action.payload
    })
    builder.addCase(updatePositionByIdAction.rejected, (state) => {
      state.loadings[`updatePositionByIdActionLoading`] = false
    })
  },
})

export const positionsActions = {
  ...positionsSlice.actions,
}

export const selectPositionsLoading = (state: RootState, name: string) =>
  state.plans.loadings[`${name}Loading`]

export default positionsSlice.reducer
