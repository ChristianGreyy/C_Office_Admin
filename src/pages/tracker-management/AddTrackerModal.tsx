import { zodResolver } from '@hookform/resolvers/zod'
import { t } from 'i18next'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button, Input } from 'src/common'
import { AppModal } from 'src/components/AppModal'
import { XCloseIcon } from 'src/components/Icon'
import { TUpdateTrackerData } from 'src/interfaces'
import { useAppDispatch } from 'src/redux'

type Props = {
  open: boolean
  isLoading?: boolean
  onClose: () => void
  onSave: (data: TUpdateTrackerData) => Promise<void>
}

export const addTrackerSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty({
      message: t('error:required') as string,
    })
})

const AddTrackerModal = ({ open, onClose, onSave, isLoading }: Props) => {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TUpdateTrackerData>({
    defaultValues: {
      name: '',
    },
    resolver: zodResolver(addTrackerSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const onInvalid = (errors: any) => console.error(errors)

  const dispatch = useAppDispatch()

  return (
    <AppModal open={open} onClose={onClose}>
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="m-0 text-[20px]">Add new tracker</h1>
        </div>
        <div className="hover:opacity-75 cursor-pointer">
          <XCloseIcon width={16} height={16} onClick={onClose} />
        </div>
      </div>
      <div className="mt-6 w-[500px]">
        <form>
          <div className="mt-[16px]">
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
                    label={t('tracker:name') as string}
                    name="name"
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
                {'Save'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AppModal>
  )
}

export default AddTrackerModal
