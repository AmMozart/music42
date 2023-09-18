import { FetchData, PictureData } from '../../app/types';
import { getHashID } from '../../utils/getHashID';

const postPicture = async (files: FileList) => {
  const url = `https://music42.com/endpoints/user/add-picture-to-collection?hash_id=${getHashID()}`;

  const fd = new FormData();
  for (let i = 0; i < files.length; i++) {
    fd.append('picture[]', files[i]);
  }

  const response = await fetch(url, {
    method: 'POST',
    body: fd,
  });

  return (await response.json()) as FetchData;
};

const deletePicture = async (id: number) => {
  const url = `https://music42.com/endpoints/user/delete-picture-from-collection?id=${id}&hash_id=${getHashID()}`;
  const response = await fetch(url);

  return (await response.json()) as FetchData;
};

const getPictures = async (username: string) => {
  const url = `https://music42.com/endpoints/user/get-pictures?username=${username}&hash_id=${getHashID()}`;
  const response = await fetch(url);

  return (await response.json()) as FetchData<PictureData[]>;
};

const savePictureToCollection = async (id: number, picture: Blob) => {
  const url = `https://music42.com/endpoints/user/update-picture?&hash_id=${getHashID()}`;

  const fd = new FormData();
  fd.append('id', id.toString());
  fd.append('picture', picture);

  const response = await fetch(url, {
    method: 'POST',
    body: fd,
  });

  return (await response.json()) as FetchData<PictureData>;
};

const loadMore = async (minId: number, username: string) => {
  const url = `https://music42.com/endpoints/load-more/pictures?id=${minId}&username=${username}&hash_id=${getHashID()}`;
  const response = await fetch(url);

  return (await response.json()) as FetchData<PictureData[]>;
};

export {
  postPicture,
  deletePicture,
  getPictures,
  savePictureToCollection,
  loadMore,
};
