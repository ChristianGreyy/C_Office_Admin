import { Layout } from 'antd'
import styled from 'styled-components'

import { ILayout } from '@interfaces'
import { HeaderNodule, InnerAppModule, SidebarModule } from '@modules'
import {
  HEADER_HEIGHT,
  HEADER_PADDING_TOP,
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_WIDTH,
} from '@configs'
import { selectLayout, useAppSelector } from '@redux'

export const AppLayout = (props: ILayout) => {
  const { children } = props
  const { sidebarCollapsed } = useAppSelector(selectLayout)

  return (
    <StyledAppLayout className="main-layout">
      <HeaderNodule />
      <Layout className="content-layout">
        <SidebarModule />
        <StyledPageInner
          className="max-w-full overflow-x-hidden"
          sidebarCollapsed={sidebarCollapsed}
        >
          <InnerAppModule {...props}>{children}</InnerAppModule>
        </StyledPageInner>
      </Layout>
    </StyledAppLayout>
  )
}

const StyledAppLayout = styled((props) => <Layout {...props} />)`
  min-height: 100vh;
  background: #f1f5f9;
`

const StyledPageInner = styled.div<{
  sidebarCollapsed?: boolean
  backgroundColor?: string
  backgroundColor2?: string
}>`
  background: #f1f5f9;
  transition: all 0.3s;
  padding: calc(${HEADER_HEIGHT} + ${HEADER_PADDING_TOP} + 2rem) 1.375rem;
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
`
