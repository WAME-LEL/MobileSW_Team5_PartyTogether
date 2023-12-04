import { TouchableOpacity, TextInput, Image, View } from 'react-native'
import Icon_DownArrow from '../../assets/icons/Icon_DownArrow.png'

const DropDownBox = ({ preset, font, data, handlePress }) => {

    return (
        <TouchableOpacity style = {{flexDirection: 'row'}}
            onPress = {handlePress}    
        >
            <View style = {[preset, {alignItems: 'flex-start', justifyContent: 'center'}]}>
                <TextInput style = {{width: '100%', color: 'black'}}
                    editable = {false}
                    placeholder = {data.placeholder}
                    value = {` ${data.value}`}
                />
                <Image style = {{width: 20, height: 20, position: 'absolute', right: 10}}
                    source = {Icon_DownArrow}
                />
            </View>
        </TouchableOpacity>
    )
}

export default DropDownBox;