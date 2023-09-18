import { TicketData } from './ticketVerifySlice';

import { getHashID } from '../../utils/getHashID';

const getTicketData: (ticketId: number) => Promise<TicketData | null> = async (
  ticketId
) => {
  const response = await fetch(
    'https://music42.com/endpoints/ticket?' +
      new URLSearchParams({
        ticketId: ticketId.toString(),
        hash_id: getHashID(),
      }).toString(),
    {
      method: 'GET',
    }
  );

  if (response.ok) {
    const fromServer = (await response.json()) as {
      status: number;
      message: string;
      data: TicketData;
    };
    return fromServer.data;
  }
  return null;
};

const verifyTicket: (ticketId: string) => Promise<{
  status: number;
  message: string;
} | null> = async (ticketId) => {
  const body = new FormData();
  body.append('ticketId', ticketId);

  const url = 'https://music42.com/endpoints/ticket?hash_id=' + getHashID();
  const options = {
    method: 'POST',
    body,
  };

  const response = await fetch(url, options);

  if (response.ok) {
    const data = (await response.json()) as {
      status: number;
      message: string;
    };
    return data;
  }
  return null;
};

export { getTicketData, verifyTicket };
