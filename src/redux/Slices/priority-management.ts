import { createSlice } from '@reduxjs/toolkit'

import { IPriorityDetail } from '@interfaces'
import { RootState } from '.'
import { getAllPrioritiesAction, getPriorityByIdAction, updatePriorityByIdAction } from '../actions'
interface IPrioritiesState {
  priorities: IPriorityDetail[] | null
  priority: IPriorityDetail | null
  prioritiesCurrentPage: string | number
  prioritiesTotalPage: string | number
  prioritiesTotalItems: string | number
  selectedPriority: IPriorityDetail | null

  loadings: Record<string, boolean | undefined>
}

const initialState: IPrioritiesState = {
  priorities: [],
  priority: null,
  prioritiesCurrentPage: 0,
  prioritiesTotalPage: 0,
  prioritiesTotalItems: 0,
  selectedPriority: null,
  loadings: {},
}

const prioritiesSlice = createSlice({
  name: 'priorities',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPrioritiesAction.pending, (state) => {
      state.loadings[`getAllPrioritiesActionLoading`] = true
    })
    builder.addCase(getAllPrioritiesAction.fulfilled, (state, action) => {
      state.loadings[`getAllPrioritiesActionLoading`] = false
      state.priorities = action.payload?.items ?? []
      state.prioritiesCurrentPage = action.payload?.page ?? 0
      state.prioritiesTotalPage = action.payload?.limit ?? 0
      state.prioritiesTotalItems = action.payload?.total ?? 0
    })
    builder.addCase(getAllPrioritiesAction.rejected, (state) => {
      state.loadings[`getAllPrioritiesActionLoading`] = false
    })
    builder.addCase(getPriorityByIdAction.pending, (state) => {
      state.loadings[`getPriorityByIdActionLoading`] = true
    })
    builder.addCase(getPriorityByIdAction.fulfilled, (state, action) => {
      state.loadings[`getPriorityByIdActionLoading`] = false
      state.priority = action.payload ?? {}
    })
    builder.addCase(getPriorityByIdAction.rejected, (state) => {
      state.loadings[`getPriorityByIdActionLoading`] = false
    })
    builder.addCase(updatePriorityByIdAction.pending, (state) => {
      state.loadings[`updatePriorityByIdActionLoading`] = true
    })
    builder.addCase(updatePriorityByIdAction.fulfilled, (state, action) => {
      state.loadings[`updatePriorityByIdActionLoading`] = false
      state.selectedPriority = action.payload
    })
    builder.addCase(updatePriorityByIdAction.rejected, (state) => {
      state.loadings[`updatePriorityByIdActionLoading`] = false
    })
  },
})

export const prioritiesActions = {
  ...prioritiesSlice.actions,
}

export const selectPrioritiesLoading = (state: RootState, name: string) =>
  state.plans.loadings[`${name}Loading`]

export default prioritiesSlice.reducer
