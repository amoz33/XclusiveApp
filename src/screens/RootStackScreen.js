import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login';
import Register from '../screens/Register';

import AppStackScreen from '../screens/DrawerStackScreen';

const RootStack = createNativeStackNavigator();



const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="Login" component={Login} />
        <RootStack.Screen name="Register" component={Register}/>
        <RootStack.Screen name="AppStackScreen" component={AppStackScreen} options={{ headerShown: false }}/>
    </RootStack.Navigator>
);

export default RootStackScreen;