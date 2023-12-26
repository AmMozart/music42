import { ExplorerData, FetchData } from '../../app/types';
import { getHashID } from '../../utils/getHashID';

const fetchFilesByRoomId = async (id: number) => {
  const url = `https://music42.com/endpoints/file-explorer/getItemsByRoomId/${id}?hash_id=${getHashID()}`;
  const response = await fetch(url);

  return (await response.json()) as FetchData<ExplorerData>;
};

const fetchFilesByFolderId = async (folderId: number) => {
  const url = `https://music42.com/endpoints/file-explorer/getItemsByFolderId/${folderId}?hash_id=${getHashID()}`;
  const response = await fetch(url);

  return (await response.json()) as FetchData<ExplorerData>;
};

const uploadFile = async (file: File, folderId: number) => {
  const url = `https://music42.com/endpoints/file-explorer/file?hash_id=${getHashID()}`;
  const fd = new FormData();
  fd.append('file', file);
  fd.append('folderId', folderId.toString());

  const response = await fetch(url, { method: 'POST', body: fd });

  return (await response.json()) as FetchData;
};

const uploadFolder = async (name: string, folderId: number) => {
  const url = `https://music42.com/endpoints/file-explorer/folder?hash_id=${getHashID()}`;
  const fd = new FormData();
  fd.append('name', name);
  fd.append('folderId', folderId.toString());

  const response = await fetch(url, { method: 'POST', body: fd });

  return (await response.json()) as FetchData;
};

const deleteFolderById = async (id: number) => {
  const url = `https://music42.com/endpoints/file-explorer/folder/${id}?hash_id=${getHashID()}`;

  const response = await fetch(url, { method: 'DELETE' });

  return (await response.json()) as FetchData;
};

const deleteFileById = async (id: number) => {
  const url = `https://music42.com/endpoints/file-explorer/file/${id}?hash_id=${getHashID()}`;

  const response = await fetch(url, { method: 'DELETE' });

  return (await response.json()) as FetchData;
};

export {
  uploadFile,
  fetchFilesByRoomId,
  uploadFolder,
  deleteFolderById,
  deleteFileById,
  fetchFilesByFolderId,
};
