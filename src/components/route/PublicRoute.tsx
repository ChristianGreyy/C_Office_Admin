import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'js-cookie'

import { LLC_ACCESS_TOKEN, PATH_PLAN } from '@configs'

interface IPublicRouteProps {
  restricted?: boolean
}

export const PublicRoute = (props: IPublicRouteProps) => {
  const { restricted } = props
  const accessToken = Cookies.get(LLC_ACCESS_TOKEN)

  return restricted && accessToken ? <Navigate to={PATH_PLAN} /> : <Outlet />
}
