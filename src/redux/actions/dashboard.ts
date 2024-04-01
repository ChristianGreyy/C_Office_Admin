import { createAsyncThunk } from '@reduxjs/toolkit'

import { dashboardAPI } from '@api'
import {
  IDashboardParams
} from '@interfaces'
import moment from 'moment'

export const getRevenueStatAction = createAsyncThunk(
  'dashboard/getRevenueStatAction',
  async (params: IDashboardParams) => {
    try {
      const localParams = params || {
        from: moment().subtract(7, 'days').format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD'),
      }
      const res = await dashboardAPI.getRevenueStat(localParams)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getNewUserStatAction = createAsyncThunk(
  'dashboard/getNewUserStatAction',
  async (params: IDashboardParams) => {
    try {
      const localParams = params || {
        from: moment().subtract(7, 'days').format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD'),
      }
      const res = await dashboardAPI.getNewUserStat(localParams)
      return res.data
    } catch (error) {
      throw error
    }
  }
)
