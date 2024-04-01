import { createSlice } from '@reduxjs/toolkit'

import { IUserDetail } from '@interfaces'
import { RootState } from '.'
import { getAllUsersAction, getUserByIdAction, updateUserByIdAction } from '../actions'
interface IUsersState {
  users: IUserDetail[] | null
  user: IUserDetail | null
  usersCurrentPage: string | number
  usersTotalPage: string | number
  usersTotalItems: string | number
  selectedUser: IUserDetail | null

  loadings: Record<string, boolean | undefined>
}

const initialState: IUsersState = {
  users: [],
  user: null,
  usersCurrentPage: 0,
  usersTotalPage: 0,
  usersTotalItems: 0,
  selectedUser: null,
  loadings: {},
}

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsersAction.pending, (state) => {
      state.loadings[`getAllUsersActionLoading`] = true
    })
    builder.addCase(getAllUsersAction.fulfilled, (state, action) => {
      state.loadings[`getAllUsersActionLoading`] = false
      state.users = action.payload?.items ?? []
      state.usersCurrentPage = action.payload?.page ?? 0
      state.usersTotalPage = action.payload?.limit ?? 0
      state.usersTotalItems = action.payload?.total ?? 0
    })
    builder.addCase(getAllUsersAction.rejected, (state) => {
      state.loadings[`getAllUsersActionLoading`] = false
    })
    builder.addCase(getUserByIdAction.pending, (state) => {
      state.loadings[`getUserByIdActionLoading`] = true
    })
    builder.addCase(getUserByIdAction.fulfilled, (state, action) => {
      state.loadings[`getUserByIdActionLoading`] = false
      state.user = action.payload ?? {}
    })
    builder.addCase(getUserByIdAction.rejected, (state) => {
      state.loadings[`getUserByIdActionLoading`] = false
    })
    builder.addCase(updateUserByIdAction.pending, (state) => {
      state.loadings[`updateUserByIdActionLoading`] = true
    })
    builder.addCase(updateUserByIdAction.fulfilled, (state, action) => {
      state.loadings[`updateUserByIdActionLoading`] = false
      state.selectedUser = action.payload
    })
    builder.addCase(updateUserByIdAction.rejected, (state) => {
      state.loadings[`updateUserByIdActionLoading`] = false
    })
  },
})

export const usersActions = {
  ...usersSlice.actions,
}

export const selectUsersLoading = (state: RootState, name: string) =>
  state.plans.loadings[`${name}Loading`]

export default usersSlice.reducer
