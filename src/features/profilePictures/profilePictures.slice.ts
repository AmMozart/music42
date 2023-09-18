import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  deletePicture,
  getPictures,
  loadMore,
  postPicture,
  savePictureToCollection,
} from './profilePictures.api';

import { RootState } from '../../app/store';

import { FetchState, PictureData } from '../../app/types';

export const addPictureToCollection = createAsyncThunk(
  'profilePictures/addPictureToCollection',
  async (files: FileList) => {
    return await postPicture(files);
  }
);

export const deletePictureFromCollection = createAsyncThunk(
  'profilePictures/deletePictureFromCollection',
  async (id: number) => {
    return await deletePicture(id);
  }
);

export const getPicturesFromCollection = createAsyncThunk(
  'profilePictures/getPicturesFromCollection',
  async (username: string) => {
    return await getPictures(username);
  }
);

export const savePicture = createAsyncThunk(
  'profilePictures/savePicture',
  async (args: { id: number; picture: Blob }) => {
    return await savePictureToCollection(args.id, args.picture);
  }
);

export const loadMorePictures = createAsyncThunk(
  'profilePictures/loadMorePictures',
  async (args: { minId: number; username: string }) => {
    return await loadMore(args.minId, args.username);
  }
);

interface PicturesState {
  username: string;
  pictures: PictureData[];
  addFetchState: FetchState;
  files: FileList | null;
  showCarousel: boolean;
  carouselItem: number;
  editPictureId: number;
  inEditProcessing: boolean;
  loadMorefetchState: FetchState;
}

const initialState: PicturesState = {
  username: '',
  pictures: [],
  addFetchState: 'idle',
  files: null,
  showCarousel: false,
  carouselItem: 0,
  editPictureId: 0,
  inEditProcessing: false,
  loadMorefetchState: 'idle',
};

const profilePicturesSlice = createSlice({
  name: 'profilePictures',
  initialState,
  reducers: {
    breakProfile: (state) => {
      Object.assign(state, initialState);
    },

    setEditPictureId: (state, action: PayloadAction<number>) => {
      state.editPictureId = action.payload;
    },

    setUsername: (state, action: PayloadAction<string>) => {
      Object.assign(state, { ...initialState, username: action.payload });
    },

    setFiles: (state, action: PayloadAction<FileList | null>) => {
      state.files = action.payload;
    },

    setShowCarousel: (
      state,
      action: PayloadAction<{ isShow: boolean; item?: number }>
    ) => {
      state.showCarousel = action.payload.isShow;
      state.carouselItem = action.payload.item || 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addPictureToCollection.pending, (state) => {
      state.addFetchState = 'loading';
    });
    builder.addCase(addPictureToCollection.fulfilled, (state, action) => {
      if (Array.isArray(action.payload.data)) {
        state.files = null;
        state.pictures = [...action.payload.data, ...state.pictures];
        state.addFetchState = 'idle';
        if (action.payload.data.length === 0) {
          state.addFetchState = 'success';
        }
      } else {
        state.addFetchState = 'success';
      }
    });
    builder.addCase(addPictureToCollection.rejected, (state) => {
      state.addFetchState = 'error';
    });

    builder.addCase(deletePictureFromCollection.fulfilled, (state, action) => {
      const pictureId = +action.payload.data;
      if (pictureId > 0) {
        state.pictures = state.pictures.filter((p) => p.id != pictureId);
      }
    });

    // builder.addCase(getPicturesFromCollection.pending, (state) => {});

    builder.addCase(getPicturesFromCollection.fulfilled, (state, action) => {
      if (Array.isArray(action.payload.data)) {
        state.pictures = action.payload.data;
      } else {
        state.pictures = [];
      }
    });

    builder.addCase(savePicture.pending, (state) => {
      state.inEditProcessing = true;
    });
    builder.addCase(savePicture.fulfilled, (state, action) => {
      state.pictures = state.pictures.map((picture) =>
        picture.id === state.editPictureId ? action.payload.data : picture
      );
      state.editPictureId = 0;
      state.inEditProcessing = false;
    });
    builder.addCase(savePicture.rejected, (state) => {
      state.inEditProcessing = false;
    });

    builder.addCase(loadMorePictures.pending, (state) => {
      state.loadMorefetchState = 'loading';
    });
    builder.addCase(loadMorePictures.fulfilled, (state, action) => {
      if (Array.isArray(action.payload.data)) {
        state.pictures = [...state.pictures, ...action.payload.data];
        state.loadMorefetchState = 'idle';
        if (action.payload.data.length === 0) {
          state.loadMorefetchState = 'success';
        }
      } else {
        state.loadMorefetchState = 'success';
      }
    });
    builder.addCase(loadMorePictures.rejected, (state) => {
      state.loadMorefetchState = 'error';
    });
  },
});

export const inEditProcessing = (state: RootState) =>
  state.profilePictures.inEditProcessing;
export const files = (state: RootState) => state.profilePictures.files;
export const username = (state: RootState) => state.profilePictures.username;
export const pictures = (state: RootState) => state.profilePictures.pictures;
export const editPictureId = (state: RootState) =>
  state.profilePictures.editPictureId;
export const showCarousel = (state: RootState) =>
  state.profilePictures.showCarousel;
export const carouselItem = (state: RootState) =>
  state.profilePictures.carouselItem;
export const loadMoreFetchState = (state: RootState) =>
  state.profilePictures.loadMorefetchState;
export const addFetchState = (state: RootState) =>
  state.profilePictures.addFetchState;

export const {
  setFiles,
  setUsername,
  setShowCarousel,
  breakProfile,
  setEditPictureId,
} = profilePicturesSlice.actions;

export default profilePicturesSlice.reducer;
