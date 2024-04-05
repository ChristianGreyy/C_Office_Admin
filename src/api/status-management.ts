import {
  IFetchStatusParams,
  IFetchStatusSuccessData,
  IStatusDetail,
  TUpdateStatusData,
} from '@interfaces'
import { ApiClient } from './axiosClient'

export const statusManagementAPI = {
  getAllStatus: async (params?: IFetchStatusParams) => {
    return await ApiClient.get<IFetchStatusSuccessData>('/status', {
      params,
    })
  },

  getStatusById: async (id: number) => {
    return await ApiClient.get<IStatusDetail>(`/status/${id}`)
  },

  updateStatusById: async (payload: Partial<TUpdateStatusData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.put<IStatusDetail, Omit<TUpdateStatusData, 'id'>>(
      `/status/${id}`,
      passPayload
    )
  },

  addStatus: async (payload: Partial<TUpdateStatusData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.post<{ data: IStatusDetail; message: string }, {}>(
      `/status`,
      passPayload
    )
  },

  deleteStatus: async (id: number) => {
    return await ApiClient.delete<{ data: IStatusDetail; message: string }, {}>(
      `/status/${id}`
    )
  },

  
}
