import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

//import * as React from 'react';
import React, { useState } from "react";

import { ActivityIndicator, useTheme } from 'react-native-paper';

// <-- import useNavigation hook
import { CommonActions, useNavigation } from '@react-navigation/native'

import Icon from 'react-native-vector-icons/FontAwesome';

import {
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Alert,
  SafeAreaView
} from "react-native";


import AsyncStorage from '@react-native-async-storage/async-storage'
import useDataLayer from '../context/Provider';
import { GET_USER_EXPO_TOKEN, LOGIN_USER } from '../constants/actionTypes';
import login from '../context/action/auth/login';


const Login = () => {

  const navigation = useNavigation()

  const { dispatch } = useDataLayer();

  const { colors } = useTheme();

  const [data, setData] = useState({
    userEmail: '',
    userPassword: '',
  });

  const saveAsyncData = async (userToken, userId, keyId) => {
    try {
      await AsyncStorage.setItem('userToken', userToken);
      await AsyncStorage.setItem('userId', userId);
      await AsyncStorage.setItem('keyId', keyId);
      registerForPushNotificationsAsync(keyId).then((token) => {
        //update loginState with the token
        console.log('expo,', token)
        dispatch({ type: GET_USER_EXPO_TOKEN, token: token })
      }
      )

      //alert('Data successfully saved')
    } catch (e) {
      //alert('Failed to save the data to the storage')
    }
  }

  const textEmailChange = (val) => {
    setData({
      ...data,
      userEmail: val,
    });
  };
  //console.log('Email Changing', data.userEmail)

  const textPasswordChange = (val) => {
    setData({
      ...data,
      userPassword: val,
    });
  };


  const handleLogin = () => {
    login(data.userEmail, data.userPassword)(dispatch)
      (saveAsyncData)
  }


    return (

       <ImageBackground  style={styles.backgroundCountainer}>
       

       <SafeAreaView style={styles.container} behavior="padding">
       

       <ScrollView
            style={{flex: 1}}
            contentContainerStyle={styles.scrollview}
          >


        <View style = {styles.regform}>

          <View style= {styles.logo} >
            <Image source={require('../images/xclusive_logo.png')} style = {{width:150, height:200}} />
            <Text style = {styles.header2}>Login</Text>
          </View>
        
        <View style={styles.inputSection}>
          <Icon name='envelope' style={styles.styleIcon} />
          <TextInput 
            style = {styles.textInput} 
            placeholder = "Email" 
            placeholderTextColor = "#fff" 
            underlineColorAndroid={'transparent'}
            keyboardType="email-address"
            onChangeText={setChanges('email')}
          />
        </View>

        <View style={styles.inputSection}>
          <Icon name='lock' style={styles.styleIcon} />
          <TextInput 
            style = {styles.textInput} 
            placeholder = "Password" 
            placeholderTextColor = "#fff" 
            secureTextEntry={true} 
            underlineColorAndroid={'transparent'}
            keyboardType="default"
            onChangeText={setChanges('password')}
          />
        </View>
        
        <TouchableOpacity style = {styles.button} onPress={handleLogin}>
          <Text style = {styles.btntext} >Continue</Text>
        </TouchableOpacity>

        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text style={styles.signupButton}>Register</Text></TouchableOpacity>
        </View>


        </View>

        
        </ScrollView>
        </SafeAreaView>
      </ImageBackground>

    );

}


export default Login;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#54E3FA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
  flexDirection: 'column',
  marginTop: 10,
  paddingTop:10,
  alignItems: 'center',
  justifyContent: 'center',
  },
  header:{
    color:'white',
    fontSize:25,
    fontWeight:'bold',
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header2: {
    fontSize: 22,
    fontWeight:'bold',
    color: '#fff',
    paddingBottom: 10,
    marginBottom: 10,
    borderBottomColor: '#fff',
  },
  backgroundCountainer:{
    flex:1,
    width: null,
    height:null,
    backgroundColor: '#4441FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
   
  },
  signupText:{
    color:'#fff',
    fontSize:16
  },
  signupButton:{
    color:'#ffffff',
    fontSize:16,
    fontWeight:'500'
  },
   signupTextCont:{
    flexDirection:'row',
    flexGrow:1,
    marginVertical:10,
    justifyContent:'flex-end'
  },
  regform: {
    alignSelf:'stretch',
    padding: 30,
    width: '100%',
  },
  inputSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#fff',
    borderBottomWidth: 2,
    paddingTop:10,
    width: 300,
  },
  styleIcon: {
    padding: 10,
    color:'white',
    fontSize:18,
  },
  textInput: {
    flex: 1,
    padding: 10,
    color: 'white',
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#070647',
    marginTop: 40,
    borderRadius:50,
  },
  btntext: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize:20,
  },

});