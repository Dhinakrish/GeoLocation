import React, { useState } from 'react';
import {StyleSheet, View, Text, Button, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const App = () => {

  const [location, setlocation] = useState(false);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const requestLocationPermission = async () => {
    try{
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Geolocation Permission",
          message: "Can we access your location?",
          buttonNeutral: "Ask me later",
          buttonNegative: "Cancel",
          buttonPositive: "Ok"
        }
      );

      console.log('granted', granted);
      if (granted == 'granted'){
        console.log('You can use Geolocation')
        return true;
      }
      else{
        console.log('You cannot use Geolocation')
        return false;
      }
    }
    catch (err){
      return false
    }
  };

  const geolocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is :', res);

      if (res){
        Geolocation.getCurrentPosition(
          position => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
            setlocation(true);

          },
          error => {
            console.log(error.code, error.message);
            setlocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
        );
      };
      console.log(location);
    })
  }

 return (
   <View style={styles.container}>
     <Text>Welcome!</Text>
     <View
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="Get Location" onPress={geolocation}/>
      </View>
      <Text>Latitude: {latitude}</Text>
      <Text>location: {longitude}</Text>
   </View>
 );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
 },
});

export default App;