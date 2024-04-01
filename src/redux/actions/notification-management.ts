import { createAsyncThunk } from '@reduxjs/toolkit'

import { notificationManagementAPI } from '@api'
import { INITIAL_PAGINATION_SiZE } from '@configs'
import { IFetchNotificationsParams, TUpdateNotificationData } from '@interfaces'

export const getAllNotificationsAction = createAsyncThunk(
  'notifications/getAllNotificationsAction',
  async (params: IFetchNotificationsParams | undefined) => {
    try {
      const localParams = params
        ? params
        : {
            page: 1,
            size: INITIAL_PAGINATION_SiZE,
          }
      const res = await notificationManagementAPI.getAllNotifications(localParams)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const updateNotificationByIdAction = createAsyncThunk(
  'notifications/updateNotificationByIdAction',
  async (payload: Partial<TUpdateNotificationData>, { fulfillWithValue }) => {
    const res = await notificationManagementAPI.updateNotificationById(payload)
    return fulfillWithValue(res.data)
  }
)
