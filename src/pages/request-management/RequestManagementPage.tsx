import { CheckOutlined, CloseOutlined, SearchOutlined } from '@ant-design/icons'
import { Card, Skeleton, message } from 'antd'
import { format } from 'date-fns'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { ShareSelectInput } from '@components'
import { EKeyBoardCode, INITIAL_PAGINATION_SiZE } from '@configs'
import { BaseResponseError } from '@interfaces'
import {
  RootState,
  getAllRequestsAction,
  selectRequestsLoading,
  updateRequestByIdAction,
  useAppDispatch,
} from '@redux'
import { t } from 'i18next'
import { Button, Input, SharedTable } from 'src/common'
import ConfirmApproveModal from './ConfirmApproveModal'
import ConfirmRejectModal from './ConfirmRejectModal'

type Props = {}

export const RequestManagementPage = (props: Props) => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState('')
  const [status, setStatus] = useState('')
  const [type, setType] = useState('')
  const [pageSize, setPageSize] = useState(INITIAL_PAGINATION_SiZE)
  const [isAddingRequest, setIsAddingRequest] = useState<boolean>(false)
  const [isDeletingRequest, setIsDeletingRequest] = useState<boolean>(false)
  const [openAddRequestModal, setOpenAddRequestModal] = useState<boolean>(false)

  const [openConfirmApproveModal, setOpenConfirmApproveModal] =
    useState<boolean>(false)
  const [openConfirmRejectModal, setOpenConfirmRejectModal] =
    useState<boolean>(false)
  const location = useLocation()

  const dispatch = useAppDispatch()
  const getAllRequestsActionLoading = useSelector((state: RootState) =>
    selectRequestsLoading(state, 'getAllRequestsAction')
  )
  const { requests, requestsCurrentPage, requestsTotalItems } = useSelector(
    (state: RootState) => state.requests
  )

  console.log('requests', requests)

  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(
    null
  )

  const getAllRequests = () => {
    dispatch(getAllRequestsAction())
  }

  const onSearchRequests = (page?: number) => {
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

  const onOpenConfirmApproveModal = () => {
    setOpenConfirmApproveModal(true)
  }

  const onCloseConfirmApproveModal = () => {
    setOpenConfirmApproveModal(false)
  }

  const onOpenConfirmRejectModal = () => {
    setOpenConfirmRejectModal(true)
  }

  const onCloseConfirmRejectModal = () => {
    setOpenConfirmRejectModal(false)
  }

  const onApproveRequest = async () => {
    try {
      if (selectedRequestId) {
        setIsDeletingRequest(true)
        const response = await dispatch(
          updateRequestByIdAction({
            id: selectedRequestId,
            status: 'approved',
          })
        ).unwrap()
        message.success({
          content: 'Approve request successfully',
        })
        getAllRequests()
      }
      onCloseConfirmApproveModal()
    } catch (err) {
      const error = err as BaseResponseError
      if (error) {
        message.error({
          content: error?.message,
        })
      }
    } finally {
      setIsDeletingRequest(false)
    }
  }

  const onRejectRequest = async () => {
    try {
      if (selectedRequestId) {
        setIsDeletingRequest(true)
        const response = await dispatch(
          updateRequestByIdAction({
            id: selectedRequestId,
            status: 'rejected',
          })
        ).unwrap()
        message.success({
          content: 'Reject request succesfully',
        })
        getAllRequests()
      }
      onCloseConfirmRejectModal()
    } catch (err) {
      const error = err as BaseResponseError
      if (error) {
        message.error({
          content: error?.message,
        })
      }
    } finally {
      setIsDeletingRequest(false)
    }
  }

  const columns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'id',
    },
    {
      title: 'Start time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (e: any) => {
        return <>{format(new Date(e), 'dd/MM/yyyy HH:mm:ss')}</>
      },
    },
    {
      title: 'End time',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (e: any) => {
        return <>{format(new Date(e), 'dd/MM/yyyy HH:mm:ss')}</>
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (e: any) => {
        return <>{e === 'over_time' ? 'Over time' : 'Absence'}</>
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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
          <CheckOutlined
            className="text-lg font-light mr-2.5 cursor-pointer text-[#184f64]"
            onClick={() => {
              onOpenConfirmApproveModal()
              setSelectedRequestId(id)
            }}
          />
          <CloseOutlined
            className="text-lg font-light mr-2.5 cursor-pointer text-[#184f64]"
            onClick={() => {
              onOpenConfirmRejectModal()
              setSelectedRequestId(id)
            }}
          />
        </div>
      ),
    },
  ]

  useEffect(() => {
    getAllRequests()
  }, [dispatch, search])

  const typesOptions = [
    {
      label: 'All',
      value: '',
    },
    {
      label: 'Absence',
      value: 'absence',
    },
    {
      label: 'Over time',
      value: 'over_time',
    },
  ]

  const statusesOptions = [
    {
      label: 'All',
      value: '',
    },
    {
      label: 'Pending',
      value: 'pending',
    },
    {
      label: 'Approved',
      value: 'approved',
    },
    {
      label: 'Rejected',
      value: 'rejected',
    },
  ]

  return (
    <Card>
      <div className="sm:pl-[0.75rem] sm:pr-[0.5rem]">
        <div className="flex w-full gap-2">
          <div className="w-[500px]">
            <ShareSelectInput
              data={typesOptions as any}
              label={'Type'}
              onChange={(data) => {
                setType(data)
                dispatch(
                  getAllRequestsAction({
                    type: data,
                    search,
                    status,
                  })
                )
              }}
            />
          </div>
          <div className="w-[500px]">
            <ShareSelectInput
              data={statusesOptions as any}
              label={'Status'}
              onChange={(data) => {
                setStatus(data)
                dispatch(
                  getAllRequestsAction({
                    status: data,
                    search,
                    type,
                  })
                )
              }}
            />
          </div>
        </div>
        <div className="max-w-[500px] flex-1 flex-row flex mt-4">
          <Input
            placeholder={t('common:request_management_placeholder')}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === `${EKeyBoardCode.ENTER}`) {
                onSearchRequests()
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
              onSearchRequests()
            }}
          >
            Search
          </Button>
        </div>
      </div>
      {getAllRequestsActionLoading ? (
        <Skeleton paragraph={{ rows: 4 }} />
      ) : (
        <SharedTable
          columns={columns}
          dataSource={requests?.map((request, index) => {
            return {
              ...request,
              key: request.id,
              no: index + 1,
            }
          })}
          paginationProps={{
            total: !!requestsTotalItems ? +requestsTotalItems : undefined,
            pageSize: INITIAL_PAGINATION_SiZE,
            current: +requestsCurrentPage,
            onChange(page) {
              onSearchRequests(page)
            },
          }}
        />
      )}
      <ConfirmApproveModal
        open={openConfirmApproveModal}
        onClose={onCloseConfirmApproveModal}
        onApprove={onApproveRequest}
        title={'Approve request'}
        content={'Are you sure to approve this request?'}
        isLoading={isDeletingRequest}
      />
      <ConfirmRejectModal
        open={openConfirmRejectModal}
        onClose={onCloseConfirmRejectModal}
        onReject={onRejectRequest}
        title={'Reject request'}
        content={'Are you sure to reject this request?'}
        isLoading={isDeletingRequest}
      />
    </Card>
  )
}
