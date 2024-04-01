import thunk, { ThunkAction } from 'redux-thunk'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import sessionStorage from 'redux-persist/es/storage/session'

import reducer, { RootState } from './Slices'

const persistConfig = {
  key: 'root',
  storage: sessionStorage,
  whitelist: ['app', 'auth', 'layout', 'tier', 'user'],
  blackList: ['toast'],
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(thunk),
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch

export default store

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
