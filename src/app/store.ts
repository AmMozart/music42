import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import calendar from '../features/calendarEmployment/calendarSlice';
import config from '../features/config/configSlice';
import expressSignUp from '../features/expressSignUp/expressSignUpSlice';
import garage from '../features/garage/garage.slice';
import langs from '../features/langs/langs.slice';
import podcasts from '../features/podcasts/podcasts.slice';
import profilePictures from '../features/profilePictures/profilePictures.slice';
import profileVideo from '../features/profileVideo/profileVideo.slice';
import ticketBuy from '../features/ticketBuy/ticketBuySlice';
import ticketDownload from '../features/ticketDownload/ticketDownloadSlice';
import ticketVerify from '../features/ticketVerify/ticketVerifySlice';
import user from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    user,
    langs,
    config,
    garage,
    calendar,
    podcasts,
    ticketBuy,
    ticketVerify,
    profileVideo,
    expressSignUp,
    ticketDownload,
    profilePictures,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
