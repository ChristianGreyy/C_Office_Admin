import React from 'react'
import { Card } from 'antd'
import { useTranslation } from 'react-i18next'

import { Button } from 'src/common'

interface FormCardProps {
  children: React.ReactNode
  title?: string
  buttonLabel?: string
  hideButton?: boolean
  primaryButtonLoading?: boolean
  onClickAction: () => void
  onClickCancel: () => void
}

export const FormCard: React.FC<FormCardProps> = ({
  children,
  title,
  buttonLabel,
  hideButton,
  primaryButtonLoading,
  onClickAction,
  onClickCancel,
}) => {
  const { t } = useTranslation(['common'])

  return (
    <Card>
      {title && (
        <p className="uppercase text-base font-semibold mb-3">{title}</p>
      )}

      {children}
      {!hideButton && (
        <div className="flex justify-end items-center mt-5">
          <div>
            <Button type="ghost" onClick={onClickCancel}>
              {t('common:cancel')}
            </Button>
          </div>
          <div className=" ml-5">
            <Button
              loading={primaryButtonLoading}
              type="primary"
              onClick={onClickAction}
            >
              {buttonLabel}
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}
