import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BaseResponseProps, ITiersFields } from '@interfaces';
import { RootState } from '.';
import { fetchTierList } from '../actions';

interface IInitialState {
  loading?: boolean;
  tiers?: BaseResponseProps<ITiersFields>;
}

const initialState: IInitialState = {
  tiers: undefined,
  loading: false,
};

const tier = createSlice({
  name: 'tier',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTierList.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchTierList.fulfilled,
        (state, { payload }: PayloadAction<BaseResponseProps<ITiersFields>>) => {
          state.loading = false;
          state.tiers = payload;
        },
      )
      .addCase(fetchTierList.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectTier = (state: RootState) => state.tier;

// export const {} = tier.actions;

export default tier.reducer;
