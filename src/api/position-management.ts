import {
  IFetchPositionsParams,
  IFetchPositionsSuccessData,
  IPositionDetail,
  TUpdatePositionData,
} from '@interfaces'
import { ApiClient } from './axiosClient'

export const positionManagementAPI = {
  getAllPositions: async (params?: IFetchPositionsParams) => {
    return await ApiClient.get<IFetchPositionsSuccessData>('/positions', {
      params,
    })
  },

  getPositionById: async (id: string) => {
    return await ApiClient.get<IPositionDetail>(`/positions/${id}`)
  },

  updatePositionById: async (payload: Partial<TUpdatePositionData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.put<IPositionDetail, Omit<TUpdatePositionData, 'id'>>(
      `/positions/${id}`,
      passPayload
    )
  },

  addPosition: async (payload: Partial<TUpdatePositionData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.post<{ data: IPositionDetail; message: string }, {}>(
      `/positions`,
      passPayload
    )
  },

  deletePosition: async (id: string) => {
    return await ApiClient.delete<{ data: IPositionDetail; message: string }, {}>(
      `/positions/${id}`
    )
  },

  
}
