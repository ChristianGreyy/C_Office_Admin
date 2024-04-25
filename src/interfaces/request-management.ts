import { IGetParams } from './app'
import { IUserDetail } from './user-management'

export interface IFetchRequestsParams extends IGetParams {
  sortOption?: string
  search?: string
  status?: string
  type?: string
}

export interface IFetchRequestsSuccessData {
  items: IRequestDetail[],
  page?: number | string,
  total?: number | string,
  limit?: number | string
}

export type TUpdateRequestData = Partial<IRequestDetail>

export type TDeleteRequestData = Partial<IRequestDetail> & { isSoft: boolean }

export interface IRequestDetail {
  id?: number
  startTime?: string
  endTime ?: string
  note?: string
  user: IUserDetail
  status: string
  createdAt?: string
}

export interface IEditRequestData {
  startTime?: string
  endTime ?: string
  user: IUserDetail
  status: string
  note?: string
}
