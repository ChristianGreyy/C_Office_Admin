import { EUserGender } from '@configs'
import { IGetParams } from './app'
import { IRole } from './role-management'

export interface IFetchUsersParams extends IGetParams {
  sortOption?: string
  search?: string
}

export interface IFetchUsersSuccessData {
  items: IUserDetail[],
  page?: number | string,
  total?: number | string,
  limit?: number | string
}

export type TUpdateUserData = Partial<IUserDetail>

export type TDeleteUserData = Partial<IUserDetail> & { isSoft: boolean }

export interface IUserDetail {
  id?: number
  email: string
  roleId: number
  password: string
  confirmPassword: string
  phone: string
  firstName: string
  lastName: string
  status?: string
  gender?: string
  role?: IRole
  createdAt?: string
  statistics?: any
}

export interface IUserReport {
  _id: string
  date?: string
  avgRate?: number
  maxRate?: number
  minRate?: number
  stepCount?: number
  trainingTime?: number
}

export interface IEditUserData {
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
  status?: string
  gender?: string
}
