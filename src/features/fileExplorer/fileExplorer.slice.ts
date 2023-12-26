import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  deleteFileById,
  deleteFolderById,
  fetchFilesByRoomId,
  fetchFilesByFolderId,
  uploadFile,
  uploadFolder,
} from './fileExplorer.api';

import { RootState } from '../../app/store';
import { ExplorerData } from '../../app/types';

export const upload = createAsyncThunk(
  'fileExplorer/upload',
  async (args: { file: File; folderId: number }) => {
    return await uploadFile(args.file, args.folderId);
  }
);

export const createFolder = createAsyncThunk(
  'fileExplorer/createFolder',
  async (args: { name: string; folderId: number }) => {
    return await uploadFolder(args.name, args.folderId);
  }
);

export const deleteFolder = createAsyncThunk(
  'fileExplorer/deleteFolder',
  async (folderId: number) => {
    return await deleteFolderById(folderId);
  }
);

export const deleteFile = createAsyncThunk(
  'fileExplorer/deleteFile',
  async (fileId: number) => {
    return await deleteFileById(fileId);
  }
);

export const getFilesByRoomId = createAsyncThunk(
  'fileExplorer/getFilesByRoomId',
  async (roomId: number) => {
    return await fetchFilesByRoomId(roomId);
  }
);

export const getFilesByFolderId = createAsyncThunk(
  'fileExplorer/getFilesByFolderId',
  async (folderId: number) => {
    return await fetchFilesByFolderId(folderId);
  }
);

interface FileExplorerState {
  explorerData: ExplorerData;
}

const initialState: FileExplorerState = {
  explorerData: { folderId: 0, items: [] },
};

const fileExplorerSlice = createSlice({
  name: 'fileExplorer',
  initialState,
  reducers: {
    changeFolderById: (state, action: PayloadAction<number>) => {
      state.explorerData.folderId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(upload.fulfilled, (state, action) => {
      // console.log(action.payload);
    });

    builder.addCase(getFilesByRoomId.fulfilled, (state, action) => {
      state.explorerData = action.payload.data;
    });

    builder.addCase(getFilesByFolderId.fulfilled, (state, action) => {
      state.explorerData = action.payload.data;
    });

    // builder.addCase(createFolder.fulfilled, (state, action) => {
    //   state.explorerData.folders.push(action.payload.data);
    // });

    // builder.addCase(deleteFolder.fulfilled, (state, action) => {
    //   state.explorerData.folders = state.explorerData.folders.filter(
    //     (folder) => folder.id !== action.payload.data
    //   );
    // });
  },
});

export const explorerData = (state: RootState) =>
  state.fileExplorer.explorerData;

export const fileExplorerActions = fileExplorerSlice.actions;

export default fileExplorerSlice.reducer;
