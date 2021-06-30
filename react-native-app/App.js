import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import React, {
  createContext,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from 'react';
// import Router from './routes/Router';
import Detail from './screens/Detail';
import Favourites from './screens/Favourites';
import Home from './screens/Home';
import List from './screens/List';
import Preferences from './screens/Preferences';
import Profile from './screens/Profile';
import Setup from './screens/Setup';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Splash from './screens/Splash';

const Stack = createStackNavigator();

export const userContext = createContext(null);

export default function App() {
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
      console.log('i am the useCallback');
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

      if ('errors' in json) {
        // error handling to be added here if necessary
        return;
      }
      // if cookie is cleared, also set state to empty
      else if (clearCookie) {
        setFirstName('');
        setLastName('');
        setEmail('');
        setLoading(false);
      }
      // otherwise set user details to info from API call
      else {
        setFirstName(json.user.firstName);
        setLastName(json.user.lastName);
        setEmail(json.user.email);
        setLoading(false);
      }
    }, []);

  // Retrieve user when this function is called
  useEffect(() => {
    console.log('i am the useEffect');
    refreshUserContext();
  }, [refreshUserContext]);

  const userContextValue = {
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
        {/* <Router /> */}
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Preferences" component={Preferences} />
            <Stack.Screen name="Setup" component={Setup} />
            <Stack.Screen name="Favourites" component={Favourites} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="List" component={List} />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </Stack.Navigator>
        </NavigationContainer>
      </userContext.Provider>
    </Fragment>
  );
}
