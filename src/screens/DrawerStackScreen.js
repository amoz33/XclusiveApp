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


const DrawerStackScreen = () => {

    const navigation = useNavigation()

    return(

      <Drawer.Navigator 
        screenOptions={{ headerShown: true }}
        initialRouteName="Home"
        drawerContent={props => <DrawerContent {...props} />}
      >

        <Drawer.Screen name="Home" component={Home} />
        {/*<Drawer.Screen name="Profile" component={Profile} />*/}
        <Drawer.Screen name="Hairstyles" component={Hairstyles} />
        <Drawer.Screen name="HairstylesList" 
                       component={HairstylesList} 

                       options={{
                                 title: 'Hairstyles List',
                                 headerRight: () => (
                                   <Button
                                     onPress={() => navigation.navigate('Hairstyles')}
                                     title="Go Back"
                                     color="#070622"
                                   />
                                 ),
                               }}

                       />
        <Drawer.Screen name="Dresses" component={Dresses} />
        <Drawer.Screen name="DressesList" 
                       component={DressesList} 

                       options={{
                                 title: 'Dresses List',
                                 headerRight: () => (
                                   <Button
                                     onPress={() => navigation.navigate('Dresses')}
                                     title="Go Back"
                                     color="#070622"
                                   />
                                 ),
                               }}

                       />
        <Drawer.Screen name="Nails" component={Nails} />
        <Drawer.Screen name="ShowImage" 
                       component={ShowImage} 

                       options={{
                                 title: 'Save Image',
                                 headerRight: () => (
                                   <Button
                                     // onPress={() => navigation.goBack() }
                                     onPress={() => navigation.navigate('Home')}
                                     title="Go Back"
                                     color="#070622"
                                   />
                                 ),
                               }}

                       />
      </Drawer.Navigator>

    );

};
    
// );


export default DrawerStackScreen;