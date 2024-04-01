import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useLayoutEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import i18next from 'i18next'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Skeleton, message } from 'antd'

import { EPlanType, EPlanViewType, PATH_PLAN } from '@configs'
import {
  RootState,
  createPlanAction,
  fetchPlanDetailAction,
  selectPlan,
  selectPlansLoading,
  updatePlanAction,
  useAppDispatch,
  useAppSelector,
} from '@redux'
import { FormPlan } from '@components'
import { BaseResponseError, IEditPlanProps, RouterParams } from '@interfaces'

export const PlanDetail = () => {
  const { type } = useParams<RouterParams['planDetail']>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const { selectedPlan } = useAppSelector(selectPlan)
  const fetchPlanDetailActionLoading = useAppSelector((state: RootState) =>
    selectPlansLoading(state, 'fetchPlanDetailAction')
  )
  const updatePlanActionLoading = useAppSelector((state: RootState) =>
    selectPlansLoading(state, 'updatePlanAction')
  )
  const createPlanActionLoading = useAppSelector((state: RootState) =>
    selectPlansLoading(state, 'createPlanAction')
  )

  const { t } = useTranslation(['common', 'dashboard', 'error'])

  const schema = yup.object().shape({
    titleEn: yup.string().required(i18next.t('error:field_required')),
    titleJp: yup.string().required(i18next.t('error:field_required')),
    descriptionEn: yup
      .string()
      .required(i18next.t('error:field_required'))
      .max(1000, i18next.t('error:plan_description_character')),
    descriptionJp: yup
      .string()
      .required(i18next.t('error:field_required'))
      .max(1000, i18next.t('error:plan_description_character')),
    discount: yup.number().positive(i18next.t('error:plan_discount_limit')),
    discountStatus: yup.boolean(),
    price: yup.number().positive(i18next.t('error:plan_price_limit')),
  })
  const defaultPlanValues = {
    _id: '',
    titleEn: '',
    titleJp: '',
    descriptionEn: '',
    descriptionJp: '',
    type: EPlanType.MONTHLY,
    discount: '',
    discountStatus: true,
    price: 0,
  }

  const { control, reset, handleSubmit, setValue } = useForm<IEditPlanProps>({
    defaultValues: defaultPlanValues,
    reValidateMode: 'onChange',
    resolver: yupResolver(schema),
  })

  const planId = searchParams.get('planId')

  const handleClickAction = handleSubmit(async (data) => {
    const { _id, ...passData } = data
    try {
      if (type === EPlanViewType.ADD) {
        await dispatch(createPlanAction(passData)).unwrap()

        message.success({
          content: 'Create plan succesfully',
        })
      }
      if (type === EPlanViewType.EDIT) {
        await dispatch(updatePlanAction({ id: _id, ...passData })).unwrap()
        message.success({
          content: 'Edit plan succesfully',
        })
      }
    } catch (err) {
      const error = err as BaseResponseError
      if (error) {
        message.error({
          content: error?.message,
        })
      }
    }
  })

  const handleClickCancel = () => {
    navigate(PATH_PLAN)
  }

  const resetPlanFormValue = () => {
    let localSelectedPlan: { [key: string]: string | EPlanType | boolean } =
      defaultPlanValues

    if (type !== 'add' && selectedPlan) {
      const {
        _id,
        titleEn,
        titleJp,
        descriptionEn,
        descriptionJp,
        type,
        discount,
        discountStatus,
        price,
      } = selectedPlan
      localSelectedPlan = {
        _id,
        titleEn,
        titleJp,
        descriptionEn,
        descriptionJp,
        type,
        discount,
        discountStatus,
        price,
      }
    }

    Object.keys(localSelectedPlan).forEach((key: string) => {
      setValue(key as keyof IEditPlanProps, localSelectedPlan[key])
    })
  }

  useEffect(() => {
    resetPlanFormValue()

    // protect param
    if (type && !Object.values(EPlanViewType).includes(type)) {
      navigate('/404', {
        replace: true,
      })
    }

    if (type !== EPlanViewType.ADD && !planId) {
      navigate('/404', {
        replace: true,
      })
    }

    if (type !== EPlanViewType.ADD && !planId) {
      navigate('/404')
    }
  }, [selectedPlan, type])

  useEffect(() => {
    planId && dispatch(fetchPlanDetailAction(planId || ''))
  }, [planId, dispatch])

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {fetchPlanDetailActionLoading ? (
        <Skeleton paragraph={{ rows: 4 }} />
      ) : (
        <FormPlan
          onClickAction={handleClickAction}
          onClickCancel={handleClickCancel}
          buttonLabel={t('common:save')}
          control={control}
          isDisable={type === EPlanViewType.VIEW}
          type={type}
          loading={updatePlanActionLoading || createPlanActionLoading}
        />
      )}
    </>
  )
}
