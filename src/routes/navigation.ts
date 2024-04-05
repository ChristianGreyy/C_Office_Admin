export const PATH_HOME = '/'
export const PATH_DASHBOARD = '/'
export const PATH_MEMBER = '/members'
//auth
export const PATH_LOGIN = '/login'
export const PATH_SIGN_UP = '/register'
export const PATH_FORGOT_PASSWORD = '/forgot-password'
export const PATH_VERIFY_EMAIL = '/verify-email'
export const PATH_RESET_PASSWORD = '/reset-password'
export const PATH_CHANGE_PASSWORD = '/change-password'
export const PATH_TERM_AND_POLICY = '/term-and-policy'
export const PATH_ABOUT = '/about'
//System settings
export const PATH_GENERAL = '/general'
export const PATH_USER_PROFILE = '/profile'
export const PATH_POLICY = '/policy'
export const PATH_BRANCH_GROUP = '/branch-group'
//error
export const PATH_404 = '/*'
// Plan management
export const PATH_PLAN = '/plan-managament'
export const PATH_DETAIL_PLAN = '/plan-managament/:type'
//User management
export const PATH_USER_MANAGEMENT = '/user-management'
export const PATH_EDIT_USER = `${PATH_USER_MANAGEMENT}/edit/:userId`
export const PATH_USER_HEALTH_DETAIL = `${PATH_USER_MANAGEMENT}/view-health-detail/:userId`
// Position management
export const PATH_POSITION_MANAGEMENT = '/position-management'
export const PATH_EDIT_POSITION = `${PATH_POSITION_MANAGEMENT}/edit/:positionId`
// Notification
export const PATH_NOTIFICATION = '/notification'
export const PATH_EDIT_NOTIFICATION = `${PATH_NOTIFICATION}/edit/:notificationId`
