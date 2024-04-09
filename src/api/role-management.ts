import { ApiClient } from 'src/api/axiosClient'
import {
  ICreateRoleSuccessData,
  IGetAdmisSuccessData,
  IGetRolesParams,
  IGetRolesSuccessData,
  IPermissionModule,
  IPostRolePayload,
  IRole,
  IStaffPayload,
  IStaffSuccessData,
  IUserDetail,
  TUpdateUserData,
} from 'src/interfaces'
import { IStaffDeleteParams } from 'src/interfaces/role-management'
import { objectToQueryString } from 'src/utils'

export const roleManagementAPI = {
  getPermissions: async () => {
    return await ApiClient.get<IPermissionModule[]>('/permissions')
  },
  getRoles: async (params: IGetRolesParams) => {
    return await ApiClient.get<IGetRolesSuccessData>(`/roles`, {
      params: {
        ...params,
        sort: objectToQueryString(params.sort || {}) || undefined,
      },
    })
  },
  getRoleByID: async (id: number) => {
    return await ApiClient.get<IRole>(`/roles/${id}`)
  },
  createRole: async (payload: IPostRolePayload) => {
    return await ApiClient.post<ICreateRoleSuccessData, IPostRolePayload>(
      '/roles',
      payload
    )
  },
  updateRoleByID: async (payload: IPostRolePayload) => {
    const localPayload = {
      name: payload.name,
      permissionIds: payload.permissionIds,
    }
    return await ApiClient.put<ICreateRoleSuccessData, IPostRolePayload>(
      `/roles/${payload.id}`,
      localPayload
    )
  },
  deleteRoleByID: async (id: number) => {
    return await ApiClient.delete<{ message: string }>(`/roles/${id}`)
  },
  getAdminList: async (params: IGetRolesParams) => {
    return await ApiClient.get<IGetAdmisSuccessData>('/users/staffs', {
      params,
    })
  },

  createAdmin: async (payload: IStaffPayload) => {
    return await ApiClient.post<IStaffSuccessData, IStaffPayload>(
      '/users/staffs',
      payload
    )
  },

  deleteAdmin: async (params: IStaffDeleteParams) => {
    return await ApiClient.delete<any>(`/users/staffs/${params.id}`)
  },
  getAdminById: async (id: string) => {
    return await ApiClient.get<IUserDetail>(`/users/staffs/${id}`)
  },
  updateAdminById: async (payload: Partial<TUpdateUserData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.put<{ data: IUserDetail; message: string }, {}>(
      `/users/staffs/${id}`,
      passPayload
    )
  },
}
