import { EUserStatus } from 'src/configs'
import { IUserDetail } from './user-management'

export interface IPermissionModule {
  module: string
  permissions: IPermission[]
}

export interface IPermission {
  id: number
  name: string
  slug: string
  module: string
  createdAt: string
  updatedAt: string
}

export interface IRole {
  id: number | null
  name: string
  isDefault?: boolean
  permissionIds: number[]
  createdAt?: string
  updatedAt?: string
}

export interface IPostRolePayload {
  id?: number
  name: string
  permissionIds: number[]
}

export interface ICreateRoleSuccessData {
  role: IRole
  message: string
}

export interface IGetRolesParams {
  page: number
  limit?: number
  search?: string | null
  sort?: { [key: string]: any }
  isDefault?: boolean
}

export interface IGetRolesSuccessData {
  items: IRole[]
  total: number
  page: string | number
  limit: string | number
}

export interface IGetAdmisSuccessData {
  items: IUserDetail[]
  total: number
  page: string | number
  limit: string | number
}

export interface IStaffPayload {
  email: string
  firstName: string
  lastName: string
  phone: string
  password: string
  confirmPassword: string
  roleId: number
  status: EUserStatus
}

export interface IStaffSuccessData {
  admin: IUserDetail
  message: string
}

export interface IStaffDeleteParams {
  id: number | string
  isSoft?: boolean
}
