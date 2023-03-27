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

const HairstylesList = () => {

  const navigation = useNavigation()

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  //const categoryList = async (props) => {
    const categoryList = async (catID) => {
  // async function categoryList({ route, navigation }) {

   // const  catID  = route.params;

    //const itemID = props.route.params.catID;
    
    //SEND RESPONSE
    // fetch('https://app.xclusiveafrikstyles.com/Auth/hairstyles_images?category_id='+catID, {
    //   method: 'GET',
    //   header: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   // body: JSON.stringify({
    //   //   category_id:catID,
    //   // })
    // })
    // //FETCH RESPONSE
    // .then(response => response.json())
    // .then(responseJson => {
    //   //return json.hairstyles_images;
    //   // var jsonData = JSON.stringify(responseJson.hairstyles_images);
    //   // var resultdata = JSON.parse(jsonData);
    //   console.log(responseJson);
    //  setData(responseJson);
    // })
    // .catch(error => {
    //   console.error(error);
    // });
    // setLoading(false);
    // //FETCH RESPONSE
    try {
      //const response = await fetch('https://app.xclusiveafrikstyles.com/Auth/hairstyles_images?category_id='+catID);
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
                    /* 1. Navigate to the HairstylesList Screen route with params */
                      navigation.navigate('HairstylesList', {
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