import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  addVideoLink,
  deleteVideo,
  fetchVideos,
  loadMore,
} from './profileVideo.api';

import { RootState } from '../../app/store';

import { FetchState, VideoData } from '../../app/types';

export const getVideos = createAsyncThunk(
  'profileVideo/getVideos',
  async (username: string) => {
    return await fetchVideos(username);
  }
);

export const deleteVideoById = createAsyncThunk(
  'profileVideo/deleteVideoById',
  async (id: number) => {
    return await deleteVideo(id);
  }
);

export const postVideoLink = createAsyncThunk(
  'profileVideo/postVideoLink',
  async (link: string) => {
    return await addVideoLink(link);
  }
);

export const loadMoreVideos = createAsyncThunk(
  'profilePictures/loadMoreVideos',
  async (args: { minId: number; username: string }) => {
    return await loadMore(args.minId, args.username);
  }
);

interface VideosState {
  username: string;
  videos: VideoData[];
  fetchState: FetchState;
  isInputOpen: boolean;
  link: string;
  loadMoreFetchState: FetchState;
}

const initialState: VideosState = {
  username: '',
  videos: [],
  fetchState: 'idle',
  isInputOpen: false,
  link: '',
  loadMoreFetchState: 'idle',
};

const profileVideoSlice = createSlice({
  name: 'profileVideo',
  initialState,
  reducers: {
    breakProfile: (state) => {
      Object.assign(state, initialState);
    },

    setUsername: (state, action: PayloadAction<string>) => {
      Object.assign(state, { ...initialState, username: action.payload });
    },
    setIsInputOpen: (state, action: PayloadAction<boolean>) => {
      state.isInputOpen = action.payload;
    },
    changeLink: (state, action: PayloadAction<string>) => {
      state.link = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getVideos.pending, (state) => {
      state.fetchState = 'loading';
    });
    builder.addCase(getVideos.fulfilled, (state, action) => {
      if (Array.isArray(action.payload.data)) {
        state.videos = action.payload.data;
      }
      state.fetchState = 'success';
    });
    builder.addCase(getVideos.rejected, (state) => {
      state.fetchState = 'error';
    });

    builder.addCase(deleteVideoById.fulfilled, (state, action) => {
      const videoId = +action.payload.data;
      if (videoId > 0) {
        state.videos = state.videos.filter((video) => video.id != videoId);
      }
      state.fetchState = 'success';
    });

    builder.addCase(postVideoLink.fulfilled, (state, action) => {
      state.videos.push(action.payload.data);
      state.fetchState = 'success';
    });

    builder.addCase(loadMoreVideos.pending, (state) => {
      state.loadMoreFetchState = 'loading';
    });
    builder.addCase(loadMoreVideos.fulfilled, (state, action) => {
      if (Array.isArray(action.payload.data)) {
        state.videos = [...state.videos, ...action.payload.data];
        state.loadMoreFetchState = 'idle';
        if (action.payload.data.length === 0) {
          state.loadMoreFetchState = 'success';
        }
      } else {
        state.loadMoreFetchState = 'success';
      }
    });
    builder.addCase(loadMoreVideos.rejected, (state) => {
      state.loadMoreFetchState = 'error';
    });
  },
});

export const username = (state: RootState) => state.profileVideo.username;
export const videos = (state: RootState) => state.profileVideo.videos;
export const isInputOpen = (state: RootState) => state.profileVideo.isInputOpen;
export const link = (state: RootState) => state.profileVideo.link;
export const loadMoreFetchState = (state: RootState) =>
  state.profileVideo.loadMoreFetchState;

export const { setUsername, setIsInputOpen, changeLink, breakProfile } =
  profileVideoSlice.actions;
export default profileVideoSlice.reducer;
