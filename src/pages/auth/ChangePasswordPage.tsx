import { Card } from 'antd'
import React from 'react'
import styled from 'styled-components'

import { ChangePasswordForm } from 'src/components'

export const ChangePasswordPage = () => {
  return (
    <ChangePasswordPageStyled className="flex items-center justify-center w-full">
      <ChangePasswordForm />
    </ChangePasswordPageStyled>
  )
}

const ChangePasswordPageStyled = styled(Card)`
  .ant-card-body {
    width: 40%;
  }

  .reset-form {
    > div:last-child {
      justify-content: center;
    }
  }
`
