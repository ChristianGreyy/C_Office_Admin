import { yupResolver } from '@hookform/resolvers/yup'
import { Card, message } from 'antd'

import i18next from 'i18next'
import React, { useLayoutEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { SICKNESS_OPTIONS } from '@configs'
import { BaseResponseError, IEditPriorityData, RouterParams } from '@interfaces'
import {
  RootState,
  updatePriorityByIdAction,
  useAppDispatch,
  useAppSelector,
} from '@redux'
import { Button, Input } from 'src/common'

export const PriorityDetailPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation(['common', 'priority', 'error'])

  const { priorityId } = useParams<RouterParams['PriorityDetailPage']>()
  const dispatch = useAppDispatch()
  const { priorities } = useAppSelector((state: RootState) => state.priorities)
  const updatePriorityByIdActionLoading = useAppSelector(
    (state: RootState) => state.priorities.loadings['updatePriorityByIdActionLoading']
  )

  const data = SICKNESS_OPTIONS.map((item) => ({
    label: item,
    value: item,
  }))

  const selectedPriorities =
    priorities && priorities.length && priorityId
      ? priorities?.find((priority) => priority.id === +priorityId)
      : undefined

  const schema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(i18next.t('error:required')),
      slug: yup
      .string()
      .trim()
      .required(i18next.t('error:required')),
  })

  const { control, handleSubmit } = useForm<IEditPriorityData>({
    defaultValues: {
      name: selectedPriorities?.name,
      slug: selectedPriorities?.slug,
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  })

  const onInvalid = (errors: any) => console.error(errors)

  const handleClickAction = handleSubmit(async (data) => {
    try {
      const response = await dispatch(
        updatePriorityByIdAction({
          id: selectedPriorities?.id,
          name: data?.name,
          slug: data?.slug,
        })
      ).unwrap()

      message.success({
        content: 'Update priority succesfully',
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
    if (!priorityId) {
      navigate('/404')
    }
  }, [priorityId])

  return (
    <Card>
      {selectedPriorities ? (
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
                      label={t('priority:name')}
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
                      label={t('priority:slug')}
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
              loading={updatePriorityByIdActionLoading}
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
        <>No priority found</>
      )}
    </Card>
  )
}
