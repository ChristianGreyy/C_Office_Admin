import { zodResolver } from '@hookform/resolvers/zod'
import { t } from 'i18next'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as z from 'zod'

import { Button, Input, SwitchButton } from 'src/common'
import { AppModal } from 'src/components/AppModal'
import { XCloseIcon } from 'src/components/Icon'
import { EUserStatus, REGEX_EMAIL, ROLE_DEFAULT_ID } from 'src/configs'
import { IRole, IStaffPayload, IUserDetail } from 'src/interfaces'
import { ShareSelectInput } from '@components'

interface IAddUpdateRoleModalProps {
  selectedStaff?: IUserDetail
  roles: IRole[]
  open: boolean
  isLoading: boolean
  onClose: () => void
  onSubmit: (data: any) => Promise<void>
}

const staffSchema = z.object({
  firstName: z
    .string()
    .trim()
    .nonempty({
      message: t('error:field_required') as string,
    })
    .regex(/^(?!.*[^a-zA-Z\s])\s*[a-zA-Z]+(?:\s+[a-zA-Z]+)*\s*$/, {
      message: t('error:name_format_error') as string,
    })
    .max(50, {
      message: t('error:name_staff_length_error'),
    })
    .min(2, {
      message: t('error:name_staff_length_error'),
    }),
  lastName: z
    .string()
    .trim()
    .nonempty({
      message: t('error:field_required') as string,
    })
    .regex(/^(?!.*[^a-zA-Z\s])\s*[a-zA-Z]+(?:\s+[a-zA-Z]+)*\s*$/, {
      message: t('error:name_format_error') as string,
    })
    .max(50, {
      message: t('error:name_staff_length_error'),
    })
    .min(2, {
      message: t('error:name_staff_length_error'),
    }),
  email: z
    .string()
    .trim()
    .nonempty({
      message: t('error:field_required') as string,
    })
    .email({
      message: t('error:email_format_error') as string,
    })
    .regex(REGEX_EMAIL, {
      message: t('error:email_format_error') as string,
    })
    .max(50, {
      message: t('error:email_length_error') as string,
    }),
  phone: z
    .string()
    .trim()
    .nonempty({
      message: t('error:field_required') as string,
    })
    .min(8, {
      message: t('error:phone_length_error') as string,
    })
    .max(13, {
      message: t('error:phone_length_error') as string,
    })
    .regex(/^\s*\d*\s*$|^$/, {
      message: t('error:phone_format_error') as string,
    }),
  password: z
    .string()
    .trim()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message: t('error:pass_format_error') as string,
      }
    )
    .min(8, {
      message: t('error:min_length', { length: 8 }) as string,
    })
    .max(20, {
      message: t('error:max_length', { length: 20 }) as string,
    })
    .nonempty({
      message: t('error:required') as string,
    })
    .transform((e) => (e === '' ? undefined : e)),
  confirmPassword: z
    .string()
    .trim()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        message: t('error:pass_format_error') as string,
      }
    )
    .min(8, {
      message: t('error:min_length', {
        length: 8,
      }) as string,
    })
    .max(20, {
      message: t('error:max_length', {
        length: 20,
      }) as string,
    })
    .nonempty({
      message: t('error:required') as string,
    })
    .transform((e) => (e === '' ? undefined : e)),
  // roleId: z.number(),
  status: z.string(),
})

const AddUpdateRoleModal = (props: IAddUpdateRoleModalProps) => {
  const { open, selectedStaff, isLoading, roles, onClose, onSubmit } = props

  const { control, handleSubmit, setValue } = useForm<IStaffPayload>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      // roleId: ROLE_DEFAULT_ID,
      status: EUserStatus.ACTIVE,
    },
    resolver: zodResolver(staffSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const isEditStaff = !!selectedStaff

  useEffect(() => {
    if (!!selectedStaff) {
      setValue('firstName', selectedStaff.firstName)
      setValue('lastName', selectedStaff.lastName)
      setValue('email', selectedStaff.email)
      setValue('phone', selectedStaff.phone)
      setValue('password', selectedStaff.password)
      setValue('confirmPassword', selectedStaff.confirmPassword)
      // setValue('roleId', +selectedStaff.roleId)
      setValue('status', selectedStaff.status as EUserStatus)
    }
  }, [selectedStaff])

  return (
    <AppModal open={open} onClose={onClose}>
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="m-0 text-[20px]">
            {isEditStaff ? 'Edit staff' : 'Add new staff'}
          </h1>
        </div>
        <div className="hover:opacity-75 cursor-pointer">
          <XCloseIcon width={16} height={16} onClick={onClose} />
        </div>
      </div>
      <div className="mt-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <Input
                  containerClassName="mt-4"
                  label="Email"
                  name="email"
                  required={!isEditStaff}
                  disabled={isEditStaff}
                  onChange={(e) => {
                    if (!isEditStaff) {
                      onChange(e.target.value)
                    }
                  }}
                  value={value}
                  errors={error?.message}
                />
              )
            }}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <Input
                  containerClassName="mt-4"
                  label="Phone"
                  name="phone"
                  required
                  onChange={onChange}
                  value={value}
                  errors={error?.message}
                />
              )
            }}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <Input
                  label={t('user:password') as string}
                  containerClassName="mt-4"
                  name="password"
                  haveShowPassIcon={true}
                  className="input"
                  value={value}
                  type="password"
                  onChange={onChange}
                  errors={error?.message}
                />
              )
            }}
          />
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <Input
                  containerClassName="mt-4"
                  label={t('user:confirm_password') as string}
                  name="confirmPassword"
                  className="input"
                  value={value}
                  type="password"
                  haveShowPassIcon={true}
                  onChange={onChange}
                  errors={error?.message}
                />
              )
            }}
          />

          <Controller
            name="firstName"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <Input
                  containerClassName="mt-4"
                  label="First name"
                  name="firstName"
                  required
                  onChange={onChange}
                  value={value}
                  errors={error?.message}
                />
              )
            }}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <Input
                  containerClassName="mt-4"
                  label="Last name"
                  name="lastName"
                  required
                  onChange={onChange}
                  value={value}
                  errors={error?.message}
                />
              )
            }}
          />

          {/* <Controller
            name="roleId"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <ShareSelectInput
                  containerClassName="grid grid-cols-7 gap-3 mt-4"
                  labelClassName="col-span-2 flex items-center"
                  className="col-span-5 "
                  inlineLabelClassName="!block !m-0"
                  data={roles.map((role) => {
                    return {
                      label: role.name,
                      value: role.id || 1,
                    }
                  })}
                  onChange={(value: string) => {
                    onChange(value)
                  }}
                  label={'Role'}
                  errors={error?.message}
                  value={value}
                />
              )
            }}
          /> */}

          <Controller
            name="status"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <div className="grid grid-cols-7 gap-3 mt-4">
                  <div className="col-span-2 flex items-center">
                    <p className="mb-0 mr-4">Status</p>
                  </div>
                  <div className="col-span-5">
                    <SwitchButton
                      size="default"
                      checked={value === EUserStatus.ACTIVE}
                      onChange={(e) => {
                        onChange(e ? EUserStatus.ACTIVE : EUserStatus.INACTIVE)
                      }}
                    />
                  </div>
                </div>
              )
            }}
          />

          <div className="flex items-center mt-5 justify-end">
            <Button
              type="ghost"
              size="large"
              className="submit__btn login-btn mr-2"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              className="submit__btn login-btn"
              loading={isLoading}
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </AppModal>
  )
}

export default AddUpdateRoleModal
