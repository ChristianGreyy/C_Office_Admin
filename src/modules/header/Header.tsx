import { memo } from 'react'

import { Header } from '@components'
import {
  selectApp,
  selectLayout,
  setShowHeaderMenu,
  setSidebarCollapsed,
  useAppDispatch,
  useAppSelector,
} from '@redux'

export const HeaderNodule = memo(() => {
  const dispatch = useAppDispatch()

  const { themeMode } = useAppSelector(selectApp)
  const { sidebarCollapsed, showHeaderMenu } = useAppSelector(selectLayout)

  const handleChangeCollapsed = (value: boolean) => {
    dispatch(setSidebarCollapsed(value))
  }

  const handleToggleDropdown = () => {
    dispatch(setShowHeaderMenu(!showHeaderMenu))
  }

  return (
    <Header
      collapsed={sidebarCollapsed}
      changeCollapsed={handleChangeCollapsed}
      themeMode={themeMode}
      showMenuDropdown={showHeaderMenu}
      handleToggleDropdown={handleToggleDropdown}
    />
  )
})
