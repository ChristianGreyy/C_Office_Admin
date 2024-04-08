import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IPermissionModule, IRole, IUserDetail } from '@interfaces'
import {
  createAdminAction,
  createRoleAction,
  deleteAdminAction,
  deleteRoleByIDAction,
  getAdminListAction,
  getPermissions,
  getRoleByIDAction,
  getRolesAction,
  updateRoleByIDAction,
} from 'src/redux'
import { RootState } from '.'

interface IRoleState {
  permissions: IPermissionModule[]
  selectedRole: IRole
  roles: IRole[]
  admins: IUserDetail[]
  selectedStaff: Partial<IUserDetail>
  totalAdmins: number
  pageAdmins: number | string
  limitAdmins: number | string
  totalRoles: number
  pageRoles: string | number
  limitRoles: string | number
  loadings: Record<string, boolean | undefined>
}

const initialState: IRoleState = {
  permissions: [],
  admins: [],
  roles: [],
  totalAdmins: 0,
  pageAdmins: 0,
  limitAdmins: 0,
  totalRoles: 0,
  pageRoles: 0,
  limitRoles: 0,
  selectedRole: { id: null, permissionIds: [], name: '' },
  selectedStaff: {
    id: undefined,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  },
  loadings: {},
}

const roleSlice = createSlice({
  name: 'roles',
  initialState: initialState,
  reducers: {
    setSelectedRole: (state, action: PayloadAction<IRole>) => {
      state.selectedRole = { ...state.selectedRole, ...action.payload }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPermissions.pending, (state) => {
      state.loadings[`getPermissionsLoading`] = true
    })
    builder.addCase(getPermissions.fulfilled, (state, action) => {
      state.loadings[`getPermissionsLoading`] = false
      state.permissions = action.payload;
    })
    builder.addCase(getPermissions.rejected, (state) => {
      state.loadings[`getPermissionsLoading`] = false
    })

    builder.addCase(getRolesAction.pending, (state) => {
      state.loadings[`getRolesActionLoading`] = true
    })
    builder.addCase(getRolesAction.fulfilled, (state, action) => {
      state.loadings[`getRolesActionLoading`] = false
      state.roles = action.payload?.items
      state.totalRoles = action.payload?.total
      state.pageRoles = action.payload?.page
      state.limitRoles = action.payload?.limit
    })
    builder.addCase(getRolesAction.rejected, (state) => {
      state.loadings[`getRolesActionLoading`] = false
      state.roles = []
      state.totalRoles = 0
      state.pageRoles = 0
    })

    builder.addCase(createRoleAction.pending, (state) => {
      state.loadings[`createRoleActionLoading`] = true
    })
    builder.addCase(createRoleAction.fulfilled, (state) => {
      state.loadings[`createRoleActionLoading`] = false
    })
    builder.addCase(createRoleAction.rejected, (state) => {
      state.loadings[`createRoleActionLoading`] = false
    })
    builder.addCase(getRoleByIDAction.pending, (state) => {
      state.loadings[`getRoleByIDActionLoading`] = true
    })
    builder.addCase(getRoleByIDAction.fulfilled, (state, action) => {
      state.selectedRole = action.payload
      state.loadings[`getRoleByIDActionLoading`] = false
    })
    builder.addCase(getRoleByIDAction.rejected, (state) => {
      state.loadings[`getRoleByIDActionLoading`] = false
    })

    builder.addCase(updateRoleByIDAction.pending, (state) => {
      state.loadings[`updateRoleByIDActionLoading`] = true
    })
    builder.addCase(updateRoleByIDAction.fulfilled, (state) => {
      state.loadings[`updateRoleByIDActionLoading`] = false
    })
    builder.addCase(updateRoleByIDAction.rejected, (state) => {
      state.loadings[`updateRoleByIDActionLoading`] = false
    })

    builder.addCase(deleteRoleByIDAction.pending, (state) => {
      state.loadings[`deleteRoleByIDActionLoading`] = true
    })
    builder.addCase(deleteRoleByIDAction.fulfilled, (state) => {
      state.loadings[`deleteRoleByIDActionLoading`] = false
    })
    builder.addCase(deleteRoleByIDAction.rejected, (state) => {
      state.loadings[`deleteRoleByIDActionLoading`] = false
    })

    builder.addCase(getAdminListAction.pending, (state) => {
      state.loadings[`getAdminListActionLoading`] = true
    })
    builder.addCase(getAdminListAction.fulfilled, (state, action) => {
      state.loadings[`getAdminListActionLoading`] = false
      state.admins = action.payload?.items
      state.totalAdmins = action.payload?.total
      state.pageAdmins = action.payload?.page
      state.limitAdmins = action.payload?.limit
    })
    builder.addCase(getAdminListAction.rejected, (state) => {
      state.loadings[`getAdminListActionLoading`] = false
    })

    builder.addCase(createAdminAction.pending, (state) => {
      state.loadings[`createAdminActionLoading`] = true
    })
    builder.addCase(createAdminAction.fulfilled, (state, action) => {
      state.loadings[`createAdminActionLoading`] = false
    })
    builder.addCase(createAdminAction.rejected, (state) => {
      state.loadings[`createAdminActionLoading`] = false
    })

    builder.addCase(deleteAdminAction.pending, (state) => {
      state.loadings[`deleteAdminActionLoading`] = true
    })
    builder.addCase(deleteAdminAction.fulfilled, (state) => {
      state.loadings[`deleteAdminActionLoading`] = false
    })
    builder.addCase(deleteAdminAction.rejected, (state) => {
      state.loadings[`deleteAdminActionLoading`] = false
    })
  },
})

export const roleActions = {
  ...roleSlice.actions,
}

export const selectRoleLoading = (state: RootState, name: string) =>
  state.roles.loadings[`${name}Loading`]

export default roleSlice.reducer
