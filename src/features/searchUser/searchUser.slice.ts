import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchUsers, init } from './searchUser.api';

import { RootState } from '../../app/store';
import { UserData } from '../../app/types';

export const getUsers = createAsyncThunk(
  'searchUser/getUsers',
  async (beginString: string) => {
    return await fetchUsers(beginString);
  }
);

export const initUsers = createAsyncThunk(
  'searchUser/initUsers',
  async (roomId: number) => {
    return await init(roomId);
  }
);

interface SearchUserState {
  searchString: string;
  selectedUser: UserData[];
  findUsers: UserData[];
}

const initialState: SearchUserState = {
  searchString: '',
  selectedUser: [],
  findUsers: [],
};

const searchUser = createSlice({
  name: 'searchUser',
  initialState,
  reducers: {
    changeSearchString: (state, action: PayloadAction<string>) => {
      if (action.payload === '') {
        state.findUsers = [];
      }
      state.searchString = action.payload;
    },
    addUser: (state, action: PayloadAction<UserData>) => {
      state.selectedUser.push(action.payload);
    },
    removeUser: (state, action: PayloadAction<UserData>) => {
      state.selectedUser = state.selectedUser.filter(
        (user) => user.id !== action.payload.id
      );
    },
    clear: (state) => {
      state.findUsers = [];
      state.searchString = '';
      state.selectedUser = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.findUsers = action.payload.data;
    });

    builder.addCase(initUsers.fulfilled, (state, action) => {
      state.selectedUser = action.payload.data;
    });
  },
});

export const searchString = (state: RootState) => state.searchUser.searchString;
export const findUsers = (state: RootState) => state.searchUser.findUsers;
export const selectedUser = (state: RootState) => state.searchUser.selectedUser;

export const searchUserAction = searchUser.actions;

export default searchUser.reducer;
