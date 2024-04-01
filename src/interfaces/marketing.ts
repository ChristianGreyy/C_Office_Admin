export interface IAnnouncement {
  id: number;
  name: string;
  description: string;
  image: string;
  status: boolean;
  type: string;
  action: string;
  tier_ids: Array<number>;
  merchant_id?: number;
  start_time: number | string;
  end_time: number | string;
  createdAt?: string;
  updatedAt?: string;
  no?: number | string;
  duration?: string;
  tiers?: Array<{
    id: number;
    name: string;
  }>;
}

export interface IGetAnnouncementsParams {
  num?: number;
  page: number;
  limit?: number;
  name?: string;
  signal?: AbortSignal;
}

export interface ICreateAnnouncement {
  name: string;
  description: string;
  image: string;
  status: true;
  type: string;
  action: string;
  tier_ids: Array<number>;
  start_time: number | string;
  end_time: number | string;
}

export interface IUpdateAnnouncement {
  name?: string;
  description?: string;
  image?: string;
  status?: true;
  type?: string;
  action?: string;
  tier_ids?: Array<number>;
  start_time?: number | string;
  end_time?: number | string;
}

export interface IGetAnnouncementResponse {
  page: number;
  limit: number;
  rules: IAnnouncement[];
  maxPage: number;
  count: number;
}

export interface IGetAnnouncementRoot {
  success: boolean;
  code: number;
  data: IGetAnnouncementResponse;
  message: string;
}

export interface IGetOneAnnouncementRoot {
  success: boolean;
  code: number;
  data: IAnnouncement;
  message: string;
}
