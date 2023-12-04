import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import { ImageButton } from '../components'
import Icon_Location from '../assets/icons/Icon_Location.png';
import Icon_Guild from '../assets/icons/Icon_Guild.png';
import Icon_Party from '../assets/icons/Icon_Party.png';
import Icon_Comment from '../assets/icons/Icon_Comment.png';
import styles from '../constants/preset';
import { useRouter } from 'expo-router';

const MainPage = () => {
    const router = useRouter();
    const ImagePress = () => {
        console.log('이미지 버튼 눌림');
    }
    
    return (
        <SafeAreaView style = {styles.container}>
            <View>
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
                        <Text style = {styles.middleFont}>파티 게시판</Text>
                        <ImageButton preset = {[styles.bigImageButton, {margin: 10}]} preset2 = {[styles.ImageButtonIn, {borderRadius: 20}]} imageUrl = {Icon_Party} handlePress = {() => {router.push('PartyBoard')}}/>
                    </View>
                    <View style = {{height: '50%', width: 1, backgroundColor: '#999999', marginTop: '17.5%'}}></View>
                    <View style ={styles.container}>
                        <Text style = {styles.middleFont}>건의 사항</Text>
                        <ImageButton preset = {[styles.bigImageButton, {margin: 10}]} preset2 = {[styles.ImageButtonIn, {borderRadius: 20}]} imageUrl = {Icon_Comment} handlePress = {ImagePress}/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default MainPage