import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { Card, Skeleton, message } from 'antd'
import { format } from 'date-fns'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import {
  EKeyBoardCode,
  INITIAL_PAGINATION_SiZE,
  PATH_STATUS_MANAGEMENT
} from '@configs'
import { BaseResponseError, TUpdateStatusData } from '@interfaces'
import {
  RootState,
  addStatusAction,
  deleteStatusAction,
  getAllStatusAction,
  selectStatusLoading,
  useAppDispatch,
} from '@redux'
import { t } from 'i18next'
import { Button, Input, SharedTable } from 'src/common'
import AddStatusModal from './AddStatusModal'
import ConfirmDeleteModal from './ConfirmDeleteModal'

type Props = {}

export const StatusManagementPage = (props: Props) => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState('')
  const [pageSize, setPageSize] = useState(INITIAL_PAGINATION_SiZE)
  const [isAddingStatus, setIsAddingStatus] = useState<boolean>(false)
  const [isDeletingStatus, setIsDeletingStatus] = useState<boolean>(false)
  const [openAddStatusModal, setOpenAddStatusModal] =
    useState<boolean>(false)

  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] =
    useState<boolean>(false)
  const location = useLocation()

  const dispatch = useAppDispatch()
  const getAllStatusActionLoading = useSelector((state: RootState) =>
    selectStatusLoading(state, 'getAllStatusAction')
  )
  const { statuses, statusCurrentPage, statusTotalItems } = useSelector(
    (state: RootState) => state.status
  )

  const [selectedStatusId, setSelectedStatusId] = useState<number | null>(
    null
  )

  const data = useSelector((state: RootState) => state.status)

  const getAllStatus = () => {
    if (search) {
      const parsedQuery = queryString.parse(search)
      dispatch(getAllStatusAction(parsedQuery))
      return
    }

    dispatch(getAllStatusAction())
  }

  const onSearchStatus = (page?: number) => {
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

  const onOpenStatusModal = () => {
    setOpenAddStatusModal(true)
  }

  const onCloseStatusModal = () => {
    setOpenAddStatusModal(false)
  }

  const onOpenConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(true)
  }

  const onCloseConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(false)
  }

  const onAddStatus = async (data: TUpdateStatusData) => {
    const { ...passData } = data
    setIsAddingStatus(true)
    const payload: any = {
      ...passData,
    }
    try {
      const response = await dispatch(addStatusAction(payload)).unwrap()
      message.success({
        content: 'Create status succesfully',
      })
      onCloseStatusModal()
      getAllStatus()
    } catch (err) {
      const error = err as BaseResponseError
      if (error) {
        message.error({
          content: error?.message,
        })
      }
    } finally {
      setIsAddingStatus(false)
    }
  }

  const onDeleteStatus = async () => {
    try {
      if(selectedStatusId) {
        setIsDeletingStatus(true)
        const response = await dispatch(deleteStatusAction(selectedStatusId)).unwrap()
        message.success({
          content: 'Delete status succesfully',
        })
        getAllStatus()
      }
      onCloseConfirmDeleteModal();
    } catch (err) {
      const error = err as BaseResponseError
      if (error) {
        message.error({
          content: error?.message,
        })
      }
    } finally {
      setIsDeletingStatus(false)
    }
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    // {
    //   title: 'Color',
    //   dataIndex: 'color',
    //   key: 'color',
    // },
    {
      title: 'Created Time',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (e: any) => {
        return <>{format(new Date(e), 'dd/MM/yyyy HH:mm:ss')}</>
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
              navigate(`${PATH_STATUS_MANAGEMENT}/edit/${id}`)
            }}
          />
          <DeleteOutlined
            className="text-lg font-light mr-2.5 cursor-pointer text-[#184f64]"
            onClick={() => {
              onOpenConfirmDeleteModal();
              setSelectedStatusId(id);
            }}
          />
        </div>
      ),
    },
  ]

  useEffect(() => {
    getAllStatus()
  }, [dispatch, search])

  return (
    <Card>
      <div className="sm:pl-[0.75rem] sm:pr-[0.5rem] flex items-center sm:justify-between flex-col sm:flex-row">
        <div className="max-w-[500px] flex-1 flex-row flex">
          <Input
            placeholder={t('common:status_management_placeholder')}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === `${EKeyBoardCode.ENTER}`) {
                onSearchStatus()
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
              onSearchStatus()
            }}
          >
            Search
          </Button>
        </div>
        <div className="flex items-center gap-[16px]">
          <Button type="primary" onClick={onOpenStatusModal}>
            Add new status
          </Button>
        </div>
      </div>
      {getAllStatusActionLoading ? (
        <Skeleton paragraph={{ rows: 4 }} />
      ) : (
        <SharedTable
          columns={columns}
          dataSource={statuses?.map((status, index) => {
            return {
              ...status,
              key: status.id,
              no: index + 1,
            }
          })}
          paginationProps={{
            total: !!statusTotalItems ? +statusTotalItems : undefined,
            pageSize: INITIAL_PAGINATION_SiZE,
            current: +statusCurrentPage,
            onChange(page) {
              onSearchStatus(page)
            },
          }}
        />
      )}
      <AddStatusModal
        open={openAddStatusModal}
        onClose={onCloseStatusModal}
        onSave={onAddStatus}
        isLoading={isAddingStatus}
      />
      <ConfirmDeleteModal
        open={openConfirmDeleteModal}
        onClose={onCloseConfirmDeleteModal}
        onDelete={onDeleteStatus}
        title={'Delete status'}
        content={'Are you sure to delete this status?'}
        isLoading={isDeletingStatus}
      />
    </Card>
  )
}
