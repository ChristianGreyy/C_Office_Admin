import { createAsyncThunk } from '@reduxjs/toolkit'

import { requestManagementAPI } from '@api'
import { INITIAL_PAGINATION_SiZE } from '@configs'
import { IFetchRequestsParams, TUpdateRequestData } from '@interfaces'

export const getAllRequestsAction = createAsyncThunk(
  'requests/getAllRequestsAction',
  async (params: IFetchRequestsParams | undefined) => {
    try {
      const localParams = params
        ? params
        : {
            page: 1,
            limit: INITIAL_PAGINATION_SiZE,
          }
      const res = await requestManagementAPI.getAllRequests(localParams)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getRequestByIdAction = createAsyncThunk(
  'requests/getRequestByIdAction',
  async (id: number) => {
    try {
      const res = await requestManagementAPI.getRequestById(id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const updateRequestByIdAction = createAsyncThunk(
  'requests/updateRequestByIdAction',
  async (payload: Partial<TUpdateRequestData>, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await requestManagementAPI.updateRequestById(payload)
      if(res.statusCode !== 200) {
        return rejectWithValue(res);
      } 
        return fulfillWithValue(res.data)
    } catch (error) {
      throw error
    }
  }
)

export const addRequestAction = createAsyncThunk(
  'requests/addRequestAction',
  async (payload: Partial<TUpdateRequestData>, { fulfillWithValue, rejectWithValue }) => {
    try {
      try {
        const res = await requestManagementAPI.addRequest(payload)
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

export const deleteRequestAction = createAsyncThunk(
  'requests/deleteRequestAction',
  async (id: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      try {
        const res = await requestManagementAPI.deleteRequest(id)
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