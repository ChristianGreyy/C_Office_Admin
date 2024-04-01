import React from 'react'
import { Controller } from 'react-hook-form'
import { Col } from 'antd'
import 'react-phone-input-2/lib/style.css'
import type { Control } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { SwitchButton, TextArea, Text, Input } from 'src/common'
import { IEditPlanProps } from '@interfaces'
import { FormCard } from '../FormCard'
import { ShareSelectInput } from '../shared'
import { EPlanType, EPlanViewType } from '@configs'

interface IFormPlanProps {
  buttonLabel?: string
  formTitle?: string
  control?: Control<IEditPlanProps>
  isDisable?: boolean
  type?: EPlanViewType
  loading?: boolean
  onClickAction: () => void
  onClickCancel: () => void
}

export const FormPlan = (props: IFormPlanProps) => {
  const {
    formTitle,
    buttonLabel,
    control,
    isDisable,
    type,
    loading,
    onClickAction,
    onClickCancel,
  } = props

  const { t } = useTranslation(['common', 'plan', 'error'])

  return (
    <FormCard
      title={formTitle}
      buttonLabel={buttonLabel}
      hideButton={type === EPlanViewType.VIEW}
      primaryButtonLoading={loading}
      onClickAction={onClickAction}
      onClickCancel={onClickCancel}
    >
      <div className="flex justify-between mx-[-0.75rem] max-[640px]:flex-col">
        <div className="flex-1 sm:flex-[0_0_50%] sm:max-w-[50%] block relative min-h-[1px] px-[0.75rem]">
          {type === EPlanViewType.VIEW && (
            <div className="mb-4">
              <Controller
                name="_id"
                control={control}
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => {
                  return (
                    <Input
                      alignment="col"
                      label={t('plan:sale_id')}
                      placeholder="Plan ID"
                      name="planId"
                      className="input"
                      value={value}
                      type="text"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        onChange(e.target.value)
                      }}
                      errors={error?.message}
                      disabled={isDisable}
                      required
                    />
                  )
                }}
              />
            </div>
          )}

          <div className="mb-4">
            <Controller
              name="titleEn"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <Input
                    alignment="col"
                    label={t('plan:plan_title_en')}
                    placeholder="Plan Title ENG"
                    name="planTitle"
                    className="input"
                    value={value}
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(e.target.value)
                    }}
                    errors={error?.message}
                    disabled={isDisable}
                    required
                  />
                )
              }}
            />
          </div>
          <div className="mb-4">
            <Controller
              name="titleJp"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <Input
                    alignment="col"
                    label={t('plan:plan_title_jpn')}
                    placeholder="Plan Title JPN"
                    name="planTitle"
                    className="input"
                    value={value}
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(e.target.value)
                    }}
                    errors={error?.message}
                    disabled={isDisable}
                    required
                  />
                )
              }}
            />
          </div>
          {type !== EPlanViewType.ADD && (
            <div className="mb-4">
              <Controller
                name="discountStatus"
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
                        <Text>{t('plan:discount_status')}</Text>
                      </div>
                      <SwitchButton
                        size="small"
                        checked={value}
                        onChange={(e) => {
                          onChange(e)
                        }}
                        disabled={isDisable}
                      />
                    </>
                  )
                }}
              />
            </div>
          )}
          <div className="mb-4">
            <Controller
              name="discount"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <Input
                    alignment="col"
                    label={t('plan:discount')}
                    placeholder="Discount%"
                    name="discount"
                    className="input"
                    value={value}
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(e.target.value)
                    }}
                    errors={
                      error?.type === 'typeError'
                        ? t('error:plan_discount_number_type_error')
                        : error?.message
                    }
                    disabled={isDisable}
                    required
                    suffix={<div>%</div>}
                  />
                )
              }}
            />
          </div>
          <div className="mb-4">
            <Controller
              name="price"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <Input
                    alignment="col"
                    label={t('plan:price')}
                    placeholder="Price"
                    name="price"
                    className="input"
                    value={value}
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      onChange(e.target.value)
                    }}
                    errors={
                      error?.type === 'typeError'
                        ? t('error:plan_price_number_type_error')
                        : error?.message
                    }
                    disabled={isDisable}
                    required
                  />
                )
              }}
            />
          </div>
          <div className="mb-4 flex justify-end">
            <Controller
              name="type"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <div className="min-w-[100px]">
                    <ShareSelectInput
                      data={[
                        {
                          label: 'Monthly',
                          value: EPlanType.MONTHLY,
                        },
                        {
                          label: 'Yearly',
                          value: EPlanType.YEARLY,
                        },
                      ]}
                      onChange={onChange}
                      label={t('plan:planType')}
                      errors={error?.message}
                      value={value}
                      required
                      disabled={isDisable}
                    />
                  </div>
                )
              }}
            />
          </div>
        </div>
        <Col className="flex-1 sm:flex-[0_0_50%] sm:max-w-[50%] block relative min-h-[1px] px-[0.75rem]">
          <div className="mb-4">
            <Controller
              name="descriptionJp"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <TextArea
                    label={'Description JPN'}
                    name="descriptionJPN"
                    className="input"
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      onChange(e.target.value)
                    }}
                    errors={error?.message}
                    disabled={isDisable}
                    rows={4}
                    required
                  />
                )
              }}
            />
          </div>

          <div className="mb-4">
            <Controller
              name="descriptionEn"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <TextArea
                    label={'Description ENG'}
                    name="descriptionENG"
                    className="input"
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                      onChange(e.target.value)
                    }}
                    errors={error?.message}
                    disabled={isDisable}
                    rows={4}
                    required
                  />
                )
              }}
            />
          </div>
        </Col>
      </div>
    </FormCard>
  )
}
