import { FetchData, RecordData } from '../../app/types';
import { getHashID } from '../../utils/getHashID';

const fetchRecords = async (username: string) => {
  const url = `https://music42.com/endpoints/user/get-records?username=${username}&hash_id=${getHashID()}`;
  const response = await fetch(url);

  return (await response.json()) as FetchData<RecordData[]>;
};

const getRecordsByRoomId = async (id: number) => {
  const url = `https://music42.com/endpoints/user/get-records-by-room-id?id=${id}&hash_id=${getHashID()}`;
  const response = await fetch(url);

  return (await response.json()) as FetchData<RecordData[]>;
};

const deleteRecord = async (id: number) => {
  const url = `https://music42.com/endpoints/user/delete-record?id=${id}&hash_id=${getHashID()}`;
  const response = await fetch(url);

  return (await response.json()) as FetchData;
};

const loadMore = async (minId: number, username: string) => {
  const url = `https://music42.com/endpoints/load-more/records?id=${minId}&username=${username}&hash_id=${getHashID()}`;
  const response = await fetch(url);

  return (await response.json()) as FetchData<RecordData[]>;
};

export { fetchRecords, loadMore, deleteRecord };
export const recordsAPI = {
  fetchRecords,
  loadMore,
  deleteRecord,
  getRecordsByRoomId,
};
