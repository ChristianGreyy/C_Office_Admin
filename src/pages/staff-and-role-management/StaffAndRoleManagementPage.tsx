import { Tabs } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'

import { EManageRoleTabs } from '@configs'
import { Text } from 'src/common'
import RoleManagementTab from 'src/components/staff-and-role-management/role-management/RoleManagementTab'
import StaffManagementTab from 'src/components/staff-and-role-management/staff-management/StaffManagementTab'

export const StaffAndRoleManagementPage = () => {
  const [activeTab, setActiveTab] = useState<string>(
    EManageRoleTabs.STAFF_MANAGEMENT
  )
  const tabItems = [
    {
      label: <Text>{EManageRoleTabs.STAFF_MANAGEMENT}</Text>,
      key: EManageRoleTabs.STAFF_MANAGEMENT,
      children: <StaffManagementTab activeTab={activeTab} />,
    },
    {
      label: <Text>{EManageRoleTabs.ROLE_MANAGEMENT}</Text>,
      key: EManageRoleTabs.ROLE_MANAGEMENT,
      children: <RoleManagementTab activeTab={activeTab} />,
    },
  ]

  return (
    <StaffAndRoleManagementPageStyled>
      <Tabs
        destroyInactiveTabPane={true}
        defaultActiveKey={EManageRoleTabs.STAFF_MANAGEMENT}
        type="card"
        size={'small'}
        items={tabItems}
        defaultChecked={true}
        activeKey={activeTab}
        onChange={(e) => {
          setActiveTab(e)
        }}
      />
    </StaffAndRoleManagementPageStyled>
  )
}

const StaffAndRoleManagementPageStyled = styled('div')(() => {
  return {
    '.ant-tabs-nav': {
      marginBottom: 0,
      paddingLeft: '1.25rem',

      '& .ant-tabs-tab': {
        borderRadius: '0.75rem 0.75rem 0 0 !important',

        '&.ant-tabs-tab-active': {
          span: {
            color: '#164e63',
            fontWeight: '500',
          },
        },
      },
    },
  }
})
