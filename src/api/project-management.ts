import {
  IFetchProjectsParams,
  IFetchProjectsSuccessData,
  IProjectDetail,
  IProjectMember,
  TAddMembersForProject,
  TUpdateProjectData,
} from '@interfaces'
import { ApiClient } from './axiosClient'

export const projectManagementAPI = {
  getAllProjects: async (params?: IFetchProjectsParams) => {
    return await ApiClient.get<IFetchProjectsSuccessData>('/projects', {
      params,
    })
  },

  getProjectById: async (id: number) => {
    return await ApiClient.get<IProjectDetail>(`/projects/${id}`)
  },

  updateProjectById: async (payload: Partial<TUpdateProjectData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.put<IProjectDetail, Omit<TUpdateProjectData, 'id'>>(
      `/projects/${id}`,
      passPayload
    )
  },

  addProject: async (payload: Partial<TUpdateProjectData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.post<{ data: IProjectDetail; message: string }, {}>(
      `/projects`,
      passPayload
    )
  },

  deleteProject: async (id: number) => {
    return await ApiClient.delete<{ data: IProjectDetail; message: string }, {}>(
      `/projects/${id}`
    )
  },

  getMembersForProjectAction: async (id: number) => {
    return await ApiClient.get<IProjectMember[]>(`/projects/members/${id}`)
  },


  updateMembersForProjectById: async (payload: Partial<TAddMembersForProject>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.put<TAddMembersForProject, Omit<TAddMembersForProject, 'id'>>(
      `/projects/members/${id}`,
      passPayload
    )
  },
}
