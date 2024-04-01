import React, { memo } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import styled from 'styled-components'

import { IBreadcrumbItem } from '@interfaces'
import { themes } from '@theme'

interface IProps {
  data?: IBreadcrumbItem[]
}

export const Breadcrumbs = memo((props: IProps) => {
  const { data } = props
  const router = useLocation()
  return (
    <StyledBreadcrumbs className="app-breadcrumb" separator="">
      <ol>
        {data?.map((item: IBreadcrumbItem, index: number) => {
          return (
            <li className="app-breadcrumb-item" key={index}>
              {!!index && (
                <span className="app-breadcrumb-separator">&#62;</span>
              )}
              <span className="app-breadcrumb-link font-bold">
                <NavLink to={item.path} className="font-bold">
                  {`${item.label}`.replaceAll('-', ' ')}
                </NavLink>
              </span>
            </li>
          )
        })}
      </ol>
    </StyledBreadcrumbs>
  )
})

const StyledBreadcrumbs = styled((props) => <nav {...props} />)`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  line-height: 1rem;
  list-style: none;
  color: rgba(0, 0, 0, 0.45);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  ol {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .app-bread a {
    color: ${(p: any) => themes.theme.light.colors?.header?.text};
  }
  .app-breadcrumb a {
    color: rgba(0, 0, 0, 0.45);
    transition: color 0.3s;
  }
  .app-breadcrumb-separator {
    margin: 0 0.5rem;
    font-size: 0.875rem;
    color: rgba(0, 0, 0, 0.45);
  }
  .app-breadcrumb-link {
    font-style: normal;
    font-weight: 400;
    font-size: 0.875rem;
    line-height: 1.25rem;
    text-transform: capitalize;
  }
  .app-breadcrumb-item {
    &:not(:last-child) {
      .app-breadcrumb-link a {
        color: #b6b6b6;
      }
    }
    &:last-child {
      .app-breadcrumb-link a {
        color: #000;
        cursor: default;
      }
    }
  }

  @media (min-width: 768px) and (min-height: 813px) and (orientation: portrait) {
    /* display: none; */
  }
`
