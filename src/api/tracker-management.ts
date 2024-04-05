import {
  IFetchTrackersParams,
  IFetchTrackersSuccessData,
  ITrackerDetail,
  TUpdateTrackerData,
} from '@interfaces'
import { ApiClient } from './axiosClient'

export const trackerManagementAPI = {
  getAllTrackers: async (params?: IFetchTrackersParams) => {
    return await ApiClient.get<IFetchTrackersSuccessData>('/trackers', {
      params,
    })
  },

  getTrackerById: async (id: number) => {
    return await ApiClient.get<ITrackerDetail>(`/trackers/${id}`)
  },

  updateTrackerById: async (payload: Partial<TUpdateTrackerData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.put<ITrackerDetail, Omit<TUpdateTrackerData, 'id'>>(
      `/trackers/${id}`,
      passPayload
    )
  },

  addTracker: async (payload: Partial<TUpdateTrackerData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.post<{ data: ITrackerDetail; message: string }, {}>(
      `/trackers`,
      passPayload
    )
  },

  deleteTracker: async (id: number) => {
    return await ApiClient.delete<{ data: ITrackerDetail; message: string }, {}>(
      `/trackers/${id}`
    )
  },

  
}
