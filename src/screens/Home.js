import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';

import { 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  View,
  Text, 
  TouchableOpacity,
  Button
} from 'react-native';

import { CommonActions, useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';

import HomeHairstyles  from '../components/hairstyles';
import HomeDresses  from '../components/dresses';
import HomeNails  from '../components/nails';


const Home = () => {

  const navigation = useNavigation()

      return (

        <SafeAreaView style={styles.container} behavior="padding">

            <View style={styles.container}>

              <ScrollView
                  style={{flex: 1}}
                  contentContainerStyle={styles.scrollview}
                >
                
              <View style={styles.homelist}>


                <View style={styles.cardHeader}>
                  <View style={styles.headerLeft}>
                    <Text style={styles.username}>Latest Hairstyles</Text>
                  </View>
                  <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.catbutton} onPress={() => navigation.navigate('Hairstyles')}>
                        <Text style={styles.catbutton2}>View More</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <HomeHairstyles/>
                </View>

              </View>

              <View style={styles.homelist}>

                <View style={styles.cardHeader}>
                  <View style={styles.headerLeft}>
                    <Text style={styles.username}>Latest Dresses</Text>
                  </View>
                  <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.catbutton} onPress={() => navigation.navigate('Dresses')}>
                        <Text style={styles.catbutton2}>View More</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <HomeDresses/>
                </View>

                
              </View>

              <View style={styles.homelist}>

                <View style={styles.cardHeader}>
                  <View style={styles.headerLeft}>
                    <Text style={styles.username}>Latest Nails Styles</Text>
                  </View>
                  <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.catbutton} onPress={() => navigation.navigate('Nails')}>
                        <Text style={styles.catbutton2}>View More</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View>
                  <HomeNails/>
                </View>
              </View>

              </ScrollView>

            </View>

        </SafeAreaView>

      );

};


export default Home;


const styles = StyleSheet.create({

  container:{
   flex:1,
   backgroundColor:'#ddd',
  },
  homelist:{
   marginBottom: 10,
  },
  cardHeader:{
   flexDirection: 'row',
   justifyContent: 'space-between',
   padding:10,
   margin: 5,
  },
  headerLeft:{
   flexDirection: 'row',
  },
  catbutton:{
    padding:8,
    backgroundColor:'red',
    borderRadius: 5,
  },
  catbutton2:{
    fontWeight: 'bold',
    fontSize: 12,
    color:'white',
  },
  username:{
   fontWeight: 'bold',
   fontSize:20,
   marginLeft: 10,
  },

});