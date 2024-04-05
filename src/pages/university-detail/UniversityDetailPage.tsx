import { yupResolver } from '@hookform/resolvers/yup'
import { Card, message } from 'antd'

import i18next from 'i18next'
import React, { useLayoutEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { SICKNESS_OPTIONS } from '@configs'
import { BaseResponseError, IEditUniversityData, RouterParams } from '@interfaces'
import {
  RootState,
  updateUniversityByIdAction,
  useAppDispatch,
  useAppSelector,
} from '@redux'
import { Button, Input } from 'src/common'

export const UniversityDetailPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation(['common', 'university', 'error'])

  const { universityId } = useParams<RouterParams['UniversityDetailPage']>()
  const dispatch = useAppDispatch()
  const { universities } = useAppSelector((state: RootState) => state.universities)
  const updateUniversityByIdActionLoading = useAppSelector(
    (state: RootState) => state.universities.loadings['updateUniversityByIdActionLoading']
  )

  const data = SICKNESS_OPTIONS.map((item) => ({
    label: item,
    value: item,
  }))

  console.log('universities', universities)

  const selectedUniversities =
    universities && universities.length && universityId
      ? universities?.find((university) => university.id === +universityId)
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

  const { control, handleSubmit } = useForm<IEditUniversityData>({
    defaultValues: {
      name: selectedUniversities?.name,
      color: selectedUniversities?.color,
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  })

  const onInvalid = (errors: any) => console.error(errors)

  const handleClickAction = handleSubmit(async (data) => {
    try {
      const response = await dispatch(
        updateUniversityByIdAction({
          id: selectedUniversities?.id,
          name: data?.name,
          color: data?.color,
        })
      ).unwrap()

      message.success({
        content: 'Update university succesfully',
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
    if (!universityId) {
      navigate('/404')
    }
  }, [universityId])

  return (
    <Card>
      {selectedUniversities ? (
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
                      label={t('university:name')}
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
                      label={t('university:color')}
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
              loading={updateUniversityByIdActionLoading}
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
        <>No university found</>
      )}
    </Card>
  )
}
