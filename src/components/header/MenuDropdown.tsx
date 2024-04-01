import { Divider } from 'antd'
import { forwardRef, useRef } from 'react'
import styled from 'styled-components'

import { enumThemeMode, MAIN_THEME_DATA } from '@configs'
import { selectAuth, useAppSelector } from '@redux'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { LockIcon, LogoutIcon } from '../Icon'
import { themes } from '@theme'

interface IMenuDropdownProps {
  handleLogout?: () => void
  handleCloseDropdown: () => void
  onSelectMenuItem?: (value: any) => void
}

export const MenuDropdown = forwardRef(
  (props: IMenuDropdownProps, ref?: React.Ref<HTMLDivElement>) => {
    const { t } = useTranslation(['common', 'login', 'dashboard'])
    const { accountInfo } = useAppSelector(selectAuth)

    const { handleLogout, handleCloseDropdown, onSelectMenuItem } = props

    const navigate = useNavigate()
    const menuDropdown = useRef<HTMLDivElement>(null)

    return (
      <StyledMenuDropdown
        className="dropdown-menu"
        $appTheme={MAIN_THEME_DATA.mainColor}
      >
        <div ref={menuDropdown}>
          <div className="logout" onClick={handleLogout}>
            <LockIcon size={16} />
            <span>{t('login:change_password')}</span>
          </div>
          <Divider className="menu-dropdown_divider" />
          <div className="logout" onClick={handleLogout}>
            <LogoutIcon size={16} />
            <span>{t('common:logout')}</span>
          </div>
        </div>
      </StyledMenuDropdown>
    )
  }
)

export const StyledMenuDropdown = styled((props) => <div {...props} />)<{
  size?: string
  $appTheme?: string
}>`
  width: 100%;
  height: 100%;
  background: ${(p: any) =>
    p.theme_mode === enumThemeMode.DARK
      ? themes.theme.light.colors?.header?.background
      : p.$appTheme};
  color: ${(p: any) => themes.theme.light.colors?.header?.text};
  padding: 0.8rem;
  box-shadow: 0px 3px 10px #00000017;
  border-radius: 0.375rem;
  .heading {
    padding: 0.8rem;
    .name {
      font-weight: 500;
      font-size: 1.4rem;
    }
    .email,
    .brand {
      font-weight: 400;
      font-size: 1.2rem;
    }
  }
  .ant-dropdown-menu {
    /* background: ${(p: any) =>
      p.theme_mode === enumThemeMode.DARK
        ? themes.theme.light.colors?.header?.background
        : p.$appTheme}; */
    background: transparent;
    box-shadow: none;
  }
  .ant-dropdown-menu-item,
  .ant-dropdown-menu-submenu-title {
    color: ${(p: any) => themes.theme.light.colors?.header?.text};
  }

  .ant-dropdown-menu-item-disabled:hover,
  .ant-dropdown-menu-item:hover,
  .ant-dropdown-menu-submenu-title-disabled:hover {
    background-color: rgb(255 255 255 / 0.05);
    border-radius: 0.6rem;
  }

  .menu-dropdown_divider {
    margin: 1rem 0;
    border-top: 1px solid ${(p: any) => themes.theme.light.colors?.header?.text};
    opacity: 0.3;
  }

  .logout {
    display: flex;
    align-items: center;
    padding: 0.8rem;
    border-radius: 0.6rem;
    span {
      margin-left: 0.8rem;
      font-size: 1.4rem;
      font-weight: 400;
    }
    &:hover {
      cursor: pointer;
      background-color: rgb(255 255 255 / 0.05);
    }
  }
`
