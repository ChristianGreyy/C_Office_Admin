import { Card } from 'antd'
import React from 'react'
import styled from 'styled-components'

import { ResetPasswordForm } from 'src/components'

export const ResetPasswordPage = () => {
  return (
    <ResetPasswordPageStyled className="flex items-center justify-center w-full">
      <ResetPasswordForm />
    </ResetPasswordPageStyled>
  )
}

const ResetPasswordPageStyled = styled(Card)`
  .ant-card-body {
    width: 40%;
  }

  .reset-form {
    > div:last-child {
      justify-content: center;
    }
  }
`
