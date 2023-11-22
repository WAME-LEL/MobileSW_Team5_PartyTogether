import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { TextInputBox, CommonButton, getData } from '../../../components'
import styles from '../../../constants/preset'
import { Link } from 'expo-router'

const LoginPage = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        console.log("로그인 버튼 클릭");
        const item = {
            username: id,
            password: password
        }
        console.log(item);
        try {
            const tempdata = await getData(item, 'http://localhost:8080/api/member/signIn');
            console.log(tempdata);
        } catch(error) {
            console.log("로그인 중 에러 발생");
            const tempdata = [];
            console.log(tempdata);
        }
        
        
    }

    return (
        <SafeAreaView style = {styles.container}>
            <TextInputBox 
                preset = {styles.middleBox}
                font = {styles.middleFont}
                data = {{title : '아이디', placeholder : '아이디를 입력하세요.'}}
                handleChange = {setId}
            />
            <TextInputBox 
                preset = {styles.middleBox}
                font = {styles.middleFont}
                data = {{title : '비밀번호', placeholder : '비밀번호를 입력하세요.', type : 'PW'}}
                handleChange = {setPassword}
            />
            <CommonButton
                preset = {styles.middleButton}
                font = {styles.middleFont}
                title = "로그인"
                handlePress = {handleLogin}
            />
            <CommonButton
                preset = {[styles.middleButton, {marginTop : 10}]}
                font = {styles.middleFont}
                title = "회원가입"
                handlePress = {() => (console.log("회원가입 버튼"))}
            />
        </SafeAreaView>
    );
}

export default LoginPage;
