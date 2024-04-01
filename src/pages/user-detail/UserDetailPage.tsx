import { yupResolver } from '@hookform/resolvers/yup'
import { Card, message } from 'antd'
import type { SelectProps } from 'antd'

import i18next from 'i18next'
import React, { useLayoutEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { EUserGender, SICKNESS_OPTIONS } from '@configs'
import { BaseResponseError, IEditUserData, RouterParams } from '@interfaces'
import {
  RootState,
  updateUserByIdAction,
  useAppDispatch,
  useAppSelector,
} from '@redux'
import { Button, Input, SwitchButton, Text, TextArea } from 'src/common'
import { ShareSelectInput } from '../../components'

export const UserDetailPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation(['common', 'user', 'error'])

  const { userId } = useParams<RouterParams['UserDetailPage']>()
  const dispatch = useAppDispatch()
  const { users } = useAppSelector((state: RootState) => state.users)
  const updateUserByIdActionLoading = useAppSelector(
    (state: RootState) => state.users.loadings['updateUserByIdActionLoading']
  )

  const data = SICKNESS_OPTIONS.map((item) => ({
    label: item,
    value: item,
  }))

  const selectedUsers =
    users && users.length && userId
      ? users?.find((user) => user.id === +userId)
      : undefined

  console.log('selectedUsers', selectedUsers)

  const schema = yup.object().shape({
    email: yup
      .string()
      .trim()
      .required(i18next.t('error:required'))
      .email(i18next.t('error:email_format_error')),
    phone: yup
      .string()
      .trim()
      .required(i18next.t('error:required'))
      .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, {
        message: t('error:phone_format_error') as string,
      }),
    firstName: yup.string().required(i18next.t('error:required')),
    lastName: yup.string().required(i18next.t('error:required')),
    status: yup.string().required(i18next.t('error:required')),
  })

  const { control, handleSubmit } = useForm<IEditUserData>({
    defaultValues: {
      email: selectedUsers?.email,
      phone: selectedUsers?.phone,
      firstName: selectedUsers?.firstName,
      lastName: selectedUsers?.lastName,
      status: selectedUsers?.status,
      gender: selectedUsers?.gender,
    },
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  })

  const onInvalid = (errors: any) => console.error(errors)

  const handleClickAction = handleSubmit(async (data) => {
    try {
      const response = await dispatch(
        updateUserByIdAction({
          id: selectedUsers?.id,
          email: data?.email,
          phone: data?.phone,
          firstName: data?.firstName,
          lastName: data?.lastName,
          status: data?.status,
          gender: data?.gender,
        })
      ).unwrap()

      console.log('response', response)

      message.success({
        content: 'Update user succesfully',
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
    if (!userId) {
      navigate('/404')
    }
  }, [userId])

  return (
    <Card>
      {selectedUsers ? (
        <div>
          <div className="flex gap-0.5 flex-wrap max:[640px]:flex-col">
            <div className="w-1/4 mb-4 ml-24">
              <Controller
                name="email"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <Input
                      alignment="col"
                      label={t('common:email')}
                      name="email"
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
                name="phone"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <Input
                      alignment="col"
                      label={t('common:phone')}
                      name="phone"
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
                name="firstName"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <Input
                      alignment="col"
                      label={t('common:first_name')}
                      name="firstName"
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
                name="lastName"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <Input
                      alignment="col"
                      label={t('common:last_name')}
                      name="lastName"
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
                name="status"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <>
                      <div
                        style={{
                          marginBottom: '0.8rem',
                        }}
                      >
                        <Text>{t('user:status')}</Text>
                      </div>
                      <SwitchButton
                        size="small"
                        checked={value === 'active'}
                        onChange={(e) => {
                          onChange(e)
                        }}
                      />
                    </>
                  )
                }}
              />
            </div>
            <div className="w-1/4 mb-4 ml-24">
              <Controller
                name="gender"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <ShareSelectInput
                      data={[
                        {
                          label: 'Male',
                          value: EUserGender.MALE,
                        },
                        {
                          label: 'Female',
                          value: EUserGender.FEMALE,
                        },
                      ]}
                      onChange={onChange}
                      label={t('common:gender')}
                      errors={error?.message}
                      value={value ?? EUserGender.MALE}
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
              loading={updateUserByIdActionLoading}
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
        <>No user found</>
      )}
    </Card>
  )
}
