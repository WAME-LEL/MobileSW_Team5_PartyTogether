import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Image } from 'react-native';
import { loadUserData, CommonButton, ImageButton } from '../../components';
import Icon_Location from '../../asset/icons/Icon_Location.png';
import * as Location from 'expo-location';

const GPSPage = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGPS, setIsGPS] = useState(false);

  const toggleGPS = () => {
    console.log('GPS 버튼 누름');
    setIsGPS(!isGPS);
  }

  useEffect(() => {
    if(isGPS) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        let text = 'Waiting..';
        if (errorMsg) {
          text = errorMsg;
        } else if (location) {
          text = JSON.stringify(location);
        }
        console.log(text);
      })();
    }
  }, [isGPS]);

  useEffect(() => {

  }, [])
 
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <View style = {{padding: 10}}>
        <Text>GPS 페이지</Text>
      </View>
      <ImageButton preset = {{
          width: 250,
          height: 250,
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'skyblue'
      }} imageUrl = {Icon_Location} handlePress = {toggleGPS}></ImageButton>
      <View style = {{padding: 10}}>
        <Text>주변 사용자 리스트</Text>
      </View>
      <FlatList
        data={users}
        renderItem={({ item }) => (
          <View style = {{width: 400, height: 50, alignItems: 'center', justifyContent: 'center', border: '1px solid black', margin: 5}}>
            <Text>{item}</Text>
          </View>
        )}
      />
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawer: {
    width: 400,
    height: '100%',
    backgroundColor: 'skyblue',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    flexDirection: 'row',
    display: 'flex',
    top: 0,
    right: -350,
  },
  drawerText: {
    fontSize: 20,
    color: 'white',
  },
});

export default GPSPage;