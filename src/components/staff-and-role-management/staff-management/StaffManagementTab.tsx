import { SearchOutlined } from '@ant-design/icons'
import { Empty, Pagination, Skeleton, message } from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { Button, Input, Loading } from 'src/common'
import { DEFAULT_USER_AVATAR, EManageRoleTabs } from 'src/configs/constants'
import { useDebounce } from 'src/hooks/useDebounce'
import { IStaffPayload, IUserDetail } from 'src/interfaces'
import {
  RootState,
  createAdminAction,
  deleteAdminAction,
  getAdminByIdAction,
  getAdminListAction,
  getRolesAction,
  selectRoleLoading,
  updateAdminByIdAction,
  useAppDispatch,
} from 'src/redux'
import ConfirmDeleteModal from '../ConfirmDeleteModal'
import AddUpdateRoleModal from './AddUpdateStaffModal'

interface IStaffManagementTabProps {
  activeTab?: string
}

const StaffManagementTab = (props: IStaffManagementTabProps) => {
  const { activeTab } = props
  const [open, setOpen] = useState(false)
  const [deleteAdminId, setDeleteAdminID] = useState<number>()
  const dispatch = useAppDispatch()
  const { admins, roles, totalAdmins, pageAdmins, limitAdmins } = useSelector(
    (state: RootState) => state.roles
  )

  const getAdminListActionLoading = useSelector((state: RootState) =>
    selectRoleLoading(state, 'getAdminListAction')
  )

  const createAdminActionLoading = useSelector((state: RootState) =>
    selectRoleLoading(state, 'createAdminAction')
  )

  const deleteAdminActionLoading = useSelector((state: RootState) =>
    selectRoleLoading(state, 'deleteAdminAction')
  )

  const [selectedStaff, setSelectedStaff] = useState<IUserDetail>()
  const [searchValue, setSearchValue] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const debouncedValue = useDebounce<string | null>(searchValue, 800)

  const getAdminsBySearchValue = async () => {
    try {
      setIsSearching(true)
      await dispatch(
        getAdminListAction({
          page: 1,
          search:
            debouncedValue !== null && debouncedValue.trim()
              ? debouncedValue.trim()
              : undefined,
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

  const onCloseAddUpdateModal = () => {
    setOpen(false)
    setSelectedStaff(undefined)
  }

  const onSubmit = async (data: IStaffPayload) => {
    try {
      let response: any
      if (!selectedStaff?.id) {
        response = await dispatch(createAdminAction(data)).unwrap()
        console.log(response)
        message.success({
          content: response.message,
        })
      } else {
        const payload: any = {
          phone: data.phone,
          roleId: data.roleId,
          firstName: data.firstName,
          lastName: data.lastName,
          id: selectedStaff.id,
        }

        if (data.status !== selectedStaff.status) {
          payload.status = data.status
        }
        response = await dispatch(updateAdminByIdAction(payload)).unwrap()
      }

      if (response.admin || response.data) {
        message.success({
          content: response.message,
        })

        dispatch(
          getAdminListAction({
            page: +pageAdmins,
          })
        )
        onCloseAddUpdateModal()
      }
    } catch (error: any) {
      if (error.message) {
        message.error({
          content: error.message,
        })
      }
    }
  }

  const onClickProfile = async (id: number | undefined) => {
    try {
      const response = await dispatch(getAdminByIdAction(`${id}`)).unwrap()
      if (response) {
        setSelectedStaff(response.data)
        setOpen(true)
      }
    } catch (error) {
      throw error
    }
  }

  const onClickDeleteAdmin = (id: number | undefined) => {
    setDeleteAdminID(id)
  }

  const onCancelDeleteAdmin = () => {
    setDeleteAdminID(undefined)
  }

  const onDeleteAdmin = async () => {
    try {
      if (deleteAdminId) {
        const response = await dispatch(
          deleteAdminAction({ id: deleteAdminId })
        ).unwrap()

        if (response.success) {
          message.success({
            content: response.message,
          })
        }

        dispatch(
          getAdminListAction({
            page: admins.length === 1 ? +pageAdmins - 1 : +pageAdmins,
          })
        )
        onCancelDeleteAdmin()
      }
    } catch (error: any) {
      if (error.message) {
        message.error({
          content: error.message,
        })
      }
    }
  }

  useEffect(() => {
    if (activeTab === EManageRoleTabs.STAFF_MANAGEMENT) {
      dispatch(
        getAdminListAction({
          page: 1,
        })
      )

      dispatch(
        getRolesAction({
          limit: 9999,
          page: 1,
        })
      )
    }
  }, [activeTab])

  useEffect(() => {
    debouncedValue !== null && getAdminsBySearchValue()
  }, [debouncedValue])

  return (
    <RoleManagementTabStyled>
      <div className="bg-[#fff] px-[0.5rem] rounded-[5px]">
        <div className=" flex flex-row-reverse items-center justify-between py-[1.25rem] w-full">
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
          <div className="max-w-[500px] flex-1">
            <Input
              prefix={<SearchOutlined className="pl-2" />}
              placeholder="Search by email or name"
              value={searchValue === null ? '' : searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              suffix={isSearching ? <Loading /> : undefined}
            />
          </div>
        </div>
        <div className="pb-[0.5rem]">
          {(getAdminListActionLoading || isSearching) &&
          !createAdminActionLoading ? (
            <Skeleton paragraph={{ rows: 4 }} />
          ) : (
            <>
              <div className="grid grid-cols-2 grid-flow-row-dense mx-[-0.5rem]">
                {!admins?.length ? (
                  <div className="w-full flex items-center justify-center col-span-2">
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </div>
                ) : (
                  admins.map((data, index) => {
                    return (
                      <div key={index} className="col-span-1 p-2">
                        <div className="p-4 flex items-center justify-between border-[1px] border-solid border-[#164e63] rounded-md overflow-hidden">
                          <div className="flex items-center">
                            <img
                              className="w-[64px] h-[64px]  border-solid border-[#164e63] rounded-md"
                              src={DEFAULT_USER_AVATAR}
                              alt={data.firstName}
                            />
                            <div className="ml-2">
                              <p className="text-[20px] font-medium m-0">
                                {data.firstName}
                              </p>
                              <p className="text-[14px] m-0">
                                {data.role?.name || 'Admin'}
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="m-0 text-right text-[14px] capitalize">
                              {data.status}
                            </p>
                            <div className="flex items-center ">
                              <Button
                                type="ghost"
                                size="small"
                                className="submit__btn login-btn mr-4"
                                onClick={() => {
                                  onClickDeleteAdmin(data.id)
                                }}
                              >
                                Delete
                              </Button>
                              <Button
                                htmlType="submit"
                                type="primary"
                                size="small"
                                className="submit__btn login-btn"
                                onClick={() => {
                                  onClickProfile(data.id)
                                }}
                              >
                                Profile
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
              <div className="flex justify-end mt-3 px-[0.5rem]">
                {!!totalAdmins && (
                  <Pagination
                    {...{
                      total: !!totalAdmins ? +totalAdmins : undefined,
                      pageSize: +limitAdmins || 10,
                      current: +pageAdmins,
                      onChange(page) {
                        dispatch(
                          getAdminListAction({
                            page: page,
                          })
                        )
                      },
                    }}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {open && (
        <AddUpdateRoleModal
          open={open}
          selectedStaff={selectedStaff}
          isLoading={false}
          onClose={onCloseAddUpdateModal}
          roles={roles}
          onSubmit={onSubmit}
        />
      )}

      {deleteAdminId && (
        <ConfirmDeleteModal
          title="Delete Staff"
          content="Are you sure to delete this staff?"
          open={!!deleteAdminId}
          isLoading={!!deleteAdminActionLoading}
          onDelete={onDeleteAdmin}
          onClose={onCancelDeleteAdmin}
        />
      )}
    </RoleManagementTabStyled>
  )
}

export default StaffManagementTab

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
