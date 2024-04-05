import {
  IFetchLevelsParams,
  IFetchLevelsSuccessData,
  ILevelDetail,
  TUpdateLevelData,
} from '@interfaces'
import { ApiClient } from './axiosClient'

export const levelManagementAPI = {
  getAllLevels: async (params?: IFetchLevelsParams) => {
    return await ApiClient.get<IFetchLevelsSuccessData>('/levels', {
      params,
    })
  },

  getLevelById: async (id: number) => {
    return await ApiClient.get<ILevelDetail>(`/levels/${id}`)
  },

  updateLevelById: async (payload: Partial<TUpdateLevelData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.put<ILevelDetail, Omit<TUpdateLevelData, 'id'>>(
      `/levels/${id}`,
      passPayload
    )
  },

  addLevel: async (payload: Partial<TUpdateLevelData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.post<{ data: ILevelDetail; message: string }, {}>(
      `/levels`,
      passPayload
    )
  },

  deleteLevel: async (id: number) => {
    return await ApiClient.delete<{ data: ILevelDetail; message: string }, {}>(
      `/levels/${id}`
    )
  },

  
}
