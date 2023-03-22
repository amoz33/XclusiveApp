import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';

import { 
  StyleSheet, 
  ActivityIndicator, 
  FlatList, 
  Text, 
  View,
  TouchableOpacity,
  Image,
  Button } from 'react-native';

import { CommonActions, useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';

const DressesList = () => {

  const navigation = useNavigation()

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const categoryList = async (catID) => {

    const itemID = catID;
    //const itemID = JSON.stringify(catID);

    try {
      const response = await fetch('https://app.xclusiveafrikstyles.com/Auth/dresses_images?catID='+itemID);
      const json =  await response.json();
      setData(json.dresses_images);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }; 

  useEffect(() => {
    categoryList();
  }, []);

  const url = 'https://app.xclusiveafrikstyles.com/uploads/dresses/';


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
                    /* 1. Navigate to the HairstylesList Screen route with params */
                      navigation.navigate('DressesList', {
                        category_id: item.id,
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


export default DressesList;


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