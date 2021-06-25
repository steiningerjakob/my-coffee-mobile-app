export async function createUser() {
  const { manifest } = Constants;

  // TODO: adjust to api.example.com to Heroku url for deployment
  const apiBaseUrlDraft =
    typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
      ? manifest.debuggerHost.split(`:`).shift().concat(`:3000/api`)
      : `api.example.com`;

  const apiBaseUrl = `http:${apiBaseUrlDraft}`;
  const response = await fetch(`${apiBaseUrl}/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    }),
  });
}

export async function verifyUser() {
  const { manifest } = Constants;

  // TODO: adjust to api.example.com to Heroku url for deployment
  const apiBaseUrlDraft =
    typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
      ? manifest.debuggerHost.split(`:`).shift().concat(`:3000/api`)
      : `api.example.com`;

  const apiBaseUrl = `http:${apiBaseUrlDraft}`;

  const response = await fetch(`${apiBaseUrl}/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
}

export async function logoutUser() {
  const { manifest } = Constants;

  // TODO: adjust to api.example.com to Heroku url for deployment
  const apiBaseUrlDraft =
    typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
      ? manifest.debuggerHost.split(`:`).shift().concat(`:3000/api`)
      : `api.example.com`;

  const apiBaseUrl = `http:${apiBaseUrlDraft}`;

  await fetch(`${apiBaseUrl}/logout`);
}
