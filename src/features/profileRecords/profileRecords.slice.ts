import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  deleteRecord,
  fetchRecords,
  loadMore,
  recordsAPI,
} from './profileRecords.api';

import { RootState } from '../../app/store';

import { FetchState, RecordData } from '../../app/types';

export const getRecords = createAsyncThunk(
  'profileRecords/getRecords',
  async (username: string) => {
    return await fetchRecords(username);
  }
);

export const getRecordsByRoomId = createAsyncThunk(
  'profileRecords/getRecordsByRoomId',
  async (id: number) => {
    return await recordsAPI.getRecordsByRoomId(id);
  }
);

export const deleteRecordById = createAsyncThunk(
  'profileRecord/deleteRecordById',
  async (id: number) => {
    return await deleteRecord(id);
  }
);

// export const postVideoLink = createAsyncThunk(
//   'profileVideo/postVideoLink',
//   async (link: string) => {
//     return await addVideoLink(link);
//   }
// );

export const loadMoreRecords = createAsyncThunk(
  'profileRecords/loadMoreRecords',
  async (args: { minId: number; username: string }) => {
    return await loadMore(args.minId, args.username);
  }
);

interface RecordsState {
  username: string;
  records: RecordData[];
  loadMoreFetchState: FetchState;
}

const initialState: RecordsState = {
  username: '',
  records: [],
  loadMoreFetchState: 'idle',
};

const profileRecordsSlice = createSlice({
  name: 'profileRecords',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      // state.username = action.payload;
      Object.assign(state, { ...initialState, username: action.payload });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRecords.fulfilled, (state, action) => {
      if (Array.isArray(action.payload.data)) {
        state.records = action.payload.data;
      }
      // state.fetchState = 'success';
    });

    builder.addCase(getRecordsByRoomId.fulfilled, (state, action) => {
      if (Array.isArray(action.payload.data)) {
        state.records = action.payload.data;
      }
    });

    builder.addCase(loadMoreRecords.pending, (state) => {
      state.loadMoreFetchState = 'loading';
    });
    builder.addCase(loadMoreRecords.fulfilled, (state, action) => {
      if (Array.isArray(action.payload.data)) {
        //   state.videos = [...state.videos, ...action.payload.data];
        //   state.loadMoreFetchState = 'idle';
        //   if (action.payload.data.length === 0) {
        //     state.loadMoreFetchState = 'success';
        //   }
        // } else {
        state.loadMoreFetchState = 'success';
      }
    });
    builder.addCase(loadMoreRecords.rejected, (state) => {
      state.loadMoreFetchState = 'error';
    });

    builder.addCase(deleteRecordById.fulfilled, (state, action) => {
      const recordId = +action.payload.data;
      if (recordId > 0) {
        state.records = state.records.filter((record) => record.id != recordId);
      }
      // state.fetchState = 'success';
    });
  },
});

export const username = (state: RootState) => state.profileRecords.username;
export const records = (state: RootState) => state.profileRecords.records;
export const loadMoreFetchState = (state: RootState) =>
  state.profileRecords.loadMoreFetchState;

export const { setUsername } = profileRecordsSlice.actions;

export default profileRecordsSlice.reducer;
