import { createAsyncThunk } from '@reduxjs/toolkit'

import { projectManagementAPI } from '@api'
import { INITIAL_PAGINATION_SiZE } from '@configs'
import { IAddMember, IFetchProjectsParams, TAddMembersForProject, TUpdateProjectData } from '@interfaces'

export const getAllProjectsAction = createAsyncThunk(
  'projects/getAllProjectsAction',
  async (params: IFetchProjectsParams | undefined) => {
    try {
      const localParams = params
        ? params
        : {
            page: 1,
            limit: INITIAL_PAGINATION_SiZE,
          }
      const res = await projectManagementAPI.getAllProjects(localParams)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getProjectByIdAction = createAsyncThunk(
  'projects/getProjectByIdAction',
  async (id: number) => {
    try {
      const res = await projectManagementAPI.getProjectById(id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const updateProjectByIdAction = createAsyncThunk(
  'projects/updateProjectByIdAction',
  async (payload: Partial<TUpdateProjectData>, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await projectManagementAPI.updateProjectById(payload)
      if(res.statusCode !== 200) {
        return rejectWithValue(res);
      } 
        return fulfillWithValue(res.data)
    } catch (error) {
      throw error
    }
  }
)

export const addProjectAction = createAsyncThunk(
  'projects/addProjectAction',
  async (payload: Partial<TUpdateProjectData>, { fulfillWithValue, rejectWithValue }) => {
    try {
      try {
        const res = await projectManagementAPI.addProject(payload)
        if(res.statusCode !== 201) {
          return rejectWithValue(res);
        } 
          return fulfillWithValue(res.data)
      } catch (error) {
        throw error
      }
    } catch (error) {
      throw error
    }
  }
)

export const deleteProjectAction = createAsyncThunk(
  'projects/deleteProjectAction',
  async (id: number, { fulfillWithValue, rejectWithValue }) => {
    try {
      try {
        const res = await projectManagementAPI.deleteProject(id)
        console.log('res', res)
        if(res.statusCode !== 200) {
          return rejectWithValue(res);
        } 
          return fulfillWithValue(res.data)
      } catch (error) {
        throw error
      }
    } catch (error) {
      throw error
    }
  }
)

export const getMembersForProjectAction = createAsyncThunk(
  'projects/getMembersForProjectAction',
  async (id: number) => {
    try {
      const res = await projectManagementAPI.getMembersForProjectAction(id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const updateMembersForProjectByIdAction = createAsyncThunk(
  'projects/updateProjectByIdAction',
  async (payload: Partial<TAddMembersForProject>, { fulfillWithValue, rejectWithValue }) => {
    try {
      const res = await projectManagementAPI.updateMembersForProjectById({
        id: payload.id,
        members: payload.members
      })
      if(res.statusCode !== 200) {
        return rejectWithValue(res);
      } 
        return fulfillWithValue(res.data)
    } catch (error) {
      throw error
    }
  }
)
