import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getTicketData, verifyTicket } from './ticketVerifyAPI';

import { RootState } from '../../app/store';

type FetchState = 'idle' | 'success' | 'error' | 'loading';

interface TicketState {
  verifyState: FetchState | null;
  loadingDataState: FetchState | null;
  data: TicketData | null;
}

export interface TicketData {
  ticketId: number;
  eventName: string;
  eventVenueName: string;
  startDate: string;
  endDate: string;
  userName: string;
  userEmail: string;
  DateOfUse: Date | null;
}

export const getData = createAsyncThunk(
  'ticket/getTicketData',
  async (ticketId: number) => await getTicketData(ticketId)
);

export const verify = createAsyncThunk(
  'ticket/verifyTicket',
  async (ticketId: string) => await verifyTicket(ticketId)
);

const initialState: TicketState = {
  verifyState: null,
  loadingDataState: null,
  data: null,
};

const ticketSlice = createSlice({
  name: 'ticketVerify',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getData.pending, (state) => {
      state.loadingDataState = 'loading';
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loadingDataState = action.payload ? 'success' : 'error';
    });
    builder.addCase(getData.rejected, (state) => {
      state.loadingDataState = 'error';
    });

    builder.addCase(verify.pending, (state) => {
      state.verifyState = 'loading';
    });
    builder.addCase(verify.fulfilled, (state, action) => {
      state.verifyState = action.payload?.status === 200 ? 'success' : 'error';
    });
    builder.addCase(verify.rejected, (state) => {
      state.verifyState = 'error';
    });
  },
});

export const data = (state: RootState) => state.ticketVerify.data;
export const verifyState = (state: RootState) => state.ticketVerify.verifyState;
export const loadingDataState = (state: RootState) =>
  state.ticketVerify.loadingDataState;

export default ticketSlice.reducer;
