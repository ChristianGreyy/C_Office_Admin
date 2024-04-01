import {
  IFetchNotificationsParams,
  IFetchNotificationsSuccessData,
  INotificationDetail,
  TUpdateNotificationData,
} from '@interfaces'
import { ApiClient } from './axiosClient'

export const notificationManagementAPI = {
  getAllNotifications: async (params?: IFetchNotificationsParams) => {
    return await ApiClient.get<IFetchNotificationsSuccessData>('/notification', {
      params,
    })
  },

  updateNotificationById: async (payload: Partial<TUpdateNotificationData>) => {
    const { _id, ...passPayload } = payload
    return await ApiClient.patch<INotificationDetail, Omit<TUpdateNotificationData, '_id'>>(
      `/notification/${_id}`,
      passPayload
    )
  },
}
