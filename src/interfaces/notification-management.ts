import { IGetParams } from './app'

export interface IFetchNotificationsParams extends IGetParams {
  sortOption?: string
}

export interface IFetchNotificationsSuccessData {
  notifications: INotificationDetail[]
  totalItems?: number | string
  currentPage?: number | string
  totalPage?: number | string
}

export type TUpdateNotificationData = Partial<INotificationDetail> & {
  notificationData?: Partial<INotificationData>
  _id: string
}

export interface INotificationDetail {
  _id: string
  titleEn: string
  titleJp: string
  contentEn: string
  contentJp: string
  type: number
  condition: string
  createdAt: string
  updatedAt: string
}

export interface INotificationData {
  contentEn: string
  contentJp: string
}

export interface IEditNotificationData {
  contentEn: string
  contentJp: string
}
