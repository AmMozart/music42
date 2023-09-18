import { FetchData, LangsData } from '../../app/types';
import { getHashID } from '../../utils/getHashID';

const LANGS_ENDPOINT_URL = 'https://music42.com/endpoints/get_langs?';

const fetchLangs: () => Promise<FetchData<LangsData>> = async () => {
  const response = await fetch(
    LANGS_ENDPOINT_URL +
      new URLSearchParams({
        hash_id: getHashID(),
      }).toString()
  );

  if (response.ok) {
    return await response.json();
  }
  return null;
};

export { fetchLangs };
