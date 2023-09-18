import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getCalendarEmploymentData } from './calendarAPI';

import { RootState } from '../../app/store';

interface CalendarState {
  data: CalendarEmploymentData[];
}

export interface CalendarEmploymentData {
  eventName: string;
  eventVenueName: string;
  startDate: number;
  endDate: number;
}

export const fetchData = createAsyncThunk(
  'calendar/getCalendarEmploymentData',
  async () => {
    const username = location.pathname.replace(/\/.*\//, '');
    const data: CalendarEmploymentData[] = await getCalendarEmploymentData(
      username
    );
    return {
      data,
    };
  }
);

const initialState: CalendarState = {
  data: [],
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
      })
      .addCase(fetchData.rejected, (state, action) => {
        console.log(action.error);
      });
  },
});

export const calendarEmploymentData = (
  state: RootState
): CalendarEmploymentData[] => state.calendar.data;

export default calendarSlice.reducer;
