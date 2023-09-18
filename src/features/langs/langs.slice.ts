import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchLangs } from './langs.api';

import { RootState } from '../../app/store';
import { FetchState, LangsData } from '../../app/types';

export const getLangs = createAsyncThunk('langs/getLangs', async () => {
  return await fetchLangs();
});

interface Langs {
  fetchState: FetchState;
  langs: LangsData;
}

const initialState: Langs = {
  fetchState: 'idle',
  langs: {},
};

const langsSlice = createSlice({
  name: 'langs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLangs.pending, (state) => {
      state.fetchState = 'loading';
    });
    builder.addCase(getLangs.fulfilled, (state, action) => {
      state.fetchState = 'success';
      if (action.payload.data) {
        state.langs = action.payload.data;
      }
    });
    builder.addCase(getLangs.rejected, (state) => {
      state.fetchState = 'error';
    });
  },
});

export const langs = (state: RootState) => state.langs.langs;

export default langsSlice.reducer;
