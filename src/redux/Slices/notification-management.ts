import { createSlice } from '@reduxjs/toolkit'

import { INotificationDetail } from '@interfaces'
import { RootState } from '.'
import { getAllNotificationsAction, updateNotificationByIdAction } from '../actions'
interface INotificationsState {
  notifications: INotificationDetail[] | null
  notification: INotificationDetail | null
  notificationsCurrentPage: string | number
  notificationsTotalPage: string | number
  notificationsTotalItems: string | number
  selectedNotification: INotificationDetail | null

  loadings: Record<string, boolean | undefined>
}

const initialState: INotificationsState = {
  notifications: [],
  notification: null,
  notificationsCurrentPage: 0,
  notificationsTotalPage: 0,
  notificationsTotalItems: 0,
  selectedNotification: null,
  loadings: {},
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllNotificationsAction.pending, (state) => {
      state.loadings[`getAllNotificationsActionLoading`] = true
    })
    builder.addCase(getAllNotificationsAction.fulfilled, (state, action) => {
      state.loadings[`getAllNotificationsActionLoading`] = false
      state.notifications = action.payload?.notifications ?? []
      state.notificationsCurrentPage = action.payload?.currentPage ?? 0
      state.notificationsTotalPage = action.payload?.totalPage ?? 0
      state.notificationsTotalItems = action.payload?.totalItems ?? 0
    })
    builder.addCase(getAllNotificationsAction.rejected, (state) => {
      state.loadings[`getAllNotificationsActionLoading`] = false
    })
    builder.addCase(updateNotificationByIdAction.pending, (state) => {
      state.loadings[`updateNotificationByIdActionLoading`] = true
    })
    builder.addCase(updateNotificationByIdAction.fulfilled, (state, action) => {
      state.loadings[`updateNotificationByIdActionLoading`] = false
      state.selectedNotification = action.payload
    })
    builder.addCase(updateNotificationByIdAction.rejected, (state) => {
      state.loadings[`updateNotificationByIdActionLoading`] = false
    })
  },
})

export const notificationsActions = {
  ...notificationsSlice.actions,
}

export const selectNotificationsLoading = (state: RootState, name: string) =>
  state.plans.loadings[`${name}Loading`]

export default notificationsSlice.reducer
