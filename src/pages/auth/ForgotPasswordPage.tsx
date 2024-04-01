import { useLayoutEffect } from 'react'
import { Card, Typography } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { EForgotPasswordPageType, PATH_LOGIN } from '@configs'
import {
  ForgotPasswordForm,
  ResetPasswordForm,
  VerifyEmailForm,
} from '@components'
import {
  RootState,
  selectAuth,
  selectAuthLoading,
  useAppSelector,
} from '@redux'

export const ForgotPasswordPage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { code, forgotEmail } = useAppSelector(selectAuth)
  const forgotPasswordActionLoading = useSelector((state: RootState) => {
    return selectAuthLoading(state, 'forgotPasswordAction')
  })
  const verifyPasswordActionLoading = useSelector((state: RootState) => {
    return selectAuthLoading(state, 'verifyPasswordAction')
  })
  const resetPasswordActionLoading = useSelector((state: RootState) => {
    return selectAuthLoading(state, 'resetPasswordAction')
  })

  const pageType = searchParams.get('type') as EForgotPasswordPageType | null

  const formatTitle = (string: string | null) => {
    const formattedTitle = string
      ? string.split('-').join(' ')
      : 'Forgot Password'

    return formattedTitle
  }

  const handleRedirectToLogin = () => {
    navigate(PATH_LOGIN)
  }

  const renderForm = () => {
    switch (pageType) {
      case EForgotPasswordPageType.VERIFY_EMAIL:
        return (
          <VerifyEmailForm
            isLoading={verifyPasswordActionLoading}
            onBack={handleRedirectToLogin}
          />
        )
      case EForgotPasswordPageType.RESET_PASSWORD:
        return (
          <ResetPasswordForm
            redirectToLogin={handleRedirectToLogin}
            isLoading={resetPasswordActionLoading}
          />
        )
      default:
        return (
          <ForgotPasswordForm
            redirectToLogin={handleRedirectToLogin}
            isLoading={forgotPasswordActionLoading}
          />
        )
    }
  }

  useLayoutEffect(() => {
    if (
      pageType === EForgotPasswordPageType.RESET_PASSWORD &&
      (!code || !forgotEmail)
    ) {
      navigate(PATH_LOGIN)
    }
  }, [code, forgotEmail, pageType])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="!rounded-2xl min-[1280px]:min-w-[30rem] ">
        <Typography.Title level={3} className="capitalize text-center">
          {formatTitle(pageType)}
        </Typography.Title>
        {renderForm()}
      </Card>
    </div>
  )
}
