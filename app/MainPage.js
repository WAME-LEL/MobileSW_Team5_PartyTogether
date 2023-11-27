import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import { ImageButton } from '../components'
import Icon_Location from '../assets/icons/Icon_Location.png';
import Icon_Guild from '../assets/icons/Icon_Guild.png';
import Icon_Party from '../assets/icons/Icon_Party.png';
import styles from '../constants/preset';
import { useRouter } from 'expo-router';

const MainPage = () => {
    const router = useRouter();
    const ImagePress = () => {
        console.log('이미지 버튼 눌림');
    }
    
    return (
        <SafeAreaView>
            <View style = {styles.container}>
                <View>
                    <View style = {{flexDirection: 'row', paddingTop: '5%'}}>
                        <ImageButton preset = {[styles.bigImageButton, {margin: 10}]} imageUrl = {Icon_Location} handlePress = {() => {router.push('GPSPage')}}/>
                        <ImageButton preset = {[styles.bigImageButton, {margin: 10}]} imageUrl = {Icon_Guild} handlePress = {() => {router.push('Guild/GuildInformation')}}/>
                    </View>
                    <View style = {{flexDirection: 'row', paddingBottom: '5%'}}>
                        <ImageButton preset = {[styles.bigImageButton, {margin: 10}]} imageUrl = {Icon_Party} handlePress = {() => {router.push('PartyBoard')}}/>
                        <ImageButton preset = {[styles.bigImageButton, {margin: 10}]} imageUrl = {''} handlePress = {ImagePress}/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default MainPage