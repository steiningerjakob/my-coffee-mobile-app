import Constants from 'expo-constants';

const { manifest } = Constants;

const apiBaseUrlDraft =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? manifest.debuggerHost.split(`:`).shift().concat(`:3000/api`)
    : `jakobs-mobile-coffee-app.herokuapp.com/api`;

export const apiBaseUrl =
  apiBaseUrlDraft === `jakobs-mobile-coffee-app.herokuapp.com`
    ? `https:${apiBaseUrlDraft}`
    : `http:${apiBaseUrlDraft}`;

// export const apiBaseUrl = 'https://jakobs-mobile-coffee-app.herokuapp.com/api';
