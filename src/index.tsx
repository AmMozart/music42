import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import App from './App';
import { store } from './app/store';
import Config from './features/config/Config';
import Langs from './features/langs/Langs';
import User from './features/user/User';

const GlobalStyle = createGlobalStyle`
/* @import 'taildindcss/base';
@import 'taildindcss/components';
@import 'taildindcss/utilities'; */
:root {
  --white: #FFF;
}`;

const container = document.getElementById(
  'container_content_root'
) as HTMLElement;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <GlobalStyle />
        <CookiesProvider>
          <App />
        </CookiesProvider>
        <Config />
        <Langs />
        <User />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
