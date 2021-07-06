import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {
  createContext,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Router from './routes/Router';
import { getUserProfile } from './util/apiFunctions';

export const userContext = createContext(null);

export default function App() {
  const [id, setId] = useState();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const refreshUserContext =
    // useCallback: Prevent this function from getting
    // a different reference on every rerender -
    // clearCookie with default value of false,
    // becomes true upon logout function call
    useCallback(async (clearCookie = false) => {
      if (clearCookie) {
        setId();
        setFirstName('');
        setLastName('');
        setEmail('');
        setProfileImage('');
        return;
      }

      const json = await getUserProfile(clearCookie);

      json.user && setId(json.user.id);
      setFirstName(json.user.firstName);
      setLastName(json.user.lastName);
      setEmail(json.user.email);
      setProfileImage(json.user.profileImage);
    }, []);

  // Retrieve user when this function is called
  useEffect(() => {
    refreshUserContext();
  }, [refreshUserContext]);

  const userContextValue = {
    id: id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    profileImage: profileImage,
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
