import { IGetParams } from './app'

export interface IFetchTrackersParams extends IGetParams {
  sortOption?: string
  search?: string
}

export interface IFetchTrackersSuccessData {
  items: ITrackerDetail[],
  page?: number | string,
  total?: number | string,
  limit?: number | string
}

export type TUpdateTrackerData = Partial<ITrackerDetail>

export type TDeleteTrackerData = Partial<ITrackerDetail> & { isSoft: boolean }

export interface ITrackerDetail {
  id?: number
  name?: string
  color?: string
  createdAt?: string
}

export interface IEditTrackerData {
  name?: string
  color?: string
}
