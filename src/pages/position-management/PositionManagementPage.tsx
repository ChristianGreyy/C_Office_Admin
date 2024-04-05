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
  PATH_POSITION_MANAGEMENT,
} from '@configs'
import { BaseResponseError, TUpdatePositionData } from '@interfaces'
import {
  RootState,
  addPositionAction,
  deletePositionAction,
  getAllPositionsAction,
  selectPositionsLoading,
  useAppDispatch,
} from '@redux'
import { t } from 'i18next'
import { Button, Input, SharedTable } from 'src/common'
import AddPositionModal from './AddPositionModal'
import ConfirmDeleteModal from './ConfirmDeleteModal'

type Props = {}

export const PositionManagementPage = (props: Props) => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState('')
  const [pageSize, setPageSize] = useState(INITIAL_PAGINATION_SiZE)
  const [isAddingPosition, setIsAddingPosition] = useState<boolean>(false)
  const [isDeletingPosition, setIsDeletingPosition] = useState<boolean>(false)
  const [openAddPositionModal, setOpenAddPositionModal] =
    useState<boolean>(false)

  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] =
    useState<boolean>(false)
  const location = useLocation()

  const dispatch = useAppDispatch()
  const getAllPositionsActionLoading = useSelector((state: RootState) =>
    selectPositionsLoading(state, 'getAllPositionsAction')
  )
  const { positions, positionsCurrentPage, positionsTotalItems } = useSelector(
    (state: RootState) => state.positions
  )

  const [selectedPositionId, setSelectedPositionId] = useState<number | null>(
    null
  )

  const data = useSelector((state: RootState) => state.positions)

  const getAllPositions = () => {
    if (search) {
      const parsedQuery = queryString.parse(search)
      dispatch(getAllPositionsAction(parsedQuery))
      return
    }

    dispatch(getAllPositionsAction())
  }

  const onSearchPositions = (page?: number) => {
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

  const onOpenPositionModal = () => {
    setOpenAddPositionModal(true)
  }

  const onClosePositionModal = () => {
    setOpenAddPositionModal(false)
  }

  const onOpenConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(true)
  }

  const onCloseConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(false)
  }

  const onAddPosition = async (data: TUpdatePositionData) => {
    const { ...passData } = data
    setIsAddingPosition(true)
    const payload: any = {
      ...passData,
    }
    try {
      const response = await dispatch(addPositionAction(payload)).unwrap()
      message.success({
        content: 'Create position succesfully',
      })
      onClosePositionModal()
      getAllPositions()
    } catch (err) {
      const error = err as BaseResponseError
      if (error) {
        message.error({
          content: error?.message,
        })
      }
    } finally {
      setIsAddingPosition(false)
    }
  }

  const onDeletePosition = async () => {
    try {
      if(selectedPositionId) {
        setIsDeletingPosition(true)
        const response = await dispatch(deletePositionAction(selectedPositionId)).unwrap()
        message.success({
          content: 'Delete position succesfully',
        })
        getAllPositions()
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
      setIsDeletingPosition(false)
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
              navigate(`${PATH_POSITION_MANAGEMENT}/edit/${id}`)
            }}
          />
          <DeleteOutlined
            className="text-lg font-light mr-2.5 cursor-pointer text-[#184f64]"
            onClick={() => {
              onOpenConfirmDeleteModal();
              setSelectedPositionId(id);
            }}
          />
        </div>
      ),
    },
  ]

  useEffect(() => {
    getAllPositions()
  }, [dispatch, search])

  return (
    <Card>
      <div className="sm:pl-[0.75rem] sm:pr-[0.5rem] flex items-center sm:justify-between flex-col sm:flex-row">
        <div className="max-w-[500px] flex-1 flex-row flex">
          <Input
            placeholder={t('common:position_management_placeholder')}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === `${EKeyBoardCode.ENTER}`) {
                onSearchPositions()
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
              onSearchPositions()
            }}
          >
            Search
          </Button>
        </div>
        <div className="flex items-center gap-[16px]">
          <Button type="primary" onClick={onOpenPositionModal}>
            Add new position
          </Button>
        </div>
      </div>
      {getAllPositionsActionLoading ? (
        <Skeleton paragraph={{ rows: 4 }} />
      ) : (
        <SharedTable
          columns={columns}
          dataSource={positions?.map((position, index) => {
            return {
              ...position,
              key: position.id,
              no: index + 1,
              // sickness: position?.positionData?.sickness ?? [],
              // gender: position?.positionData?.gender,
            }
          })}
          paginationProps={{
            total: !!positionsTotalItems ? +positionsTotalItems : undefined,
            pageSize: INITIAL_PAGINATION_SiZE,
            current: +positionsCurrentPage,
            onChange(page) {
              onSearchPositions(page)
            },
          }}
        />
      )}
      <AddPositionModal
        open={openAddPositionModal}
        onClose={onClosePositionModal}
        onSave={onAddPosition}
        isLoading={isAddingPosition}
      />
      <ConfirmDeleteModal
        open={openConfirmDeleteModal}
        onClose={onCloseConfirmDeleteModal}
        onDelete={onDeletePosition}
        title={'Delete position'}
        content={'Are you sure to delete this position?'}
        isLoading={isDeletingPosition}
      />
    </Card>
  )
}
