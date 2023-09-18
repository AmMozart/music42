import { getHashID } from '../../utils/getHashID';

const buyPayPalTicket: (
  price: number,
  eventId: number,
  userId: number,
  countTickets: number
) => Promise<{
  status: number;
  url: string;
} | null> = async (price, eventId, userId, countTickets) => {
  const url = `https://music42.com/endpoints/get-paypal-url?price=${price}&eventId=${eventId}&userId=${userId}&countTickets=${countTickets}&hash_id=${getHashID()}`;
  const options = {
    method: 'GET',
  };

  const response = await fetch(url, options);

  if (response.ok) {
    const data = (await response.json()) as {
      status: number;
      url: string;
    };
    return data;
  }
  return null;
};

const buyStripeTicket = (args: {
  stripeKey: string;
  price: number;
  eventId: number;
  userId: number;
  countTickets: number;
}) => {
  const fd = new FormData();
  fd.append('eventId', args.eventId.toString());
  fd.append('userId', args.userId.toString());
  fd.append('countTickets', args.countTickets.toString());
  fd.append('description', 'Buy ticket');
  fd.append('price', args.price.toString());
  fd.append('payType', 'unregister_user');
  fd.append('trackID', '');
  fd.append('hash_id', getHashID());

  fetch('https://music42.com/endpoints/new-stripe-payment', {
    method: 'POST',
    body: fd,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (session) {
      const stripe = (window as any).Stripe(args.stripeKey);
      return stripe.redirectToCheckout({ sessionId: session.id });
    })
    .then(function (result) {
      if (result.error) {
        alert(result.error.message);
      }
    })
    .catch(function (error) {
      console.error('Error:', error);
    });
};

type EventDataJSON = {
  ticket_price: number;
  available_tickets: number;
};

const fetchEventData: (
  eventId: number
) => Promise<EventDataJSON | null> = async (eventId) => {
  const response = await fetch(
    'https://music42.com/endpoints/event?' +
      new URLSearchParams({
        eventId: eventId.toString(),
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
      data: EventDataJSON;
    };
    return fromServer.data;
  }
  return null;
};

export { buyPayPalTicket, buyStripeTicket, fetchEventData };
