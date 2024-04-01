import { CURRENT_THEME, enumThemeMode } from '@configs';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { themes } from '@theme';
import { setToLS } from '@utils';

import { RootState } from '.';

interface IState {
  mobile: boolean;
  fullscreen: boolean;
  loading: boolean;
  appStateId: string;
  themeMode: enumThemeMode;
  currentPage: number;
  tableLoading: boolean;
}

const initialState: IState = {
  mobile: false,
  fullscreen: false,
  loading: false,
  tableLoading: false,
  appStateId: '',
  themeMode: enumThemeMode.LIGHT,
  currentPage: 1,
};

const appSlice = createSlice({
  name: 'app',
  initialState: initialState,
  reducers: {
    resetApp: () => {
      return initialState;
    },
    setMobile: (state, action: PayloadAction<boolean>) => {
      state.mobile = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTableLoading: (state, action: PayloadAction<boolean>) => {
      state.tableLoading = action.payload;
    },
    setFullscreen: (state) => {
      const element = document.querySelector('#root');
      //@ts-ignore
      const isFullscreen = document.webkitIsFullScreen || document.mozFullScreen || false;
      //@ts-ignore
      element.requestFullScreen =
        //@ts-ignore
        element.requestFullScreen ||
        //@ts-ignore
        element.webkitRequestFullScreen ||
        //@ts-ignore
        element.mozRequestFullScreen ||
        function () {
          return false;
        };
      //@ts-ignore
      document.cancelFullScreen =
        //@ts-ignore
        document.cancelFullScreen ||
        //@ts-ignore
        document.webkitCancelFullScreen ||
        //@ts-ignore
        document.mozCancelFullScreen ||
        function () {
          return false;
        };
      //@ts-ignore
      isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();

      state.fullscreen = !isFullscreen;
    },
    setAppStateId: (state, action: PayloadAction<string>) => {
      state.appStateId = action.payload;
    },
    setThemeMode: (state, action: PayloadAction<enumThemeMode>) => {
      state.themeMode = action.payload;
      if (action.payload === enumThemeMode.DARK) {
        setToLS(CURRENT_THEME, themes.theme.dark);
      } else {
        setToLS(CURRENT_THEME, themes.theme.light);
      }
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  resetApp,
  setMobile,
  setFullscreen,
  setLoading,
  setAppStateId,
  setThemeMode,
  setCurrentPage,
  setTableLoading,
} = appSlice.actions;

export const selectApp = (state: RootState) => state.app;
export const selectAppLoading = (state: RootState) => state.app.loading;
export const selectAppStateId = (state: RootState) => state.app.appStateId;
export const selectThemeMode = (state: RootState) => state.app.themeMode;

export default appSlice.reducer;
