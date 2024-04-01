import { createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd'

import {
  deletePlanById,
  getAllPlan,
  getPlanById,
  createPlan,
  updatePlanById,
} from '@api'
import { IFetchPlansParams, TPlanPayload } from '@interfaces'

export const fetchPlansAction = createAsyncThunk(
  'plans/fetchPlansAction',
  async (params: IFetchPlansParams | undefined) => {
    try {
      const localParams = params
        ? params
        : {
            page: 1,
            size: 10,
          }
      const res = await getAllPlan(localParams)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const fetchPlanDetailAction = createAsyncThunk(
  'plans/fetchPlanDetailAction',
  async (id: string) => {
    try {
      const res = await getPlanById(id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const createPlanAction = createAsyncThunk(
  'plans/createPlanAction',
  async (payload: TPlanPayload, { fulfillWithValue }) => {
    const res = await createPlan(payload)

    return fulfillWithValue(res.data)
  }
)

export const updatePlanAction = createAsyncThunk(
  'plans/updatePlanAction',
  async (payload: TPlanPayload & { id: string }, { fulfillWithValue }) => {
    const res = await updatePlanById(payload)

    return fulfillWithValue(res.data)
  }
)

export const deletePlanAction = createAsyncThunk(
  'plans/deletePlanAction',
  async (id: string, { fulfillWithValue }) => {
    const res = await deletePlanById(id)
    message.success({
      content: 'Delete plan succesfully',
    })
    return fulfillWithValue(res.data)
  }
)
