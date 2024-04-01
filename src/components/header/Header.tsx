import { useNavigate } from 'react-router-dom'
import { Divider, MenuProps } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import Cookies from 'js-cookie'

import {
  enumThemeMode,
  MAIN_THEME_DATA,
  MAT_SM_SCREEN_WIDTH,
  COFFICE_ACCESS_TOKEN,
  PATH_LOGIN,
  PATH_RESET_PASSWORD,
  PATH_CHANGE_PASSWORD,
} from '@configs'
import { BreadcrumbsModule } from '@modules'
import {
  LockIcon,
  LogoutIcon,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserHeaderIcon,
} from '../Icon'
import { StyledDropdown, StyledHeader } from './styles'
import { useMediaQuery } from '@utils'
import { authActions } from '@redux'

interface IProps {
  openMenuDropdown?: boolean
  themeMode?: enumThemeMode
  collapsed: boolean
  showMenuDropdown?: boolean
  changeCollapsed: (value: boolean) => void
  handleToggleDropdown: () => void
}

export const Header = (props: IProps) => {
  const { themeMode, collapsed, changeCollapsed, handleToggleDropdown } = props
  const dispatch = useDispatch()
  const isSMScreen = useMediaQuery(`(max-width:${MAT_SM_SCREEN_WIDTH})`)
  const { t } = useTranslation(['common', 'login', 'dashboard'])
  const navigate = useNavigate()

  const handleLogOut = () => {
    Cookies.remove(COFFICE_ACCESS_TOKEN)
    sessionStorage.clear()
    dispatch(authActions.logout())
    navigate(PATH_LOGIN)
  }

  const menuUserItems: MenuProps['items'] = [
    {
      label: (
        <>
          <div
            className="logout"
            onClick={() => {
              navigate(PATH_CHANGE_PASSWORD)
            }}
          >
            <LockIcon size={16} />
            <span>{t('login:change_password')}</span>
          </div>
        </>
      ),
      key: '0',
    },
    {
      label: (
        <div className="logout" onClick={handleLogOut}>
          <LogoutIcon size={16} />
          <span>{t('common:logout')}</span>
        </div>
      ),
      key: '1',
    },
  ]
  return (
    <StyledHeader
      className="header"
      theme_mode={themeMode}
      app_theme={MAIN_THEME_DATA.mainColor}
    >
      <div className="header-container">
        <div className="header-logo">
          <div className="head">
            <span className="title">COffice</span>
          </div>
          {!isSMScreen &&
            React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'trigger',
                onClick: () => changeCollapsed(!collapsed),
              }
            )}
        </div>
        <Divider className="header-divider" type="vertical" />
        <div className="header-right">
          <div className="header-content">
            <BreadcrumbsModule />
            <div className="right-content">
              <div
                className="app-btn settings-btn ignoreOutSide-MenuDropdown"
                onClick={handleToggleDropdown}
              >
                <StyledDropdown
                  overlayClassName="header-dropdown-menu"
                  menu={{ items: menuUserItems }}
                  trigger={['click']}
                >
                  <UserHeaderIcon size={18} />
                </StyledDropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledHeader>
  )
}
