import {
  CaretDownOutlined,
  CaretUpOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { Skeleton, Tooltip, Typography, message } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { Button, Input, Loading, SharedTable } from 'src/common'
import { EManageRoleTabs } from 'src/configs'
import { useDebounce } from 'src/hooks/useDebounce'
import { IGetRolesParams } from 'src/interfaces'
import {
  RootState,
  createRoleAction,
  deleteRoleByIDAction,
  getPermissions as getPermissionsAction,
  getRoleByIDAction,
  getRolesAction,
  roleActions,
  selectRoleLoading,
  updateRoleByIDAction,
  useAppDispatch,
} from 'src/redux'
import ConfirmDeleteModal from '../ConfirmDeleteModal'
import AddUpdateRoleModal from './AddUpdateRoleModal'

interface IRoleManagementTabProps {
  activeTab?: string
}

const RoleManagementTab = (props: IRoleManagementTabProps) => {
  const { activeTab } = props
  const dispatch = useAppDispatch()
  const {
    permissions,
    selectedRole,
    roles,
    totalRoles,
    pageRoles,
    limitRoles,
  } = useSelector((state: RootState) => state.roles)

  const getRolesActionLoading = useSelector((state: RootState) =>
    selectRoleLoading(state, 'getRolesAction')
  )
  const createRoleActionLoading = useSelector((state: RootState) =>
    selectRoleLoading(state, 'createRoleAction')
  )

  const updateRoleByIDActionLoading = useSelector((state: RootState) =>
    selectRoleLoading(state, 'updateRoleByIDAction')
  )

  const deleteRoleByIDActionLoading = useSelector((state: RootState) =>
    selectRoleLoading(state, 'deleteRoleByIDAction')
  )

  const [open, setOpen] = useState(false)
  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] = useState(false)
  const [searchValue, setSearchValue] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null)
  const debouncedValue = useDebounce<string | null>(searchValue, 800)
  const [sort, setSort] = useState<{ [key: string]: any }>({})

  const getRolesBySearchValue = async () => {
    try {
      setIsSearching(true)
      await dispatch(
        getRolesAction({
          page: 1,
          search:
            debouncedValue !== null && debouncedValue.trim()
              ? debouncedValue.trim()
              : undefined,
          // isDefault: false,
        })
      ).unwrap()
      setIsSearching(false)
    } catch (error: any) {
      if (error.message) {
        message.error({
          content: error.message,
        })
      }
    }
  }

  const onClose = () => {
    setOpen(false)
    dispatch(
      roleActions.setSelectedRole({
        id: null,
        permissionIds: [],
        name: '',
      })
    )
  }

  const onCloseConfirmModal = () => {
    setOpenConfirmDeleteModal(false)
  }

  const getPermissions = async () => {
    dispatch(getPermissionsAction())
  }

  const getRoles = async (params: IGetRolesParams) => {
    dispatch(getRolesAction({ ...params }))
  }

  const getRoleById = async (id: number) => {
    dispatch(getRoleByIDAction(id))
  }

  const onSelectRoleId = (id: number) => {
    let localSelectedRoleId = selectedRole?.permissionIds || []

    if (selectedRole?.permissionIds.includes(id)) {
      localSelectedRoleId = selectedRole?.permissionIds.filter(
        (permissionId) => permissionId !== id
      )
    } else {
      localSelectedRoleId = [...(selectedRole?.permissionIds || []), id]
    }

    dispatch(
      roleActions.setSelectedRole({
        ...selectedRole,
        permissionIds: localSelectedRoleId,
      })
    )
  }

  const onEditRole = (id: number) => {
    getRoleById(id)
    setOpen(true)
  }

  const onDeleteRole = async () => {
    try {
      if (selectedRoleId) {
        const response = await dispatch(
          deleteRoleByIDAction(selectedRoleId)
        ).unwrap()
        if (response.success) {
          message.success({
            content: response.message,
          })
        }
        getRoles({
          page: roles.length === 1 ? +pageRoles - 1 : +pageRoles,
          sort,
        })
      }
    } catch (error: any) {
      if (error.message) {
        message.error({
          content: error.message,
        })
      }
    } finally {
      setOpenConfirmDeleteModal(false)
    }
  }

  const onSubmitRoles = async (data: { name: string }) => {
    try {
      let response: any
      if (!selectedRole.id) {
        response = await dispatch(
          createRoleAction({
            permissionIds: selectedRole.permissionIds,
            name: data.name,
          })
        ).unwrap()

        message.success({
          content: 'Create role successfully',
        })
      } else {
        response = await dispatch(
          updateRoleByIDAction({
            id: selectedRole.id,
            permissionIds: selectedRole.permissionIds,
            name: data.name,
          })
        ).unwrap()

        message.success({
          content: 'Update role successfully',
        })
      }
      getRoles({
        page: +pageRoles,
        sort,
      })
      onClose()
    } catch (error: any) {
      if (error) {
        message.error({
          content: error.errors?.length ? error.errors[0] : error.message,
        })
      }
    }
  }

  const columns = [
    {
      width: '50%',
      title: () => {
        return (
          <div className="flex items-center justify-center w-full">
            <p className="m-0">Name</p>
            <div
              className="flex items-center ml-2 cursor-pointer"
              onClick={() => {
                setSort({ ...sort, name: sort.name === 'asc' ? 'desc' : 'asc' })
                getRoles({
                  page: +pageRoles,
                  sort: { ...sort, name: sort.name === 'asc' ? 'desc' : 'asc' },
                })
              }}
            >
              {sort.name === 'asc' ? (
                <CaretDownOutlined />
              ) : (
                <CaretUpOutlined />
              )}
            </div>
          </div>
        )
      },
      dataIndex: 'name',
      key: 'name',
      render: (e: string) => {
        return (
          <div className="flex items-center max-w-[730px]">
            <Typography.Text
              style={{
                width: '100%',
                whiteSpace: 'nowrap',
              }}
              ellipsis={true}
            >
              {e}
            </Typography.Text>
          </div>
        )
      },
    },
    {
      width: '40%',
      title: () => {
        return (
          <div className="flex items-center justify-center w-full">
            <p className="m-0">Last update</p>
            <div
              className="flex items-center ml-2 cursor-pointer"
              onClick={() => {
                setSort({
                  ...sort,
                  updatedAt: sort.updatedAt === 'asc' ? 'desc' : 'asc',
                })
                getRoles({
                  page: +pageRoles,
                  sort: {
                    ...sort,
                    updatedAt: sort.updatedAt === 'asc' ? 'desc' : 'asc',
                  },
                })
              }}
            >
              {sort.updatedAt === 'asc' ? (
                <CaretDownOutlined />
              ) : (
                <CaretUpOutlined />
              )}
            </div>
          </div>
        )
      },
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (e: string) => {
        return (
          <div className="flex items-center justify-center">
            {moment(e).format('YYYY/MM/DD - HH:mm:ss')}
          </div>
        )
      },
    },
    {
      title: () => {
        return (
          <div className="flex items-center justify-center w-full">
            <p className="m-0">Action</p>
          </div>
        )
      },
      key: 'id',
      dataIndex: 'id',
      width: '10%',
      render: (id: number) => (
        <div className="flex space-x-4 items-center justify-center">
          <EditOutlined
            className="text-lg font-light mr-2.5 cursor-pointer !text-[#184f64] hover:opacity-80"
            onClick={() => {
              onEditRole(id)
            }}
          />
          <Tooltip title="This role will be deleted">
            <DeleteOutlined
              className="text-lg font-light mr-2.5 cursor-pointer !text-red-600 hover:opacity-80"
              onClick={() => {
                setOpenConfirmDeleteModal(true)
                setSelectedRoleId(id)
              }}
            />
          </Tooltip>
        </div>
      ),
    },
  ]

  useEffect(() => {
    getPermissions?.()
  }, [])

  useEffect(() => {
    activeTab === EManageRoleTabs.ROLE_MANAGEMENT &&
      getRoles({
        page: 1,
        sort,
      })
  }, [activeTab])

  useEffect(() => {
    debouncedValue !== null && getRolesBySearchValue()
  }, [debouncedValue])

  return (
    <RoleManagementTabStyled className="bg-[#fff] py-0">
      <div className="bg-[#fff] px-[1.25rem] rounded-[5px]">
        <div className="flex items-center justify-between py-[1.25rem] w-full">
          <div className="max-w-[500px] flex-1">
            <Input
              prefix={<SearchOutlined className="pl-2" />}
              placeholder="Enter role name"
              value={searchValue === null ? '' : searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              suffix={isSearching ? <Loading /> : undefined}
            />
          </div>
          <div>
            <Button
              type="primary"
              onClick={() => {
                setOpen(true)
              }}
            >
              Add new
            </Button>
          </div>
        </div>
        <div className="pb-[1.25rem]">
          {getRolesActionLoading || isSearching ? (
            <Skeleton paragraph={{ rows: 4 }} />
          ) : (
            <SharedTable
              columns={columns as any}
              dataSource={roles}
              paginationProps={{
                total: !!totalRoles ? +totalRoles : undefined,
                pageSize: +limitRoles || 10,
                current: +pageRoles,
                onChange(page) {
                  getRoles({
                    page,
                    sort,
                  })
                },
              }}
            />
          )}
        </div>
      </div>
      {open && (
        <AddUpdateRoleModal
          onSubmitRoles={onSubmitRoles}
          selectedRole={selectedRole}
          permissions={permissions}
          open={open}
          onSelectRoleId={onSelectRoleId}
          onClose={onClose}
          isLoading={!!createRoleActionLoading || !!updateRoleByIDActionLoading}
        />
      )}
      {openConfirmDeleteModal && (
        <ConfirmDeleteModal
          title="Delete Role"
          content="Are you sure to delete this role?"
          open={openConfirmDeleteModal}
          isLoading={!!deleteRoleByIDActionLoading}
          onDelete={onDeleteRole}
          onClose={onCloseConfirmModal}
        />
      )}
    </RoleManagementTabStyled>
  )
}

export default RoleManagementTab

const RoleManagementTabStyled = styled('div')(() => {
  return {
    '&>div': {
      borderRight: '1px solid #f0f0f0',
      borderLeft: '1px solid #f0f0f0',
      borderBottom: '1px solid #f0f0f0',
    },

    '& .ant-table-wrapper': {
      margin: 0,
      '& .ant-table-content': {
        marginRight: 0,
      },
    },
  }
})
