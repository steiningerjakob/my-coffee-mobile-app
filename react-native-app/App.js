import 'react-native-gesture-handler';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import React, {
  createContext,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Router from './routes/Router';

export const userContext = createContext(null);

export default function App() {
  const [id, setId] = useState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setLoading] = useState(true);

  const refreshUserContext =
    // useCallback: Prevent this function from getting
    // a different reference on every rerender -
    // clearCookie with default value of false,
    // becomes true upon logout function call
    useCallback(async (clearCookie = false) => {
      const { manifest } = Constants;

      const apiBaseUrlDraft =
        typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
          ? manifest.debuggerHost.split(`:`).shift().concat(`:3000/api`)
          : `jakobs-mobile-coffee-app.herokuapp.com`;

      const apiBaseUrl = `http:${apiBaseUrlDraft}`;

      // if clearCookie is true, set cookie value to empty
      const options = clearCookie
        ? {
            headers: {
              cookie: '',
            },
          }
        : {};

      // Call the API ("GET") to retrieve the user information
      // by automatically passing along the sessionToken cookie
      const response = await fetch(`${apiBaseUrl}/users/profile`, options);
      const json = await response.json();

      if (!json.user) {
        setLoading(false);
        return;
      }
      // if cookie is cleared, also set state to empty
      else if (clearCookie) {
        setId();
        setFirstName('');
        setLastName('');
        setEmail('');
        setLoading(false);
      }
      // otherwise set user details to info from API call
      else {
        setId(json.user.id);
        setFirstName(json.user.firstName);
        setLastName(json.user.lastName);
        setEmail(json.user.email);
        setLoading(false);
      }
    }, []);

  // Retrieve user when this function is called
  useEffect(() => {
    refreshUserContext();
    setLoading(false);
  }, []);

  const userContextValue = {
    id: id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    isLoading: isLoading,
    refreshUserContext: refreshUserContext,
  };

  return (
    <Fragment>
      <StatusBar style="light" />
      <userContext.Provider value={userContextValue}>
        <Router />
      </userContext.Provider>
    </Fragment>
  );
}
