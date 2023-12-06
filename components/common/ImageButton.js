import { Image, TouchableOpacity, View } from 'react-native'

const ImageButton = ({preset, preset2, imageUrl, handlePress}) => {

    return (
        <TouchableOpacity style = {preset}
            onPress = {handlePress}
            >
                <View style={preset2}>
                <Image 
                    source={ imageUrl } 
                    style = {{width: '90%', height: '90%', resizeMode: 'contain'}}
                />
                </View>
        </TouchableOpacity>
    )
}

export default ImageButton;