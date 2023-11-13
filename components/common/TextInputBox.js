import { View, TextInput, Text } from 'react-native';

const TextInputBox = ({ preset, font, data, handleChange}) => {
    const isPassword = data.type === 'PW';

    return (
        <View style = {{paddingVertical : 10}}>
            <Text style = {[font, {marginBottom : 5}]}>{data.title}</Text>
            <TextInput style = {preset} 
                onChangeText = {handleChange}
                placeholder = {data.placeholder}
                secureTextEntry = {isPassword}
            />
        </View>
    );
};

export default TextInputBox;