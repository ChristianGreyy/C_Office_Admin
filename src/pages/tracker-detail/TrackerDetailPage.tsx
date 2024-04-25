import { yupResolver } from '@hookform/resolvers/yup'
import { Card, message } from 'antd'

import i18next from 'i18next'
import React, { useLayoutEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { SICKNESS_OPTIONS } from '@configs'
import { BaseResponseError, IEditTrackerData, RouterParams } from '@interfaces'
import {
  RootState,
  updateTrackerByIdAction,
  useAppDispatch,
  useAppSelector,
} from '@redux'
import { Button, Input } from 'src/common'

export const TrackerDetailPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation(['common', 'tracker', 'error'])

  const { trackerId } = useParams<RouterParams['TrackerDetailPage']>()
  const dispatch = useAppDispatch()
  const { trackers } = useAppSelector((state: RootState) => state.trackers)
  const updateTrackerByIdActionLoading = useAppSelector(
    (state: RootState) =>
      state.trackers.loadings['updateTrackerByIdActionLoading']
  )

  const data = SICKNESS_OPTIONS.map((item) => ({
    label: item,
    value: item,
  }))

  const selectedTrackers =
    trackers && trackers.length && trackerId
      ? trackers?.find((tracker) => tracker.id === +trackerId)
      : undefined

  const schema = yup.object().shape({
    name: yup.string().trim().required(i18next.t('error:required')),
    slug: yup.string().trim().required(i18next.t('error:required')),
  })

  const { control, handleSubmit } = useForm<IEditTrackerData>({
    defaultValues: {
      name: selectedTrackers?.name,
      slug: selectedTrackers?.slug,
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  })

  const onInvalid = (errors: any) => console.error(errors)

  const handleClickAction = handleSubmit(async (data) => {
    try {
      const response = await dispatch(
        updateTrackerByIdAction({
          id: selectedTrackers?.id,
          name: data?.name,
          slug: data?.slug,
        })
      ).unwrap()

      message.success({
        content: 'Update tracker succesfully',
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
    if (!trackerId) {
      navigate('/404')
    }
  }, [trackerId])

  return (
    <Card>
      {selectedTrackers ? (
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
                      label={t('tracker:name')}
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
                name="slug"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <Input
                      alignment="col"
                      label={t('tracker:slug')}
                      name="slug"
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
          </div>
          <div className="flex items-center justify-end w-full">
            <Button
              type="primary"
              className="mr-5"
              onClick={handleClickAction}
              loading={updateTrackerByIdActionLoading}
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
        <>No tracker found</>
      )}
    </Card>
  )
}
