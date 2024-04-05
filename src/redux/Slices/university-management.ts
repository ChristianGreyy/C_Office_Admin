import { createSlice } from '@reduxjs/toolkit'

import { IUniversityDetail } from '@interfaces'
import { RootState } from '.'
import { getAllUniversitiesAction, getUniversityByIdAction, updateUniversityByIdAction } from '../actions'
interface IUniversitiesState {
  universities: IUniversityDetail[] | null
  university: IUniversityDetail | null
  universitiesCurrentPage: string | number
  universitiesTotalPage: string | number
  universitiesTotalItems: string | number
  selectedUniversity: IUniversityDetail | null

  loadings: Record<string, boolean | undefined>
}

const initialState: IUniversitiesState = {
  universities: [],
  university: null,
  universitiesCurrentPage: 0,
  universitiesTotalPage: 0,
  universitiesTotalItems: 0,
  selectedUniversity: null,
  loadings: {},
}

const universitiesSlice = createSlice({
  name: 'universities',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUniversitiesAction.pending, (state) => {
      state.loadings[`getAllUniversitiesActionLoading`] = true
    })
    builder.addCase(getAllUniversitiesAction.fulfilled, (state, action) => {
      state.loadings[`getAllUniversitiesActionLoading`] = false
      state.universities = action.payload?.items ?? []
      state.universitiesCurrentPage = action.payload?.page ?? 0
      state.universitiesTotalPage = action.payload?.limit ?? 0
      state.universitiesTotalItems = action.payload?.total ?? 0
    })
    builder.addCase(getAllUniversitiesAction.rejected, (state) => {
      state.loadings[`getAllUniversitiesActionLoading`] = false
    })
    builder.addCase(getUniversityByIdAction.pending, (state) => {
      state.loadings[`getUniversityByIdActionLoading`] = true
    })
    builder.addCase(getUniversityByIdAction.fulfilled, (state, action) => {
      state.loadings[`getUniversityByIdActionLoading`] = false
      state.university = action.payload ?? {}
    })
    builder.addCase(getUniversityByIdAction.rejected, (state) => {
      state.loadings[`getUniversityByIdActionLoading`] = false
    })
    builder.addCase(updateUniversityByIdAction.pending, (state) => {
      state.loadings[`updateUniversityByIdActionLoading`] = true
    })
    builder.addCase(updateUniversityByIdAction.fulfilled, (state, action) => {
      state.loadings[`updateUniversityByIdActionLoading`] = false
      state.selectedUniversity = action.payload
    })
    builder.addCase(updateUniversityByIdAction.rejected, (state) => {
      state.loadings[`updateUniversityByIdActionLoading`] = false
    })
  },
})

export const universitiesActions = {
  ...universitiesSlice.actions,
}

export const selectUniversitiesLoading = (state: RootState, name: string) =>
  state.plans.loadings[`${name}Loading`]

export default universitiesSlice.reducer
