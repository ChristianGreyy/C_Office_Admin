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
  PATH_UNIVERSITY_MANAGEMENT
} from '@configs'
import { BaseResponseError, TUpdateUniversityData } from '@interfaces'
import {
  RootState,
  addUniversityAction,
  deleteUniversityAction,
  getAllUniversitiesAction,
  selectUniversitiesLoading,
  useAppDispatch,
} from '@redux'
import { t } from 'i18next'
import { Button, Input, SharedTable } from 'src/common'
import AddUniversityModal from './AddUniversityModal'
import ConfirmDeleteModal from './ConfirmDeleteModal'

type Props = {}

export const UniversityManagementPage = (props: Props) => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState('')
  const [pageSize, setPageSize] = useState(INITIAL_PAGINATION_SiZE)
  const [isAddingUniversity, setIsAddingUniversity] = useState<boolean>(false)
  const [isDeletingUniversity, setIsDeletingUniversity] = useState<boolean>(false)
  const [openAddUniversityModal, setOpenAddUniversityModal] =
    useState<boolean>(false)

  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] =
    useState<boolean>(false)
  const location = useLocation()

  const dispatch = useAppDispatch()
  const getAllUniversitiesActionLoading = useSelector((state: RootState) =>
    selectUniversitiesLoading(state, 'getAllUniversitiesAction')
  )
  const { universities, universitiesCurrentPage, universitiesTotalItems } = useSelector(
    (state: RootState) => state.universities
  )

  const [selectedUniversityId, setSelectedUniversityId] = useState<number | null>(
    null
  )

  const data = useSelector((state: RootState) => state.universities)

  const getAllUniversities = () => {
    if (search) {
      const parsedQuery = queryString.parse(search)
      dispatch(getAllUniversitiesAction(parsedQuery))
      return
    }

    dispatch(getAllUniversitiesAction())
  }

  const onSearchUniversities = (page?: number) => {
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

  const onOpenUniversityModal = () => {
    setOpenAddUniversityModal(true)
  }

  const onCloseUniversityModal = () => {
    setOpenAddUniversityModal(false)
  }

  const onOpenConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(true)
  }

  const onCloseConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(false)
  }

  const onAddUniversity = async (data: TUpdateUniversityData) => {
    const { ...passData } = data
    setIsAddingUniversity(true)
    const payload: any = {
      ...passData,
    }
    try {
      const response = await dispatch(addUniversityAction(payload)).unwrap()
      message.success({
        content: 'Create university succesfully',
      })
      onCloseUniversityModal()
      getAllUniversities()
    } catch (err) {
      const error = err as BaseResponseError
      if (error) {
        message.error({
          content: error?.message,
        })
      }
    } finally {
      setIsAddingUniversity(false)
    }
  }

  const onDeleteUniversity = async () => {
    try {
      if(selectedUniversityId) {
        setIsDeletingUniversity(true)
        const response = await dispatch(deleteUniversityAction(selectedUniversityId)).unwrap()
        message.success({
          content: 'Delete university succesfully',
        })
        getAllUniversities()
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
      setIsDeletingUniversity(false)
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
              navigate(`${PATH_UNIVERSITY_MANAGEMENT}/edit/${id}`)
            }}
          />
          <DeleteOutlined
            className="text-lg font-light mr-2.5 cursor-pointer text-[#184f64]"
            onClick={() => {
              onOpenConfirmDeleteModal();
              setSelectedUniversityId(id);
            }}
          />
        </div>
      ),
    },
  ]

  useEffect(() => {
    getAllUniversities()
  }, [dispatch, search])

  return (
    <Card>
      <div className="sm:pl-[0.75rem] sm:pr-[0.5rem] flex items-center sm:justify-between flex-col sm:flex-row">
        <div className="max-w-[500px] flex-1 flex-row flex">
          <Input
            placeholder={t('common:university_management_placeholder')}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === `${EKeyBoardCode.ENTER}`) {
                onSearchUniversities()
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
              onSearchUniversities()
            }}
          >
            Search
          </Button>
        </div>
        <div className="flex items-center gap-[16px]">
          <Button type="primary" onClick={onOpenUniversityModal}>
            Add new university
          </Button>
        </div>
      </div>
      {getAllUniversitiesActionLoading ? (
        <Skeleton paragraph={{ rows: 4 }} />
      ) : (
        <SharedTable
          columns={columns}
          dataSource={universities?.map((university, index) => {
            return {
              ...university,
              key: university.id,
              no: index + 1,
              // sickness: university?.universityData?.sickness ?? [],
              // gender: university?.universityData?.gender,
            }
          })}
          paginationProps={{
            total: !!universitiesTotalItems ? +universitiesTotalItems : undefined,
            pageSize: INITIAL_PAGINATION_SiZE,
            current: +universitiesCurrentPage,
            onChange(page) {
              onSearchUniversities(page)
            },
          }}
        />
      )}
      <AddUniversityModal
        open={openAddUniversityModal}
        onClose={onCloseUniversityModal}
        onSave={onAddUniversity}
        isLoading={isAddingUniversity}
      />
      <ConfirmDeleteModal
        open={openConfirmDeleteModal}
        onClose={onCloseConfirmDeleteModal}
        onDelete={onDeleteUniversity}
        title={'Delete university'}
        content={'Are you sure to delete this university?'}
        isLoading={isDeletingUniversity}
      />
    </Card>
  )
}
