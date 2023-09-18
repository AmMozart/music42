import { getHashID } from '../../utils/getHashID';

const CONFIG_ENDPOINT_URL = 'https://music42.com/endpoints/get_config?';

const fetchConfig: () => Promise<any> = async () => {
  const response = await fetch(
    CONFIG_ENDPOINT_URL +
      new URLSearchParams({
        hash_id: getHashID(),
      }).toString()
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return null;
};

export { fetchConfig };
