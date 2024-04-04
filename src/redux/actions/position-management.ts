import { createAsyncThunk } from '@reduxjs/toolkit'

import { positionManagementAPI } from '@api'
import { INITIAL_PAGINATION_SiZE } from '@configs'
import { IFetchPositionsParams, TUpdatePositionData } from '@interfaces'

export const getAllPositionsAction = createAsyncThunk(
  'positions/getAllPositionsAction',
  async (params: IFetchPositionsParams | undefined) => {
    try {
      const localParams = params
        ? params
        : {
            page: 1,
            limit: INITIAL_PAGINATION_SiZE,
          }
      const res = await positionManagementAPI.getAllPositions(localParams)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getPositionByIdAction = createAsyncThunk(
  'positions/getPositionByIdAction',
  async (id: string) => {
    try {
      const res = await positionManagementAPI.getPositionById(id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const updatePositionByIdAction = createAsyncThunk(
  'positions/updatePositionByIdAction',
  async (payload: Partial<TUpdatePositionData>, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await positionManagementAPI.updatePositionById(payload)
      if(res.statusCode !== 200) {
        return rejectWithValue(res);
      } 
        return fulfillWithValue(res.data)
    } catch (error) {
      throw error
    }
  }
)

export const addPositionAction = createAsyncThunk(
  'positions/addPositionAction',
  async (payload: Partial<TUpdatePositionData>, { fulfillWithValue, rejectWithValue }) => {
    try {
      try {
        const res = await positionManagementAPI.addPosition(payload)
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

export const deletePositionAction = createAsyncThunk(
  'positions/deletePositionAction',
  async (id: string, { fulfillWithValue, rejectWithValue }) => {
    try {
      try {
        const res = await positionManagementAPI.deletePosition(id)
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