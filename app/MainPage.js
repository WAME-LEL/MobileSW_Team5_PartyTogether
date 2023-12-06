import { SafeAreaView, View, Text, Dimensions } from 'react-native'
import { ImageButton, UserContext, SocketContext, postSave } from '../components'
import Icon_Location from '../assets/icons/Icon_Location.png';
import Icon_Guild from '../assets/icons/Icon_Guild.png';
import Icon_Board from '../assets/icons/Icon_Board.png';
import Icon_Analyze from '../assets/icons/Icon_Analyze.png';
import styles from '../constants/preset';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { useContext, useEffect } from 'react';
import SockJS from 'sockjs-client';

const { width, height } = Dimensions.get('window');

const MainPage = () => {
    const { socket, setSocket } = useContext(SocketContext);
    const { uid } = useContext(UserContext);
    const router = useRouter();

    useEffect(() => {
        if(socket == null) {
            setSocket(new SockJS(`http://34.22.100.104:8080/chat`)); // 서버 소켓 연결
        }
        (async () => { // 처음 메인 페이지에 들어왔을 때 위치를 업데이트 하는 것이 맞는 것 같음
            let { status } = await Location.requestForegroundPermissionsAsync(); // 권한 얻기 위해 물어봄
            if (status !== 'granted') {
                alert('위치 권한 중 오류 발생!');
                return;
            }
            try {
                const templocation = await Location.getCurrentPositionAsync({}); // 현재 위치 받아옴
                const item = {
                memberId: uid,
                latitude: templocation.coords.latitude,
                longitude: templocation.coords.longitude
            }
                const saveLoc = await postSave(item, 'member/location') // DB 저장
            } catch (error) {
                alert('위치 저장 중 오류 발생!');
                console.log(error);
            }
        })();
    },[])

    return (
        <SafeAreaView style = {styles.container}>
            <View style = {{paddingVertical: height * 0.1}}>
                <View style = {{flexDirection: 'row', paddingTop: '5%', marginBottom: '3%'}}>
                    <View style ={styles.container}>
                        <Text style = {styles.middleFont}>주변 탐색</Text>
                        <ImageButton preset = {[styles.bigImageButton, {margin: 10}]} preset2 = {[styles.ImageButtonIn, {borderRadius: 20}]}imageUrl = {Icon_Location} handlePress = {() => {router.push('GPSPage')}}/>
                    </View>
                    <View style = {{height: '50%', width: 1, backgroundColor: '#999999', marginTop: '17.5%'}}></View>
                    <View style ={styles.container}>
                        <Text style = {styles.middleFont}>길드 페이지</Text>
                        <ImageButton preset = {[styles.bigImageButton, {margin: 10}]} preset2 = {[styles.ImageButtonIn, {borderRadius: 20}]} imageUrl = {Icon_Guild} handlePress = {() => {router.push('Guild/GuildMenu')}}/>
                    </View>
                </View>
                <View style = {{flexDirection: 'row', paddingBottom: '5%'}}>
                    <View style ={styles.container}>
                        <Text style = {styles.middleFont}>게시판</Text>
                        <ImageButton preset = {[styles.bigImageButton, {margin: 10}]} preset2 = {[styles.ImageButtonIn, {borderRadius: 20}]} imageUrl = {Icon_Board} handlePress = {() => {router.push('ChoiceBoard')}}/>
                    </View>
                    <View style = {{height: '50%', width: 1, backgroundColor: '#999999', marginTop: '17.5%'}}></View>
                    <View style ={styles.container}>
                        <Text style = {styles.middleFont}>GPT 컨설팅</Text>
                        <ImageButton preset = {[styles.bigImageButton, {margin: 10}]} preset2 = {[styles.ImageButtonIn, {borderRadius: 20}]} imageUrl = {Icon_Analyze} handlePress = {() => {router.push('ChatGPTMatchAnalysis')}}/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default MainPage