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
  PATH_TRACKER_MANAGEMENT,
} from '@configs'
import { BaseResponseError, TUpdateTrackerData } from '@interfaces'
import {
  RootState,
  addTrackerAction,
  deleteTrackerAction,
  getAllTrackersAction,
  selectTrackersLoading,
  useAppDispatch,
} from '@redux'
import { t } from 'i18next'
import { Button, Input, SharedTable } from 'src/common'
import AddTrackerModal from './AddTrackerModal'
import ConfirmDeleteModal from './ConfirmDeleteModal'

type Props = {}

export const TrackerManagementPage = (props: Props) => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState('')
  const [pageSize, setPageSize] = useState(INITIAL_PAGINATION_SiZE)
  const [isAddingTracker, setIsAddingTracker] = useState<boolean>(false)
  const [isDeletingTracker, setIsDeletingTracker] = useState<boolean>(false)
  const [openAddTrackerModal, setOpenAddTrackerModal] =
    useState<boolean>(false)

  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] =
    useState<boolean>(false)
  const location = useLocation()

  const dispatch = useAppDispatch()
  const getAllTrackersActionLoading = useSelector((state: RootState) =>
    selectTrackersLoading(state, 'getAllTrackersAction')
  )
  const { trackers, trackersCurrentPage, trackersTotalItems } = useSelector(
    (state: RootState) => state.trackers
  )

  const [selectedTrackerId, setSelectedTrackerId] = useState<number | null>(
    null
  )

  const data = useSelector((state: RootState) => state.trackers)

  const getAllTrackers = () => {
    if (search) {
      const parsedQuery = queryString.parse(search)
      dispatch(getAllTrackersAction(parsedQuery))
      return
    }

    dispatch(getAllTrackersAction())
  }

  const onSearchTrackers = (page?: number) => {
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

  const onOpenTrackerModal = () => {
    setOpenAddTrackerModal(true)
  }

  const onCloseTrackerModal = () => {
    setOpenAddTrackerModal(false)
  }

  const onOpenConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(true)
  }

  const onCloseConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(false)
  }

  const onAddTracker = async (data: TUpdateTrackerData) => {
    const { ...passData } = data
    setIsAddingTracker(true)
    const payload: any = {
      ...passData,
    }
    try {
      const response = await dispatch(addTrackerAction(payload)).unwrap()
      message.success({
        content: 'Create tracker succesfully',
      })
      onCloseTrackerModal()
      getAllTrackers()
    } catch (err) {
      const error = err as BaseResponseError
      if (error) {
        message.error({
          content: error?.message,
        })
      }
    } finally {
      setIsAddingTracker(false)
    }
  }

  const onDeleteTracker = async () => {
    try {
      if(selectedTrackerId) {
        setIsDeletingTracker(true)
        const response = await dispatch(deleteTrackerAction(selectedTrackerId)).unwrap()
        message.success({
          content: 'Delete tracker succesfully',
        })
        getAllTrackers()
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
      setIsDeletingTracker(false)
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
              navigate(`${PATH_TRACKER_MANAGEMENT}/edit/${id}`)
            }}
          />
          <DeleteOutlined
            className="text-lg font-light mr-2.5 cursor-pointer text-[#184f64]"
            onClick={() => {
              onOpenConfirmDeleteModal();
              setSelectedTrackerId(id);
            }}
          />
        </div>
      ),
    },
  ]

  useEffect(() => {
    getAllTrackers()
  }, [dispatch, search])

  return (
    <Card>
      <div className="sm:pl-[0.75rem] sm:pr-[0.5rem] flex items-center sm:justify-between flex-col sm:flex-row">
        <div className="max-w-[500px] flex-1 flex-row flex">
          <Input
            placeholder={t('common:tracker_management_placeholder')}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === `${EKeyBoardCode.ENTER}`) {
                onSearchTrackers()
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
              onSearchTrackers()
            }}
          >
            Search
          </Button>
        </div>
        <div className="flex items-center gap-[16px]">
          <Button type="primary" onClick={onOpenTrackerModal}>
            Add new tracker
          </Button>
        </div>
      </div>
      {getAllTrackersActionLoading ? (
        <Skeleton paragraph={{ rows: 4 }} />
      ) : (
        <SharedTable
          columns={columns}
          dataSource={trackers?.map((tracker, index) => {
            return {
              ...tracker,
              key: tracker.id,
              no: index + 1,
              // sickness: tracker?.trackerData?.sickness ?? [],
              // gender: tracker?.trackerData?.gender,
            }
          })}
          paginationProps={{
            total: !!trackersTotalItems ? +trackersTotalItems : undefined,
            pageSize: INITIAL_PAGINATION_SiZE,
            current: +trackersCurrentPage,
            onChange(page) {
              onSearchTrackers(page)
            },
          }}
        />
      )}
      <AddTrackerModal
        open={openAddTrackerModal}
        onClose={onCloseTrackerModal}
        onSave={onAddTracker}
        isLoading={isAddingTracker}
      />
      <ConfirmDeleteModal
        open={openConfirmDeleteModal}
        onClose={onCloseConfirmDeleteModal}
        onDelete={onDeleteTracker}
        title={'Delete tracker'}
        content={'Are you sure to delete this tracker?'}
        isLoading={isDeletingTracker}
      />
    </Card>
  )
}
