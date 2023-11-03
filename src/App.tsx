import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { routes } from './app/routes';

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
      {routes.map((route) => (
        <Route path={route.path} element={<>{route.element}</>} />
      ))}
    </Routes>
  );
}

export default App;
