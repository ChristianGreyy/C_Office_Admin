import { IRoute } from '@interfaces'
import {
  ChangePasswordPage,
  Dashboard,
  ForgotPasswordPage,
  LoginPage,
  ResetPasswordPage,
  UserDetailPage,
  UserManagementPage,
} from '@pages'
import { LevelDetailPage } from 'src/pages/level-detail'
import { LevelManagementPage } from 'src/pages/level-management'
import { PositionDetailPage } from 'src/pages/position-detail'
import { PositionManagementPage } from 'src/pages/position-management'
import { PriorityDetailPage } from 'src/pages/priority-detail'
import { PriorityManagementPage } from 'src/pages/priority-management'
import { StaffAndRoleManagementPage } from 'src/pages/staff-and-role-management'
import { StatusDetailPage } from 'src/pages/status-detail'
import { StatusManagementPage } from 'src/pages/status-management'
import { TrackerDetailPage } from 'src/pages/tracker-detail'
import { TrackerManagementPage } from 'src/pages/tracker-management'
import { UniversityDetailPage } from 'src/pages/university-detail'
import { UniversityManagementPage } from 'src/pages/university-management'

import { ProjectDetailPage } from 'src/pages/project-detail'
import {
  PATH_CHANGE_PASSWORD,
  PATH_DASHBOARD,
  PATH_EDIT_LEVEL,
  PATH_EDIT_POSITION,
  PATH_EDIT_PRIORITY,
  PATH_EDIT_PROJECT,
  PATH_EDIT_STATUS,
  PATH_EDIT_TRACKER,
  PATH_EDIT_UNIVERSITY,
  PATH_EDIT_USER,
  PATH_FORGOT_PASSWORD,
  PATH_LEVEL_MANAGEMENT,
  PATH_LOGIN,
  PATH_POSITION_MANAGEMENT,
  PATH_PRIORITY_MANAGEMENT,
  PATH_RESET_PASSWORD,
  PATH_STAFF_AND_ROLE_MANAGEMENT,
  PATH_STATUS_MANAGEMENT,
  PATH_TRACKER_MANAGEMENT,
  PATH_UNIVERSITY_MANAGEMENT,
  PATH_USER_MANAGEMENT,
  PATH_REQUEST_MANAGEMENT
} from './navigation'
import { RequestManagementPage } from 'src/pages/request-management'
export const routes: Array<IRoute> = [
  { path: PATH_RESET_PASSWORD, element: ResetPasswordPage },
  { path: PATH_CHANGE_PASSWORD, element: ChangePasswordPage },
  // { path: PATH_DETAIL_PLAN, element: PlanDetail },
  // { path: PATH_PLAN, element: PlanManagement },
  { path: PATH_DASHBOARD, element: Dashboard },
  { path: PATH_EDIT_PROJECT, element: ProjectDetailPage },
  { path: PATH_USER_MANAGEMENT, element: UserManagementPage },
  { path: PATH_EDIT_USER, element: UserDetailPage },
  { path: PATH_POSITION_MANAGEMENT, element: PositionManagementPage },
  { path: PATH_EDIT_POSITION, element: PositionDetailPage },
  { path: PATH_LEVEL_MANAGEMENT, element: LevelManagementPage },
  { path: PATH_EDIT_LEVEL, element: LevelDetailPage },
  { path: PATH_UNIVERSITY_MANAGEMENT, element: UniversityManagementPage },
  { path: PATH_EDIT_UNIVERSITY, element: UniversityDetailPage },
  { path: PATH_TRACKER_MANAGEMENT, element: TrackerManagementPage },
  { path: PATH_EDIT_TRACKER, element: TrackerDetailPage },
  { path: PATH_STATUS_MANAGEMENT, element: StatusManagementPage },
  { path: PATH_EDIT_STATUS, element: StatusDetailPage },
  { path: PATH_PRIORITY_MANAGEMENT, element: PriorityManagementPage },
  { path: PATH_EDIT_PRIORITY, element: PriorityDetailPage },
  { path: PATH_STAFF_AND_ROLE_MANAGEMENT, element: StaffAndRoleManagementPage },
  { path: PATH_REQUEST_MANAGEMENT, element: RequestManagementPage },
  // { path: PATH_NOTIFICATION, element: NotificationPage },
  // { path: PATH_EDIT_NOTIFICATION, element: NotificationEditPage },
]

export const publicRoutes: Array<IRoute> = [
  //auth
]

export const restrictedRoutes: Array<IRoute> = [
  //auth
  { path: PATH_LOGIN, element: LoginPage },
  { path: PATH_FORGOT_PASSWORD, element: ForgotPasswordPage },
]
