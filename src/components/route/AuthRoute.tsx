import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

import { COFFICE_ACCESS_TOKEN, PATH_LOGIN } from '@configs'

export const AuthRoute = () => {
  const accessToken = Cookies.get(COFFICE_ACCESS_TOKEN)

  return <Outlet />;

  // return accessToken ? <Outlet /> : <Navigate to={PATH_LOGIN} />
}
