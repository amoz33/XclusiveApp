import 'react-native-gesture-handler';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, ActivityIndicator } from 'react-native';
import { LogBox } from 'react-native';

import React, { useEffect, useState } from 'react';
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
import useDataLayer from "./src/context/Provider";
import { navigationRef } from "./src/routing/RootNavigation";
import { LOGIN_FAIL, LOGIN_USER } from "./src/constants/actionTypes";

//LogBox.ignoreLogs(['Setting a timer'])
LogBox.ignoreLogs(['Warning: Async Storage has been extracted from react-native core']);
LogBox.ignoreLogs(['Warning: React.jsx: type is invalid -- expected a string']);
LogBox.ignoreLogs(['Error: VirtualizedLists should never be nested inside plain ScrollViews']);


const App = () => {

  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

 
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


 const { loginState, dispatch } = useDataLayer()

  const clearAsyn = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('userToken');
      return true;
    }
    catch (e) {
      return false;
    }
  }

  const authLogin = async () => {
    let userToken = null, userid = '', userData = [];

    try {
      userToken = await AsyncStorage.getItem('userToken');
      userid = await AsyncStorage.getItem('userId');

    } catch (e) {
      console.log(e);
    }


    //fetch user data if asyndata is not null
    if (userToken !== null) {
      fetch("https://app.xclusiveafrikstyles.com/Auth/get_appUser", {
        method: "post",
        header: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id: userid,
        }),
      })
        .then((response) => response.json())
        .then((responseJson) => {

          userData = responseJson;

          if (responseJson == "Wrong Login Details, Please Try Again") {
            //clearAsyn()

            alert("Wrong Login Details, Please Try Again");
          } else if (responseJson == "try again") {
            dispatch({ type: LOGIN_FAIL });
          } else {
            //alert("Successfully Login");
            //console.log('User Data after login with AsynStorage', userData);
            dispatch({ type: LOGIN_USER, data: userData, token: userToken });
            // console.log('keyId:', keyId)
          }
        })
        .catch((error) => {
          console.error(error);
        });


    } else {
      dispatch({ type: LOGIN_FAIL });
    }

  }

  React.useEffect(() => {
    authLogin()
    //setTimeout(, 1000);
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
        <NavigationContainer theme={theme}>
          { loginState.userToken !== null ? (
              <DrawerStackScreen/>
            )
          :
              <RootStackScreen/>
          }
        </NavigationContainer>
    </PaperProvider>
  );

};

export default App;
