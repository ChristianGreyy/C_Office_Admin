import { EUserGender } from '@configs'
import { IGetParams } from './app'

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
  email?: string
  password?: string
  confirmPassword?: string
  phone?: string
  firstName?: string
  lastName?: string
  status?: string
  gender?: string
  createdAt?: string
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
