import { IRoute } from '@interfaces'
import {
  PATH_DASHBOARD,
  PATH_DETAIL_PLAN,
  PATH_EDIT_USER,
  PATH_FORGOT_PASSWORD,
  PATH_LOGIN,
  PATH_PLAN,
  PATH_RESET_PASSWORD,
  PATH_CHANGE_PASSWORD,
  PATH_USER_HEALTH_DETAIL,
  PATH_USER_MANAGEMENT,
  PATH_NOTIFICATION,
  PATH_EDIT_NOTIFICATION
} from './navigation'
import {
  ForgotPasswordPage,
  LoginPage,
  PlanDetail,
  PlanManagement,
  ResetPasswordPage,
  ChangePasswordPage,
  Dashboard,
  UserManagementPage,
  UserDetailPage,
  NotificationPage,
  NotificationEditPage
} from '@pages'
export const routes: Array<IRoute> = [
  { path: PATH_RESET_PASSWORD, element: ResetPasswordPage },
  { path: PATH_CHANGE_PASSWORD, element: ChangePasswordPage },
  // { path: PATH_DETAIL_PLAN, element: PlanDetail },
  // { path: PATH_PLAN, element: PlanManagement },
  { path: PATH_DASHBOARD, element: Dashboard },
  { path: PATH_USER_MANAGEMENT, element: UserManagementPage },
  { path: PATH_EDIT_USER, element: UserDetailPage },
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
