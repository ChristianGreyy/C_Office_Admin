import { createSlice } from '@reduxjs/toolkit'

import { IStatusDetail } from '@interfaces'
import { RootState } from '.'
import { getAllStatusAction, getStatusByIdAction, updateStatusByIdAction } from '../actions'
interface IStatusState {
  statuses: IStatusDetail[] | null
  status: IStatusDetail | null
  statusCurrentPage: string | number
  statusTotalPage: string | number
  statusTotalItems: string | number
  selectedStatus: IStatusDetail | null

  loadings: Record<string, boolean | undefined>
}

const initialState: IStatusState = {
  statuses: [],
  status: null,
  statusCurrentPage: 0,
  statusTotalPage: 0,
  statusTotalItems: 0,
  selectedStatus: null,
  loadings: {},
}

const statusSlice = createSlice({
  name: 'status',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllStatusAction.pending, (state) => {
      state.loadings[`getAllStatusActionLoading`] = true
    })
    builder.addCase(getAllStatusAction.fulfilled, (state, action) => {
      state.loadings[`getAllStatusActionLoading`] = false
      state.statuses = action.payload?.items ?? []
      state.statusCurrentPage = action.payload?.page ?? 0
      state.statusTotalPage = action.payload?.limit ?? 0
      state.statusTotalItems = action.payload?.total ?? 0
    })
    builder.addCase(getAllStatusAction.rejected, (state) => {
      state.loadings[`getAllStatusActionLoading`] = false
    })
    builder.addCase(getStatusByIdAction.pending, (state) => {
      state.loadings[`getStatusByIdActionLoading`] = true
    })
    builder.addCase(getStatusByIdAction.fulfilled, (state, action) => {
      state.loadings[`getStatusByIdActionLoading`] = false
      state.status = action.payload ?? {}
    })
    builder.addCase(getStatusByIdAction.rejected, (state) => {
      state.loadings[`getStatusByIdActionLoading`] = false
    })
    builder.addCase(updateStatusByIdAction.pending, (state) => {
      state.loadings[`updateStatusByIdActionLoading`] = true
    })
    builder.addCase(updateStatusByIdAction.fulfilled, (state, action) => {
      state.loadings[`updateStatusByIdActionLoading`] = false
      state.selectedStatus = action.payload
    })
    builder.addCase(updateStatusByIdAction.rejected, (state) => {
      state.loadings[`updateStatusByIdActionLoading`] = false
    })
  },
})

export const statusActions = {
  ...statusSlice.actions,
}

export const selectStatusLoading = (state: RootState, name: string) =>
  state.plans.loadings[`${name}Loading`]

export default statusSlice.reducer
