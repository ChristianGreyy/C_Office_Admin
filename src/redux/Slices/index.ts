import { combineReducers } from 'redux'
import { AnyAction, Reducer } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

import toastReducer from './toast'
import appReducer from './app'
import authReducer from './auth'
import layoutReducer from './layout'
import tierReducer from './tier'
import userSlice from './userSlice'
import usersSlice from './user-management'
import notificationsSlice from './notification-management'
import dashboardSlice from './dashboard'
import planReducer from './plan'
import { COFFICE_ACCESS_TOKEN } from '@configs'

export * from './toast'
export * from './app'
export * from './auth'
export * from './layout'
export * from './tier'
export * from './userSlice'
export * from './user-management'
export * from './notification-management'
export * from './dashboard'
export * from './plan'

const productReducer = combineReducers({
  toast: toastReducer,
  app: appReducer,
  auth: authReducer,
  layout: layoutReducer,
  tier: tierReducer,
  user: userSlice,
  plans: planReducer,
  users: usersSlice,
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
