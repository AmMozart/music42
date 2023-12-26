import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  addUser,
  deleteInfo,
  deleteRoomItem,
  fetchRoom,
  fetchRoomById,
  fetchRoomItems,
  fetchState,
  getRemoteData,
  intiveUsers,
  joinUserToRoom,
  leaveUserFromRoom,
  saveTrack,
  sendCandidate,
  sendDescription,
} from './rooms.api';

import { RootState } from '../../app/store';
import { FetchData, RoomItemData } from '../../app/types';

export const getRoomItems = createAsyncThunk('rooms/getRoomItems', async () => {
  return await fetchRoomItems();
});

export const getRoomById = createAsyncThunk(
  'rooms/getRoomById',
  async (id: number) => {
    return await fetchRoomById(id);
  }
);

export const fetchDescription = createAsyncThunk(
  'rooms/fetchDescription',
  async (args: {
    description: any;
    roomId: number;
    receiverUserId: number;
  }) => {
    return await sendDescription(
      args.description,
      args.roomId,
      args.receiverUserId
    );
  }
);

export const fetchCandidate = createAsyncThunk(
  'rooms/fetchCandidate',
  async (args: { candidate: any; roomId: number; receiverUserId: number }) => {
    return await sendCandidate(
      args.candidate,
      args.roomId,
      args.receiverUserId
    );
  }
);

export const fetchRemoteData = createAsyncThunk(
  'rooms/fetchRemoteData',
  async (id: number) => {
    return await getRemoteData(id);
  }
);

export const createRoom = createAsyncThunk(
  'rooms/createRoom',
  async (form: HTMLFormElement) => {
    return await fetchRoom(form);
  }
);

export const deleteRoom = createAsyncThunk(
  'rooms/deleteRoom',
  async (id: number) => {
    return await deleteRoomItem(id);
  }
);

export const clearInfo = createAsyncThunk('rooms/clearInfo', async () => {
  return await deleteInfo();
});

export const setConnectionState = createAsyncThunk(
  'rooms/setConnectionState',
  async (args: { id: number; state: string }, api) => {
    const state: any = api.getState();
    return await fetchState(state.rooms.roomConnection[0]?.id, args.state);
  }
);

export const addNewUser = createAsyncThunk(
  'rooms/addNewUser',
  async (room_id: number) => {
    return await addUser(room_id);
  }
);

export const joinRoom = createAsyncThunk(
  'rooms/joinRoom',
  async (roomId: number) => {
    return await joinUserToRoom(roomId);
  }
);

export const leaveRoom = createAsyncThunk(
  'rooms/leaveRoom',
  async (roomId: number) => {
    return await leaveUserFromRoom(roomId);
  }
);

export const fetchTrack = createAsyncThunk(
  'rooms/fetchTrack',
  async (args: { blob: Blob; countMember: number; roomId: number }) =>
    await saveTrack(args.blob, args.countMember, args.roomId)
);

export const invite = createAsyncThunk(
  'rooms/invite',
  async (args: { roomId: number; userIds: number[] }) =>
    await intiveUsers(args.roomId, args.userIds)
);

interface RoomConnection {
  id: number;
  receiver_description: any;
  receiver_ice_candidat: any;
  receiver_user_id: number;
  sender_description: any;
  sender_ice_candidat: any;
  sender_user_id: number;
  state: string;
}

interface Connection {
  receiverUserId: number;
  stream?: MediaStream;
  rtcPeerConnection: RTCPeerConnection;
}

interface RoomsState {
  rooms: RoomItemData[];
  currentRoom: RoomItemData | null;
  fetchNewItemData: FetchData;
  errorMessage: string;
  successMessage: string;
  isUploadingRecord: boolean;

  peerConnections: Connection[];
  roomConnection: RoomConnection[];

  mediaStream: MediaStream | null;
  isRecording: boolean;
  isSavingRecord: boolean;
}

const initialState: RoomsState = {
  rooms: [],
  currentRoom: null,
  fetchNewItemData: { status: 0, data: '', message: '' },
  errorMessage: '',
  successMessage: '',
  isUploadingRecord: false,

  peerConnections: [],
  roomConnection: [],

  mediaStream: null,
  isRecording: false,
  isSavingRecord: false,
};

const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    startRecord: (state) => {
      state.isRecording = true;
    },
    stopRecord: (state) => {
      state.isRecording = false;
    },
    saveRecord: (state) => {
      state.isSavingRecord = true;
    },
    breakSavingRecord: (state) => {
      state.isSavingRecord = false;
    },
    resetNewItem: (state) => {
      state.fetchNewItemData = { status: 0, data: '', message: '' };
    },
    setStreamToPeerConnection: (
      state,
      action: PayloadAction<{ receiverUserId: number; stream: MediaStream }>
    ) => {
      state.peerConnections.forEach((peer) => {
        if (peer.receiverUserId === action.payload.receiverUserId) {
          peer.stream = action.payload.stream;
        }
      });
    },
    addRtcPeerConnection: (state, action: PayloadAction<Connection>) => {
      state.peerConnections.push(action.payload);
    },
    removeRtcPeerConnection: (state, action: PayloadAction<Connection>) => {
      action.payload.rtcPeerConnection.close();
      state.peerConnections = state.peerConnections.filter(
        (connection) =>
          connection.rtcPeerConnection !== action.payload.rtcPeerConnection
      );
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
    setSuccessMessage: (state, action: PayloadAction<string>) => {
      state.successMessage = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(getRoomItems.fulfilled, (state, action) => {
      state.rooms = action.payload.data;
    });

    builder.addCase(getRoomById.fulfilled, (state, action) => {
      state.currentRoom = action.payload.data;
    });

    builder.addCase(
      fetchRemoteData.fulfilled,
      (state, action: PayloadAction<FetchData<RoomConnection[]>>) => {
        const a = state.roomConnection
          .map((val) => val.id + val.sender_user_id + val.state)
          .reduce((acc, val) => acc + val, '');

        const b = action.payload.data
          .map((val) => val.id + val.sender_user_id + val.state)
          .reduce((acc, val) => acc + val, '');

        if (a !== b) {
          action.payload.data = action.payload.data.map((value) => ({
            ...value,
            sender_description: JSON.parse(value.sender_description),
            sender_ice_candidat: JSON.parse(value.sender_ice_candidat),
            receiver_description: JSON.parse(value.receiver_description),
            receiver_ice_candidat: JSON.parse(value.receiver_ice_candidat),
          }));
          state.roomConnection = action.payload.data;
        }
      }
    );

    builder.addCase(clearInfo.fulfilled, (state) => {
      state.peerConnections.forEach((connection) =>
        connection.rtcPeerConnection.close()
      );
      state.currentRoom = null;
      state.fetchNewItemData = { status: 0, data: '', message: '' };
      state.errorMessage = '';
      state.successMessage = '';
      state.peerConnections = [];
      state.roomConnection = [];
    });

    builder.addCase(createRoom.fulfilled, (state, action) => {
      state.fetchNewItemData = action.payload;
    });

    builder.addCase(deleteRoom.fulfilled, (state, action) => {
      state.rooms = state.rooms.filter(
        (room) => room.id !== action.payload.data
      );
    });

    builder.addCase(joinRoom.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.rooms = state.rooms.map((room) =>
          room.id === action.payload.roomId
            ? { ...room, userIds: action.payload.data }
            : room
        );
      }

      if (action.payload.status === 400) {
        state.errorMessage = action.payload.message;
      }
    });

    builder.addCase(leaveRoom.fulfilled, (state, action) => {
      if (action.payload.status === 200) {
        state.rooms = state.rooms.map((room) =>
          room.id === action.payload.roomId
            ? { ...room, userIds: action.payload.data }
            : room
        );
      }

      if (action.payload.status === 400) {
        state.errorMessage = action.payload.message;
      }
    });

    builder.addCase(fetchTrack.pending, (state) => {
      state.isUploadingRecord = true;
    });
    builder.addCase(fetchTrack.fulfilled, (state, action) => {
      state.isUploadingRecord = false;
      if (action.payload.status === 200) {
        state.successMessage = action.payload.message;
      }

      if (action.payload.status === 400) {
        state.errorMessage = action.payload.message;
      }
    });
    builder.addCase(fetchTrack.rejected, (state) => {
      state.isUploadingRecord = false;
    });

    builder.addCase(invite.fulfilled, (state, action) => {
      console.log(action.payload);
    });
  },
});

export const rooms = (state: RootState) => state.rooms.rooms;
export const isRecording = (state: RootState) => state.rooms.isRecording;

export const fetchNewItemData = (state: RootState) =>
  state.rooms.fetchNewItemData;

export const currentRoom = (state: RootState) => state.rooms.currentRoom;

export const peerConnections = (state: RootState) =>
  state.rooms.peerConnections;

export const roomConnection = (state: RootState) => state.rooms.roomConnection;
export const isSavingRecord = (state: RootState) => state.rooms.isSavingRecord;

export const errorMessage = (state: RootState) => state.rooms.errorMessage;
export const successMessage = (state: RootState) => state.rooms.successMessage;
export const isUploadingRecord = (state: RootState) =>
  state.rooms.isUploadingRecord;

export const roomsActions = roomsSlice.actions;

export default roomsSlice.reducer;
