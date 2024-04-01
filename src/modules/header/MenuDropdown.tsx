import { MenuProps } from 'antd'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { MenuDropdown } from '@components'
import {
  PATH_ABOUT,
  PATH_BRANCH_GROUP,
  PATH_GENERAL,
  PATH_LOGIN,
  PATH_POLICY,
  PATH_TERM_AND_POLICY,
  PATH_USER_MANAGEMENT,
  PATH_USER_PROFILE,
  RESET,
  enumSettingItemKey,
} from '@configs'
import {
  authActions,
  setNavCurrentIsOpenKey,
  setNavCurrentKey,
  setShowHeaderMenu,
  useAppDispatch,
} from '@redux'
import { LogApp } from '@utils'

interface IProps {
  any?: any
}

export const MenuDropdownModule = (props: IProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleCloseDropdown = () => {
    dispatch(setShowHeaderMenu(false))
    LogApp('ddddd')
  }

  const menuDropdown = useRef<HTMLDivElement>(null)

  const handleSelectMenuItem: MenuProps['onClick'] = (e) => {
    LogApp('selectNav', e)
    const currentKey = Number(e.key)
    switch (currentKey) {
      case enumSettingItemKey.USER_MANAGEMENT:
        navigate(PATH_USER_MANAGEMENT)
        break
      case enumSettingItemKey.ABOUT:
        navigate(PATH_ABOUT)
        break
      case enumSettingItemKey.POLICY:
        navigate(PATH_TERM_AND_POLICY)
        break

      default:
        return
    }
    dispatch(setNavCurrentKey(undefined))
    dispatch(setNavCurrentIsOpenKey(undefined))
  }

  const handleLogout = () => {
    dispatch(authActions.logout())
    dispatch({ type: RESET })
    // navigate(PATH_LOGIN);
  }

  return (
    <MenuDropdown
      ref={menuDropdown}
      handleCloseDropdown={handleCloseDropdown}
      handleLogout={handleLogout}
      onSelectMenuItem={handleSelectMenuItem}
    />
  )
}
