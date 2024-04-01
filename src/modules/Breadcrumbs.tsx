import { Breadcrumbs } from '@components'
import { isNum, LogApp } from '@utils'
import { useLocation } from 'react-router-dom'

export const BreadcrumbsModule = () => {
  const location = useLocation()
  LogApp('location', location)
  const currentPath = location?.pathname
  const listPaths = currentPath
    .slice(1)
    .split('/')
    .filter((value: string) => !isNum(value)) //remove number in path

  const breadcrumbData = listPaths.reduce(
    (prev: any, value: string, index: number) => {
      LogApp('check0', prev, prev[index - 1])
      const path = prev[index - 1]?.path ? currentPath : '/' + value

      return [...prev, { label: value, path: path }]
    },
    []
  )
  LogApp('location2', breadcrumbData)
  return <Breadcrumbs data={breadcrumbData} />
}
