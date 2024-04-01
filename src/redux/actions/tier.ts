import { IGetTiersParams } from '@interfaces'
import { createAsyncThunk } from '@reduxjs/toolkit'
const prefix = 'tier'

export const fetchTierList = createAsyncThunk<any, IGetTiersParams>(
  `${prefix}/detail-tier`,
  async (params, { rejectWithValue }) => {
    try {
      // const res = await tierAPI.getTiers(params)
      // return res as unknown
    } catch (e) {
      rejectWithValue(e)
    }
  }
)
