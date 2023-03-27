import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';

import { 
  StyleSheet, 
  ActivityIndicator, 
  FlatList, 
  Text, 
  View,
  Image,
  Modal,
  ImageViewer,
  TouchableOpacity,
  Button } from 'react-native';

import { CommonActions, useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';


const Nails = (props) => {

  const navigation = useNavigation()

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const imageUrl = 'https://app.xclusiveafrikstyles.com/uploads/nails/';

  const getNailsImages = async () => {
    try {
      const response = await fetch('https://app.xclusiveafrikstyles.com/Auth/nails_images');
      const json = await response.json();
      setData(json.nails_images);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNailsImages();
  }, []);


   return isLoading ? (
    <ActivityIndicator />
  ) : (
    <>
      {data ? (
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <>

              <View style={styles.container}>
                <View style={styles.card}>
                  <View style={styles.cardHeader}>
                      <View style={styles.headerLeft}>
                        <Image
                         style={styles.userImage}
                         source={{
                           uri: imageUrl+item.image_url
                         }}
                        />
                        <Text style={styles.userName}>Fingernails Styles</Text>
                      </View>
                      <View style={styles.headerRight}>
                        <Icon name="image" style={styles.moreIcon} />
                      </View>
                  </View>
                  <TouchableOpacity 
                    // onPress={() => {
                    //  Navigate to the HairstylesList Screen route with params 
                    //   navigation.navigate('ShowImage');
                    // }}

                    onPress={() => {props.navigation.navigate('ShowImage',
                      {
                        uri: imageUrl+item.image_url
                      })}}
                  >
                    <Image
                     style={styles.feedImage}
                     source={{
                        uri: imageUrl+item.image_url
                     }}
                    />
                  </TouchableOpacity>

                  <View style={styles.cardFooter}>
                    <View style={styles.footerLeft}>
                        <Text style={styles.imageCount}> View Full Image</Text>
                    </View>
                  </View>
                </View>
              </View>
            </>
          )}
        />
      ) : null}
    </>
  );

};


export default Nails;


const styles = StyleSheet.create({

  container:{
   flex:1,
   backgroundColor:'#ddd',
  },
  card:{
   backgroundColor:'#fff',
   padding:10,
   margin: 10,
   borderRadius: 10
  },
  cardHeader:{
   flexDirection: 'row',
   justifyContent: 'space-between',
  },
  headerLeft:{
   flexDirection: 'row',
  },
  userImage:{
   width: 50,
   height: 50,
   borderRadius: 50/2,
  },
  userName:{
   fontWeight: 'bold',
   marginLeft: 10,
   marginTop:15,
  },
  moreIcon:{
   fontSize: 20,
   color: '#ddd',
   marginTop:15
  },
  feedImage:{
   width:300,
   height:300,
   borderRadius: 10,
   marginVertical:10,
   resizeMode: 'contain',
  },
  cardFooter:{
   flexDirection: 'row',
   justifyContent: 'space-between',
  },
  footerLeft:{
   flexDirection: 'row',
  },
  imageCount:{
   fontWeight: 'bold',
   marginLeft: 10,
   marginTop:5,
  },

});