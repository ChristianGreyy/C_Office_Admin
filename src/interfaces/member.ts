export interface IGetMembersParams {
  page: number;
  limit?: number;
  name?: string;
  status?: string;
}

export interface IMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string;
  address: string;
  postal_code: string;
  status: string | null;
  createdAt: string;
  updatedAt: string;
  tier: {
    id: number;
    name: string;
  };
}
export interface IMemberRes {
  id: number;
  cashback: number;
  member_id: number;
  merchant_id: number;
  tier_id: number;
  tier_name: string;
  total_spend?: string;
  total_rebate?: string;
  total_points?: string;
  total_used?: string;
  profile_match?: string;
  total_visits?: string;
  last_visit?: string;
  createdAt: string;
  updatedAt: string;
  member: {
    id: number;
    name: string;
    email: string;
    phone: string;
    gender: string;
    date_of_birth: string;
    address: string;
    postal_code: string;
    status: string | null;
    google_user_id: string | null;
  };
  tier: {
    id: number;
    name: string;
  };
}

export interface IMemberDetailsRes {
  id: number;
  name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string;
  address: string;
  postal_code: string;
  status: string | null;
  createdAt: string;
  updatedAt: string;
  memberLink: {
    id: number;
    cashback: number;
    member_id: number;
    merchant_id: number;
    tier_id: number;
    createdAt: string;
    updatedAt: string;
    tier_name: string;
    total_spend?: string;
    total_rebate?: string;
    total_points?: string;
    total_used?: string;
    profile_match?: string;
    total_visits?: string;
    last_visit?: string;
  };
}

export interface IGetMemberResponse {
  page: number;
  limit: number;
  members: IMemberRes[];
  count: number;
  maxPage: number;
}

export interface IGetOneMemberResponse {
  success: boolean;
  code: number;
  data: IMemberDetailsRes;
  message: string;
}

export interface IGetMemberRoot {
  success: boolean;
  code: number;
  data: IGetMemberResponse;
  message: string;
}

export interface IMemberInfo extends IMember {
  no?: number | string;
  birthday?: string;
  active?: boolean;
  lastVisit?: string;
  onChangeStatus?: (value?: boolean) => void;
}
