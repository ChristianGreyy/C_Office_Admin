import { createAsyncThunk } from '@reduxjs/toolkit'

import { userManagementAPI } from '@api'
import { INITIAL_PAGINATION_SiZE } from '@configs'
import { IFetchUsersParams, TUpdateUserData } from '@interfaces'

export const getAllUsersAction = createAsyncThunk(
  'users/getAllUsersAction',
  async (params: IFetchUsersParams | undefined) => {
    try {
      const localParams = params
        ? params
        : {
            page: 1,
            limit: INITIAL_PAGINATION_SiZE,
          }
      const res = await userManagementAPI.getAllUsers(localParams)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getUserByIdAction = createAsyncThunk(
  'users/getUserByIdAction',
  async (id: string) => {
    try {
      const res = await userManagementAPI.getUserById(id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const updateUserByIdAction = createAsyncThunk(
  'users/updateUserByIdAction',
  async (payload: Partial<TUpdateUserData>, { fulfillWithValue }) => {
    const res = await userManagementAPI.updateUserById(payload)
    return fulfillWithValue(res.data)
  }
)

export const addUserAction = createAsyncThunk(
  'users/addUserAction',
  async (payload: Partial<TUpdateUserData>, { fulfillWithValue }) => {
    try {
      const res = await userManagementAPI.addUser(payload)
      return res;
    } catch (error) {
      throw error
    }
  }
)
