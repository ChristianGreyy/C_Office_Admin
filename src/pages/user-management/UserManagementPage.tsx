import { EditOutlined, HeartOutlined, SearchOutlined } from '@ant-design/icons'
import { Card, Skeleton, message } from 'antd'
import { format } from 'date-fns'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import {
  EKeyBoardCode,
  EUserGender,
  INITIAL_PAGINATION_SiZE,
  PATH_USER_MANAGEMENT,
} from '@configs'
import {
  RootState,
  addUserAction,
  getAllUsersAction,
  selectUsersLoading,
  useAppDispatch,
} from '@redux'
import { Button, Input, SharedTable } from 'src/common'
import { TUpdateUserData } from '@interfaces'
import { t } from 'i18next'
import AddUserModal from './AddUserModal'

type Props = {}

export const UserManagementPage = (props: Props) => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState('')
  const [pageSize, setPageSize] = useState(INITIAL_PAGINATION_SiZE)
  const [isDowloading, setIsDowloading] = useState<boolean>(false)
  const [isAddingUser, setIsAddingUser] = useState<boolean>(false)
  const [openAddUserModal, setOpenAddUserModal] = useState<boolean>(false)
  const location = useLocation()

  const dispatch = useAppDispatch()
  const getAllUsersActionLoading = useSelector((state: RootState) =>
    selectUsersLoading(state, 'getAllUsersAction')
  )
  const { users, usersCurrentPage, usersTotalItems } = useSelector(
    (state: RootState) => state.users
  )

  console.log(users, usersCurrentPage, usersTotalItems)

  const data = useSelector((state: RootState) => state.users)

  const getAllUsers = () => {
    if (search) {
      const parsedQuery = queryString.parse(search)
      dispatch(getAllUsersAction(parsedQuery))
      return
    }

    dispatch(getAllUsersAction())
  }

  const onSearchUsers = (page?: number) => {
    const localURlQuery: any = {
      page: page ?? 1,
      limit: INITIAL_PAGINATION_SiZE,
    }
    if (searchValue) {
      localURlQuery.search = searchValue
    }

    const stringifyQuery = queryString.stringify(localURlQuery)
    setSearchParams(stringifyQuery)
  }

  const onDowloadFile = async () => {
    try {
      setIsDowloading(true)
      // await dowloadFile(`users/export${search}`)
    } catch (error: any) {
      message.error(error.message || 'Oops, something went wrong')
    } finally {
      setIsDowloading(false)
    }
  }

  const onOpenUserModal = () => {
    setOpenAddUserModal(true)
  }

  const onCloseUserModal = () => {
    setOpenAddUserModal(false)
  }

  const onAddUser = async (data: TUpdateUserData) => {
    const { ...passData } = data
    setIsAddingUser(true)
    const payload: any = {
      ...passData,
    }
    try {
      const response = await dispatch(addUserAction(payload)).unwrap()
      console.log(response)
      if(response.statusCode !== 201) {
        message.error(response.message)
        return;
      }
      message.success(response.data.message)
      onCloseUserModal()
      getAllUsers()
    } catch (error: any) {
      console.log('error', error)
      console.log('error message', error.message)
      message.error(error.message)
    } finally {
      setIsAddingUser(false)
    }
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'id',
    },
    {
      title: 'First name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      render: (e: any) => {
        return (
          <>
            {
              {
                [EUserGender.FEMALE as any]: 'Female',
                [EUserGender.MALE]: 'Male',
              }[e]
            }
          </>
        )
      },
    },
    {
      title: 'Created Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (e: any) => {
        return <>{format(new Date(e), 'dd/MM/yyyy HH:mm:ss')}</>
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (e: any) => {
        return <>{e ? 'Active' : 'Inactive'}</>
      },
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'id',
      render: (id: any) => (
        <div className="flex space-x-4">
          <EditOutlined
            className="text-lg font-light mr-2.5 cursor-pointer text-[#184f64]"
            onClick={() => {
              navigate(`${PATH_USER_MANAGEMENT}/edit/${id}`)
            }}
          />
        </div>
      ),
    },
  ]

  useEffect(() => {
    getAllUsers()
  }, [dispatch, search])

  return (
    <Card>
      <div className="sm:pl-[0.75rem] sm:pr-[0.5rem] flex items-center sm:justify-between flex-col sm:flex-row">
        <div className="max-w-[500px] flex-1 flex-row flex">
          <Input
            placeholder={t('common:user_management_placeholder')}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === `${EKeyBoardCode.ENTER}`) {
                onSearchUsers()
              }
            }}
            prefix={
              <span className="flex items-center justify-center pl-[0.75rem]">
                <SearchOutlined />
              </span>
            }
          />

          <Button
            size="small"
            type="primary"
            style={{
              minWidth: '4rem',
            }}
            className="ml-1"
            onClick={() => {
              onSearchUsers()
            }}
          >
            Search
          </Button>
        </div>
        <div className="flex items-center gap-[16px]">
          {/* <Button type="primary" loading={isDowloading} onClick={onDowloadFile}>
            Export
          </Button> */}

          <Button type="primary" onClick={onOpenUserModal}>
            Add new user
          </Button>
        </div>
      </div>
      {getAllUsersActionLoading ? (
        <Skeleton paragraph={{ rows: 4 }} />
      ) : (
        <SharedTable
          columns={columns}
          dataSource={users?.map((user, index) => {
            return {
              ...user,
              key: user.id,
              no: index + 1,
              // sickness: user?.userData?.sickness ?? [],
              // gender: user?.userData?.gender,
            }
          })}
          paginationProps={{
            total: !!usersTotalItems ? +usersTotalItems : undefined,
            pageSize: INITIAL_PAGINATION_SiZE,
            current: +usersCurrentPage,
            onChange(page) {
              onSearchUsers(page)
            },
          }}
        />
      )}
       <AddUserModal
        open={openAddUserModal}
        onClose={onCloseUserModal}
        onSave={onAddUser}
        isLoading={isAddingUser}
      />
    </Card>
  )
}
