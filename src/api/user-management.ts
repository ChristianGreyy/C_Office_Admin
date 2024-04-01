import {
  IFetchUsersParams,
  IFetchUsersSuccessData,
  IUserDetail,
  TUpdateUserData,
} from '@interfaces'
import { ApiClient } from './axiosClient'

export const userManagementAPI = {
  getAllUsers: async (params?: IFetchUsersParams) => {
    return await ApiClient.get<IFetchUsersSuccessData>('/users', {
      params,
    })
  },

  getUserById: async (id: string) => {
    return await ApiClient.get<IUserDetail>(`/users/${id}`)
  },

  updateUserById: async (payload: Partial<TUpdateUserData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.put<IUserDetail, Omit<TUpdateUserData, 'id'>>(
      `/users/${id}`,
      passPayload
    )
  },

  addUser: async (payload: Partial<TUpdateUserData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.post<{ data: IUserDetail; message: string }, {}>(
      `/users`,
      passPayload
    )
  },

}
