import Constants from 'expo-constants';

export async function logoutUser() {
  const { manifest } = Constants;

  // TODO: adjust to api.example.com to Heroku url for deployment
  const apiBaseUrlDraft =
    typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
      ? manifest.debuggerHost.split(`:`).shift().concat(`:3000/api`)
      : `jakobs-mobile-coffee-app.herokuapp.com`;

  const apiBaseUrl =
    apiBaseUrlDraft === `jakobs-mobile-coffee-app.herokuapp.com`
      ? `https:${apiBaseUrlDraft}`
      : `http:${apiBaseUrlDraft}`;

  await fetch(`${apiBaseUrl}/logout`);
}
