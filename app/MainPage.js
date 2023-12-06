import { SafeAreaView, View, Text, Dimensions } from 'react-native'
import { ImageButton, UserContext, SocketContext } from '../components'
import Icon_Location from '../assets/icons/Icon_Location.png';
import Icon_Guild from '../assets/icons/Icon_Guild.png';
import Icon_Board from '../assets/icons/Icon_Board.png';
import Icon_Analyze from '../assets/icons/Icon_Analyze.png';
import styles from '../constants/preset';
import { useRouter } from 'expo-router';
import { useContext, useEffect } from 'react';
import SockJS from 'sockjs-client';

const { width, height } = Dimensions.get('window');

const MainPage = () => {
    const { socket, setSocket } = useContext(SocketContext);
    const router = useRouter();

    useEffect(() => {
        if(socket == null) {
            setSocket(new SockJS(`http://34.22.100.104:8080/chat`));
        }
    },[])

    const ImagePress = () => {
        console.log('이미지 버튼 눌림');
    }

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