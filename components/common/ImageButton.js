import { Image, TouchableOpacity, View, Text } from 'react-native'

const ImageButton = ({preset, imageUrl, handlePress}) => {
    return (
        <TouchableOpacity style = {preset}
            onPress = {handlePress}
            >
                <View style = {
                    {width:'80%',
                     height: '80%',
                     borderRadius: 10,
                     backgroundColor: '#CCFFFF',
                     alignItems: 'center',
                     justifyContent: 'center',
                     }}>
                <Image source={ imageUrl } style = {{width: '90%', height: '90%'}}/>
                </View>
        </TouchableOpacity>
    )
}

export default ImageButton;