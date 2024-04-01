import { yupResolver } from '@hookform/resolvers/yup'
import { message } from 'antd'
import i18next from 'i18next'
import { memo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import * as yup from 'yup'

import { BaseResponseError } from '@interfaces'
import {
  changePasswordAction,
  selectAuth,
  useAppDispatch,
  useAppSelector,
} from '@redux'
import { themes } from '@theme'
import { Button, Input } from 'src/common'

interface IProps {
  redirectToLogin?: () => void
  isLoading?: boolean
}

const schema = yup.object().shape({
  oldPassword: yup.string().required(i18next.t('error:old_pass_required')),
  newPassword: yup
    .string()
    .required(i18next.t('error:new_pass_required'))
    .min(6, i18next.t('error:password_min_error'))
    .max(32, i18next.t('error:password_max_error')),
  confirmPassword: yup
    .string()
    .required(i18next.t('error:cf_pass_required'))
    .min(6, i18next.t('error:password_min_error'))
    .max(32, i18next.t('error:password_max_error'))
    .oneOf([yup.ref('newPassword'), null], i18next.t('error:cf_not_match')),
})

export const ChangePasswordForm = memo((props: IProps) => {
  const { isLoading, redirectToLogin } = props

  const dispatch = useAppDispatch()
  const { code, forgotEmail } = useAppSelector(selectAuth)
  const navigate = useNavigate()
  const { handleSubmit, reset, control } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const handleResetPassword = handleSubmit(async (value) => {
    try {
      const response = await dispatch(
        changePasswordAction({
          oldPassword: value.oldPassword,
          newPassword: value.newPassword,
          confirmPassword: value.confirmPassword,
        })
      ).unwrap()

      if (response?.success) {
        message.success({
          content: response.message,
        })
        redirectToLogin?.()
      }
    } catch (err) {
      const error = err as BaseResponseError
      message.error({
        content: error?.message,
      })
    } finally {
      reset({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
      })
    }
  })

  const handleCancel = () => {
    navigate && navigate(-1)
  }

  return (
    <StyledChangePasswordForm className="reset-password__section">
      {/* @ts-ignore */}
      <form onSubmit={handleResetPassword} className="reset-form items-center">
        <Controller
          name="oldPassword"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <Input
                placeholder="Old password"
                name="oldPassword"
                type="password"
                containerClassName={'mt-5'}
                errors={error?.message}
                value={value}
                onChange={onChange}
                haveShowPassIcon
              />
            )
          }}
        />
        <Controller
          name="newPassword"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <Input
                placeholder="New password"
                name="newPassword"
                type="password"
                containerClassName={'mt-5'}
                errors={error?.message}
                value={value}
                onChange={onChange}
                haveShowPassIcon
              />
            )
          }}
        />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <Input
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                containerClassName={'mt-5'}
                errors={error?.message}
                value={value}
                onChange={onChange}
                haveShowPassIcon
              />
            )
          }}
        />
        <div className="flex items-center max-[800px]:justify-center mb-5 mt-5">
          <Button
            type="ghost"
            size="large"
            onClick={handleCancel}
            className=" login-btn max-[600px]:!w-full"
          >
            Cancel
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            className="  min-[600px]:ml-[1rem] max-[600px]:!w-full"
            loading={isLoading}
          >
            Save
          </Button>
        </div>
      </form>
    </StyledChangePasswordForm>
  )
})

export const StyledChangePasswordForm = styled.section`
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

  .reset-form {
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

    .inner-input {
      width: 100%;
      height: 4.6rem;
    }

    .agree-policy__cb {
      margin-bottom: 1.8rem;
    }
  }
`
