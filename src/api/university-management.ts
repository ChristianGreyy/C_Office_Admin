import {
  IFetchLevelsParams,
  IFetchLevelsSuccessData,
  ILevelDetail,
  TUpdateLevelData,
} from '@interfaces'
import { ApiClient } from './axiosClient'

export const universityManagementAPI = {
  getAllLevels: async (params?: IFetchLevelsParams) => {
    return await ApiClient.get<IFetchLevelsSuccessData>('/universities', {
      params,
    })
  },

  getLevelById: async (id: number) => {
    return await ApiClient.get<ILevelDetail>(`/universities/${id}`)
  },

  updateLevelById: async (payload: Partial<TUpdateLevelData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.put<ILevelDetail, Omit<TUpdateLevelData, 'id'>>(
      `/universities/${id}`,
      passPayload
    )
  },

  addLevel: async (payload: Partial<TUpdateLevelData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.post<{ data: ILevelDetail; message: string }, {}>(
      `/universities`,
      passPayload
    )
  },

  deleteLevel: async (id: number) => {
    return await ApiClient.delete<{ data: ILevelDetail; message: string }, {}>(
      `/universities/${id}`
    )
  },

  
}
