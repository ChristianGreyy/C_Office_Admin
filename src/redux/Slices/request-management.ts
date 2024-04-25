import { createSlice } from '@reduxjs/toolkit'

import { IRequestDetail } from '@interfaces'
import { RootState } from '.'
import { getAllRequestsAction, getRequestByIdAction, updateRequestByIdAction } from '../actions'
interface IRequestsState {
  requests: IRequestDetail[] | null
  request: IRequestDetail | null
  requestsCurrentPage: string | number
  requestsTotalPage: string | number
  requestsTotalItems: string | number
  selectedRequest: IRequestDetail | null

  loadings: Record<string, boolean | undefined>
}

const initialState: IRequestsState = {
  requests: [],
  request: null,
  requestsCurrentPage: 0,
  requestsTotalPage: 0,
  requestsTotalItems: 0,
  selectedRequest: null,
  loadings: {},
}

const requestsSlice = createSlice({
  name: 'requests',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllRequestsAction.pending, (state) => {
      state.loadings[`getAllRequestsActionLoading`] = true
    })
    builder.addCase(getAllRequestsAction.fulfilled, (state, action) => {
      state.loadings[`getAllRequestsActionLoading`] = false
      state.requests = action.payload?.items ?? []
      state.requestsCurrentPage = action.payload?.page ?? 0
      state.requestsTotalPage = action.payload?.limit ?? 0
      state.requestsTotalItems = action.payload?.total ?? 0
    })
    builder.addCase(getAllRequestsAction.rejected, (state) => {
      state.loadings[`getAllRequestsActionLoading`] = false
    })
    builder.addCase(getRequestByIdAction.pending, (state) => {
      state.loadings[`getRequestByIdActionLoading`] = true
    })
    builder.addCase(getRequestByIdAction.fulfilled, (state, action) => {
      state.loadings[`getRequestByIdActionLoading`] = false
      state.request = action.payload ?? {}
    })
    builder.addCase(getRequestByIdAction.rejected, (state) => {
      state.loadings[`getRequestByIdActionLoading`] = false
    })
    builder.addCase(updateRequestByIdAction.pending, (state) => {
      state.loadings[`updateRequestByIdActionLoading`] = true
    })
    builder.addCase(updateRequestByIdAction.fulfilled, (state, action) => {
      state.loadings[`updateRequestByIdActionLoading`] = false
      state.selectedRequest = action.payload
    })
    builder.addCase(updateRequestByIdAction.rejected, (state) => {
      state.loadings[`updateRequestByIdActionLoading`] = false
    })
  },
})

export const requestsActions = {
  ...requestsSlice.actions,
}

export const selectRequestsLoading = (state: RootState, name: string) =>
  state.plans.loadings[`${name}Loading`]

export default requestsSlice.reducer
