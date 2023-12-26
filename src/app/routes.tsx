import React from 'react';

import CalendarEmployment from '../features/calendarEmployment/CalendarEmployment';
import ConsiderationGarage from '../features/garage/ConsiderationGarage';
import CreateGarage from '../features/garage/CreateGarage';
import EditGarage from '../features/garage/EditGarage';
import Garage from '../features/garage/Garage';
import ViewGarage from '../features/garage/ViewGarage';
import Podcasts from '../features/podcasts/Podcasts';
import CreateRoom from '../features/rooms/CreateRoom';
import Room from '../features/rooms/Room';
import Rooms from '../features/rooms/Rooms';
import BuyTicket from '../features/ticketBuy/TicketBuy';
import TicketDownload from '../features/ticketDownload/TicketDownload';
import Ticket from '../features/ticketVerify/TicketVerify';
import Profile from '../pages/Profile';

const routes = [
  { path: '/', element: <></> },
  { path: 'garage', element: <Garage /> },
  { path: 'garage/create', element: <CreateGarage /> },
  { path: 'garage/edit/:id', element: <EditGarage /> },
  { path: 'garage/view/:id', element: <ViewGarage /> },
  { path: 'garage/consideration/:id', element: <ConsiderationGarage /> },
  { path: 'podcasts', element: <Podcasts /> },
  { path: 'calendar/*', element: <CalendarEmployment /> },
  { path: 'ticket/verify/:hashedTicketId', element: <Ticket /> },
  { path: 'ticket/buy/:eventId', element: <BuyTicket /> },
  { path: 'ticket/download', element: <TicketDownload /> },
  { path: ':username/:option', element: <Profile /> },
  { path: 'rooms', element: <Rooms /> },
  { path: 'rooms/:id', element: <Room /> },
  { path: 'rooms/create', element: <CreateRoom /> },
];

export { routes };
