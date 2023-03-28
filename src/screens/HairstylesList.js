import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';

import { 
  StyleSheet, 
  ActivityIndicator, 
  FlatList, 
  Text, 
  View,
  Image,
  TouchableOpacity,
  Button } from 'react-native';

import { CommonActions, useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';

const HairstylesList = ({ route, navigation }) => {

  // const navigation = useNavigation()

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const  { catID }  = route.params;

  const categoryList = async () => {
  
    //FETCH RESPONSE
    try {
      const response = await fetch('https://app.xclusiveafrikstyles.com/Auth/hairstyles_images?category_id='+catID);
      const json =  await response.json();
      // setData(console.log(json));
      setData(json.hairstyles_images);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    categoryList();
  }, []);

  const url = 'https://app.xclusiveafrikstyles.com/uploads/hairstyles/';

   return isLoading ? (
    <ActivityIndicator />
  ) : (
    <>
      {data ? (
        <FlatList
          numColumns={2}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <>

              <View style={styles.container}>
                <View style={styles.card}>

                  <TouchableOpacity 
                    onPress={() => {
                    /* 1. Navigate to the ShowImage Screen route with params */
                      navigation.navigate('ShowImage', {
                        uri: url+item.image_url,
                      });
                    }}
                  >
                    <Image
                     style={styles.feedImage}
                     source={{
                        uri: url+item.image_url
                     }}
                    />
                  </TouchableOpacity>

                </View>
              </View>
            </>
          )}
        />
      ) : null}
    </>
  );

};


export default HairstylesList;


const styles = StyleSheet.create({

  container:{
   flex:1,
   backgroundColor:'#ddd',
   flexDirection: 'column',
   justifyContent: 'space-between',
  },
  card:{
   backgroundColor:'#fff',
   padding:10,
   margin: 10,
   borderRadius: 10,
  },
  userName:{
   fontWeight: 'bold',
   marginLeft: 10,
   marginTop:15,
  },
  feedImage:{
   width:140,
   height:140,
   borderRadius: 10,
   padding:10,
  }

});