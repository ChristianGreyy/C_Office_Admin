import { IGetParams } from './app'

export interface IFetchPositionsParams extends IGetParams {
  sortOption?: string
  search?: string
}

export interface IFetchPositionsSuccessData {
  items: IPositionDetail[],
  page?: number | string,
  total?: number | string,
  limit?: number | string
}

export type TUpdatePositionData = Partial<IPositionDetail>

export type TDeletePositionData = Partial<IPositionDetail> & { isSoft: boolean }

export interface IPositionDetail {
  id?: number
  name?: string
  slug?: string
  color?: string
  createdAt?: string
}

export interface IEditPositionData {
  name?: string
  slug?: string
  color?: string
}
