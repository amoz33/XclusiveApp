import React, { useReducer } from "react";
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

// <-- import useNavigation hook
import { CommonActions, useNavigation } from '@react-navigation/native'

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { 
    LOGIN_USER,
    LOGOUT_USER
 } from '../constants/actionTypes';

export function DrawerContent(props) {

    const paperTheme = useTheme();

    const navigation = useNavigation()


      const loginReducer = (prevState, action) => {
      switch (action.type) {

       
        case LOGIN_USER:

          return {
            ...prevState,
            userData: action.data,
            userToken: action.token,
            isLoading: false,
          };

        case LOGOUT_USER:
          return {
            ...prevState,
            userEmail: null,
            userToken: null,
            isLoading: false,
          };
        case REGISTER_USER:
          return {
            ...prevState,
            userEmail: action.id,
            userToken: action.token,
            isLoading: false,
          };

      }
    };


    const { dispatch } = React.useReducer(loginReducer);

    const signOut = async () => {
        try {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('userId');
          await AsyncStorage.removeItem('keyId')
        } catch (e) {
          console.log(e);
        }
        dispatch({ type: LOGOUT_USER });
    };

    //const { signOut, toggleTheme } = React.useContext(AuthContext);
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                source={require('../images/xclusive_logo.png')} 
                                size={50}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                                <Title style={styles.title}>Xclusive Styles</Title>
                                <Caption style={styles.caption}>@xclusive_styles</Caption>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>Menu</Paragraph>
                                {/*<Caption style={styles.caption}>Following</Caption>*/}
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="image" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Hairstyles"
                            onPress={() => {props.navigation.navigate('Hairstyles')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="image" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Dresses"
                            onPress={() => {props.navigation.navigate('Dresses')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="image" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Nails"
                            onPress={() => {props.navigation.navigate('Nails')}}
                        />
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <MaterialIcon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {navigation.navigate('Login')} }
                    // onPress={() => {signOut()}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });
