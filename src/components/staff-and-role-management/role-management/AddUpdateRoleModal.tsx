import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { t } from 'i18next'

import { Button, Input } from 'src/common'
import { AppModal } from 'src/components/AppModal'
import { XCloseIcon } from 'src/components/Icon'
import { IPermissionModule, IRole } from 'src/interfaces'
import PermissionSection from './PermissionSection'

interface IAddUpdateRoleModalProps {
  selectedRole: IRole
  permissions: IPermissionModule[]
  open: boolean
  isLoading: boolean
  onClose: () => void
  onSubmitRoles: (data: { name: string }) => Promise<void>
  onSelectRoleId: (id: number) => void
}

const nameSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required(t('error:field_required'))
    .max(255, t('error:name_length_error')),
})

const AddUpdateRoleModal = (props: IAddUpdateRoleModalProps) => {
  const {
    open,
    permissions,
    selectedRole,
    isLoading,
    onClose,
    onSubmitRoles,
    onSelectRoleId,
  } = props

  const { control, handleSubmit, setValue } = useForm<{
    name: string
  }>({
    defaultValues: {
      name: '',
    },
    resolver: yupResolver(nameSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  const renderTitle = (title: string) => {
    const modifiedTitle = title.replace(/-/g, ' ')
    return modifiedTitle + ' management'
  }

  const isEditRole = !!selectedRole.id

  useEffect(() => {
    if (selectedRole) {
      setValue('name', selectedRole.name)
    }
  }, [selectedRole.name])

  return (
    <AppModal open={open} onClose={onClose}>
      <div className="flex items-center justify-between ">
        <div>
          <h1 className="m-0 text-[20px]">
            {isEditRole ? 'Edit role' : 'Add new role'}
          </h1>
        </div>
        <div className="hover:opacity-75 cursor-pointer">
          <XCloseIcon width={16} height={16} onClick={onClose} />
        </div>
      </div>
      <div className="mt-6">
        <form onSubmit={handleSubmit(onSubmitRoles)}>
          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => {
              return (
                <Input
                  label="Name"
                  name="name"
                  required
                  onChange={onChange}
                  value={value}
                  errors={error?.message}
                />
              )
            }}
          />

          <p className="mt-[1.25rem]">* Access module:</p>
          <div className="max-h-[450px] overflow-y-auto">
            {permissions.map((permission) => (
              <PermissionSection
                key={permission.module}
                title={renderTitle(permission.module)}
                permissions={permission.permissions}
                permissionIds={selectedRole?.permissionIds}
                onSelectRoleId={onSelectRoleId}
              />
            ))}
          </div>

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
