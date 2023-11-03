/* eslint-disable */
const fetchIntercept = require('fetch-intercept');
const fetchRetry = require('fetch-retry');

const testKeys = ['url', 'bearer', 'method'];

onmessage = function (e) {
  const data = e.data[0];

  fetchIntercept.register({
    request(url, config) {
      if (!config.headers.Authorization && !config.headers.authorization) {
        postMessage({
          status: 400,
          message: 'Missing authorization token',
          callbackData: data.callbackData,
        });
      }
      return [url, config];
    },

    requestError(error) {
      postMessage({
        status: 400,
        message: error,
        callbackData: data.callbackData,
      });
      return Promise.reject(error);
    },

    response(response) {
      return response;
    },

    responseError(error) {
      return Promise.reject(error);
    },
  });

  fetch = fetchRetry(fetch);

  for (let i = 0; i < testKeys.length; i++) {
    if (!(testKeys[i] in data)) {
      postMessage({
        status: 400,
        message: `Malformed worker request, missing key ${testKeys[i]}`,
        callbackData: data.callbackData,
      });
    }
  }
  let payload = {
    method: data.method,
    withCredentials: true,
    credentials: 'include',
    headers: {
      'accept-encoding': 'gzip, deflate, br',
      accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: data.tokenBearer ? `Bearer ${data.bearer}` : data.bearer,
      org_id: data.org_id || null,
    },
    referrerPolicy: 'no-referrer-when-downgrade',
    redirect: 'follow',
  };

  if (data.method.toUpperCase() !== 'GET' && data.hasOwnProperty('body')) {
    payload.body = data.body;
  }

  if ('headers' in data)
    payload.headers = { ...payload.headers, ...data.headers };
  if ('additionalPayload' in data)
    payload = { ...payload, ...data.additionalPayload };

  fetch(data.url, payload)
    .then(res => {
      return res.json();
    })
    .then(res => {
      postMessage({
        res: JSON.stringify(res),
        callbackData: data.callbackData,
      });
    })
    .catch(err => {
      postMessage({
        status: 400,
        error: err,
        callbackData: data.callbackData,
      });
    });
};
