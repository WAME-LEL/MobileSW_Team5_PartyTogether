import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { CommonButton, ImageButton, GPSUserCard, postSave, getData, UserContext } from '../components';
import Icon_LocationSearch from '../assets/icons/Icon_LocationSearch.gif';
import styles from '../constants/preset';
import * as Location from 'expo-location';

const GPSPage = () => {
  const { uid } = useContext(UserContext)
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isGPS, setIsGPS] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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
        setLocation(templocation);
        if (errorMsg) {
          return;
        }
        console.log(templocation);
        const item = {
          memberId: uid,
          latitude: templocation.coords.latitude,
          longitude: templocation.coords.longitude
        }
        console.log(item);
        try {
          await postSave(item, "member/location");
          const response = await getData({memberId : uid}, "memberGame");
          console.log(response);
          setUsers(response);
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
            <Text style = {styles.middleFont}>탐색하기</Text>
          </View>
          {!isGPS ? <ImageButton
              preset = {[styles.hugeImageButton, {backgroundColor: '#CCCCCC'}]}
              preset2 = {[styles.ImageButtonIn, {borderRadius: 30, backgroundColor: '#FFFFFF'}]}
              handlePress = {toggleGPS}
              imageUrl={Icon_LocationSearch}
          /> : 
          <ImageButton
              preset = {[styles.hugeImageButton, {backgroundColor: '#CCCCCC'}]}
              preset2 = {[styles.ImageButtonIn, {borderRadius: 30, backgroundColor: '#FFFFFF'}]}
              handlePress = {toggleGPS}
              imageUrl={require('../assets/icons/Icon_LocationSearchGif.gif')}
          />}
          <View style = {{paddingTop: 5}}>
            <Text style = {styles.smallFont}>주변 유저</Text>
          </View>
          <View style = {{ alignItems: 'center', justifyContent: 'center'}}>
            {!isGPS ? <Text style = {styles.middleFont}>먼저 GPS 탐색을 해주세요</Text> : 
            (users.length === 0) ? <Text style = {styles.middleFont}>탐색중...</Text> : <FlatList
              data={users}
              showsVerticalScrollIndicator = {false}
              renderItem={({ item }) => (
                <GPSUserCard 
                  items = {item}
                />
              )}
            />}
        </View>
      </View>
    </SafeAreaView> 
  );
}

export default GPSPage;