import { IGetParams } from './app'

export interface IFetchUniversitiesParams extends IGetParams {
  sortOption?: string
  search?: string
}

export interface IFetchUniversitiesSuccessData {
  items: IUniversityDetail[],
  page?: number | string,
  total?: number | string,
  limit?: number | string
}

export type TUpdateUniversityData = Partial<IUniversityDetail>

export type TDeleteUniversityData = Partial<IUniversityDetail> & { isSoft: boolean }

export interface IUniversityDetail {
  id?: number
  name?: string
  color?: string
  createdAt?: string
}

export interface IEditUniversityData {
  name?: string
  color?: string
}
