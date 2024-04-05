import { createAsyncThunk } from '@reduxjs/toolkit'

import { trackerManagementAPI } from '@api'
import { INITIAL_PAGINATION_SiZE } from '@configs'
import { IFetchTrackersParams, TUpdateTrackerData } from '@interfaces'

export const getAllTrackersAction = createAsyncThunk(
  'trackers/getAllTrackersAction',
  async (params: IFetchTrackersParams | undefined) => {
    try {
      const localParams = params
        ? params
        : {
            page: 1,
            limit: INITIAL_PAGINATION_SiZE,
          }
      const res = await trackerManagementAPI.getAllTrackers(localParams)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getTrackerByIdAction = createAsyncThunk(
  'trackers/getTrackerByIdAction',
  async (id: number) => {
    try {
      const res = await trackerManagementAPI.getTrackerById(id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const updateTrackerByIdAction = createAsyncThunk(
  'trackers/updateTrackerByIdAction',
  async (payload: Partial<TUpdateTrackerData>, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await trackerManagementAPI.updateTrackerById(payload)
      if(res.statusCode !== 200) {
        return rejectWithValue(res);
      } 
        return fulfillWithValue(res.data)
    } catch (error) {
      throw error
    }
  }
)

export const addTrackerAction = createAsyncThunk(
  'trackers/addTrackerAction',
  async (payload: Partial<TUpdateTrackerData>, { fulfillWithValue, rejectWithValue }) => {
    try {
      try {
        const res = await trackerManagementAPI.addTracker(payload)
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

export const deleteTrackerAction = createAsyncThunk(
  'trackers/deleteTrackerAction',
  async (id: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      try {
        const res = await trackerManagementAPI.deleteTracker(id)
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