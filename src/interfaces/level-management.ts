import { IGetParams } from './app'

export interface IFetchLevelsParams extends IGetParams {
  sortOption?: string
  search?: string
}

export interface IFetchLevelsSuccessData {
  items: ILevelDetail[],
  page?: number | string,
  total?: number | string,
  limit?: number | string
}

export type TUpdateLevelData = Partial<ILevelDetail>

export type TDeleteLevelData = Partial<ILevelDetail> & { isSoft: boolean }

export interface ILevelDetail {
  id?: number
  name?: string
  color?: string
  createdAt?: string
}

export interface IEditLevelData {
  name?: string
  color?: string
}
