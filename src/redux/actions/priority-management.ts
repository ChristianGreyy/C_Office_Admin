import { createAsyncThunk } from '@reduxjs/toolkit'

import { priorityManagementAPI } from '@api'
import { INITIAL_PAGINATION_SiZE } from '@configs'
import { IFetchPrioritiesParams, TUpdatePriorityData } from '@interfaces'

export const getAllPrioritiesAction = createAsyncThunk(
  'priorities/getAllPrioritiesAction',
  async (params: IFetchPrioritiesParams | undefined) => {
    try {
      const localParams = params
        ? params
        : {
            page: 1,
            limit: INITIAL_PAGINATION_SiZE,
          }
      const res = await priorityManagementAPI.getAllPriorities(localParams)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getPriorityByIdAction = createAsyncThunk(
  'priorities/getPriorityByIdAction',
  async (id: number) => {
    try {
      const res = await priorityManagementAPI.getPriorityById(id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const updatePriorityByIdAction = createAsyncThunk(
  'priorities/updatePriorityByIdAction',
  async (payload: Partial<TUpdatePriorityData>, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await priorityManagementAPI.updatePriorityById(payload)
      if(res.statusCode !== 200) {
        return rejectWithValue(res);
      } 
        return fulfillWithValue(res.data)
    } catch (error) {
      throw error
    }
  }
)

export const addPriorityAction = createAsyncThunk(
  'priorities/addPriorityAction',
  async (payload: Partial<TUpdatePriorityData>, { fulfillWithValue, rejectWithValue }) => {
    try {
      try {
        const res = await priorityManagementAPI.addPriority(payload)
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

export const deletePriorityAction = createAsyncThunk(
  'priorities/deletePriorityAction',
  async (id: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      try {
        const res = await priorityManagementAPI.deletePriority(id)
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