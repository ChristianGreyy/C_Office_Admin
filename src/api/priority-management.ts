import {
  IFetchPrioritiesParams,
  IFetchPrioritiesSuccessData,
  IPriorityDetail,
  TUpdatePriorityData,
} from '@interfaces'
import { ApiClient } from './axiosClient'

export const priorityManagementAPI = {
  getAllPriorities: async (params?: IFetchPrioritiesParams) => {
    return await ApiClient.get<IFetchPrioritiesSuccessData>('/priorities', {
      params,
    })
  },

  getPriorityById: async (id: number) => {
    return await ApiClient.get<IPriorityDetail>(`/priorities/${id}`)
  },

  updatePriorityById: async (payload: Partial<TUpdatePriorityData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.put<IPriorityDetail, Omit<TUpdatePriorityData, 'id'>>(
      `/priorities/${id}`,
      passPayload
    )
  },

  addPriority: async (payload: Partial<TUpdatePriorityData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.post<{ data: IPriorityDetail; message: string }, {}>(
      `/priorities`,
      passPayload
    )
  },

  deletePriority: async (id: number) => {
    return await ApiClient.delete<{ data: IPriorityDetail; message: string }, {}>(
      `/priorities/${id}`
    )
  },

  
}
