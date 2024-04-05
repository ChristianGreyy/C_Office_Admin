import { IRoute } from '@interfaces'
import {
  ChangePasswordPage,
  Dashboard,
  ForgotPasswordPage,
  LoginPage,
  ResetPasswordPage,
  UserDetailPage,
  UserManagementPage
} from '@pages'
import { PositionDetailPage } from 'src/pages/position-detail'
import { PositionManagementPage } from 'src/pages/position-management'
import {
  PATH_CHANGE_PASSWORD,
  PATH_DASHBOARD,
  PATH_EDIT_POSITION,
  PATH_EDIT_USER,
  PATH_FORGOT_PASSWORD,
  PATH_LOGIN,
  PATH_POSITION_MANAGEMENT,
  PATH_RESET_PASSWORD,
  PATH_USER_MANAGEMENT
} from './navigation'
export const routes: Array<IRoute> = [
  { path: PATH_RESET_PASSWORD, element: ResetPasswordPage },
  { path: PATH_CHANGE_PASSWORD, element: ChangePasswordPage },
  // { path: PATH_DETAIL_PLAN, element: PlanDetail },
  // { path: PATH_PLAN, element: PlanManagement },
  { path: PATH_DASHBOARD, element: Dashboard },
  { path: PATH_USER_MANAGEMENT, element: UserManagementPage },
  { path: PATH_EDIT_USER, element: UserDetailPage },
  { path: PATH_POSITION_MANAGEMENT, element: PositionManagementPage },
  { path: PATH_EDIT_POSITION, element: PositionDetailPage },
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
