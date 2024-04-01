import { memo } from 'react'
import styled from 'styled-components'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import i18next from 'i18next'
import { message } from 'antd'
import { useSearchParams } from 'react-router-dom'

import { BaseResponseError, ILoginFields } from '@interfaces'
import { themes } from '@theme'
import { Button, Input } from 'src/common'
import { yupResolver } from '@hookform/resolvers/yup'
import { forgotPasswordAction, useAppDispatch } from '@redux'
import { EForgotPasswordPageType, EKeyBoardCode } from '@configs'

interface IProps {
  isLoading?: boolean
  redirectToLogin?: () => void
}

export const ForgotPasswordForm = memo((props: IProps) => {
  const { isLoading, redirectToLogin } = props
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const schemaForgotPassword = yup.object().shape({
    email: yup.string().required(i18next.t('error:email_required')),
  })
  const { control, reset, handleSubmit } = useForm<ILoginFields>({
    mode: 'onChange',
    resolver: yupResolver(schemaForgotPassword),
  })

  const handleForgotPassword = handleSubmit(async (value) => {
    try {
      const response = await dispatch(
        forgotPasswordAction({ email: value.email })
      ).unwrap()

      if (response?.success) {
        message.success({
          content: response?.message,
        })
        reset({
          email: '',
        })
        setSearchParams(`type=${EForgotPasswordPageType.VERIFY_EMAIL}`)
      }
    } catch (err) {
      const error = err as BaseResponseError
      message.error({
        content: error?.message,
      })
    }
  })

  return (
    <StyledForgotPasswordForm className="forgot-password__section">
      {/* @ts-ignore */}
      <form
        onSubmit={handleForgotPassword}
        className="forgot-form items-center"
      >
        <Controller
          name="email"
          control={control}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => {
            return (
              <Input
                placeholder="Your email"
                name="email"
                className="input"
                type="email"
                errors={error?.message}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onKeyDown={(e) => {
                  if (e.code === EKeyBoardCode.SPACE && !value) {
                    e.preventDefault()
                  }
                }}
              />
            )
          }}
        />

        <div className="actions mt-5">
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            className="submit__btn login-btn max-[600px]:!w-full"
            loading={isLoading}
          >
            Send
          </Button>
          <Button
            type="ghost"
            size="large"
            onClick={redirectToLogin}
            className="redirect__btn min-[600px]:ml-[1rem] max-[600px]:!w-full"
          >
            Sign in
          </Button>
        </div>
      </form>
    </StyledForgotPasswordForm>
  )
})

export const StyledForgotPasswordForm = styled.section`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;

  .heading {
    margin-bottom: 3.6rem;
    .heading__title {
      text-align: center;
      font-size: 3.2rem;
      font-weight: 700;
      margin-bottom: 0.8rem;
      color: ${(p) => themes.theme.light.colors.text};
    }
    .desc {
      font-size: 1.6rem;
      font-weight: 400;
      color: ${(p) => themes.theme.light.colors.subText};
    }
  }

  .actions {
    @media (min-width: 1280px) {
      display: flex;
      align-items: center;
      .btn {
        width: 12.8rem;
      }
    }
  }

  .forgot-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    .shared-input {
      margin-bottom: 2rem;
      .inner-input {
        height: 4.6rem;
      }
    }
    .submit__btn {
      @media (min-width: 1280px) {
        margin-right: 1.2rem;
        margin-bottom: 0;
      }
      margin-bottom: 1.2rem;
    }
    .forgot-password {
      display: flex;
      justify-content: flex-end;
      text-align: right;
      .forgot-text {
        font-size: 1em;
        font-weight: 400;
        color: ${(p) => themes.theme.light.colors.authText};
      }
    }

    .inner-input {
      width: 100%;
      height: 4.6rem;
    }

    .agree-policy__cb {
      margin-bottom: 1.8rem;
    }
  }
`
