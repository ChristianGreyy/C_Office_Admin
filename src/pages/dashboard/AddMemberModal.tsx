import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { ShareSelectInput } from '@components'
import { useState } from 'react'
import { Button } from 'src/common'
import { AppModal } from 'src/components/AppModal'
import { XCloseIcon } from 'src/components/Icon'
import { EProjectMemberRole, IAddMember, IUserDetail } from 'src/interfaces'
import { useAppDispatch } from 'src/redux'

type Props = {
  open: boolean
  isLoading?: boolean
  users: IUserDetail[] | null
  onClose: () => void
  onSave: (data: IAddMember) => Promise<void>
}

const AddMemberModal = ({ users, open, onClose, onSave, isLoading }: Props) => {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IAddMember>({
    defaultValues: {
      userId: undefined,
      role: EProjectMemberRole.developer,
    },
    // resolver: zodResolver(addMemberSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const [selectedOption, setSelectedOption] = useState(null)

  const onInvalid = (errors: any) => console.error(errors)

  const dispatch = useAppDispatch()

  const rolesOptions = [
    {
      label: 'Qc',
      value: 'qc',
    },
    {
      label: 'Developer',
      value: 'developer',
    },
    {
      label: 'Tester',
      value: 'tester',
    },
    {
      label: 'Leader',
      value: 'leader',
    },
    {
      label: 'Sale',
      value: 'sale',
    },
  ]

  console.log('users', users)

  const userOptions = users?.map(item => (
    {
      label: `${item.firstName} ${item.lastName}`,
      value: item.id
    }
  ))

  return (
    <>
    {
      open && (
        <AppModal open={open} onClose={onClose}>
          <div className="flex items-center justify-between ">
            <div>
              <h1 className="m-0 text-[20px]">Add new member</h1>
            </div>
            <div className="hover:opacity-75 cursor-pointer">
              <XCloseIcon width={16} height={16} onClick={onClose} />
            </div>
          </div>
          <div className="mt-6 w-[500px]">
            <form>
              <div className="mt-[16px]">
                <Controller
                  name="userId"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => {
                    return (
                      <ShareSelectInput
                        value={value}
                        data={userOptions as any}
                        label={'User'}
                        onChange={(data) => {
                          onChange(data)
                        }}
                      />
                    )
                  }}
                />
              </div>
              <div className="mt-[16px]">
                <Controller
                  name="role"
                  control={control}
                  render={({
                    field: { value, onChange },
                    fieldState: { error },
                  }) => {
                    return (
                      <ShareSelectInput
                        value={value}
                        data={rolesOptions as any}
                        label={'Role'}
                        onChange={(data) => {
                          onChange(data)
                        }}
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
    </>
  )
}

export default AddMemberModal
