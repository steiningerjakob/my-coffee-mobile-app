import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthData } from '../../common/types';

type AuthContextData = {
  authData?: AuthData;
  loading: boolean;
  refreshUserContext(): any;
  signOut(): void;
};

// Create the Auth Context with the data type specified
// and an empty object
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData>();

  // the AuthContext initializes with loading === true
  // until the data is fetched from Async Storage
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Every time the App is opened, this provider is
    // rendered and calls the loadStorage function.
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      // Try to get the data from Async Storage
      const authDataSerialized = await AsyncStorage.getItem('@AuthData');
      if (authDataSerialized) {
        // If there is data, it's converted into an Object and the state is updated.
        const _authData: AuthData = JSON.parse(authDataSerialized);
        setAuthData(_authData);
      }
    } catch (error) {
    } finally {
      // loading finished
      setLoading(false);
    }
  }

  async function refreshUserContext() {
    const { manifest } = Constants;

    const apiBaseUrlDraft =
      typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
        ? manifest.debuggerHost.split(`:`).shift().concat(`:3000/api`)
        : `api.example.com`;

    const apiBaseUrl = `http:${apiBaseUrlDraft}`;
    // Call the API ("GET") to retrieve the user information
    // by automatically passing along the sessionToken cookie
    const response = await fetch(`${apiBaseUrl}/profile`);
    const json = await response.json();

    if ('errors' in json) {
      // error handling to be added here if necessary
      return;
    } else if (!json.user) {
      // error handling to be added here if necessary
    } else {
      const _authData: AuthData = {
        firstName: json.user.firstName,
        lastName: json.user.lastName,
        email: json.user.email,
      };
      // Set the data in the context, so the App can be
      // notified and send the user to the AuthStack
      setAuthData(_authData);

      // Persist the data in the Async Storage
      // to be recovered in the next user session.
      AsyncStorage.setItem('@authData', JSON.stringify(_authData));
    }
  }

  const signOut = async () => {
    // Remove data from context, so the App can be notified
    // and send the user to the AuthStack
    setAuthData(undefined);

    // Remove the data from Async Storage so that it
    // does not get recovered in the next session.
    await AsyncStorage.removeItem('@authData');
  };

  return (
    // This component is used to encapsulate the whole App,
    // so all components have access to the Context
    <AuthContext.Provider
      value={{ authData, loading, refreshUserContext, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// A simple hook to facilitate the access to the AuthContext
// and permit components to subscribe to AuthContext updates
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };