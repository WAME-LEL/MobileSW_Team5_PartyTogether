import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList} from 'react-native';
import * as Location from 'expo-location';

const GPSPage = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [users, setUsers] = useState(["유저1", "유저2", "유저3", "유저4", "유저5"]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

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
      <View style = {{alignItems: 'center', width: '100%', height : 400, justifyContent: 'center', border: '1px solid black'}}>
        <Text>지도에 내 위치 표시</Text>
        <Text>{text}</Text>
      </View>
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