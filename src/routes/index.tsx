import { Route, Routes, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

import { publicRoutes, restrictedRoutes, routes } from './routes'
import { IRoute } from '@interfaces'
import { AppLayout, DefaultLayout } from '@layouts'
import { AuthRoute, PublicRoute } from '@components'
import { LLC_ACCESS_TOKEN } from '@configs'
import { authActions } from '@redux'
import { PageError404 } from '../pages'

const Router = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  console.log('Current page', location.pathname)

  useEffect(() => {
    const accessToken = Cookies.get(LLC_ACCESS_TOKEN)
    accessToken &&
      dispatch(authActions.setAccessToken({ access_token: accessToken }))
  }, [dispatch])

  return (
    <Routes>
      <Route
        path={'/*'}
        element={
          <DefaultLayout>
            <PageError404 />
          </DefaultLayout>
        }
      />
      {/* Auth Route */}
      <Route element={<AuthRoute />}>
        {routes.map((route: IRoute, index: number) => {
          const Element = route.element
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <AppLayout>
                  <Element />
                </AppLayout>
              }
            />
          )
        })}
      </Route>
      {/* Restricted Route */}
      <Route element={<PublicRoute restricted={true} />}>
        {restrictedRoutes.map((route: IRoute, index: number) => {
          const Element = route.element
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <DefaultLayout>
                  <Element />
                </DefaultLayout>
              }
            />
          )
        })}
      </Route>
      {/* public Route */}
      <Route element={<PublicRoute />}>
        {publicRoutes.map((route: IRoute, index: number) => {
          const Element = route.element
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <DefaultLayout>
                  <Element />
                </DefaultLayout>
              }
            />
          )
        })}
      </Route>
    </Routes>
  )
}

export default Router
