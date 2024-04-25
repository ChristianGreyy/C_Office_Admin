import { yupResolver } from '@hookform/resolvers/yup'
import { Card, message } from 'antd'

import { Chart } from 'chart.js'
import i18next from 'i18next'
import React, { useEffect, useLayoutEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

import { EUserGender, SICKNESS_OPTIONS } from '@configs'
import { BaseResponseError, IEditUserData, RouterParams } from '@interfaces'
import {
  RootState,
  getUserByIdAction,
  updateUserByIdAction,
  useAppDispatch,
  useAppSelector,
} from '@redux'
import { Button, Input, SwitchButton, Text } from 'src/common'
import { ShareSelectInput } from '../../components'

export const UserDetailPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation(['common', 'user', 'error'])

  const { userId } = useParams<RouterParams['UserDetailPage']>()
  const dispatch = useAppDispatch()
  const { users, user } = useAppSelector((state: RootState) => state.users)
  const updateUserByIdActionLoading = useAppSelector(
    (state: RootState) => state.users.loadings['updateUserByIdActionLoading']
  )

  const data = SICKNESS_OPTIONS.map((item) => ({
    label: item,
    value: item,
  }))
  const getUserById = () => {
    dispatch(getUserByIdAction(userId || ''))
  }

  useEffect(() => {
    getUserById()
  }, [dispatch])

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

  const { control, handleSubmit, setValue, getValues } = useForm<IEditUserData>(
    {
      defaultValues: {
        email: user?.email,
        phone: user?.phone,
        firstName: user?.firstName,
        lastName: user?.lastName,
        status: user?.status,
        gender: user?.gender,
      },
      reValidateMode: 'onChange',
      resolver: yupResolver(schema),
    }
  )

  const onInvalid = (errors: any) => console.error(errors)
  if (user) {
    setValue('email', getValues('email') || user.email)
    setValue('phone', getValues('phone') || user.phone)
    setValue('firstName', getValues('firstName') || user.firstName)
    setValue('lastName', getValues('lastName') || user.lastName)
    setValue('status', getValues('status') || user.status)
    setValue('gender', getValues('gender') || user.gender)
  }
  const handleClickAction = handleSubmit(async (data) => {
    try {
      const response = await dispatch(
        updateUserByIdAction({
          id: user?.id,
          email: data?.email,
          phone: data?.phone,
          firstName: data?.firstName,
          lastName: data?.lastName,
          status: data?.status,
          gender: data?.gender,
        })
      ).unwrap()

      message.success({
        content: 'Update user succesfully',
      })
    } catch (err) {
      console.log('err', err)
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

  useEffect(() => {
    var ctx = document?.getElementById('myChart')
    if (ctx && user) {
      console.log('user', user.statistics)
      const projects = Object.keys(user.statistics)
      let bugs = []
      let features = []
      for (const item of Object.keys(user.statistics)) {
        bugs.push(user.statistics[item]['bug'])
        features.push(user.statistics[item]['feature'])
      }
      var myChart = new Chart(ctx as any, {
        type: 'bar',
        data: {
          labels: projects,
          datasets: [
            {
              data: features,
              label: 'Feature',
              borderColor: 'rgb(17, 11, 201)',
              backgroundColor: 'rgb(17, 11, 201,0.5)',
              borderWidth: 2,
            },
            {
              data: bugs,
              label: 'Bugs',
              borderColor: 'rgb(203, 14, 14)',
              backgroundColor: 'rgb(203, 14, 14,0.5)',
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
            },
            title: {
              display: true,
              text: 'Chart.js Horizontal Bar Chart',
            },
          },
        },
      })
    }
  }, [user])

  return (
    <Card>
      {user ? (
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
                          onChange(e === true ? 'active' : 'inactive')
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
          <h1 className="w-[150px] mx-auto mt-10 text-xl font-semibold capitalize ">
            Performance
          </h1>
          <div className="w-[1100px] h-screen flex mx-auto my-auto">
            <div className="border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl">
              <canvas id="myChart"></canvas>
            </div>
          </div>
        </div>
      ) : (
        <>No user found</>
      )}
    </Card>
  )
}
