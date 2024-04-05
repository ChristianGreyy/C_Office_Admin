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
import tierReducer from './tier'
import toastReducer from './toast'
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
export * from './tier'
export * from './toast'
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
  levels: levelsSlice,
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
