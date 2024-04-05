import { IGetParams } from './app'

export interface IFetchStatusParams extends IGetParams {
  sortOption?: string
  search?: string
}

export interface IFetchStatusSuccessData {
  items: IStatusDetail[],
  page?: number | string,
  total?: number | string,
  limit?: number | string
}

export type TUpdateStatusData = Partial<IStatusDetail>

export type TDeleteStatusData = Partial<IStatusDetail> & { isSoft: boolean }

export interface IStatusDetail {
  id?: number
  name?: string
  color?: string
  createdAt?: string
}

export interface IEditStatusData {
  name?: string
  color?: string
}
