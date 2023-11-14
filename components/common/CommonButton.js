import { Text, TouchableOpacity } from 'react-native'

const CommonButton = ({ preset, font, title, handlePress }) => {
    return (
        <TouchableOpacity
            style = {preset}
            onPress = {handlePress}>
            <Text style = {font}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CommonButton;