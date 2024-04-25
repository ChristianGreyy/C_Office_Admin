import { IGetParams } from './app'
import { IPriorityDetail } from './priority-management'
import { IStatusDetail } from './status-management'
import { ITrackerDetail } from './tracker-management'
import { IUserDetail } from './user-management'

export interface IFetchProjectsParams extends IGetParams {
  sortOption?: string
  search?: string
}

export interface IFetchProjectsSuccessData {
  items: IProjectDetail[],
  page?: number | string,
  total?: number | string,
  limit?: number | string
}

export type TUpdateProjectData = Partial<IProjectDetail>

export type TDeleteProjectData = Partial<IProjectDetail> & { isSoft: boolean }

export interface IIssueDetail {
  id: number;
  name: string;
  tracker: ITrackerDetail;
  trackerId: number;
  status: IStatusDetail;
  statusId: number;
  priority: IPriorityDetail;
  priorityId: number;
  assigner: IUserDetail;
  assignId: number;
  creator: IUserDetail;
  creatorId: number;
  subject: string;
  estimateTime: number;
  spentTime: number;
  startDate: Date;
  dueDate: Date;
  completedPercent: number;
  input: string;
}

export interface IProjectDetail {
  id?: number
  name?: string
  kickOffDate?: string
  deadline?: string
  createdAt?: string
  issues: IIssueDetail[]
}

export interface IEditProjectData {
  name?: string
  kickOffDate?: string
  deadline?: string
}

export interface IProjectMember {
  role: EProjectMemberRole;
  user: IUserDetail;
}

export interface IAddMember {
  id: number;
  role?: EProjectMemberRole;
  userId?: number;
}

export interface TAddMembersForProject {
  id: number;
  members?: IAddMember[];
}

export interface IProjectMemberLayout {
  [key: string]:  IUserDetail[];
}

export enum EProjectMemberRole {
  manager = "manager",
  qc = "qc",
  developer = "developer",
  tester = "tester",
  leader = "leader",
  sale = "sale",
}
