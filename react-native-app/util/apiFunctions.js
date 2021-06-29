import Constants from 'expo-constants';

export async function logoutUser() {
  const { manifest } = Constants;

  const apiBaseUrlDraft =
    typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
      ? manifest.debuggerHost.split(`:`).shift().concat(`:3000/api`)
      : `jakobs-mobile-coffee-app.herokuapp.com`;

  const apiBaseUrl =
    apiBaseUrlDraft === `jakobs-mobile-coffee-app.herokuapp.com`
      ? `https:${apiBaseUrlDraft}`
      : `http:${apiBaseUrlDraft}`;

  await fetch(`${apiBaseUrl}/logout`);
  console.log('apiBaseUrl', apiBaseUrl);
}
