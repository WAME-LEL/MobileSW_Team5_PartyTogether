import { Image, TouchableOpacity, View, Text } from 'react-native'

const ImageButton = ({preset, imageUrl, handlePress}) => {
    console.log(imageUrl);
    return (
        <TouchableOpacity style = {preset}
            onPress = {handlePress}
            >
                <Image source={{ uri: imageUrl }} style = {{width: 150, height: 150, borderRadius: 20}}/>
        </TouchableOpacity>
    )
}

export default ImageButton;