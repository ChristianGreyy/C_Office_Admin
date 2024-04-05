import {
  IFetchUniversitiesParams,
  IFetchUniversitiesSuccessData,
  IUniversityDetail,
  TUpdateUniversityData,
} from '@interfaces'
import { ApiClient } from './axiosClient'

export const universityManagementAPI = {
  getAllUniversities: async (params?: IFetchUniversitiesParams) => {
    return await ApiClient.get<IFetchUniversitiesSuccessData>('/universities', {
      params,
    })
  },

  getUniversityById: async (id: number) => {
    return await ApiClient.get<IUniversityDetail>(`/universities/${id}`)
  },

  updateUniversityById: async (payload: Partial<TUpdateUniversityData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.put<IUniversityDetail, Omit<TUpdateUniversityData, 'id'>>(
      `/universities/${id}`,
      passPayload
    )
  },

  addUniversity: async (payload: Partial<TUpdateUniversityData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.post<{ data: IUniversityDetail; message: string }, {}>(
      `/universities`,
      passPayload
    )
  },

  deleteUniversity: async (id: number) => {
    return await ApiClient.delete<{ data: IUniversityDetail; message: string }, {}>(
      `/universities/${id}`
    )
  },

  
}
