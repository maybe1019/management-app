import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './i18n';
import { createEnvAwareLogger } from '@secberus/utils';

global.connection =
  navigator.connection ||
  navigator.mozConnection ||
  navigator.webkitConnection ||
  0.5;

// Initialize react-axe/axe-core auditing to give us insight into our accessibility shortcomings
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 2000, {});
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

const logger = createEnvAwareLogger({ supressInProduction: false });

if (process.env.NODE_ENV === 'production') {
  logger.log(
    '%c This might not be what you are looking for!.',
    'background: green; color: white; display: block; font-size: 24px; padding:5vw;'
  );
  logger.log(
    'Every website comes with a developer console. We cannot disable it or turn it off.\nThis is of no risk to you or your data, unless you interact with it on your end.\nDo not copy paste or write code here that you do not understand!\nPasting code here could give someone else access to your Secberus account!'
  );
  logger.log(
    'If someone has asked you to use code here, it may be an attack called Self-XSS. \nLearn more at https://en.wikipedia.org/wiki/Self-XSS'
  );
} else {
  logger.log(
    '%c Development build. THANKS for playing!',
    'background: white; color: black; display: block; padding:5vw;font-size: 32px;'
  );
}

// XXX obataku: prevent old service workers from breaking things with unexpected caching
(async () => {
  if (navigator.serviceWorker) {
    for (const r of await navigator.serviceWorker.getRegistrations()) {
      r.unregister();
    }
  }
})();
