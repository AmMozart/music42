import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  deleteFileById,
  deleteFolderById,
  fetchFilesByRoomId,
  fetchFilesByFolderId,
  uploadFile,
  uploadFolder,
  explorerAPI,
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

export const editItemById = createAsyncThunk(
  'fileExplorer/editItemById',
  async (args: { id: number; name: string }) => {
    return await explorerAPI.editItemById(args.id, args.name);
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
  viewFileId: number | null;
}

const initialState: FileExplorerState = {
  explorerData: { folderId: 0, items: [] },
  viewFileId: null,
};

const fileExplorerSlice = createSlice({
  name: 'fileExplorer',
  initialState,
  reducers: {
    changeFolderById: (state, action: PayloadAction<number>) => {
      state.explorerData.folderId = action.payload;
    },
    openFileById: (state, action: PayloadAction<number>) => {
      state.viewFileId = action.payload;
    },
    closeFile: (state) => {
      state.viewFileId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(upload.fulfilled, () => {
      // TODO
    });

    builder.addCase(getFilesByRoomId.fulfilled, (state, action) => {
      state.explorerData = action.payload.data;
    });

    builder.addCase(getFilesByFolderId.fulfilled, (state, action) => {
      state.explorerData = action.payload.data;
    });
  },
});

export const explorerData = (state: RootState) =>
  state.fileExplorer.explorerData;

export const fileExplorerActions = fileExplorerSlice.actions;

export default fileExplorerSlice.reducer;
