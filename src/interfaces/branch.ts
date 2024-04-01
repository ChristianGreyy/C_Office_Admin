export interface BranchGroup {
  id: number;
  title: string;
  merchant_id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BranchGroupResponse {
  page: number;
  limit: number;
  branchGroups: BranchGroup[];
  count: number;
}

export interface BranchGroupRoot {
  success: boolean;
  code: number;
  data: BranchGroupResponse;
  message: string;
}
export interface BranchTableColumn {
  key: React.Key;
  no: number;
  branchName: string;
  //   onAdd: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}
export interface BranchGroupData {
  count: number;
  limit: number;
  data: BranchTableColumn[];
}

export interface CreatedBranchGroupResponse {
  id: number;
  title: string;
  merchant_id: number;
  store_ids: number[];
  updatedAt: Date;
  createdAt: Date;
}

export interface CreatedBranchGroupRoot {
  success: boolean;
  code: number;
  data: CreatedBranchGroupResponse;
  message: string;
}

export interface BranchGroupInfo {
  id: number;
  title: string;
  merchant_id: number;
  store_ids: number[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AvailableStoresInfo {
  id: number;
  name: string;
  isChecked?: boolean;
}

export interface SelectStoresInfo {
  id: number;
  name: string;
  isChecked?: boolean;
}

export interface BranchDetailResponse {
  branchGroupInfo: BranchGroupInfo;
  availableStoresInfo: StoresInfo[];
  selectStoresInfo: StoresInfo[];
}

export interface BranchDetailRoot {
  success: boolean;
  code: number;
  data: BranchDetailResponse;
  message: string;
}
export type BranchListType = { selected: StoresInfo[]; available: StoresInfo[] };

export interface StoresInfo {
  id: number;
  name: string;
  lat: number;
  lng: number;
  store_code: string;
  address: string;
  phone: string;
  opening_hour: string;
  merchant_id: number;
  createdAt: Date;
  updatedAt: Date;
  isChecked?: boolean;
}

export interface StoreResponse {
  page: number;
  limit: number;
  storesInfo: StoresInfo[];
  count: number;
}

export interface StoreRoot {
  success: boolean;
  code: number;
  data: StoreResponse;
  message: string;
}
export type BranchPayload = {
  title: string;
  storeIds: number[];
};
