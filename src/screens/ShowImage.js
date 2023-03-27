import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View,
  ImageBackground,
  Dimensions, } from 'react-native';

import * as React from 'react';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;


const ShowImage = (props) => {

const image = {uri: 'https://app.xclusiveafrikstyles.com/uploads/nails/nails5.jpg'};
  //const navigation = useNavigation()

    return (
      <View>
        {/*<Text style={styles.appcolor}>XclusiveStylesApp</Text>
        <Text style={styles.appcolor2}>This is the ShowImage Page for users</Text>
        <Button
            title="Go to Home Page"
            onPress={() => navigation.navigate('Homepage')}
        />
        <StatusBar style="auto" />*/}

        <ImageBackground  
          // source={props.route.params.uri}
          source={image}
          style={{
            height:deviceHeight,
            width:deviceWidth
          }}

          // resizeMode="cover"

        />



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
  appcolor: {
    color: '#fff',
    fontSize: 20,
  },
  appcolor2: {
    color: '#fff',
    fontSize: 15,
  },

});