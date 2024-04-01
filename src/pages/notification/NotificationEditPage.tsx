import { yupResolver } from '@hookform/resolvers/yup'
import { Card, message } from 'antd'
import React, { useLayoutEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import {
  BaseResponseError,
  IEditNotificationData,
  RouterParams,
} from '@interfaces'
import {
  RootState,
  updateNotificationByIdAction,
  useAppDispatch,
  useAppSelector,
} from '@redux'
import { Button, TextArea } from 'src/common'
import i18next from 'i18next'

export const NotificationEditPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation(['common', 'error'])

  const { notificationId } = useParams<RouterParams['NotificationEditPage']>()
  const dispatch = useAppDispatch()
  const { notifications } = useAppSelector(
    (state: RootState) => state.notifications
  )
  const updateNotificationByIdActionLoading = useAppSelector(
    (state: RootState) =>
      state.notifications.loadings['updateNotificationByIdActionLoading']
  )

  const selectedNotifications =
    notifications && notifications.length
      ? notifications?.find(
          (notification) => notification._id === notificationId
        )
      : undefined

  const schema = yup.object().shape({
    contentJp: yup.string().required(i18next.t('error:content_required')),
    contentEn: yup.string().required(i18next.t('error:content_required')),
  })

  const { control, handleSubmit } = useForm<IEditNotificationData>({
    defaultValues: {
      contentJp: selectedNotifications?.contentJp,
      contentEn: selectedNotifications?.contentEn,
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  })

  const handleClickAction = handleSubmit(async (data) => {
    try {
      await dispatch(
        updateNotificationByIdAction({
          _id: selectedNotifications?._id ?? '',
          contentJp: data?.contentJp,
          contentEn: data?.contentEn,
        })
      ).unwrap()

      message.success({
        content: 'Update notification succesfully',
      })
    } catch (err) {
      const error = err as BaseResponseError
      if (error) {
        message.error({
          content: error?.message,
        })
      }
    }
  })

  useLayoutEffect(() => {
    if (!notificationId) {
      navigate('/404')
    }
  }, [notificationId])

  return (
    <Card>
      {selectedNotifications ? (
        <div>
          <div className="flex justify-between">
            <div className="mb-4 px-2 sm:flex-[0_0_50%] sm:max-w-[50%]">
              <Controller
                name="contentJp"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <TextArea
                      label={t('common:contentJp')}
                      name="contentJp"
                      className="input"
                      value={value}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        onChange(e.target.value)
                      }}
                      errors={error?.message}
                      rows={4}
                    />
                  )
                }}
              />
            </div>
            <div className="mb-4 px-2 sm:flex-[0_0_50%] sm:max-w-[50%]">
              <Controller
                name="contentEn"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <TextArea
                      label={t('common:contentEn')}
                      name="contentEn"
                      className="input"
                      value={value}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        onChange(e.target.value)
                      }}
                      errors={error?.message}
                      rows={4}
                    />
                  )
                }}
              />
            </div>
          </div>
          <div className="flex items-center justify-end w-full">
            <Button
              type="primary"
              className="mr-5"
              onClick={handleClickAction}
              loading={updateNotificationByIdActionLoading}
            >
              Save
            </Button>
            <Button
              type="ghost"
              onClick={() => {
                navigate(-1)
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>No notification found</>
      )}
    </Card>
  )
}
