import { createAsyncThunk } from '@reduxjs/toolkit'

import { universityManagementAPI } from '@api'
import { INITIAL_PAGINATION_SiZE } from '@configs'
import { IFetchUniversitiesParams, TUpdateUniversityData } from '@interfaces'

export const getAllUniversitiesAction = createAsyncThunk(
  'universities/getAllUniversitiesAction',
  async (params: IFetchUniversitiesParams | undefined) => {
    try {
      const localParams = params
        ? params
        : {
            page: 1,
            limit: INITIAL_PAGINATION_SiZE,
          }
      const res = await universityManagementAPI.getAllUniversities(localParams)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getUniversityByIdAction = createAsyncThunk(
  'universities/getUniversityByIdAction',
  async (id: number) => {
    try {
      const res = await universityManagementAPI.getUniversityById(id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const updateUniversityByIdAction = createAsyncThunk(
  'universities/updateUniversityByIdAction',
  async (payload: Partial<TUpdateUniversityData>, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await universityManagementAPI.updateUniversityById(payload)
      if(res.statusCode !== 200) {
        return rejectWithValue(res);
      } 
        return fulfillWithValue(res.data)
    } catch (error) {
      throw error
    }
  }
)

export const addUniversityAction = createAsyncThunk(
  'universities/addUniversityAction',
  async (payload: Partial<TUpdateUniversityData>, { fulfillWithValue, rejectWithValue }) => {
    try {
      try {
        const res = await universityManagementAPI.addUniversity(payload)
        if(res.statusCode !== 201) {
          return rejectWithValue(res);
        } 
          return fulfillWithValue(res.data)
      } catch (error) {
        throw error
      }
    } catch (error) {
      throw error
    }
  }
)

export const deleteUniversityAction = createAsyncThunk(
  'universities/deleteUniversityAction',
  async (id: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      try {
        const res = await universityManagementAPI.deleteUniversity(id)
        console.log('res', res)
        if(res.statusCode !== 200) {
          return rejectWithValue(res);
        } 
          return fulfillWithValue(res.data)
      } catch (error) {
        throw error
      }
    } catch (error) {
      throw error
    }
  }
)