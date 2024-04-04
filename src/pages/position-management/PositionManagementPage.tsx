import { EditOutlined, SearchOutlined } from '@ant-design/icons'
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
import { TUpdatePositionData } from '@interfaces'
import {
  RootState,
  addPositionAction,
  getAllPositionsAction,
  selectPositionsLoading,
  useAppDispatch,
} from '@redux'
import { t } from 'i18next'
import { Button, Input, SharedTable } from 'src/common'
import AddPositionModal from './AddPositionModal'

type Props = {}

export const PositionManagementPage = (props: Props) => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState('')
  const [pageSize, setPageSize] = useState(INITIAL_PAGINATION_SiZE)
  const [isAddingPosition, setIsAddingPosition] = useState<boolean>(false)
  const [openAddPositionModal, setOpenAddPositionModal] =
    useState<boolean>(false)
  const location = useLocation()

  const dispatch = useAppDispatch()
  const getAllPositionsActionLoading = useSelector((state: RootState) =>
    selectPositionsLoading(state, 'getAllPositionsAction')
  )
  const { positions, positionsCurrentPage, positionsTotalItems } = useSelector(
    (state: RootState) => state.positions
  )

  console.log(positions, positionsCurrentPage, positionsTotalItems)

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

  const onAddPosition = async (data: TUpdatePositionData) => {
    const { ...passData } = data
    setIsAddingPosition(true)
    const payload: any = {
      ...passData,
    }
    try {
      const response = await dispatch(addPositionAction(payload)).unwrap()
      console.log(response)
      if (response.statusCode !== 201) {
        message.error(response.message)
        return
      }
      message.success(response.data.message)
      onClosePositionModal()
      getAllPositions()
    } catch (error: any) {
      console.log('error', error)
      console.log('error message', error.message)
      message.error(error.message)
    } finally {
      setIsAddingPosition(false)
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
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
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
    </Card>
  )
}
