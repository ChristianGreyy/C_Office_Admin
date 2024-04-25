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
  PATH_PROJECT_MANAGEMENT
} from '@configs'
import { BaseResponseError, TUpdateProjectData } from '@interfaces'
import {
  RootState,
  addProjectAction,
  deleteProjectAction,
  getAllProjectsAction,
  selectProjectsLoading,
  useAppDispatch,
} from '@redux'
import { t } from 'i18next'
import { Button, Input, SharedTable } from 'src/common'
import AddProjectModal from './AddProjectModal'
import ConfirmDeleteModal from './ConfirmDeleteModal'

type Props = {}

export const Dashboard = (props: Props) => {
  const navigate = useNavigate()
  const { search } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchValue, setSearchValue] = useState('')
  const [pageSize, setPageSize] = useState(INITIAL_PAGINATION_SiZE)
  const [isAddingProject, setIsAddingProject] = useState<boolean>(false)
  const [isDeletingProject, setIsDeletingProject] = useState<boolean>(false)
  const [openAddProjectModal, setOpenAddProjectModal] =
    useState<boolean>(false)

  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] =
    useState<boolean>(false)
  const location = useLocation()

  const dispatch = useAppDispatch()
  const getAllProjectsActionLoading = useSelector((state: RootState) =>
    selectProjectsLoading(state, 'getAllProjectsAction')
  )
  const { membersLayout, projects, projectsCurrentPage, projectsTotalItems } = useSelector(
    (state: RootState) => state.projects
  )

  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  )

  const data = useSelector((state: RootState) => state.projects)

  const getAllProjects = () => {
    if (search) {
      const parsedQuery = queryString.parse(search)
      dispatch(getAllProjectsAction(parsedQuery))
      return
    }

    dispatch(getAllProjectsAction())
  }

  const onSearchProjects = (page?: number) => {
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

  const onOpenProjectModal = () => {
    setOpenAddProjectModal(true)
  }

  const onCloseProjectModal = () => {
    setOpenAddProjectModal(false)
  }

  const onOpenConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(true)
  }

  const onCloseConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(false)
  }

  const onAddProject = async (data: TUpdateProjectData) => {
    const { ...passData } = data
    setIsAddingProject(true)
    const payload: any = {
      ...passData,
    }
    try {
      const response = await dispatch(addProjectAction(payload)).unwrap()
      message.success({
        content: 'Create project succesfully',
      })
      onCloseProjectModal()
      getAllProjects()
    } catch (err) {
      const error = err as BaseResponseError
      if (error) {
        message.error({
          content: error?.message,
        })
      }
    } finally {
      setIsAddingProject(false)
    }
  }

  const onDeleteProject = async () => {
    try {
      if(selectedProjectId) {
        setIsDeletingProject(true)
        const response = await dispatch(deleteProjectAction(selectedProjectId)).unwrap()
        message.success({
          content: 'Delete project succesfully',
        })
        getAllProjects()
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
      setIsDeletingProject(false)
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
      title: 'Kick off date',
      dataIndex: 'kickOffDate',
      key: 'kickOffDate',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
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
              navigate(`${PATH_PROJECT_MANAGEMENT}/edit/${id}`)
            }}
          />
          <DeleteOutlined
            className="text-lg font-light mr-2.5 cursor-pointer text-[#184f64]"
            onClick={() => {
              onOpenConfirmDeleteModal();
              setSelectedProjectId(id);
            }}
          />
        </div>
      ),
    },
  ]

  useEffect(() => {
    getAllProjects()
  }, [dispatch, search])

  return (
    <Card>
      <div className="sm:pl-[0.75rem] sm:pr-[0.5rem] flex items-center sm:justify-between flex-col sm:flex-row">
        <div className="max-w-[500px] flex-1 flex-row flex">
          <Input
            placeholder={t('common:project_management_placeholder')}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === `${EKeyBoardCode.ENTER}`) {
                onSearchProjects()
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
              onSearchProjects()
            }}
          >
            Search
          </Button>
        </div>
        <div className="flex items-center gap-[16px]">
          <Button type="primary" onClick={onOpenProjectModal}>
            Add new project
          </Button>
        </div>
      </div>
      {getAllProjectsActionLoading ? (
        <Skeleton paragraph={{ rows: 4 }} />
      ) : (
        <SharedTable
          columns={columns}
          dataSource={projects?.map((project, index) => {
            return {
              ...project,
              key: project.id,
              no: index + 1,
              // sickness: project?.projectData?.sickness ?? [],
              // gender: project?.projectData?.gender,
            }
          })}
          paginationProps={{
            total: !!projectsTotalItems ? +projectsTotalItems : undefined,
            pageSize: INITIAL_PAGINATION_SiZE,
            current: +projectsCurrentPage,
            onChange(page) {
              onSearchProjects(page)
            },
          }}
        />
      )}
      <AddProjectModal
        open={openAddProjectModal}
        onClose={onCloseProjectModal}
        onSave={onAddProject}
        isLoading={isAddingProject}
      />
      <ConfirmDeleteModal
        open={openConfirmDeleteModal}
        onClose={onCloseConfirmDeleteModal}
        onDelete={onDeleteProject}
        title={'Delete project'}
        content={'Are you sure to delete this project?'}
        isLoading={isDeletingProject}
      />
    </Card>
  )
}
