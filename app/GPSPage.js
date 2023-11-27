import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import { CommonButton, ImageButton, postSave, UserContext } from '../components';
import Button_Location from '../assets/icons/Button_Location.png';
import * as Location from 'expo-location';

const GPSPage = () => {
  const { uid } = useContext(UserContext)
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGPS, setIsGPS] = useState(false);

  const toggleGPS = async () => {
    setIsGPS(!isGPS);
    if((location == null)) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        const templocation = await Location.getCurrentPositionAsync({});
        setLocation(location);
        let text = 'Waiting..';
        if (errorMsg) {
          text = errorMsg;
          return;
        }
        const item = {
          memberId: uid,
          latitude: templocation.coords.latitude,
          longitude: templocation.coords.longitude
        }
        console.log(item);
        try {
          const response = await postSave(item, "member/location");
          console.log(response);
          // 받은 데이터로 users 멤버를 채우기
        } catch(error) {
          console.log(error);
        }
      })();
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style = {{padding: 10}}>
          <Text>탐색하기</Text>
        </View>
        <ImageButton preset = {{
            width: 250,
            height: 250,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'skyblue'
        }} imageUrl = {Button_Location} handlePress = {toggleGPS}></ImageButton>
        <View style = {{padding: 10}}>
          <Text>주변 사용자 리스트</Text>
        </View>
        <View>
          {!isGPS ? <Text>먼저 GPS 탐색을 해주세요</Text> : 
          (users == []) ? <Text>탐색중...</Text> : <FlatList
            data={users}
            renderItem={({ item }) => (
              <View style = {{width: 400, height: 50, alignItems: 'center', justifyContent: 'center', border: '1px solid black', margin: 5}}>
                <Text>{item}</Text>
              </View>
            )}
          />}
        </View>
      </View>
    </SafeAreaView> 
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