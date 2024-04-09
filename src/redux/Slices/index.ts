import { AnyAction, Reducer } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import { combineReducers } from 'redux'

import { COFFICE_ACCESS_TOKEN } from '@configs'
import appReducer from './app'
import authReducer from './auth'
import dashboardSlice from './dashboard'
import layoutReducer from './layout'
import levelsSlice from './level-management'
import notificationsSlice from './notification-management'
import planReducer from './plan'
import positionsSlice from './position-management'
import prioritiesSlice from './priority-management'
import rolesSlice from './role-management'
import statusSlice from './status-management'
import tierReducer from './tier'
import toastReducer from './toast'
import trackersSlice from './tracker-management'
import universitiesSlice from './university-management'
import usersSlice from './user-management'
import userSlice from './userSlice'

export * from './app'
export * from './auth'
export * from './dashboard'
export * from './layout'
export * from './level-management'
export * from './notification-management'
export * from './plan'
export * from './position-management'
export * from './priority-management'
export * from './role-management'
export * from './status-management'
export * from './tier'
export * from './toast'
export * from './tracker-management'
export * from './university-management'
export * from './user-management'
export * from './userSlice'

const productReducer = combineReducers({
  toast: toastReducer,
  app: appReducer,
  auth: authReducer,
  layout: layoutReducer,
  tier: tierReducer,
  user: userSlice,
  plans: planReducer,
  users: usersSlice,
  positions: positionsSlice,
  trackers: trackersSlice,
  priorities: prioritiesSlice,
  levels: levelsSlice,
  status: statusSlice,
  universities: universitiesSlice,
  roles: rolesSlice,
  notifications: notificationsSlice,
  dashboard: dashboardSlice,
})
  
export type RootState = ReturnType<typeof productReducer>

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'RESET') {
    // reset state
    state = {} as RootState
    // reset local storage
    Cookies.remove(COFFICE_ACCESS_TOKEN)
    sessionStorage.clear()
  }
  return productReducer(state, action)
}
export default rootReducer
