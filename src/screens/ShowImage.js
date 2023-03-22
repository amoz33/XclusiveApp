import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

import * as React from 'react';

import { CommonActions, useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';

const ShowImage = () => {

  const navigation = useNavigation()

    return (
      <View style={styles.container}>
        <Text style={styles.appcolor}>XclusiveStylesApp</Text>
        <Text style={styles.appcolor2}>This is the ShowImage Page for users</Text>
        <Button
            title="Go to Home Page"
            onPress={() => navigation.navigate('Homepage')}
        />
        <StatusBar style="auto" />
      </View>
    );

};


export default ShowImage;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1437',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appcolor: {
    color: '#fff',
    fontSize: 20,
  },
  appcolor2: {
    color: '#fff',
    fontSize: 15,
  },

});