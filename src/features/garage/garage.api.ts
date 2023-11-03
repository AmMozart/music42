import { FetchData, GarageItemData, GarageJoinData } from '../../app/types';
import { getHashID } from '../../utils/getHashID';

const fetchGarageItems = async () => {
  const url = `https://music42.com/endpoints/garage/items?&hash_id=${getHashID()}`;
  const response = await fetch(url);

  return (await response.json()) as FetchData<GarageItemData[]>;
};

const fetchGarageItem = async (id: number) => {
  const url = `https://music42.com/endpoints/garage/items/${id}?&hash_id=${getHashID()}`;
  const response = await fetch(url);

  return (await response.json()) as FetchData<GarageItemData>;
};

const postGarageItem = async (form: HTMLFormElement) => {
  const url = `https://music42.com/endpoints/garage/items?&hash_id=${getHashID()}`;
  const fd = new FormData(form);

  const response = await fetch(url, {
    method: 'POST',
    body: fd,
  });

  return (await response.json()) as FetchData<GarageItemData[]>;
};

const deleteItem = async (id: number) => {
  const url = `https://music42.com/endpoints/garage/items/${id}&hash_id=${getHashID()}`;
  const response = await fetch(url, { method: 'DELETE' });

  return (await response.json()) as FetchData<number>;
};

const updateItem = async (id: number, form: HTMLFormElement) => {
  const url = `https://music42.com/endpoints/garage/items/${id}&hash_id=${getHashID()}`;
  const fd = new FormData(form);
  fd.append('id', id.toString());

  const response = await fetch(url, {
    method: 'POST',
    body: fd,
  });

  return (await response.json()) as FetchData<GarageItemData>;
};

const joinGarage = async (id: number) => {
  const url = `https://music42.com/endpoints/garage/join/${id}&hash_id=${getHashID()}`;

  const response = await fetch(url, {
    method: 'POST',
  });

  return (await response.json()) as FetchData<GarageJoinData>;
};

const fetchJoinGarage = async (id: number) => {
  const url = `https://music42.com/endpoints/garage/join/${id}&hash_id=${getHashID()}`;

  const response = await fetch(url);

  return (await response.json()) as FetchData<GarageJoinData | null>;
};

const confirm = async (id: number) => {
  const url = `https://music42.com/endpoints/garage/consideration/${id}&hash_id=${getHashID()}`;
  const fd = new FormData();
  fd.append('value', 'true');

  const response = await fetch(url, { method: 'POST', body: fd });

  return (await response.json()) as FetchData;
};

const reject = async (id: number) => {
  const url = `https://music42.com/endpoints/garage/consideration/${id}&hash_id=${getHashID()}`;
  const fd = new FormData();
  fd.append('value', 'false');

  const response = await fetch(url, { method: 'POST', body: fd });

  return (await response.json()) as FetchData;
};

export {
  fetchGarageItems,
  fetchGarageItem,
  postGarageItem,
  deleteItem,
  updateItem,
  joinGarage,
  fetchJoinGarage,
  confirm,
  reject,
};
