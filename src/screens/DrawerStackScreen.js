import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';

// <-- import useNavigation hook
import { CommonActions, useNavigation } from '@react-navigation/native'

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Hairstyles from '../screens/Hairstyles';
import HairstylesList from '../screens/HairstylesList';
import Dresses from '../screens/Dresses';
import DressesList from '../screens/DressesList';
import Nails from '../screens/Nails';
import ShowImage from '../screens/ShowImage';

import { Button } from 'react-native';

import { DrawerContent } from '../screens/DrawerContent';

const Drawer = createDrawerNavigator();


const DrawerStackScreen = ({navigation}) => (

    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
        {/*<Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props }/>} >*/}
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="Hairstyles" component={Hairstyles} />
      <Drawer.Screen name="HairstylesList" 
                     component={HairstylesList} 
                     options={{ 
                        title: 'Hairstyles List' 
                     }}
                     />
      <Drawer.Screen name="Dresses" component={Dresses} />
      <Drawer.Screen name="DressesList" 
                     component={DressesList} 
                     options={{ title: 'Dresses List' }}
                     />
      <Drawer.Screen name="Nails" component={Nails} />
      <Drawer.Screen name="ShowImage" component={ShowImage}  options={{headerShown: false}}/>
    </Drawer.Navigator>
);


export default DrawerStackScreen;