import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { LogBox } from 'react-native';

import React, { useEffect } from 'react';
//import * as React from 'react';

import { 
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme

} from '@react-navigation/native';

import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';

//Login and Registration Pages
import RootStackScreen from './src/screens/RootStackScreen';

//Main App Screens (Home, Profile, Hairstyles, Dresses and Nails Screens)
import DrawerStackScreen from './src/screens/DrawerStackScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
//import {AsyncStorage} from 'react-native';

const AuthContext = React.createContext();

//LogBox.ignoreLogs(['Setting a timer'])
LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);
LogBox.ignoreLogs(['Warning: React.jsx: type is invalid -- expected a string']);

const App = () => {

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const initialLoginState = {
    isLoading: true,
    email: null,
    password: null,
  };

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      //...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;


  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_PASSWORD': 
        return {
          ...prevState,
          password: action.password,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          email: action.email,
          password: action.password,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          email: null,
          password: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          email: action.email,
          password: action.password,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      // setUserToken('fgkj');
      // setIsLoading(false);
      const password = String(foundUser[0].password);
      const email = foundUser[0].email;
      
      try {
        await AsyncStorage.setItem('password', password);
      } catch(e) {
        console.log(e);
      }
      // console.log('user password: ', password);
      dispatch({ type: 'LOGIN', email: email, password: password });
    },
    signOut: async() => {
      // setUserToken(null);
      // setIsLoading(false);
      try {
        await AsyncStorage.removeItem('password');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      // setIsLoading(false);
      let password;
      password = null;
      try {
        password = await AsyncStorage.getItem('password');
      } catch(e) {
        console.log(e);
      }
      // console.log('user password: ', password);
      dispatch({ type: 'RETRIEVE_PASSWORD', password: password });
    }, 1000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size="large"/>
      </View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer theme={theme}>
          { loginState.isLoading !== null ? (
              <DrawerStackScreen/>
            )
          :
              <RootStackScreen/>
          }
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );

};

export default App;
