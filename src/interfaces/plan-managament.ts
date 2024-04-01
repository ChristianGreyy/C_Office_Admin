import { EPlanType } from '@configs'
import { IGetParams } from './app'

export interface IFetchPlansParams extends IGetParams {
  sortOption?: string
}

export interface IFetchPlansSuccessData {
  result: IPlanDetail[]
  totalItems?: number | string
  currentPage?: number | string
  totalPage?: number | string
}

export interface IGetPlanByIdSuccessData extends IPlanDetail {}
export interface IDeletePlanSuccessData extends IPlanDetail {}
export interface ICreatePlanSuccessData extends IPlanDetail {}

export interface IPlanDetail {
  _id: string
  titleEn: string
  titleJp: string
  descriptionEn: string
  descriptionJp: string
  price: string | number
  type: EPlanType
  discount: string | number
  discountStatus: boolean
  isActive: boolean
}

export type TPlanPayload = Pick<
  Partial<IPlanDetail>,
  | 'titleEn'
  | 'titleJp'
  | 'descriptionEn'
  | 'descriptionJp'
  | 'discount'
  | 'discountStatus'
  | 'type'
  | 'price'
>

export type IEditPlanProps = TPlanPayload & {
  _id: string
}
