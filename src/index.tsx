import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import App from './App';
import { store } from './app/store';
import { device } from './device';
import Config from './features/config/Config';
import Langs from './features/langs/Langs';
import User from './features/user/User';

const GlobalStyle = createGlobalStyle`
/* @import 'taildindcss/base';
@import 'taildindcss/components';
@import 'taildindcss/utilities'; */

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  margin: 0;
  appearance: none;
}

#container-content-root {
  display: flex;
  align-items: center;
  justify-content: center;

  width: calc(100% - 70px);
  margin-left: 70px;

  transition: width 0.2s ease-in, margin-left 0.2s ease-in;
}

:root {
  --white: #FFF;
}

@media (width >= 1190px) {
  body.side_open #container-content-root {
    width: calc(100% - 280px);
    margin-left: 280px;
  }
}

@media (width >= 1190px) {
  #container-content-root {
    margin-left: 70px;
  }
}

@media ${device.laptop} {
  #container-content-root {
    width: 100%;
    margin-left: 0;
  }
}`;

const container = document.getElementById(
  'container-content-root'
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
