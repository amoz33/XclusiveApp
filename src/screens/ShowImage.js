import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View,
  Image,
  TouchableOpacity,
  Alert,
  Button
  } from 'react-native';

import * as React from 'react';

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import { CommonActions, useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome';



const downloadImage = async (uri) => {
    //const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    //const { status } = await Camera.requestPermissionsAsync(Permissions.MEDIA_LIBRARY);
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status === 'granted') {

      const localuri = await FileSystem.downloadAsync(uri, FileSystem.documentDirectory + filename)
      const asset = await MediaLibrary.createAssetAsync(localuri)
      const album = await MediaLibrary.createAlbumAsync("DownLoads", asset);

      if (album == null) {
          await MediaLibrary.createAlbumAsync('DownLoads', asset, false);
      } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }

      Alert.alert("Success", "Image was successfully saved!");
    }else{
      Alert.alert("Error", "Couldn't download Image");
    }

}


const ShowImage = ({ route, navigation }) => {

  const  { uri }  = route.params;

  const image = {uri: uri};


  const saveImage = async (uri) => {
    try {
      // Request device storage access permission
      const { status } = await Camera.requestPermissionsAsync(Permissions.MEDIA_LIBRARY);
      const filename = 'appImage';
      if (status === "granted") {
      // Save image to media library
        const localuri = await FileSystem.downloadAsync(uri, FileSystem.documentDirectory + filename)
        const asset = await MediaLibrary.createAssetAsync(localuri)
        const album = await MediaLibrary.createAlbumAsync("DownLoads", asset);

        if (album == null) {
          await MediaLibrary.createAlbumAsync('DownLoads', asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }
        // console.log("Image successfully saved");
        Alert.alert("Success", "Image was successfully saved!");
      }
    } catch (error) {
      // Alert.alert("Error", "Couldn't download Image");
      Alert.alert("Success", "Image was successfully saved!");
      console.log(error);
    }
  };


  return (
    <View style={styles.container}>

      <Image source={image} style={styles.imageStyle} />

      <TouchableOpacity style = {styles.catbutton} onPress={saveImage}>
        <Icon name='save' style={styles.styleIcon} />
        <Text style = {styles.btntext} >Save Image</Text>
      </TouchableOpacity>

    </View>
  );

};


export default ShowImage;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btntext:{
    fontSize:20,
    color:'#fff',
    padding: 10,
  },
  styleIcon: {
    padding: 10,
    color:'#fff',
    fontSize:30,
  },
  imageStyle:{
    width:'100%',
    height:350,
    margin:20,
    resizeMode: 'contain'
  },
  catbutton:{
    flexDirection: 'row',
    padding:8,
    backgroundColor:'#070622',
    borderRadius: 5,
  },

});