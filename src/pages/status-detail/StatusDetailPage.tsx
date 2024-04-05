import { yupResolver } from '@hookform/resolvers/yup'
import { Card, message } from 'antd'

import i18next from 'i18next'
import React, { useLayoutEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { SICKNESS_OPTIONS } from '@configs'
import { BaseResponseError, IEditStatusData, RouterParams } from '@interfaces'
import {
  RootState,
  updateStatusByIdAction,
  useAppDispatch,
  useAppSelector,
} from '@redux'
import { Button, Input } from 'src/common'

export const StatusDetailPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation(['common', 'status', 'error'])

  const { statusId } = useParams<RouterParams['StatusDetailPage']>()
  const dispatch = useAppDispatch()
  const { statuses } = useAppSelector((state: RootState) => state.status)
  const updateStatusByIdActionLoading = useAppSelector(
    (state: RootState) => state.status.loadings['updateStatusByIdActionLoading']
  )

  const data = SICKNESS_OPTIONS.map((item) => ({
    label: item,
    value: item,
  }))

  const selectedStatuss =
    statuses && statuses.length && statusId
      ? statuses?.find((status) => status.id === +statusId)
      : undefined

  const schema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(i18next.t('error:required')),
    color: yup
      .string()
      .trim()
      .required(i18next.t('error:required'))
  })

  const { control, handleSubmit } = useForm<IEditStatusData>({
    defaultValues: {
      name: selectedStatuss?.name,
      color: selectedStatuss?.color,
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  })

  const onInvalid = (errors: any) => console.error(errors)

  const handleClickAction = handleSubmit(async (data) => {
    try {
      const response = await dispatch(
        updateStatusByIdAction({
          id: selectedStatuss?.id,
          name: data?.name,
          color: data?.color,
        })
      ).unwrap()

      message.success({
        content: 'Update status succesfully',
      })
    } catch (err) {
      const error = err as BaseResponseError
      if (error) {
        message.error({
          content: error?.message,
        })
      }
    }
  }, onInvalid)

  useLayoutEffect(() => {
    if (!statusId) {
      navigate('/404')
    }
  }, [statusId])

  return (
    <Card>
      {selectedStatuss ? (
        <div>
          <div className="flex gap-0.5 flex-wrap max:[640px]:flex-col">
            <div className="w-1/4 mb-4 ml-24">
              <Controller
                name="name"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <Input
                      alignment="col"
                      label={t('status:name')}
                      name="name"
                      className="input"
                      value={value}
                      type="text"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onChange(e.target.value)
                      }}
                      errors={error?.message}
                    />
                  )
                }}
              />
            </div>
            <div className="w-1/4 mb-4 ml-24">
              <Controller
                name="color"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <Input
                      alignment="col"
                      label={t('status:color')}
                      name="color"
                      className="input"
                      value={value}
                      type="color"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onChange(e.target.value)
                      }}
                      errors={error?.message}
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
              loading={updateStatusByIdActionLoading}
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
        <>No status found</>
      )}
    </Card>
  )
}
