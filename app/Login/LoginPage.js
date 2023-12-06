import React, { useState, useContext } from 'react'
import { SafeAreaView, View, Text, Dimensions, Image, ImageBackground } from 'react-native'
import { TextInputBox, CommonButton, getData, LoadingScreen, UserContext } from '../../components'
import styles from '../../constants/preset'
import App_Icon from '../../assets/icons/App_Icon.png'
import Login_Back from '../../assets/icons/Login_Back.jpg'
import { useRouter } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler'

const {width, height} = Dimensions.get('window');

const LoginPage = () => {
    const router = useRouter();
    const { setUid, setNickname } = useContext(UserContext);
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => { // 로그인 함수
        setIsLoading(true); // 로딩화면 출력
        const item = {
            username: id,
            password: password
        }
        try {
            const tempdata = await getData(item, 'member/signIn'); // 비밀번호와 아이디를 서버로 보냄, ㅇㅋ 하면 uid랑 이것저것 받아옴
            await setUid(tempdata.member.id); // UserContext에 uid저장
            await setNickname(tempdata.member.nickname); // UserContext에 닉네임 저장
            router.push('MainPage'); // 메인 페이지로 이동
        } catch(error) {
            alert("로그인 중 에러 발생");
        }
        setIsLoading(false); // 로딩 화면 제거
    }

    return (
        <SafeAreaView style = {{height: height}}>
            <LoadingScreen nowLoading={isLoading} />
                <ImageBackground source = {Login_Back} style = {[styles.container, {width: width, height: height * 1.05}]}>
                    <Text style = {[styles.middleFont, {fontSize: 40}]}>파 티 구 함</Text>
                    <View style = {{padding: 20, borderRadius: 300, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                        <Image source = {App_Icon} style = {{width: width * 0.6, height: width * 0.6, margin: '3%'}}/>
                    </View>
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
                </ImageBackground>
        </SafeAreaView>
    );
}

export default LoginPage;
