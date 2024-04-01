import { createSlice } from '@reduxjs/toolkit'

import { IFetchRevenueStatSuccessData, IUserDetail, IUserStat } from '@interfaces'
import { RootState } from '.'
import {
  getRevenueStatAction,
  getNewUserStatAction,
} from '../actions'
interface IUsersState {
  users: IUserDetail[] | null
  userStats: IUserStat[] | null
  revenueStats: IFetchRevenueStatSuccessData | null
  loadings: Record<string, boolean | undefined>
}

const initialState: IUsersState = {
  users: [],
  userStats: [],
  revenueStats: null,
  loadings: {},
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRevenueStatAction.pending, (state) => {
      state.loadings[`getRevenueStatActionLoading`] = true
    })
    builder.addCase(getRevenueStatAction.fulfilled, (state, action) => {
      state.revenueStats = action.payload ?? {}
      state.loadings[`getRevenueStatActionLoading`] = false
    })
    builder.addCase(getRevenueStatAction.rejected, (state) => {
      state.loadings[`getRevenueStatActionLoading`] = false
    })
    builder.addCase(getNewUserStatAction.pending, (state) => {
      state.loadings[`getNewUserStatActionLoading`] = true
    })
    builder.addCase(getNewUserStatAction.fulfilled, (state, action) => {
      state.users = action.payload?.summary ?? []
      state.userStats = action.payload?.userStats ?? []
      state.loadings[`getNewUserStatActionLoading`] = false
    })
    builder.addCase(getNewUserStatAction.rejected, (state) => {
      state.loadings[`getNewUserStatActionLoading`] = false
    })
  },
})

export const dashboardActions = {
  ...dashboardSlice.actions,
}

export const selectDashboardLoading = (state: RootState, name: string) =>
  state.plans.loadings[`${name}Loading`]

export default dashboardSlice.reducer
