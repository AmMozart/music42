import { FetchData, VideoData } from '../../app/types';
import { getHashID } from '../../utils/getHashID';

const fetchVideos = async (username: string) => {
  const url = `https://music42.com/endpoints/user/get-videos?username=${username}&hash_id=${getHashID()}`;
  const response = await fetch(url);

  return (await response.json()) as FetchData<VideoData[]>;
};

const addVideoLink = async (link: string) => {
  const url = `https://music42.com/endpoints/user/add-video-link?&hash_id=${getHashID()}`;
  const fd = new FormData();
  fd.append('link', link);
  fd.append('type', 'user_video');

  const response = await fetch(url, { method: 'POST', body: fd });

  return (await response.json()) as FetchData<VideoData>;
};

const deleteVideo = async (id: number) => {
  const url = `https://music42.com/endpoints/user/delete-video?id=${id}&hash_id=${getHashID()}`;
  const response = await fetch(url);

  return (await response.json()) as FetchData;
};

const loadMore = async (minId: number, username: string) => {
  const url = `https://music42.com/endpoints/load-more/videos?id=${minId}&username=${username}&hash_id=${getHashID()}`;
  const response = await fetch(url);

  return (await response.json()) as FetchData<VideoData>;
};

export { fetchVideos, deleteVideo, addVideoLink, loadMore };
