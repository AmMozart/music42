import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { fetchTickets } from './ticketDownloadAPI';

import { RootState } from '../../app/store';

interface TicketDownloadState {
  ticketIds: number[];
  html: string[];
}

const initialState: TicketDownloadState = {
  ticketIds: [],
  html: [''],
};

export const getTickets = createAsyncThunk(
  'ticketDownload/getTickets',
  async (ids: number[]) => await fetchTickets(ids)
);

const ticketDownload = createSlice({
  name: 'ticketDownload',
  initialState,
  reducers: {
    setTicketIds: (state, action: PayloadAction<number[]>) => {
      state.ticketIds = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getTickets.fulfilled,
      (state, action: PayloadAction<{ html: string[] }>) => {
        state.html = action.payload.html;
      }
    );
  },
});

export const { setTicketIds } = ticketDownload.actions;
export const ticketIds = (state: RootState) => state.ticketDownload.ticketIds;
export const ticketHtml = (state: RootState) => state.ticketDownload.html;

export default ticketDownload.reducer;
