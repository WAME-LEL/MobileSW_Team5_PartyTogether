import React, { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import { CommonButton, ImageButton, GPSUserCard, GPSUserModal, postSave, getData, UserContext } from '../components';
import Icon_LocationSearch from '../assets/icons/Icon_LocationSearch.gif'; // 어쩌다 보니까 gif 됐는데 사진임
import styles from '../constants/preset';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router'

const { width, height } = Dimensions.get('window');

const GPSPage = () => {
  const router = useRouter();
  const { uid } = useContext(UserContext)
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(0);
  const [infoText, setInfoText] = useState('GPS 탐색을 해주세요')
  const [isLoading, setIsLoading] = useState(true);
  const [isGPS, setIsGPS] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleGPS = async () => {
    setUsers([]);
    setIsGPS(!isGPS);
  }

  useEffect(() => {
    if(isGPS == true) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync(); // 권한 얻기 위해 물어봄
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          alert('위치 권한 중 오류 발생!');
          setIsGPS(!isGPS);
          setUsers([]);
          return;
        }
  
        const templocation = await Location.getCurrentPositionAsync({}); // 현재 위치 받아옴
        setLocation(templocation);
        if (errorMsg) {
          return;
        }
        const item = {
          memberId: uid,
          latitude: templocation.coords.latitude,
          longitude: templocation.coords.longitude
        }
        try {
          const saveLoc = await postSave(item, 'member/location') // DB 저장
          const response = await getData({memberId : uid}, "memberGame"); // DB에 저장되어 있는 내 위치 정보로 주변 유저 정보 불러옴
          const processedData = response.filter(item => item.distance <= 2) // 2KM 이내 유저만 필터링 할지 그냥 위치 순으로 다 출력할지 고민중, 필터링 할거면 사실 서버에서 해야하는데
          if(processedData.length == 0) { // 유저가 없을 경우
            setInfoText('주변 2KM 이내 유저가 없습니다.');
          }
          setUsers(processedData);
          setIsGPS(!isGPS);
        } catch(error) {
          alert('위치 저장 중 오류 발생!');
          console.log(error);
        }
      })();
    }
  }, [isGPS])

  const printingModal = async (index) => {
    await setCurrentUser(index);
    setModalVisible(!modalVisible);
  }

  const toggleModal = (index) => {
    setModalVisible(!modalVisible);
    console.log("모달 버튼 눌림 : ", modalVisible);
  }
  
  const handleChat = (targetId) => {
    if(targetId == uid) {
      alert('내가 쓴 글입니다.');
    } else {
      toggleModal();
      router.push(`ChatPage/${targetId}`);
    }
  }

  return (
    <SafeAreaView>
      {(!isGPS && users.length != 0) ? <GPSUserModal items = {users[currentUser]} visible={modalVisible} onClose={toggleModal} handleChat={() => handleChat(users[currentUser].memberId)}/> : <></>}
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
          <View style = {{paddingVertical: '2%'}}>
            <Text style = {styles.middleFont}>주변 유저</Text>
          </View>
          <View style = {{width: width, height: height * 0.45, borderBottomWidth: 1, borderTopWidth:1, borderTopColor: "#CCCCCC", borderBottomColor: "#CCCCCC", paddingVertical: height * 0.01}}>
            {isGPS ? <View style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}><Text style = {styles.middleFont}>탐색중...</Text></View> : 
            (users.length === 0) ? <View style = {{width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}><Text style = {styles.smallFont}>{infoText}</Text></View> 
            : <FlatList
              data={users}
              showsVerticalScrollIndicator = {false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <GPSUserCard 
                  items = {item}
                  handlePress={() => {printingModal(index)}}
                />
              )}
            />}
        </View>
      </View>
    </SafeAreaView> 
  );
}

export default GPSPage;