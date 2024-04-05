import { createAsyncThunk } from '@reduxjs/toolkit'

import { statusManagementAPI } from '@api'
import { INITIAL_PAGINATION_SiZE } from '@configs'
import { IFetchStatusParams, TUpdateStatusData } from '@interfaces'

export const getAllStatusAction = createAsyncThunk(
  'status/getAllStatusAction',
  async (params: IFetchStatusParams | undefined) => {
    try {
      const localParams = params
        ? params
        : {
            page: 1,
            limit: INITIAL_PAGINATION_SiZE,
          }
      const res = await statusManagementAPI.getAllStatus(localParams)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getStatusByIdAction = createAsyncThunk(
  'status/getStatusByIdAction',
  async (id: number) => {
    try {
      const res = await statusManagementAPI.getStatusById(id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const updateStatusByIdAction = createAsyncThunk(
  'status/updateStatusByIdAction',
  async (payload: Partial<TUpdateStatusData>, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await statusManagementAPI.updateStatusById(payload)
      if(res.statusCode !== 200) {
        return rejectWithValue(res);
      } 
        return fulfillWithValue(res.data)
    } catch (error) {
      throw error
    }
  }
)

export const addStatusAction = createAsyncThunk(
  'status/addStatusAction',
  async (payload: Partial<TUpdateStatusData>, { fulfillWithValue, rejectWithValue }) => {
    try {
      try {
        const res = await statusManagementAPI.addStatus(payload)
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

export const deleteStatusAction = createAsyncThunk(
  'status/deleteStatusAction',
  async (id: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      try {
        const res = await statusManagementAPI.deleteStatus(id)
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