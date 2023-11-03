import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  FetchData,
  GarageJoinData,
  SearchType,
  UserData,
} from './../../app/types';

import {
  confirm,
  deleteItem,
  fetchGarageItem,
  fetchGarageItems,
  fetchJoinGarage,
  joinGarage,
  postGarageItem,
  reject,
  updateItem,
} from './garage.api';

import { RootState } from '../../app/store';
import { FetchState, GarageItemData } from '../../app/types';

export const getGarageItems = createAsyncThunk(
  'garage/getGarageItems',
  async () => {
    return await fetchGarageItems();
  }
);

export const getGarageItem = createAsyncThunk(
  'garage/getGarageItem',
  async (id: number) => {
    return await fetchGarageItem(id);
  }
);

export const addGarageItem = createAsyncThunk(
  'garage/addGarageItem',
  async (form: HTMLFormElement) => {
    return await postGarageItem(form);
  }
);

export const updateGarageItem = createAsyncThunk(
  'garage/updateGarageItem',
  async (args: { id: number; form: HTMLFormElement }) => {
    return await updateItem(args.id, args.form);
  }
);

export const deleteGarageItem = createAsyncThunk(
  'garage/deleteGarageItem',
  async (id: number) => {
    return await deleteItem(id);
  }
);

export const join = createAsyncThunk('garage/join', async (id: number) => {
  return await joinGarage(id);
});

export const getJoinGarage = createAsyncThunk(
  'garage/getJoinGarage',
  async (id: number) => {
    return await fetchJoinGarage(id);
  }
);

export const confirmJoinRequest = createAsyncThunk(
  'garage/confirmJoinRequest',
  async (id: number) => {
    return await confirm(id);
  }
);

export const rejectJoinRequest = createAsyncThunk(
  'garage/rejectJoinRequest',
  async (id: number) => {
    return await reject(id);
  }
);

interface GarageState {
  items: GarageItemData[];
  loading: FetchState;
  newItem: GarageItemData;
  editItem: GarageItemData;
  fetchNewItemData: FetchData;
  joinData: GarageJoinData | null;
  filter: SearchType | 'All';
}

const emptyNewItem: GarageItemData = {
  id: 0,
  userId: 0,
  title: '',
  countryId: 0,
  city: '',
  address: '',
  startDate: new Date().toString(),
  endDate: new Date().toString(),
  description: '',
  image: '',
  peopleCount: 0,
  existPeopleCount: 0,
  userData: null,
  types: [],
  searchType: SearchType.LookingFor,
};

const initialState: GarageState = {
  items: [],
  loading: 'idle',
  newItem: emptyNewItem,
  editItem: emptyNewItem,
  fetchNewItemData: { status: 0, data: '', message: '' },
  joinData: null,
  filter: 'All',
};

const garage = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    setNewItem: (state, action: PayloadAction<GarageItemData>) => {
      state.newItem = action.payload;
    },

    resetNewItem: (state) => {
      state.newItem = { ...emptyNewItem };
      state.fetchNewItemData = { status: 0, data: '', message: '' };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getGarageItem.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.data.id
        );
        state.items.push(action.payload.data);
      }
    });

    builder.addCase(getGarageItems.pending, (state) => {
      state.loading = 'loading';
    });
    builder.addCase(getGarageItems.fulfilled, (state, action) => {
      if (Array.isArray(action.payload.data)) {
        state.items = action.payload.data;

        state.loading = 'idle';
        if (action.payload.data.length === 0) {
          state.loading = 'success';
        }
      } else {
        state.loading = 'success';
      }
    });
    builder.addCase(getGarageItems.rejected, (state) => {
      state.loading = 'error';
    });

    builder.addCase(addGarageItem.fulfilled, (state, action) => {
      state.fetchNewItemData = action.payload;
    });

    builder.addCase(updateGarageItem.fulfilled, (state, action) => {
      state.fetchNewItemData = action.payload;
      // state.items = state.items.map((item) =>
      //   item.id === action.payload.data.id ? action.payload.data : item
      // );
    });

    builder.addCase(deleteGarageItem.fulfilled, (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload.data
      );
    });

    builder.addCase(getJoinGarage.fulfilled, (state, action) => {
      // if (action.payload.data) {
      state.joinData = action.payload.data;
      // }
    });

    builder.addCase(join.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.joinData = action.payload.data;
      }
    });
  },
});

export const items = (state: RootState) => state.garage.items;
export const joinData = (state: RootState) => state.garage.joinData;
export const fetchNewItemData = (state: RootState) =>
  state.garage.fetchNewItemData;

export const { resetNewItem, setNewItem } = garage.actions;

export default garage.reducer;
