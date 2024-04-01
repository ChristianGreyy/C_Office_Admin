import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '.'
import {
  fetchPlansAction,
  fetchPlanDetailAction,
  deletePlanAction,
  createPlanAction,
  updatePlanAction,
} from '../actions'
import { IPlanDetail } from '@interfaces'
interface IPlansState {
  plans: IPlanDetail[] | null
  plansCurrentPage: string | number
  plansTotalPage: string | number
  plansTotalItems: string | number
  selectedPlan: IPlanDetail | null

  loadings: Record<string, boolean | undefined>
}

const initialState: IPlansState = {
  plans: [],
  plansCurrentPage: 0,
  plansTotalPage: 0,
  plansTotalItems: 0,
  selectedPlan: null,
  loadings: {},
}

const planSlice = createSlice({
  name: 'plans',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPlansAction.pending, (state) => {
      state.loadings[`fetchPlansActionLoading`] = true
    })
    builder.addCase(fetchPlansAction.fulfilled, (state, action) => {
      state.loadings[`fetchPlansActionLoading`] = false
      state.plans = action.payload?.result
      state.plansCurrentPage = action.payload?.currentPage ?? 0
      state.plansTotalPage = action.payload?.totalPage ?? 0
      state.plansTotalItems = action.payload?.totalItems ?? 0
    })
    builder.addCase(fetchPlansAction.rejected, (state) => {
      state.loadings[`fetchPlansActionLoading`] = false
    })
    builder.addCase(fetchPlanDetailAction.pending, (state) => {
      state.loadings[`fetchPlanDetailActionLoading`] = true
    })
    builder.addCase(fetchPlanDetailAction.fulfilled, (state, action) => {
      state.loadings[`fetchPlanDetailActionLoading`] = false
      state.selectedPlan = action.payload
    })
    builder.addCase(fetchPlanDetailAction.rejected, (state) => {
      state.loadings[`fetchPlanDetailActionLoading`] = false
    })
    builder.addCase(createPlanAction.pending, (state) => {
      state.loadings[`createPlanActionLoading`] = true
    })
    builder.addCase(createPlanAction.fulfilled, (state, action) => {
      state.loadings[`createPlanActionLoading`] = false
      state.selectedPlan = action.payload
    })
    builder.addCase(createPlanAction.rejected, (state) => {
      state.loadings[`createPlanActionLoading`] = false
    })
    builder.addCase(updatePlanAction.pending, (state) => {
      state.loadings[`updatePlanActionLoading`] = true
    })
    builder.addCase(updatePlanAction.fulfilled, (state, action) => {
      state.loadings[`updatePlanActionLoading`] = false
      state.selectedPlan = action.payload
    })
    builder.addCase(updatePlanAction.rejected, (state) => {
      state.loadings[`updatePlanActionLoading`] = false
    })
    builder.addCase(deletePlanAction.pending, (state) => {
      state.loadings[`deletePlanLoading`] = true
    })
    builder.addCase(deletePlanAction.fulfilled, (state, action) => {
      state.loadings[`deletePlanActionLoading`] = false
      state.plans = state.plans
        ? state.plans.filter((plan) => plan._id !== action.payload._id)
        : []
    })
    builder.addCase(deletePlanAction.rejected, (state) => {
      state.loadings[`deletePlanActionLoading`] = false
    })
  },
})

export const planActions = {
  ...planSlice.actions,
}

export const selectPlan = (state: RootState) => state.plans
export const selectPlansLoading = (state: RootState, name: string) =>
  state.plans.loadings[`${name}Loading`]

export default planSlice.reducer
