import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { TextInputBox, CommonButton } from '../../../components'
import styles from '../../../constants/preset'
import { Link } from 'expo-router'

const LoginPage = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handlePress = () => {
        console.log("로그인 버튼 클릭");
        console.log(id, password);
        // 여기에 로그인 과정 추가
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
                handlePress = {handlePress}
            />
            <Link href="SignUpPage">
                <CommonButton
                    preset = {[styles.middleButton, {marginTop : 10}]}
                    font = {styles.middleFont}
                    title = "회원가입"
                    handlePress = {handlePress}
                />
            </Link>
        </SafeAreaView>
    );
}

export default LoginPage;
