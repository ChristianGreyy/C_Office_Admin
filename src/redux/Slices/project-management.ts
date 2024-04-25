import { createSlice } from '@reduxjs/toolkit'

import { IProjectDetail, IProjectMember, IProjectMemberLayout } from '@interfaces'
import { RootState } from '.'
import { getAllProjectsAction, getMembersForProjectAction, getProjectByIdAction, updateProjectByIdAction } from '../actions'
interface IProjectsState {
  projects: IProjectDetail[] | null
  project: IProjectDetail | null
  members: IProjectMember[] | null;
  membersLayout: IProjectMemberLayout | null;
  projectsCurrentPage: string | number
  projectsTotalPage: string | number
  projectsTotalItems: string | number
  selectedProject: IProjectDetail | null

  loadings: Record<string, boolean | undefined>
}

const initialState: IProjectsState = {
  projects: [],
  project: null,
  members: [],
  membersLayout: {},
  projectsCurrentPage: 0,
  projectsTotalPage: 0,
  projectsTotalItems: 0,
  selectedProject: null,
  loadings: {},
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProjectsAction.pending, (state) => {
      state.loadings[`getAllProjectsActionLoading`] = true
    })
    builder.addCase(getAllProjectsAction.fulfilled, (state, action) => {
      state.loadings[`getAllProjectsActionLoading`] = false
      state.projects = action.payload?.items ?? []
      state.projectsCurrentPage = action.payload?.page ?? 0
      state.projectsTotalPage = action.payload?.limit ?? 0
      state.projectsTotalItems = action.payload?.total ?? 0
    })
    builder.addCase(getAllProjectsAction.rejected, (state) => {
      state.loadings[`getAllProjectsActionLoading`] = false
    })
    builder.addCase(getProjectByIdAction.pending, (state) => {
      state.loadings[`getProjectByIdActionLoading`] = true
    })
    builder.addCase(getProjectByIdAction.fulfilled, (state, action) => {
      state.loadings[`getProjectByIdActionLoading`] = false
      state.project = action.payload ?? {}
    })
    builder.addCase(getProjectByIdAction.rejected, (state) => {
      state.loadings[`getProjectByIdActionLoading`] = false
    })
    builder.addCase(updateProjectByIdAction.pending, (state) => {
      state.loadings[`updateProjectByIdActionLoading`] = true
    })
    builder.addCase(updateProjectByIdAction.fulfilled, (state, action) => {
      state.loadings[`updateProjectByIdActionLoading`] = false
      state.selectedProject = action.payload
    })
    builder.addCase(updateProjectByIdAction.rejected, (state) => {
      state.loadings[`updateProjectByIdActionLoading`] = false
    })
    builder.addCase(getMembersForProjectAction.pending, (state) => {
      state.loadings[`getMembersForProjectAction`] = true;
    });
    builder.addCase(getMembersForProjectAction.fulfilled, (state, action) => {
      state.members = action.payload.map((item: any) => {
        item['firstName'] = item.user.firstName;
        item['lastName'] = item.user.lastName;
        item['id'] = item.user.id;
        return item;
      }) ?? [];

      state.membersLayout = action?.payload?.reduce((acc: any, item) => {
        acc[item.role] = acc[item.role]
          ? [...acc[item.role], item.user]
          : [item.user];
        return acc;
      }, {} );
      state.loadings[`getMembersForProjectAction`] = false;
    });
    builder.addCase(getMembersForProjectAction.rejected, (state) => {
      state.loadings[`getMembersForProjectActionLoading`] = false;
    });
  },
})

export const projectsActions = {
  ...projectsSlice.actions,
}

export const selectProjectsLoading = (state: RootState, name: string) =>
  state.plans.loadings[`${name}Loading`]

export default projectsSlice.reducer
