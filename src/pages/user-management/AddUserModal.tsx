import { zodResolver } from '@hookform/resolvers/zod'
import { t } from 'i18next'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, Input } from 'src/common'
import { AppModal } from 'src/components/AppModal'
import { XCloseIcon } from 'src/components/Icon'
import { TUpdateUserData } from 'src/interfaces'
import { useAppDispatch } from 'src/redux'

type Props = {
  open: boolean
  isLoading?: boolean
  onClose: () => void
  onSave: (data: TUpdateUserData) => Promise<void>
}

export const addUserSchema = z.object({
  email: z
    .string()
    .trim()
    .nonempty({
      message: t('error:required') as string,
    })
    .email({ message: t('error:email_format_error') as string }),
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
        length: 8
      }) as string,
    })
    .max(20, {
      message: t('error:max_length', {
        length: 20
      }) as string,
    })
    .nonempty({
      message: t('error:required') as string,
    })
    .transform((e) => (e === '' ? undefined : e)),
  phone: z
    .string()
    .trim()
    .regex(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, {
      message: t('error:phone_format_error') as string,
    })
    .max(13, {
      message: t('error:max_length', {
        length: 13
      }) as string,
    })
    .nonempty({
      message: t('error:required') as string,
    })
    .transform((e) => (e === '' ? undefined : e)),
  firstName: z
    .string()
    .trim()
    .max(30, {
      message: t('error:max_length', {
        length: 30
      }) as string,
    })
    .nonempty({
      message: t('error:required') as string,
    })
    .transform((e) => (e === '' ? undefined : e)),
  lastName: z
    .string()
    .trim()
    .max(30, {
      message: t('error:max_length', {
        length: 30
      }) as string,
    })
    .nonempty({
      message: t('error:required') as string,
    })
    .transform((e) => (e === '' ? undefined : e)),
})

const AddUserModal = ({ open, onClose, onSave, isLoading }: Props) => {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TUpdateUserData>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(addUserSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const onInvalid = (errors: any) => console.error(errors)

  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   if (open) {
  //     setValue('phone', undefined)
  //   }
  //   return () => {
  //     reset()
  //   }
  // }, [open, setValue, reset])

  return (
    <AppModal open={open} onClose={onClose}>
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="m-0 text-[20px]">Add new user</h1>
        </div>
        <div className="hover:opacity-75 cursor-pointer">
          <XCloseIcon width={16} height={16} onClick={onClose} />
        </div>
      </div>
      <div className="mt-6 w-[500px]">
        <form>
          <div className="mt-[16px]">
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
                    label={t('user:email') as string}
                    name="email"
                    className="input "
                    value={value}
                    type="text"
                    onChange={onChange}
                    errors={error?.message}
                  />
                )
              }}
            />
          </div>
          <div className="mt-[16px]">
            <Controller
              name="password"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <Input
                    alignment="col"
                    label={t('user:password') as string}
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
          </div>
          <div className="mt-[16px]">
            <Controller
              name="confirmPassword"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => {
                return (
                  <Input
                    alignment="col"
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
          </div>
          <div className="mt-[16px]">
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
                    label={t('user:phone') as string}
                    name="phone"
                    className="input"
                    value={value}
                    type="text"
                    onChange={onChange}
                    errors={error?.message}
                  />
                )
              }}
            />
          </div>
          <div className="mt-[16px]">
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
                    label={t('user:first_name') as string}
                    name="firstName"
                    className="input"
                    value={value}
                    type="text"
                    onChange={onChange}
                    errors={error?.message}
                  />
                )
              }}
            />
          </div>
          <div className="mt-[16px]">
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
                    label={t('user:last_name') as string}
                    name="lastName"
                    className="input"
                    value={value}
                    type="text"
                    onChange={onChange}
                    errors={error?.message}
                  />
                )
              }}
            />
          </div>
          <div className="mt-6">
            <div className="flex items-center mt-5 justify-end">
              <Button
                type="ghost"
                size="middle"
                className="submit__btn login-btn mr-10"
                onClick={onClose}
              >
                {'Cancel'}
              </Button>
              <Button
                htmlType="button"
                type="primary"
                size="middle"
                className="submit__btn login-btn"
                loading={isLoading}
                onClick={handleSubmit(onSave, onInvalid)}
              >
                {'ga'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AppModal>
  )
}

export default AddUserModal
