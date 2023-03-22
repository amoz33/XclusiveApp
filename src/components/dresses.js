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

const HomeDresses = () => {

  const navigation = useNavigation()

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const categoryList = async () => {

    //FETCH RESPONSE
    try {
      const response = await fetch('https://app.xclusiveafrikstyles.com/Auth/getdressItems');
      const json =  await response.json();
      setData(json.dress_items);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    categoryList();
  }, []);


   return isLoading ? (
    <ActivityIndicator />
  ) : (
    <>
      {data ? (
        <FlatList
          numColumns={2}
        //extraData={data}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <>

              <View style={styles.container}>
                <View style={styles.card}>
                  <View style={styles.cardHeader}>
                      <View style={styles.headerLeft}>
                        <Text style={styles.userName}>{item.name}</Text>
                      </View>
                  </View>
                  <TouchableOpacity onPress={() => navigation.navigate('Dresses')}>
                    <Image
                     style={styles.feedImage}
                     source={{
                        uri: item.image
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


export default HomeDresses;


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
   marginTop:10,
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

});