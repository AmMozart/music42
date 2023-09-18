import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { addVideoLink, deleteVideo, fetchPodcasts } from './podcasts.api';

import { RootState } from '../../app/store';
import { FetchState, VideoData } from '../../app/types';

export const getPodcasts = createAsyncThunk(
  'podcasts/getPodcasts',
  async () => {
    return await fetchPodcasts();
  }
);

export const deleteVideoById = createAsyncThunk(
  'podcasts/deleteVideoById',
  async (id: number) => {
    return await deleteVideo(id);
  }
);

export const postVideoLink = createAsyncThunk(
  'podcasts/postVideoLink',
  async (args: { link: string; title: string }) => {
    return await addVideoLink(args.link, args.title);
  }
);

interface PodcastState {
  videos: VideoData[];
  link: string;
  title: string;
  loadingVideoState: FetchState;
  loadMoreFetchState: FetchState;
}

const initialState: PodcastState = {
  videos: [],
  loadingVideoState: 'idle',
  link: '',
  title: '',
  loadMoreFetchState: 'idle',
};

const podcastsSlice = createSlice({
  name: 'podcasts',
  initialState,
  reducers: {
    setLoadingVideoState: (state, action: PayloadAction<FetchState>) => {
      state.loadingVideoState = action.payload;
    },
    changeLink: (state, action: PayloadAction<string>) => {
      state.link = action.payload;
    },
    changeTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPodcasts.pending, (state) => {
      state.loadingVideoState = 'loading';
    });
    builder.addCase(getPodcasts.fulfilled, (state, action) => {
      if (Array.isArray(action.payload.data)) {
        state.videos = [...state.videos, ...action.payload.data];
        state.loadingVideoState = 'idle';
        if (action.payload.data.length === 0) {
          state.loadingVideoState = 'success';
        }
      } else {
        state.loadingVideoState = 'success';
      }
    });
    builder.addCase(getPodcasts.rejected, (state) => {
      state.loadingVideoState = 'error';
    });

    builder.addCase(deleteVideoById.fulfilled, (state, action) => {
      const videoId = +action.payload.data;
      if (videoId > 0) {
        state.videos = state.videos.filter((video) => video.id != videoId);
      }
    });

    builder.addCase(postVideoLink.fulfilled, (state, action) => {
      state.videos.push(action.payload.data);
      console.log(action.payload.data);
      console.log(state.videos);
    });
  },
});

export const videos = (state: RootState) => state.podcasts.videos;
export const link = (state: RootState) => state.podcasts.link;
export const title = (state: RootState) => state.podcasts.title;
export const loadMoreFetchState = (state: RootState) =>
  state.podcasts.loadMoreFetchState;

export const { setLoadingVideoState, changeLink, changeTitle } =
  podcastsSlice.actions;

export default podcastsSlice.reducer;
