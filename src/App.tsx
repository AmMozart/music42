import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import CalendarEmployment from './features/calendarEmployment/CalendarEmployment';
import Podcasts from './features/podcasts/Podcasts';
import BuyTicket from './features/ticketBuy/TicketBuy';
import TicketDownload from './features/ticketDownload/TicketDownload';
import Ticket from './features/ticketVerify/TicketVerify';
import Profile from './pages/Profile';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const observeUrlChange = () => {
      let prevPath = document.location.pathname;
      const body = document.querySelector('body');

      const observer = new MutationObserver(() => {
        if (prevPath !== document.location.pathname) {
          prevPath = document.location.pathname;
          navigate(prevPath);
        }
      });

      if (body) {
        observer.observe(body, { childList: true, subtree: true });
      }
    };
    window.addEventListener('load', observeUrlChange);

    return () => {
      window.removeEventListener('load', observeUrlChange);
    };
  }, [navigate]);

  return (
    <Routes>
      <Route path='/' element={<></>} />
      <Route path='podcasts' element={<Podcasts />} />
      <Route path='calendar/*' element={<CalendarEmployment />} />
      <Route path='ticket/verify/:hashedTicketId' element={<Ticket />} />
      <Route path='ticket/buy/:eventId' element={<BuyTicket />} />
      <Route path='ticket/download' element={<TicketDownload />} />
      <Route path=':username/:option' element={<Profile />} />
    </Routes>
  );
}

export default App;
