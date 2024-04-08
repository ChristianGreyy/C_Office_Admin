import { createAsyncThunk } from '@reduxjs/toolkit'

import { roleManagementAPI } from 'src/api/role-management'
import {
  IGetRolesParams,
  IPostRolePayload,
  IStaffDeleteParams,
  IStaffPayload,
  TUpdateUserData,
} from 'src/interfaces'

export const getPermissions = createAsyncThunk(
  'role/getPermissions',
  async () => {
    try {
      const res = await roleManagementAPI.getPermissions()
      return res.data;
    } catch (error) {
      throw error
    }
  }
)

export const getRolesAction = createAsyncThunk(
  'role/getRolesAction',
  async ({ limit = 10, page, search, sort, isDefault }: IGetRolesParams) => {
    try {
      const res = await roleManagementAPI.getRoles({
        limit,
        page,
        search,
        sort,
        isDefault,
      })
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getRoleByIDAction = createAsyncThunk(
  'role/getRoleByIDAction',
  async (id: number) => {
    try {
      const res = await roleManagementAPI.getRoleByID(id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const createRoleAction = createAsyncThunk(
  'role/createRoleAction',
  async (payload: IPostRolePayload) => {
    try {
      const res = await roleManagementAPI.createRole(payload)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const updateRoleByIDAction = createAsyncThunk(
  'role/updateRoleByIDAction',
  async (payload: IPostRolePayload, {rejectWithValue,fulfillWithValue }) => {
    try {
      const res = await roleManagementAPI.updateRoleByID(payload)
      if(res.statusCode !== 200) {
        return rejectWithValue(res);
      } 
      return fulfillWithValue(res.data);
    } catch (error) {
      throw error
    }
  }
)

export const deleteRoleByIDAction = createAsyncThunk(
  'role/deleteRoleByIDAction',
  async (id: number) => {
    try {
      const res = await roleManagementAPI.deleteRoleByID(id)
      return { ...res, id }
    } catch (error) {
      throw error
    }
  }
)

export const getAdminListAction = createAsyncThunk(
  'role/getAdminListAction',
  async ({ limit = 10, page, search }: IGetRolesParams) => {
    try {
      const res = await roleManagementAPI.getAdminList({
        limit,
        page,
        search,
      })
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const createAdminAction = createAsyncThunk(
  'role/createAdminAction',
  async (payload: IStaffPayload, {fulfillWithValue, rejectWithValue}) => {

    try {
      const res = await roleManagementAPI.createAdmin(payload)
      if(res.statusCode !== 201) {
        return rejectWithValue(res);
      } 
        return fulfillWithValue(res)
    } catch (error) {
      throw error
    }
  }
)

export const deleteAdminAction = createAsyncThunk(
  'role/deleteAdminAction',
  async ({ isSoft = false, id }: IStaffDeleteParams) => {
    try {
      const res = await roleManagementAPI.deleteAdmin({
        id,
      })

      return res
    } catch (error) {
      throw error
    }
  }
)

export const getAdminByIdAction = createAsyncThunk(
  'role/getAdminByIdAction',
  async (id: string) => {
    try {
      const res = await roleManagementAPI.getAdminById(id)

      return res
    } catch (error) {
      throw error
    }
  }
)

export const updateAdminByIdAction = createAsyncThunk(
  'role/updateAdminByIdAction',
  async (payload: Partial<TUpdateUserData>) => {
    try {
      const res = await roleManagementAPI.updateAdminById(payload)
      return res
    } catch (error: any) {
      throw new Error(
        error.errors?.length && typeof error.errors !== 'string'
          ? error.errors[0]
          : error.errors
          ? error.errors
          : error.message
      )
    }
  }
)
