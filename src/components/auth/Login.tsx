import { BaseSyntheticEvent, memo } from 'react'
import { Control, Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ILoginFields } from '@interfaces'
import { Typography } from 'antd'
import { Button, Input } from 'src/common'
import { StyledLoginSection } from './loginStyle'

interface IProps {
  isLoading?: boolean
  isRemember?: boolean
  onRemember?: (value: boolean) => void
  redirectToForgot?: () => void
  redirectToSignUp?: () => void
  control: Control<ILoginFields>
  handleLogin: (
    e?: BaseSyntheticEvent<ILoginFields, any, any> | undefined
  ) => Promise<void>
}

export const LoginForm = memo((props: IProps) => {
  const {
    isLoading,
    isRemember,
    control,
    redirectToForgot,
    handleLogin,
    onRemember,
  } = props
  const { t } = useTranslation(['common', 'login'])

  return (
    <StyledLoginSection className="login__section">
      {/* @ts-ignore */}
      <form onSubmit={handleLogin} className="login-form">
        <Controller
          name="email"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <Input
                label="E-mail Address"
                placeholder={t('common:email')}
                name="email"
                errors={error?.message}
                value={value}
                onChange={onChange}
              />
            )
          }}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { value, onChange }, fieldState: { error } }) => {
            return (
              <Input
                label="Password"
                placeholder="Password"
                type="password"
                containerClassName={'mt-5'}
                haveShowPassIcon
                errors={error?.message}
                value={value}
                onChange={onChange}
              />
            )
          }}
        />

        <div className="forgot-password flex items-center max-[800px]:justify-center mt-5">
          <div className="sm:w-32"></div>
          <Typography.Text
            className="redirect-btn forgot-text"
            underline
            onClick={redirectToForgot}
          >
            Forgot your password?
          </Typography.Text>
        </div>
        <div className="actions mt-5">
          <Button
            htmlType="submit"
            type="primary"
            size="large"
            className="submit__btn login-btn"
            loading={isLoading}
          >
            {t('common:sign_in')}
          </Button>
        </div>
      </form>
    </StyledLoginSection>
  )
})
