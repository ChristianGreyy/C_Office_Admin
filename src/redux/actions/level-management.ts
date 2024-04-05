import { createAsyncThunk } from '@reduxjs/toolkit'

import { levelManagementAPI } from '@api'
import { INITIAL_PAGINATION_SiZE } from '@configs'
import { IFetchLevelsParams, TUpdateLevelData } from '@interfaces'

export const getAllLevelsAction = createAsyncThunk(
  'levels/getAllLevelsAction',
  async (params: IFetchLevelsParams | undefined) => {
    try {
      const localParams = params
        ? params
        : {
            page: 1,
            limit: INITIAL_PAGINATION_SiZE,
          }
      const res = await levelManagementAPI.getAllLevels(localParams)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getLevelByIdAction = createAsyncThunk(
  'levels/getLevelByIdAction',
  async (id: number) => {
    try {
      const res = await levelManagementAPI.getLevelById(id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const updateLevelByIdAction = createAsyncThunk(
  'levels/updateLevelByIdAction',
  async (payload: Partial<TUpdateLevelData>, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await levelManagementAPI.updateLevelById(payload)
      if(res.statusCode !== 200) {
        return rejectWithValue(res);
      } 
        return fulfillWithValue(res.data)
    } catch (error) {
      throw error
    }
  }
)

export const addLevelAction = createAsyncThunk(
  'levels/addLevelAction',
  async (payload: Partial<TUpdateLevelData>, { fulfillWithValue, rejectWithValue }) => {
    try {
      try {
        const res = await levelManagementAPI.addLevel(payload)
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

export const deleteLevelAction = createAsyncThunk(
  'levels/deleteLevelAction',
  async (id: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      try {
        const res = await levelManagementAPI.deleteLevel(id)
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