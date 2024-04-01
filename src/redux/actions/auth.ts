import { createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

import { authAPI } from '@api'
import {
  IChangePasswordFields,
  ILoginFields,
  IResetPasswordFields,
  IVerifyEmailFields,
} from '@interfaces'
import { LLC_ACCESS_TOKEN } from '@configs'

export const loginAction = createAsyncThunk(
  'auth/loginAction',
  async (
    payload: ILoginFields & { isRemember: boolean },
    { fulfillWithValue }
  ) => {
    const { isRemember, ...passPayload } = payload
    const res = await authAPI.login(passPayload)

    if (res.success) {
      isRemember
        ? Cookies.set(LLC_ACCESS_TOKEN, res.data.access_token.token, {
            expires: 7,
          })
        : Cookies.set(LLC_ACCESS_TOKEN, res.data.access_token.token)

      return fulfillWithValue(res)
    }
    return fulfillWithValue(null)
  }
)

export const forgotPasswordAction = createAsyncThunk(
  'auth/forgotPasswordAction',
  async (payload: ILoginFields, { fulfillWithValue }) => {
    const { email } = payload
    const res = await authAPI.forgotPassword({ email })

    if (res.success) {
      return fulfillWithValue({
        ...res,
        data: {
          ...res.data,
          email,
        },
      })
    }
    return fulfillWithValue(null)
  }
)

export const verifyPasswordAction = createAsyncThunk(
  'auth/verifyPassword',
  async (payload: IVerifyEmailFields, { fulfillWithValue }) => {
    const res = await authAPI.verifyPassword(payload)

    if (res.success) {
      return fulfillWithValue({
        ...res,
        data: {
          ...res.data,
          ...payload,
        },
      })
    }
    return fulfillWithValue(null)
  }
)

export const resetPasswordAction = createAsyncThunk(
  'auth/resetPasswordAction',
  async (payload: IResetPasswordFields, { fulfillWithValue }) => {
    const res = await authAPI.resetPassword(payload)

    if (res.success) {
      return fulfillWithValue(res)
    }
    return fulfillWithValue(null)
  }
)

export const changePasswordAction = createAsyncThunk(
  'auth/changePasswordAction',
  async (payload: IChangePasswordFields, { fulfillWithValue }) => {
    const res = await authAPI.changePassword(payload)

    if (res.success) {
      return fulfillWithValue(res)
    }
    return fulfillWithValue(null)
  }
)
