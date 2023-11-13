import React, { useState } from 'react'
import { SafeAreaView, Text, View, TextInput } from 'react-native'
import { TextInputBox, CommonButton } from '../../../components'
import styles from '../../../constants/preset'
import { Link } from 'expo-router'

const SignUpPage = () => {
    const [id, setId] = useState(''); // id -> 중복 검사 필요
    const [password, setPassword] = useState(''); // 비밀번호
    const [passwordCheck, setPasswordCheck] = useState(''); // 비밀번호 확인
    const [nickname, setNickname] = useState(''); // 닉네임 -> 중복 검사 필요
    const [isIdChecked, setIsIdChecked] = useState(false); // 아이디 중복 검사 여부
    const [isNicknameChecked, setIsNicknameChecked] = useState(false); // 닉네임 중복 검사 여부

    const idCheck = (entity) => {
        console.log("중복 확인 버튼 클릭");
        if(entity = "id") {
            // 아이디 중복 확인
            console.log(id);
        } else {
            // 닉네임 중복 확인, 조건문으로 나눠놓긴 했는데 수정될 확률 높음
            console.log(nickname);
        }
        
    }

    const handleNext = () => {
        //id, 중복 검사 여부 확인, 비밀 번호 확인 작업 후 다음 페이지로 이동
        console.log("다음 버튼 클릭");
    }

    return (
        <SafeAreaView style = {styles.container}>
            <Text style = {styles.middleFont}>회원가입 페이지</Text>
            <View style = {{paddingVertical : 10}}>
                <Text style = {[styles.middleFont, {marginBottom : 5}]}>ID</Text>
                <View style = {{flexDirection : 'row'}}>
                    <TextInput style = {[styles.middleBox, {width : 240, marginRight : 10}]} 
                        onChangeText = {setId}
                        placeholder = "아이디를 입력하세요"
                    />
                    <CommonButton
                        preset = {[styles.smallButton]}
                        title = "중복 확인"
                        handlePress = {() => idCheck("id")}
                    />
                </View>
            </View>
            <TextInputBox 
                preset = {styles.middleBox}
                font = {styles.middleFont}
                data = {{title : '비밀번호', placeholder : '비밀번호를 입력하세요.', type : 'PW'}}
                handleChange = {setPassword}
            />
            <TextInputBox 
                preset = {styles.middleBox}
                font = {styles.middleFont}
                data = {{title : '비밀번호 확인', placeholder : '비밀번호를 입력하세요.', type : 'PW'}}
                handleChange = {setPasswordCheck}
            />
            <View style = {{paddingVertical : 10}}>
                <Text style = {[styles.middleFont, {marginBottom : 5}]}>닉네임</Text>
                <View style = {{flexDirection : 'row'}}>
                    <TextInput style = {[styles.middleBox, {width : 240, marginRight : 10}]} 
                        onChangeText = {setNickname}
                        placeholder = "닉네임을 입력하세요"
                    />
                    <CommonButton
                        preset = {[styles.smallButton]}
                        title = "중복 확인"
                        handlePress = {() => idCheck("nickname")}
                    />
                </View>
            </View>
            <CommonButton
                preset = {styles.middleButton}
                font = {styles.middleFont}
                title = "다음"
                handlePress = {handleNext}
            />
        </SafeAreaView>
    )
}

export default SignUpPage;