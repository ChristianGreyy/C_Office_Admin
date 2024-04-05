import { IGetParams } from './app'

export interface IFetchPrioritiesParams extends IGetParams {
  sortOption?: string
  search?: string
}

export interface IFetchPrioritiesSuccessData {
  items: IPriorityDetail[],
  page?: number | string,
  total?: number | string,
  limit?: number | string
}

export type TUpdatePriorityData = Partial<IPriorityDetail>

export type TDeletePriorityData = Partial<IPriorityDetail> & { isSoft: boolean }

export interface IPriorityDetail {
  id?: number
  name?: string
  color?: string
  createdAt?: string
}

export interface IEditPriorityData {
  name?: string
  color?: string
}
