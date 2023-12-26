import { FetchData, UserData } from '../../app/types';
import { getHashID } from '../../utils/getHashID';

const fetchUsers = async (beginString: string) => {
  const url = `https://music42.com/endpoints/users?beginString=${beginString}&hash_id=${getHashID()}`;

  return (await (await fetch(url)).json()) as FetchData;
};

const init = async (roomId: number) => {
  const url = `https://music42.com/endpoints/rooms/getInvitedUsers?roomId=${roomId}&hash_id=${getHashID()}`;

  return (await (await fetch(url)).json()) as FetchData<UserData[]>;
};

export { fetchUsers, init };
