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
import { BaseResponseError, TUpdateLevelData } from '@interfaces'
import {
  RootState,
  addLevelAction,
  deleteLevelAction,
  getAllLevelsAction,
  selectLevelsLoading,
  useAppDispatch,
} from '@redux'
import { t } from 'i18next'
import { Button, Input, SharedTable } from 'src/common'
import AddLevelModal from './AddLevelModal'
import ConfirmDeleteModal from './ConfirmDeleteModal'

type Props = {}

export const LevelManagementPage = (props: Props) => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState('')
  const [pageSize, setPageSize] = useState(INITIAL_PAGINATION_SiZE)
  const [isAddingLevel, setIsAddingLevel] = useState<boolean>(false)
  const [isDeletingLevel, setIsDeletingLevel] = useState<boolean>(false)
  const [openAddLevelModal, setOpenAddLevelModal] =
    useState<boolean>(false)

  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] =
    useState<boolean>(false)
  const location = useLocation()

  const dispatch = useAppDispatch()
  const getAllLevelsActionLoading = useSelector((state: RootState) =>
    selectLevelsLoading(state, 'getAllLevelsAction')
  )
  const { levels, levelsCurrentPage, levelsTotalItems } = useSelector(
    (state: RootState) => state.levels
  )

  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(
    null
  )

  const data = useSelector((state: RootState) => state.levels)

  const getAllLevels = () => {
    if (search) {
      const parsedQuery = queryString.parse(search)
      dispatch(getAllLevelsAction(parsedQuery))
      return
    }

    dispatch(getAllLevelsAction())
  }

  const onSearchLevels = (page?: number) => {
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

  const onOpenLevelModal = () => {
    setOpenAddLevelModal(true)
  }

  const onCloseLevelModal = () => {
    setOpenAddLevelModal(false)
  }

  const onOpenConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(true)
  }

  const onCloseConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(false)
  }

  const onAddLevel = async (data: TUpdateLevelData) => {
    const { ...passData } = data
    setIsAddingLevel(true)
    const payload: any = {
      ...passData,
    }
    try {
      const response = await dispatch(addLevelAction(payload)).unwrap()
      message.success({
        content: 'Create level succesfully',
      })
      onCloseLevelModal()
      getAllLevels()
    } catch (err) {
      const error = err as BaseResponseError
      if (error) {
        message.error({
          content: error?.message,
        })
      }
    } finally {
      setIsAddingLevel(false)
    }
  }

  const onDeleteLevel = async () => {
    try {
      if(selectedLevelId) {
        setIsDeletingLevel(true)
        const response = await dispatch(deleteLevelAction(selectedLevelId)).unwrap()
        message.success({
          content: 'Delete level succesfully',
        })
        getAllLevels()
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
      setIsDeletingLevel(false)
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
              setSelectedLevelId(id);
            }}
          />
        </div>
      ),
    },
  ]

  useEffect(() => {
    getAllLevels()
  }, [dispatch, search])

  return (
    <Card>
      <div className="sm:pl-[0.75rem] sm:pr-[0.5rem] flex items-center sm:justify-between flex-col sm:flex-row">
        <div className="max-w-[500px] flex-1 flex-row flex">
          <Input
            placeholder={t('common:level_management_placeholder')}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === `${EKeyBoardCode.ENTER}`) {
                onSearchLevels()
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
              onSearchLevels()
            }}
          >
            Search
          </Button>
        </div>
        <div className="flex items-center gap-[16px]">
          <Button type="primary" onClick={onOpenLevelModal}>
            Add new level
          </Button>
        </div>
      </div>
      {getAllLevelsActionLoading ? (
        <Skeleton paragraph={{ rows: 4 }} />
      ) : (
        <SharedTable
          columns={columns}
          dataSource={levels?.map((level, index) => {
            return {
              ...level,
              key: level.id,
              no: index + 1,
              // sickness: level?.levelData?.sickness ?? [],
              // gender: level?.levelData?.gender,
            }
          })}
          paginationProps={{
            total: !!levelsTotalItems ? +levelsTotalItems : undefined,
            pageSize: INITIAL_PAGINATION_SiZE,
            current: +levelsCurrentPage,
            onChange(page) {
              onSearchLevels(page)
            },
          }}
        />
      )}
      <AddLevelModal
        open={openAddLevelModal}
        onClose={onCloseLevelModal}
        onSave={onAddLevel}
        isLoading={isAddingLevel}
      />
      <ConfirmDeleteModal
        open={openConfirmDeleteModal}
        onClose={onCloseConfirmDeleteModal}
        onDelete={onDeleteLevel}
        title={'Delete level'}
        content={'Are you sure to delete this level?'}
        isLoading={isDeletingLevel}
      />
    </Card>
  )
}
