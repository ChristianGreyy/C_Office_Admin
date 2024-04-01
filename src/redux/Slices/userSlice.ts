import { UserItem } from '@interfaces';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '.';

interface IInitialState {
  userDetail: UserItem | null;
  isUserDetailLoading: boolean;
}

const initialState: IInitialState = {
  userDetail: null,
  isUserDetailLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetail: (state, action: PayloadAction<UserItem | null>) => {
      state.userDetail = action.payload;
    },
    setIsUserDetailLoading: (state, action: PayloadAction<boolean>) => {
      state.isUserDetailLoading = action.payload;
    },
  },
});

export const selectUser = (state: RootState) => state.user;
export const { setUserDetail, setIsUserDetailLoading } = userSlice.actions;

export default userSlice.reducer;
