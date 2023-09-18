import { FetchData, VideoData } from '../../app/types';
import { getHashID } from '../../utils/getHashID';

const fetchPodcasts = async () => {
  const url = `https://music42.com/endpoints/user/get-videos?&hash_id=${getHashID()}`;
  const response = await fetch(url);

  return (await response.json()) as FetchData<VideoData[]>;
};

const deleteVideo = async (id: number) => {
  const url = `https://music42.com/endpoints/user/delete-video?id=${id}&hash_id=${getHashID()}`;
  const response = await fetch(url);

  return (await response.json()) as FetchData;
};

const addVideoLink = async (link: string, title: string) => {
  const url = `https://music42.com/endpoints/user/add-video-link?&hash_id=${getHashID()}`;
  const fd = new FormData();
  fd.append('link', link);
  fd.append('title', title);
  fd.append('type', 'podcast');

  const response = await fetch(url, { method: 'POST', body: fd });

  return (await response.json()) as FetchData<VideoData>;
};

export { fetchPodcasts, deleteVideo, addVideoLink };
