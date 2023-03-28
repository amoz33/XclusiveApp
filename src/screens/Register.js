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
  

const Register = ({ navigation }) => {

  const { colors } = useTheme();

  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',

  });

  const setChanges = (myname) => {
    return (text) => {
      setData({ ...data, [myname]: text })
    }

  }

  const [isLoading, setIsLoading] = useState(false);

  const RegistrationLoading = () => {

    return (
      <View style={styles.loading}>
        <ActivityIndicator size='large' color={colors.backgColor} />
      </View >
    )

  }


  const userRegister = () => {

    setIsLoading(true);

    fetch('https://app.xclusiveafrikstyles.com/Auth/register_appUsers', {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        password: data.password,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {

        //if (responseJson == 'User Registered Successfully') {
        if (responseJson) {

          Alert.alert(
            'Alert',
            'User Registered Successfully',
            [

              {
                text: 'OK',
                onPress: () => navigation.navigate('Login'),
                style: 'cancel',
              },

            ],
            { cancelable: false },
          );
        } else {
          alert(responseJson);
        }
        setIsLoading(false);
      })

      .catch((error) => {
        console.error(error);
      });

  }


    return (

      <ImageBackground  style={styles.backgroundCountainer}>
             

        <SafeAreaView style={styles.container} behavior="padding">
          
            {isLoading ? <RegistrationLoading /> : (

             <ScrollView
                  style={{flex: 1}}
                  contentContainerStyle={styles.scrollview}
                >


              <View style = {styles.regform}>

                <View style= {styles.logo} >
                  <Image source={require('../images/xclusive_logo.png')} style = {{width:80, height:120}} />
                  <Text style = {styles.header2}>User Registration</Text>
                </View>
              
              <View style={styles.inputSection}>
                <Icon name='user' style={styles.styleIcon} />
                <TextInput 
                  style = {styles.textInput} 
                  placeholder = "First Name" 
                  placeholderTextColor = "#fff" 
                  underlineColorAndroid={'transparent'}
                  keyboardType="default"
                  onChangeText={setChanges('firstname')}
                />
              </View>

              <View style={styles.inputSection}>
                <Icon name='user' style={styles.styleIcon} />
                <TextInput 
                  style = {styles.textInput} 
                  placeholder = "Last Name" 
                  placeholderTextColor = "#fff" 
                  underlineColorAndroid={'transparent'}
                  keyboardType="default"
                  onChangeText={setChanges('lastname')}
                />
              </View>

              <View style={styles.inputSection}>
                <Icon name='phone' style={styles.styleIcon} />
                <TextInput 
                  style = {styles.textInput} 
                  placeholder = "Phone" 
                  placeholderTextColor = "#fff" 
                  underlineColorAndroid={'transparent'}
                  keyboardType="phone-pad"
                  onChangeText={setChanges('phone')}
                />
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
              
              <TouchableOpacity style = {styles.button} onPress={userRegister}>
                <Text style = {styles.btntext} >Register User</Text>
              </TouchableOpacity>

              <View style={styles.signupTextCont}>
                <Text style={styles.signupText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={styles.signupButton}>Login</Text></TouchableOpacity>
              </View>


              </View>

              </ScrollView>

              )}

              </SafeAreaView>
            </ImageBackground>
    );

}


export default Register;


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
    fontSize: 18,
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
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.4,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  }

});