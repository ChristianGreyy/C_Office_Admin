import { createSlice } from '@reduxjs/toolkit'

import { ITrackerDetail } from '@interfaces'
import { RootState } from '.'
import { getAllTrackersAction, getTrackerByIdAction, updateTrackerByIdAction } from '../actions'
interface ITrackersState {
  trackers: ITrackerDetail[] | null
  tracker: ITrackerDetail | null
  trackersCurrentPage: string | number
  trackersTotalPage: string | number
  trackersTotalItems: string | number
  selectedTracker: ITrackerDetail | null

  loadings: Record<string, boolean | undefined>
}

const initialState: ITrackersState = {
  trackers: [],
  tracker: null,
  trackersCurrentPage: 0,
  trackersTotalPage: 0,
  trackersTotalItems: 0,
  selectedTracker: null,
  loadings: {},
}

const trackersSlice = createSlice({
  name: 'trackers',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTrackersAction.pending, (state) => {
      state.loadings[`getAllTrackersActionLoading`] = true
    })
    builder.addCase(getAllTrackersAction.fulfilled, (state, action) => {
      state.loadings[`getAllTrackersActionLoading`] = false
      state.trackers = action.payload?.items ?? []
      state.trackersCurrentPage = action.payload?.page ?? 0
      state.trackersTotalPage = action.payload?.limit ?? 0
      state.trackersTotalItems = action.payload?.total ?? 0
    })
    builder.addCase(getAllTrackersAction.rejected, (state) => {
      state.loadings[`getAllTrackersActionLoading`] = false
    })
    builder.addCase(getTrackerByIdAction.pending, (state) => {
      state.loadings[`getTrackerByIdActionLoading`] = true
    })
    builder.addCase(getTrackerByIdAction.fulfilled, (state, action) => {
      state.loadings[`getTrackerByIdActionLoading`] = false
      state.tracker = action.payload ?? {}
    })
    builder.addCase(getTrackerByIdAction.rejected, (state) => {
      state.loadings[`getTrackerByIdActionLoading`] = false
    })
    builder.addCase(updateTrackerByIdAction.pending, (state) => {
      state.loadings[`updateTrackerByIdActionLoading`] = true
    })
    builder.addCase(updateTrackerByIdAction.fulfilled, (state, action) => {
      state.loadings[`updateTrackerByIdActionLoading`] = false
      state.selectedTracker = action.payload
    })
    builder.addCase(updateTrackerByIdAction.rejected, (state) => {
      state.loadings[`updateTrackerByIdActionLoading`] = false
    })
  },
})

export const trackersActions = {
  ...trackersSlice.actions,
}

export const selectTrackersLoading = (state: RootState, name: string) =>
  state.plans.loadings[`${name}Loading`]

export default trackersSlice.reducer
