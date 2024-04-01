import { MenuProps, Tooltip } from 'antd'
import { memo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { NavMenuIcon, Sidebar } from '@components'
import { MAT_SM_SCREEN_WIDTH, SIDEBAR_DATA } from '@configs'
import {
  selectApp,
  selectLayout,
  setSidebarCollapsed,
  useAppDispatch,
  useAppSelector,
} from '@redux'
import { LogApp, useForceUpdate, useMediaQuery } from '@utils'

export const SidebarModule = memo(() => {
  const { themeMode } = useAppSelector(selectApp)
  console.log('Theme Mode', themeMode)

  const { sidebarCollapsed, navCurrentKey } = useAppSelector(selectLayout)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const forceUpdate = useForceUpdate()

  const isSMScreen = useMediaQuery(`(max-width:${MAT_SM_SCREEN_WIDTH})`)

  const handleChangeCollapsed = (value: boolean) => {
    dispatch(setSidebarCollapsed(value))
  }

  const handleSelectMenuItem: MenuProps['onClick'] = (e) => {
    LogApp('selectNav', e)
    const currentKey = e.key

    navigate(e.key)
  }

  const navbarItems: MenuProps['items'] = SIDEBAR_DATA.map((item, _) => {
    LogApp('C0', item)
    console.log(item)

    return {
      key: item.path,
      path: item.path,
      icon: (
        <Tooltip title={item?.label}>
          <NavMenuIcon
            key={item.pathKey}
            pathKey={item.pathKey}
            className="menu__icon"
          />
        </Tooltip>
      ),
      label: item?.label,
      children: item?.subItems?.length
        ? item?.subItems?.map((subItem, _) => {
            return {
              key: subItem?.path,
              label: subItem?.label,
              path: subItem.path,
              icon: (
                <Tooltip placement="right" title={subItem?.label}>
                  <NavMenuIcon
                    key={subItem.path}
                    pathKey={subItem?.pathKey}
                    className="sub-menu__icon"
                    size={20}
                  />
                </Tooltip>
              ),
              children: subItem?.subOptions?.length
                ? item?.subItems?.map((option, _) => {
                    return {
                      key: option?.path,
                      label: option?.label,
                      path: option.path,
                      icon: (
                        <Tooltip title={option?.label}>
                          <NavMenuIcon
                            key={option?.path}
                            pathKey={option?.pathKey}
                            className="sub-option__icon"
                            size={20}
                          />
                        </Tooltip>
                      ),
                    }
                  })
                : undefined,
            }
          })
        : undefined,
    }
  })

  return (
    <Sidebar
      isSMScreen={isSMScreen}
      collapsed={sidebarCollapsed}
      onChangeCollapsed={handleChangeCollapsed}
      themeMode={themeMode}
      navbarItems={navbarItems}
      onSelectMenuItem={handleSelectMenuItem}
    />
  )
})
