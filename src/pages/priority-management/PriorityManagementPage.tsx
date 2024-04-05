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
import { BaseResponseError, TUpdatePriorityData } from '@interfaces'
import {
  RootState,
  addPriorityAction,
  deletePriorityAction,
  getAllPrioritiesAction,
  selectPrioritiesLoading,
  useAppDispatch,
} from '@redux'
import { t } from 'i18next'
import { Button, Input, SharedTable } from 'src/common'
import AddPriorityModal from './AddPriorityModal'
import ConfirmDeleteModal from './ConfirmDeleteModal'

type Props = {}

export const PriorityManagementPage = (props: Props) => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState('')
  const [pageSize, setPageSize] = useState(INITIAL_PAGINATION_SiZE)
  const [isAddingPriority, setIsAddingPriority] = useState<boolean>(false)
  const [isDeletingPriority, setIsDeletingPriority] = useState<boolean>(false)
  const [openAddPriorityModal, setOpenAddPriorityModal] =
    useState<boolean>(false)

  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] =
    useState<boolean>(false)
  const location = useLocation()

  const dispatch = useAppDispatch()
  const getAllPrioritiesActionLoading = useSelector((state: RootState) =>
    selectPrioritiesLoading(state, 'getAllPrioritiesAction')
  )
  const { priorities, prioritiesCurrentPage, prioritiesTotalItems } = useSelector(
    (state: RootState) => state.priorities
  )

  const [selectedPriorityId, setSelectedPriorityId] = useState<number | null>(
    null
  )

  const data = useSelector((state: RootState) => state.priorities)

  const getAllPriorities = () => {
    if (search) {
      const parsedQuery = queryString.parse(search)
      dispatch(getAllPrioritiesAction(parsedQuery))
      return
    }

    dispatch(getAllPrioritiesAction())
  }

  const onSearchPriorities = (page?: number) => {
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

  const onOpenPriorityModal = () => {
    setOpenAddPriorityModal(true)
  }

  const onClosePriorityModal = () => {
    setOpenAddPriorityModal(false)
  }

  const onOpenConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(true)
  }

  const onCloseConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(false)
  }

  const onAddPriority = async (data: TUpdatePriorityData) => {
    const { ...passData } = data
    setIsAddingPriority(true)
    const payload: any = {
      ...passData,
    }
    try {
      const response = await dispatch(addPriorityAction(payload)).unwrap()
      message.success({
        content: 'Create priority succesfully',
      })
      onClosePriorityModal()
      getAllPriorities()
    } catch (err) {
      const error = err as BaseResponseError
      if (error) {
        message.error({
          content: error?.message,
        })
      }
    } finally {
      setIsAddingPriority(false)
    }
  }

  const onDeletePriority = async () => {
    try {
      if(selectedPriorityId) {
        setIsDeletingPriority(true)
        const response = await dispatch(deletePriorityAction(selectedPriorityId)).unwrap()
        message.success({
          content: 'Delete priority succesfully',
        })
        getAllPriorities()
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
      setIsDeletingPriority(false)
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
              setSelectedPriorityId(id);
            }}
          />
        </div>
      ),
    },
  ]

  useEffect(() => {
    getAllPriorities()
  }, [dispatch, search])

  return (
    <Card>
      <div className="sm:pl-[0.75rem] sm:pr-[0.5rem] flex items-center sm:justify-between flex-col sm:flex-row">
        <div className="max-w-[500px] flex-1 flex-row flex">
          <Input
            placeholder={t('common:priority_management_placeholder')}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === `${EKeyBoardCode.ENTER}`) {
                onSearchPriorities()
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
              onSearchPriorities()
            }}
          >
            Search
          </Button>
        </div>
        <div className="flex items-center gap-[16px]">
          <Button type="primary" onClick={onOpenPriorityModal}>
            Add new priority
          </Button>
        </div>
      </div>
      {getAllPrioritiesActionLoading ? (
        <Skeleton paragraph={{ rows: 4 }} />
      ) : (
        <SharedTable
          columns={columns}
          dataSource={priorities?.map((priority, index) => {
            return {
              ...priority,
              key: priority.id,
              no: index + 1,
              // sickness: priority?.priorityData?.sickness ?? [],
              // gender: priority?.priorityData?.gender,
            }
          })}
          paginationProps={{
            total: !!prioritiesTotalItems ? +prioritiesTotalItems : undefined,
            pageSize: INITIAL_PAGINATION_SiZE,
            current: +prioritiesCurrentPage,
            onChange(page) {
              onSearchPriorities(page)
            },
          }}
        />
      )}
      <AddPriorityModal
        open={openAddPriorityModal}
        onClose={onClosePriorityModal}
        onSave={onAddPriority}
        isLoading={isAddingPriority}
      />
      <ConfirmDeleteModal
        open={openConfirmDeleteModal}
        onClose={onCloseConfirmDeleteModal}
        onDelete={onDeletePriority}
        title={'Delete priority'}
        content={'Are you sure to delete this priority?'}
        isLoading={isDeletingPriority}
      />
    </Card>
  )
}
