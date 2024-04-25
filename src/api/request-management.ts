import {
  IFetchRequestsParams,
  IFetchRequestsSuccessData,
  IRequestDetail,
  TUpdateRequestData,
} from '@interfaces'
import { ApiClient } from './axiosClient'

export const requestManagementAPI = {
  getAllRequests: async (params?: IFetchRequestsParams) => {
    return await ApiClient.get<IFetchRequestsSuccessData>('/requests', {
      params,
    })
  },

  getRequestById: async (id: number) => {
    return await ApiClient.get<IRequestDetail>(`/requests/${id}`)
  },

  updateRequestById: async (payload: Partial<TUpdateRequestData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.put<IRequestDetail, Omit<TUpdateRequestData, 'id'>>(
      `/requests/${id}`,
      passPayload
    )
  },

  addRequest: async (payload: Partial<TUpdateRequestData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.post<{ data: IRequestDetail; message: string }, {}>(
      `/requests`,
      passPayload
    )
  },

  deleteRequest: async (id: number) => {
    return await ApiClient.delete<{ data: IRequestDetail; message: string }, {}>(
      `/requests/${id}`
    )
  },

  
}
