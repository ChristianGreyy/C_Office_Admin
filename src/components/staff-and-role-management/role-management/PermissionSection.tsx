import { Checkbox, Divider } from 'antd'
import styled from 'styled-components'

import { IPermission } from 'src/interfaces'

interface IPermissionSectionProps {
  title: string
  permissions: IPermission[]
  permissionIds?: number[]
  onSelectRoleId: (id: number) => void
}

const PermissionSection = (props: IPermissionSectionProps) => {
  const { title, permissions, permissionIds, onSelectRoleId } = props
  return (
    <div>
      <div className="flex items-center">
        <p className="m-0 capitalize">{title}</p>
        <div className="flex-1">
          <Divider />
        </div>
      </div>
      <div>
        <div className="grid grid-cols-2 gap-y-3">
          {permissions.map((item, index) => {
            return (
              <CheckBoxStyled className="col-span-1" key={index}>
                <Checkbox
                  checked={permissionIds?.includes(item.id)}
                  onChange={() => {
                    onSelectRoleId(item.id)
                  }}
                >
                  {item.name}
                </Checkbox>
              </CheckBoxStyled>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const CheckBoxStyled = styled.div`
  .ant-checkbox {
    &:hover {
      .ant-checkbox-inner {
        border-color: ${({ theme }) => {
          return theme.colors?.primary
        }};
      }
    }
  }

  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${({ theme }) => {
      return theme.colors?.primary
    }};
  }

  .ant-checkbox-checked {
    :after {
      border-color: ${({ theme }) => {
        return theme.colors?.primary
      }};
    }

    .ant-checkbox-inner {
      border-color: ${({ theme }) => theme.colors?.primary};
      background-color: ${({ theme }) => {
        return theme.colors?.primary
      }};
    }
  }
`

export default PermissionSection
