import React, { useState, useContext } from 'react'
import { SafeAreaView, View, Text } from 'react-native'
import { TextInputBox, CommonButton, getData } from '../../components'
import UserContext from '../../components/common/UserContext'
import styles from '../../constants/preset'
import { useRouter } from 'expo-router'

const LoginPage = () => {
    const router = useRouter();
    const { setUid } = useContext(UserContext);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        console.log("로그인 버튼 클릭");
        const item = {
            username: id,
            password: password
        }
        try {
            const tempdata = await getData(item, 'member/signIn');
            console.log(tempdata.member);
            setUid(tempdata.member.id);
        } catch(error) {
            console.log("로그인 중 에러 발생");
        }
    }

    return (
        <SafeAreaView style = {{height: '100%'}}>
            <View style = {[styles.container, {height: '100%'}]}>
                <Text style = {styles.middleFont}>파 티 구 함</Text>
                <View>
                    <TextInputBox 
                        preset = {[styles.middleBox, {height: 45}]}
                        font = {styles.middleFont}
                        data = {{title : '아이디', placeholder : '아이디를 입력하세요.'}}
                        handleChange = {setId}
                    />
                </View>
                <View style = {{ margin: '3%'} }>
                    <TextInputBox 
                        preset = {[styles.middleBox, {height: 45}]}
                        font = {styles.middleFont}
                        data = {{title : '비밀번호', placeholder : '비밀번호를 입력하세요.', type : 'PW'}}
                        handleChange = {setPassword}
                    />
                </View>
                <CommonButton
                    preset = {[styles.middleButton, {margin: '3%'}]}
                    font = {styles.middleFontWhite}
                    title = "로그인"
                    handlePress = {handleLogin}
                />
                <CommonButton
                    preset = {[styles.middleButton, {margin : '3%'}]}
                    font = {styles.middleFontWhite}
                    title = "회원가입"
                    handlePress = {() => (router.push('Login/SignUpPage'))}
                />
            </View>
        </SafeAreaView>
    );
}

export default LoginPage;
