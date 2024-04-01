import React, { memo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import i18next from 'i18next'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { message } from 'antd'

import { AUTH_THEME_COLOR, EForgotPasswordPageType } from '@configs'
import { themes } from '@theme'
import { Button, Input } from 'src/common'
import { yupResolver } from '@hookform/resolvers/yup'
import { RootState, useAppDispatch, verifyPasswordAction } from '@redux'
import { BaseResponseError } from '@interfaces'

interface IProps {
  isLoading?: boolean
  onBack: () => void
}

export const VerifyEmailForm = memo((props: IProps) => {
  const { isLoading, onBack } = props

  const { t } = useTranslation(['common', 'login'])
  const dispatch = useAppDispatch()
  const { forgotEmail } = useSelector((state: RootState) => {
    return state.auth
  })
  const [searchParams, setSearchParams] = useSearchParams()

  const schemaVerifyEmail = yup.object().shape({
    code: yup
      .string()
      .trim()
      .required(i18next.t('error:otp_required'))
      .matches(/(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/, {
        message: i18next.t('error:otp_invalid'),
      })
      .min(6, i18next.t('error:otp_character'))
      .max(6, i18next.t('error:otp_character')),
    email: yup.string(),
  })
  const { control, reset, handleSubmit } = useForm<{ code?: string }>({
    mode: 'onChange',
    resolver: yupResolver(schemaVerifyEmail),
  })

  const handleVerifyEmail = handleSubmit(async (value) => {
    try {
      const response = await dispatch(
        verifyPasswordAction({
          email: forgotEmail ?? '',
          code: value.code ?? '',
        })
      ).unwrap()
      if (response?.success) {
        if (response.data.isValid) {
          message.success({
            content: 'Verify OTP succesfully!',
          })
          reset({
            code: '',
          })
          setSearchParams(`type=${EForgotPasswordPageType.RESET_PASSWORD}`)
          return
        }
        message.error({
          content: 'Verify OTP failed!',
        })
      }
    } catch (err) {
      const error = err as BaseResponseError
      message.error({
        content: error?.message,
      })
    }
  })

  return (
    <StyledVerifyEmailForm className="verify-email__section">
      {/* @ts-ignore */}
      <form onSubmit={handleVerifyEmail} className="verify-form items-center">
        <Controller
          name="code"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <Input
                placeholder="Verify code"
                name="otp"
                className="input"
                type="text"
                errors={error?.message}
                value={value}
                onChange={onChange}
              />
            )
          }}
        />

        <div className="actions mt-5">
          <Button
            loading={isLoading}
            type="primary"
            size="large"
            htmlType="submit"
            className="submit__btn login-btn max-[600px]:!w-full"
          >
            {t('common:submit')}
          </Button>
          <Button
            type="ghost"
            size="large"
            onClick={onBack}
            className="redirect__btn min-[600px]:ml-[1rem] max-[600px]:!w-full"
          >
            {t('common:back')}
          </Button>
        </div>
      </form>
    </StyledVerifyEmailForm>
  )
})

export const StyledVerifyEmailForm = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border-radius: 0.3125rem;
  .heading {
    margin-bottom: 2.25rem;
    .heading__title {
      text-align: center;
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      color: ${(p) => themes.theme.light.colors.text};
    }
    .desc {
      font-size: 1rem;
      font-weight: 400;
      color: ${(p) => themes.theme.light.colors.subText};
    }
  }

  .actions {
    @media (min-width: 1280px) {
      display: flex;
      align-items: center;
      .btn {
        width: 8rem;
      }
    }
  }

  .resend-email {
    display: flex;
    align-items: center;
    margin-bottom: 1.25rem;
    .resend-text {
      font-size: 1rem;
      font-weight: 400;
      margin-right: 0.375rem;
    }
    .countdown-resendOTP {
      .ant-statistic-content {
        font-size: 1rem;
        font-weight: 500;
        color: ${AUTH_THEME_COLOR};
      }
    }
  }

  .verify-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    .submit__btn {
      @media (min-width: 1280px) {
        margin-right: 0.75rem;
        margin-bottom: 0;
      }
      margin-bottom: 0.75rem;
    }

    .agree-policy__cb {
      margin-bottom: 1.125rem;
    }
  }
`
