import { yupResolver } from '@hookform/resolvers/yup'
import { Card, message } from 'antd'

import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { DeleteOutlined } from '@ant-design/icons'
import { SharedTable } from '@components'
import { SICKNESS_OPTIONS } from '@configs'
import {
  BaseResponseError,
  IEditProjectData,
  RouterParams,
  IAddMember,
  ETrackerSLug,
} from '@interfaces'
import {
  RootState,
  getAllUsersAction,
  getMembersForProjectAction,
  getProjectByIdAction,
  updateMembersForProjectByIdAction,
  updateProjectByIdAction,
  useAppDispatch,
  useAppSelector,
} from '@redux'
import format from 'date-fns/format'
import { toNumber } from 'lodash'
import { Button, Input } from 'src/common'
import AddMemberModal from '../dashboard/AddMemberModal'
import ConfirmDeleteModal from '../dashboard/ConfirmDeleteModal'
import { Chart } from 'chart.js'

export const ProjectDetailPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation(['project', 'project', 'error'])

  const [isDeletingMember, setIsDeletingMember] = useState<boolean>(false)

  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null)

  const [openAddMemberModal, setOpenAddMemberModal] = useState<boolean>(false)

  const [openConfirmDeleteModal, setOpenConfirmDeleteModal] =
    useState<boolean>(false)

  const onOpenMemberModal = () => {
    setOpenAddMemberModal(true)
  }

  const onCloseMemberModal = () => {
    setOpenAddMemberModal(false)
  }

  const onOpenConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(true)
  }

  const onCloseConfirmDeleteModal = () => {
    setOpenConfirmDeleteModal(false)
  }

  const { projectId } = useParams<RouterParams['ProjectDetailPage']>()
  const dispatch = useAppDispatch()
  const { projects, members, project } = useAppSelector(
    (state: RootState) => state.projects
  )

  const { users } = useAppSelector((state: RootState) => state.users)

  const getAllUsers = () => {
    dispatch(getAllUsersAction())
  }

  const getProjectById = () => {
    dispatch(getProjectByIdAction(toNumber(projectId)))
  }

  const getMembersForProject = () => {
    dispatch(getMembersForProjectAction(toNumber(projectId)))
  }

  useEffect(() => {
    getProjectById()
    getMembersForProject()
    getAllUsers()
  }, [dispatch])

  const updateProjectByIdActionLoading = useAppSelector(
    (state: RootState) =>
      state.projects.loadings['updateProjectByIdActionLoading']
  )

  const data = SICKNESS_OPTIONS.map((item) => ({
    label: item,
    value: item,
  }))

  const schema = yup.object().shape({
    name: yup.string().trim(),
    // .required(i18next.t('error:required'))
    kickOffDate: yup.string(),
    // .required(i18next.t('error:required')),
    deadline: yup.string(),
    // .required(i18next.t('error:required')),
  })

  const { control, handleSubmit } = useForm<IEditProjectData>({
    defaultValues: {
      name: project?.name,
      kickOffDate: project?.kickOffDate,
      deadline: project?.deadline,
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  })

  const onInvalid = (errors: any) => console.error(errors)

  const handleClickAction = handleSubmit(async (data) => {
    try {
      const response = await dispatch(
        updateProjectByIdAction({
          id: project?.id,
          name: data?.name,
          kickOffDate: data?.kickOffDate,
          deadline: data?.deadline,
        })
      ).unwrap()

      message.success({
        content: 'Update project succesfully',
      })
    } catch (err) {
      console.log('err', err)
      const error = err as BaseResponseError
      if (error) {
        message.error({
          content: error?.message,
        })
      }
    }
  }, onInvalid)

  const onAddMember = async (data: IAddMember) => {
    const { ...passData } = data
    // setIsAddingProject(true)

    const newMembers = [
      ...(members?.map((item) => ({
        userId: item.user.id,
        role: item.role,
      })) ?? []),
      {
        userId: passData.userId,
        role: passData.role,
      },
    ]
    const payload: any = {
      id: projectId,
      members: newMembers,
    }
    try {
      const response = await dispatch(
        updateMembersForProjectByIdAction(payload)
      ).unwrap()
      message.success({
        content: 'Add member succesfully',
      })
      getMembersForProject()
      onCloseMemberModal()
      // getAllProjects()
    } catch (err) {
      const error = err as BaseResponseError
      if (error) {
        message.error({
          content: error?.message,
        })
      }
    } finally {
      // setIsAddingProject(false)
    }
  }

  useLayoutEffect(() => {
    if (!projectId) {
      navigate('/404')
    }
  }, [projectId])

  const onDelete = async () => {
    try {
      if (selectedMemberId) {
        setIsDeletingMember(true)
        const newMembers = (
          members?.map((item) => ({
            userId: item.user.id,
            role: item.role,
          })) ?? []
        ).filter((item) => item.userId !== selectedMemberId)
        const payload: any = {
          id: projectId,
          members: newMembers,
        }
        const response = await dispatch(
          updateMembersForProjectByIdAction(payload)
        ).unwrap()
        message.success({
          content: 'Remove member succesfully',
        })
        getMembersForProject()
      }
      onCloseConfirmDeleteModal()
    } catch (err) {
      const error = err as BaseResponseError
      if (error) {
        message.error({
          content: error?.message,
        })
      }
    } finally {
      setIsDeletingMember(false)
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
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
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
          {/* <EditOutlined
            className="text-lg font-light mr-2.5 cursor-pointer text-[#184f64]"
            onClick={() => {
              navigate(`${PATH_PROJECT_MANAGEMENT}/edit/${id}`)
            }}
          /> */}
          <DeleteOutlined
            className="text-lg font-light mr-2.5 cursor-pointer text-[#184f64]"
            onClick={() => {
              onOpenConfirmDeleteModal()
              setSelectedMemberId(id)
            }}
          />
        </div>
      ),
    },
  ]

  useEffect(() => {
    var ctx = document?.getElementById('myChart')
    if (ctx && project) {
      console.log(project.issues)
      let features = 0, bugs = 0, supports = 0;
      for(const issue of project.issues) {
        if(issue.tracker.slug === ETrackerSLug.feature) features ++;
        if(issue.tracker.slug === ETrackerSLug.bug) bugs ++;
        if(issue.tracker.slug === ETrackerSLug.support) supports ++;
      }
      var myChart = new Chart(ctx as any, {
        type: 'pie',
        data: {
          labels: ['Feature', 'Bug', 'Support'],
          datasets: [
            {
              data: [features, bugs, supports],
              borderColor: ['rgb(17, 11, 201)', 'rgb(203, 14, 14)', 'rgb(56, 242, 46)'],
              backgroundColor: ['rgb(17, 11, 201,0.5)', 'rgb(203, 14, 14,0.5)', 'rgb(56, 242, 46,0.5)'],
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
            },
            title: {
              display: true,
              text: 'Chart.js Horizontal Bar Chart',
            },
          },
        },
      })
    }
  }, [project])

  return (
    <Card>
      {project ? (
        <>
          <div>
            <div className="flex gap-0.5 flex-wrap max:[640px]:flex-col">
              <div className="w-1/4 mb-4 ml-24">
                <Controller
                  name="name"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => {
                    return (
                      <Input
                        alignment="col"
                        label={t('project:name')}
                        name="name"
                        className="input"
                        value={value ?? project?.name}
                        type="text"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          onChange(e.target.value)
                        }}
                        errors={error?.message}
                      />
                    )
                  }}
                />
              </div>
              <div className="w-1/4 mb-4 ml-24">
                <Controller
                  name="kickOffDate"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => {
                    return (
                      <Input
                        alignment="col"
                        label={t('project:kick_off_date')}
                        name="kickOffDate"
                        className="input"
                        value={value ?? project?.kickOffDate}
                        type="date"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          onChange(e.target.value)
                        }}
                        errors={error?.message}
                      />
                    )
                  }}
                />
              </div>
              <div className="w-1/4 mb-4 ml-24">
                <Controller
                  name="deadline"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => {
                    return (
                      <Input
                        alignment="col"
                        label={t('project:deadline')}
                        name="deadline"
                        className="input"
                        value={value ?? project?.deadline}
                        type="date"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          onChange(e.target.value)
                        }}
                        errors={error?.message}
                      />
                    )
                  }}
                />
              </div>
            </div>
            <div className="flex items-center justify-end w-full">
              <Button
                type="primary"
                className="mr-5"
                onClick={handleClickAction}
                loading={updateProjectByIdActionLoading}
              >
                Save
              </Button>
              <Button
                type="ghost"
                onClick={() => {
                  navigate(-1)
                }}
              >
                Cancel
              </Button>
            </div>
            <h1>Members: </h1>
            <Card>
              <div className="mb-[8px] sm:pr-[0.5rem] flex items-center sm:justify-between flex-col sm:flex-row">
                <div className="flex items-center gap-[16px]">
                  <Button type="primary" onClick={onOpenMemberModal}>
                    Add new member
                  </Button>
                </div>
              </div>
              {members && (
                <SharedTable
                  columns={columns}
                  dataSource={members?.map((member, index) => {
                    return {
                      ...member,
                      key: member.user.id,
                      no: index + 1,
                    }
                  })}
                />
              )}
              <AddMemberModal
                open={openAddMemberModal}
                onClose={onCloseMemberModal}
                onSave={onAddMember}
                users={users}
              />
              <ConfirmDeleteModal
                open={openConfirmDeleteModal}
                onClose={onCloseConfirmDeleteModal}
                onDelete={onDelete}
                title={'Delete member'}
                content={'Are you sure to delete this member?'}
                isLoading={isDeletingMember}
              />
            </Card>
            <h1 className='text-[24px]'>Statistic rate of tracker:</h1>
            <div className="w-[1100px] flex mx-auto my-auto mt-[30px]">
              <div className="border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl">
                <canvas id="myChart"></canvas>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>No project found</>
      )}
    </Card>
  )
}
