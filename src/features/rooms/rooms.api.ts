import { FetchData, RoomItemData } from '../../app/types';
import { getHashID } from '../../utils/getHashID';

const sendDescription = async (
  description: any,
  roomId: number,
  receiverUserId: number
) => {
  const url = `https://music42.com/endpoints/rooms/description?&hash_id=${getHashID()}`;

  const fd = new FormData();
  fd.append('description', JSON.stringify(description));
  fd.append('roomId', JSON.stringify(roomId));
  fd.append('receiverUserId', String(receiverUserId));

  const options = {
    method: 'POST',
    body: fd,
  };

  return (await (await fetch(url, options)).json()) as FetchData;
};

const sendCandidate = async (
  candidate: any,
  roomId: number,
  receiverUserId: number
) => {
  const url = `https://music42.com/endpoints/rooms/candidate?&hash_id=${getHashID()}`;

  const fd = new FormData();
  fd.append('candidate', JSON.stringify(candidate));
  fd.append('roomId', JSON.stringify(roomId));
  fd.append('receiverUserId', String(receiverUserId));

  const options = {
    method: 'POST',
    body: fd,
  };

  return (await (await fetch(url, options)).json()) as FetchData;
};

const getRemoteData = async (id: number) => {
  const url = `https://music42.com/endpoints/rooms/remoteData/${id}?&hash_id=${getHashID()}`;
  return (await (await fetch(url)).json()) as FetchData;
};

const fetchRoom = async (form: HTMLFormElement) => {
  const url = `https://music42.com/endpoints/rooms/items?&hash_id=${getHashID()}`;

  const fd = new FormData(form);

  const options = {
    method: 'POST',
    body: fd,
  };
  const response = await fetch(url, options);

  return (await response.json()) as FetchData;
};

const fetchRoomItems = async () => {
  const url = `https://music42.com/endpoints/rooms/items?&hash_id=${getHashID()}`;
  const response = await fetch(url);

  return (await response.json()) as FetchData<RoomItemData[]>;
};

const fetchRoomById = async (id: number) => {
  const url = `https://music42.com/endpoints/rooms/items/${id}?&hash_id=${getHashID()}`;
  const response = await fetch(url);

  return (await response.json()) as FetchData<RoomItemData>;
};

const deleteRoomItem = async (id: number) => {
  const url = `https://music42.com/endpoints/rooms/items/${id}?&hash_id=${getHashID()}`;
  const options = {
    method: 'DELETE',
  };
  const response = await fetch(url, options);

  return (await response.json()) as FetchData;
};

const deleteInfo = async () => {
  const url = `https://music42.com/endpoints/rooms/deleteInfo?&hash_id=${getHashID()}`;

  const response = await fetch(url);

  return (await response.json()) as FetchData;
};

const fetchState = async (id: number, state: string) => {
  const url = `https://music42.com/endpoints/rooms/state?&hash_id=${getHashID()}`;
  const fd = new FormData();
  fd.append('roomConnectionId', String(id));
  fd.append('state', state);

  const options = {
    method: 'POST',
    body: fd,
  };
  const response = await fetch(url, options);

  return (await response.json()) as FetchData;
};

const addUser = async (room_id: number) => {
  const url = `https://music42.com/endpoints/rooms/addUser/${room_id}?&hash_id=${getHashID()}`;

  const response = await fetch(url);
  return (await response.json()) as FetchData;
};

const joinUserToRoom = async (roomId: number) => {
  const url = `https://music42.com/endpoints/rooms/join/${roomId}?&hash_id=${getHashID()}`;
  const response = await fetch(url);

  return (await response.json()) as FetchData<number[]> & {
    roomId: number;
  };
};

const leaveUserFromRoom = async (roomId: number) => {
  const url = `https://music42.com/endpoints/rooms/leave/${roomId}?&hash_id=${getHashID()}`;
  const response = await fetch(url);

  return (await response.json()) as FetchData<number[]> & {
    roomId: number;
  };
};

const saveTrack = async (blob: Blob, countMember: number, roomId: number) => {
  const url = `https://music42.com/endpoints/rooms/saveTrack?&hash_id=${getHashID()}`;

  const fd = new FormData();
  fd.append('track', blob, 'videofile.webm'); // videofile.mkv
  fd.append('countMember', countMember.toString());
  fd.append('roomId', roomId.toString());

  const options = {
    method: 'POST',
    body: fd,
  };

  const response = await fetch(url, options);

  return (await response.json()) as FetchData;
};

const intiveUsers = async (roomId: number, userIds: number[]) => {
  const url = `https://music42.com/endpoints/rooms/invite?&hash_id=${getHashID()}`;

  const fd = new FormData();
  fd.append('roomId', roomId.toString());
  fd.append('userIds', JSON.stringify(userIds));

  const options = {
    method: 'POST',
    body: fd,
  };

  const response = await fetch(url, options);

  return (await response.json()) as FetchData;
};

export {
  sendDescription,
  sendCandidate,
  getRemoteData,
  fetchRoom,
  fetchRoomItems,
  fetchRoomById,
  deleteRoomItem,
  deleteInfo,
  fetchState,
  addUser,
  joinUserToRoom,
  leaveUserFromRoom,
  saveTrack,
  intiveUsers,
};
