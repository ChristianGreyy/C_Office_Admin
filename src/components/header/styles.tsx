import styled from 'styled-components'
import { Dropdown, DropDownProps, Layout } from 'antd'

import {
  enumThemeMode,
  HEADER_HEIGHT,
  MAIN_THEME_DATA,
  SIDEBAR_WIDTH,
} from '@configs'
import { themes } from '@theme'

const { Header } = Layout

export const StyledHeader = styled((props) => <Header {...props} />)<{
  app_theme?: string
  theme_mode?: enumThemeMode
}>`
  padding: 1.25rem 0.75rem;
  box-shadow: 0 0 11px rgb(0 0 0 / 13%);
  transition: 0.2s;
  top: 0;
  left: 0;
  height: ${HEADER_HEIGHT};
  position: fixed;
  width: 100%;
  z-index: 100;

  align-items: center;

  @media (min-width: 768px) {
    display: block;
    --tw-gradient-to: transparent;
    --tw-gradient-from: rgb(var(--color-slate-100));
    --tw-gradient-stops: var(--tw-gradient-from),
      var(--tw-gradient-to, rgb(var(--color-slate-100) / 0));
    background: linear-gradient(to bottom, var(--tw-gradient-stops));
  }

  .header-container {
    height: ${HEADER_HEIGHT};
    background: ${(p: any) =>
      p.theme_mode === enumThemeMode.LIGHT
        ? themes.theme.light.colors?.header?.background
        : themes.theme.dark.colors?.header?.background};
    /* width: calc(100vw - 0.75rem * 2); */
    width: 100%;
    display: flex;
    position: relative;
    align-items: center;
    border-radius: 0.5rem;
    --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color),
      0 2px 4px -2px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    &:before {
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      top: -1rem;
      margin-left: 1rem;
      margin-right: 1rem;
      margin-top: 0.5rem;
      height: 65px;
      border-radius: 0.5rem;
      background-color: ${MAIN_THEME_DATA.mainColor};
      opacity: 0.3;
    }
  }

  .header-logo {
    position: relative;
    width: calc(${SIDEBAR_WIDTH} - 0.75rem);
    padding: 0 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .head {
      display: flex;
      align-items: center;
      .title {
        font-size: 1.25rem;
        font-weight: 1.25rem;
        color: ${(p: any) => themes.theme.light.colors?.header?.text};
      }
    }
  }
  .header-divider {
    position: relative;
    height: calc(${HEADER_HEIGHT} - 0.625rem * 2);
    margin: 0;
    border-left: 1px solid rgb(255 255 255 / 0.08);
  }
  .header-right {
    position: relative;
    padding: 1.25rem 0;
    width: calc(100vw - ${SIDEBAR_WIDTH});
    .header-content {
      width: 100%;
      padding: 0 1.5rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .app-breadcrumb-item:not(:last-child) .app-breadcrumb-link a {
        color: ${(p) => themes.theme.light.colors?.header?.text};
      }
      .app-breadcrumb-separator {
        color: ${(p) => themes.theme.light.colors?.header?.subText};
      }
      .app-breadcrumb-item:last-child .app-breadcrumb-link a {
        color: ${(p) => themes.theme.light.colors?.header?.subText};
      }
    }
  }
`

export const StyledDropdown = styled((props: DropDownProps) => (
  <Dropdown {...props} />
))`
  height: 100%;
  width: 100%;
  background: ${(p: any) =>
    p.theme_mode === enumThemeMode.DARK
      ? themes.theme.light.colors?.header?.background
      : p.$appTheme};
  color: ${(p: any) => themes.theme.light.colors?.header?.text};
  padding: 0.4rem;
  box-shadow: 0px 3px 10px #00000017;
  border-radius: 0.1rem;
`
