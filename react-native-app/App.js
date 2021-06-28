import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
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

export default function App() {
  const [firstName, setFirstName] = useState('');
  console.log('App.js firstName', firstName);

  // TODO: pass this as a prop to other components / screens

  const refreshFirstName =
    // useCallback: Prevent this function from getting
    // a different reference on every rerender
    useCallback(async () => {
      console.log('i am the useCallback');
      const { manifest } = Constants;

      // TODO: adjust to api.example.com to Heroku url for deployment
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
        //
      } else {
        setFirstName(json.user.firstName);
      }
    }, []);

  // Retrieve user first name information ONCE the first time
  // that a user loads the page
  useEffect(() => {
    console.log('i am the useEffect');
    refreshFirstName();
  }, [refreshFirstName]);

  // WIP: Conditional routing based on login state:

  // const [isLoading, setIsLoading] = useState(true);
  // const [isSignedIn, setIsSignedIn] = useState(false);

  // // ping the logout API - cookie gets sent automatically
  // async function validateSession() {
  //   const { manifest } = Constants;

  //   // TODO: adjust to api.example.com to Heroku url for deployment
  //   const apiBaseUrlDraft =
  //     typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
  //       ? manifest.debuggerHost.split(`:`).shift().concat(`:3000/api`)
  //       : `api.example.com`;

  //   const apiBaseUrl = `http:${apiBaseUrlDraft}`;

  //   await fetch(`${apiBaseUrl}/session_validation`);
  // }

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     const response = JSON.stringify(validateSession());
  //     console.log(response);
  //     const sessionStatus = response.hasValidSession;
  //     console.log(sessionStatus);
  //     setIsSignedIn(sessionStatus);
  //   }, 1500);
  // });

  // if (isLoading) {
  //   return (
  //     <NavigationContainer>
  //       <Stack.Screen name="Splash" component={Splash} />;
  //     </NavigationContainer>
  //   );
  // }

  return (
    <Fragment>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Splash" component={Splash} />
          {/* {firstName !== '' ? (
            <> */}
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Preferences" component={Preferences} />
          <Stack.Screen name="Setup" component={Setup} />
          <Stack.Screen name="Favourites" component={Favourites} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="List" component={List} />
          <Stack.Screen name="Detail" component={Detail} />
          {/* </> */}
          {/* // ) : (
            // <> */}
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          {/* </> */}
          {/* // )} */}
        </Stack.Navigator>
      </NavigationContainer>
    </Fragment>
  );
}
