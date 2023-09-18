import { FetchData, UserData } from '../../app/types';
import { getHashID } from '../../utils/getHashID';

const fetchUserData = async () => {
  const response = await fetch(
    `https://music42.com/endpoints/user/get-user-data?hash_id=${getHashID()}`
  );

  return (await response.json()) as FetchData<UserData>;
};

export { fetchUserData };
