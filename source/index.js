import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from './App/App';

const AppRender = () => {
  render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('root')
  );
};

/* eslint no-process-env: "off" */
// Wait 0.6 seconds before mounting React in development,
// to allow vs code debugger to connect
console.dir(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  setTimeout(AppRender, 600);
} else {
  AppRender();
}

if (module.hot) {
  module.hot.accept('./App/App', () => {
    const NextApp = require('./App/App').default;
    render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      document.getElementById('root'));
  });
}
