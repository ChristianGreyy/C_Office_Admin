import { enumMainNavKey, enumNavKey } from '@configs';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '.';

interface IInitialState {
  sidebarCollapsed: boolean;
  navCurrentKey?: enumNavKey;
  navCurrentIsOpenKey?: enumMainNavKey;
  showHeaderMenu: boolean;
}

const initialState: IInitialState = {
  sidebarCollapsed: false,
  showHeaderMenu: false,
  navCurrentKey: enumNavKey.DASHBOARD,
  navCurrentIsOpenKey: undefined,
};

const layout = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
    },
    setNavCurrentKey: (state, action: PayloadAction<enumNavKey | undefined>) => {
      state.navCurrentKey = action.payload;
    },
    setNavCurrentIsOpenKey: (state, action: PayloadAction<number | undefined>) => {
      state.navCurrentIsOpenKey = action.payload;
    },
    setShowHeaderMenu: (state, action: PayloadAction<boolean>) => {
      state.showHeaderMenu = action.payload;
    },
  },
});

export const selectLayout = (state: RootState) => state.layout;

export const { setSidebarCollapsed, setNavCurrentKey, setShowHeaderMenu, setNavCurrentIsOpenKey } =
  layout.actions;

export default layout.reducer;
