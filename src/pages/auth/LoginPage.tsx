import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import i18next from 'i18next'
import { Card, Typography, message } from 'antd'
import { useSelector } from 'react-redux'
import { useState } from 'react'

import { LoginForm } from '@components'
import { PATH_FORGOT_PASSWORD, PATH_PLAN, PATH_SIGN_UP } from '@configs'
import {
  RootState,
  loginAction,
  selectAuthLoading,
  useAppDispatch,
} from '@redux'
import { LogApp } from '@utils'
import { BaseResponseError, ILoginFields } from '@interfaces'

const schema = yup.object().shape({
  email: yup
    .string()
    .required(i18next.t('error:email_required'))
    .email(i18next.t('error:pass_format_error')),
  password: yup.string().required(i18next.t('error:pass_required')),
})

export const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [isRemember, setIsRemember] = useState<boolean>(false)

  const loginActionLoading = useSelector((state: RootState) =>
    selectAuthLoading(state, 'loginAction')
  )

  const { control, handleSubmit, reset } = useForm<ILoginFields>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  const handleRedirectToForgot = () => {
    navigate(PATH_FORGOT_PASSWORD)
  }

  const handleRedirectToSignUp = () => {
    navigate(PATH_SIGN_UP)
  }

  const handleLogin = handleSubmit(async (data) => {
    LogApp('Submit Login', data)

    try {
      const res = await dispatch(loginAction({ ...data, isRemember })).unwrap()
      res &&
        res.success &&
        message.success({
          content: 'Login successfully',
        })

      navigate(PATH_PLAN)
    } catch (err) {
      const error = err as BaseResponseError
      message.error({
        content: error?.message,
      })
    } finally {
      reset({ email: '', password: '' })
      setIsRemember(false)
    }
  })

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="!rounded-2xl  min-[1280px]:w-[400px]">
        <Typography.Title level={3} className="text-center">
          Sign In
        </Typography.Title>
        <LoginForm
          control={control}
          redirectToForgot={handleRedirectToForgot}
          redirectToSignUp={handleRedirectToSignUp}
          handleLogin={handleLogin}
          isLoading={loginActionLoading}
          isRemember={isRemember}
          onRemember={(e) => setIsRemember(e)}
        />
      </Card>
    </div>
  )
}
