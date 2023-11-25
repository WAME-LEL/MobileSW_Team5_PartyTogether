import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import { ImageButton } from '../components'
import styles from '../constants/preset';

const MainPage = () => {
    const ImageUrl = 'https://via.placeholder.com/150';

    const ImagePress = () => {
        console.log('이미지 버튼 눌림');
    }
    
    return (
        <SafeAreaView>
            <View style = {{width: 450, height: 450, backgroundColor: "#CCCCCC"}}>
                <View style = {{flexDirection: 'row'}}>
                    <ImageButton preset = {styles.bigImageButton} imageUrl = 'https://via.placeholder.com/150' handlePress = {ImagePress}/>
                    <ImageButton preset = {styles.bigImageButton} imageUrl = {ImageUrl} handlePress = {ImagePress}/>
                </View>
                <View style = {{flexDirection: 'row'}}>
                    <ImageButton preset = {styles.bigImageButton} imageUrl = {ImageUrl} handlePress = {ImagePress}/>
                    <ImageButton preset = {styles.bigImageButton} imageUrl = {ImageUrl} handlePress = {ImagePress}/>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default MainPage