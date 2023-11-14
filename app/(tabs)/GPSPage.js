import React, { useState, useEffect, useRef } from 'react';
import { Animated, TouchableOpacity, View, Text, SafeAreaView, StyleSheet, FlatList} from 'react-native';
import * as Location from 'expo-location';

const GPSPage = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [users, setUsers] = useState(["유저1", "유저2", "유저3", "유저4", "유저5"]);
  const [isOpen, setIsOpen] = useState(false);

  // const slideAnim = useRef(new Animated.Value(0)).current; // 초기 위치
  // const toggleDrawer = () => {
  //   Animated.timing(slideAnim, {
  //     toValue: isOpen ? 0 : -350, // 왼쪽으로 이동
  //     duration: 300, // 애니메이션 지속 시간
  //     useNativeDriver: true, // 더 부드러운 애니메이션을 위해
  //   }).start();

  //   setIsOpen(!isOpen);
  // };
  // 현재 내 위치를 받아오는 기능은 있지만, 맵과 연동하여 시각화 하는 기능을 구현하는데 어려움이 있어, 수정 사항 보류 중
  // google maps 사용 시 따로 api 키를 받아야 하는 것 같음

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
  // <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
  //   <TouchableOpacity onPress={toggleDrawer} style = {{alignItems: 'left', justifyContent: 'left'}}>
  //     <Text style={styles.drawerText}>이동</Text>
  //   </TouchableOpacity>
  //   <View>
  //   </View>
  // </Animated.View> 쓰다 만 사이드 바

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