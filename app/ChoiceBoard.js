import { SafeAreaView, View, Text, Dimensions, TouchableOpacity } from 'react-native'
import { ImageButton } from '../components'
import Icon_Party from '../assets/icons/Icon_Party.png'
import Icon_Event from '../assets/icons/Icon_Event.png'
import styles from '../constants/preset';
import { useRouter } from 'expo-router';

const ChoiceBoard = () => {
    const router = useRouter();

    return (
        <SafeAreaView style = {styles.container}>
            <View>
                <View style = {{flexDirection: 'row', paddingTop: '5%', marginBottom: '3%'}}>
                    <View style ={styles.container}>
                        <Text style = {styles.middleFont}>파티 게시판</Text>
                        <ImageButton preset = {[styles.bigImageButton, {margin: 10}]} preset2 = {[styles.ImageButtonIn, {borderRadius: 20}]}imageUrl = {Icon_Party} handlePress = {() => {router.push('PartyBoard')}}/>
                    </View>
                    <View style = {{height: '50%', width: 1, backgroundColor: '#999999', marginTop: '17.5%'}}></View>
                    <View style ={styles.container}>
                        <Text style = {styles.middleFont}>이벤트 게시판</Text>
                        <ImageButton preset = {[styles.bigImageButton, {margin: 10}]} preset2 = {[styles.ImageButtonIn, {borderRadius: 20}]} imageUrl = {Icon_Event} handlePress = {() => {router.push('EventPage')}}/>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ChoiceBoard