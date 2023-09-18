import { getHashID } from '../../utils/getHashID';

const fetchTickets = (ids: number[]) => {
  const queryParams = ids.reduce(
    (acc, id) => `${acc}&purchaes_ids[]=${id}`,
    ''
  );

  return fetch(
    'https://music42.com/endpoints/ticket/download?hash_id=' +
      getHashID() +
      queryParams
  )
    .then((res) => res.json())
    .then((data) => data)
    .catch(function (error) {
      console.error('Error:', error);
    });
};

export { fetchTickets };
