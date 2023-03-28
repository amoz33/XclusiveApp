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

//import { AuthContext } from '../components/context';


// const Login = ({ navigation }) => {
const Login = () => {

  const { colors } = useTheme();

  const navigation = useNavigation()

  // const [data, setData] = useState({
  //   email: '',
  //   password: '',

  // });

  const [data, setData] = React.useState({
        email: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
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


  const textInputChange = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if( val.trim().length >= 4 ) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }


  const userLogin = () => {

    setIsLoading(true);

    fetch('https://app.xclusiveafrikstyles.com/Auth/login_appUsers', {
      method: 'post',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {

        if (responseJson == 'User Logged in Successfully') {

          Alert.alert(
            'Alert',
            'User Logged in Successfully',
            [

              {
                text: 'OK',
                //onPress: () => {loginHandle( data.email, data.password ) },
                //onPress: () => navigation.navigate('Home'),
                onPress: () => navigation.navigate('AppStackScreen'), 
                style: 'cancel',
              },

            ],
            { cancelable: false },
          );
        } else {
          //alert(responseJson);
          Alert.alert(
            'Alert',
            'Invalid Login Details',
            [

              {
                text: 'OK',
                onPress: () => navigation.navigate('Login'),
                style: 'cancel',
              },

            ],
            { cancelable: false },
          );
        }
        setIsLoading(false);
      })

      .catch((error) => {
        console.error(error);
      });

  }

  const AuthContext = React.createContext();
  const   signIn   = React.useContext(AuthContext);

  const loginHandle = (email, password) => {

    const foundUser = ( item => {
        return email == item.email && password == item.password;
    } );

    if ( data.email.length == 0 || data.password.length == 0 ) {
        Alert.alert('Wrong Input!', 'Email or password field cannot be empty.', [
            {text: 'Okay'}
        ]);
        return;
    }

    if ( foundUser.length == 0 ) {
        Alert.alert('Invalid User!', 'Email or password is incorrect.', [
            {text: 'Okay'}
        ]);
        return;
    }
    signIn(foundUser);
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
         
        <TouchableOpacity style = {styles.button} onPress={userLogin}>
        {/*<TouchableOpacity style = {styles.button} onPress={() => signIn({ email, password })}>*/}
          <Text style = {styles.btntext} >Login</Text>
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