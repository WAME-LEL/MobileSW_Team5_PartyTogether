import React, { useState, useContext } from 'react'
import { SafeAreaView, Text, View, TextInput } from 'react-native'
import { TextInputBox, CommonButton, postSave, UserContext } from '../../components'
import styles from '../../constants/preset'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'
import DropDownPicker from 'react-native-dropdown-picker';

const SignUpPage = () => {
    const router = useRouter();
    const { uid, setUid } = useContext(UserContext);
    const [id, setId] = useState(''); // id -> 중복 검사 필요
    const [email, setEmail] = useState(''); // 이메일
    const [dropEmail, setDropEmail] = useState(''); // 이메일 드롭다운
    const [password, setPassword] = useState(''); // 비밀번호
    const [passwordCheck, setPasswordCheck] = useState(''); // 비밀번호 확인
    const [birthYear, setBirthYear] = useState(''); // 생년
    const [passwordText, setPasswordText] = useState(''); // 비밀 번호 일치 메세지
    const [nickname, setNickname] = useState(''); // 닉네임 -> 중복 검사 필요
    const [isPasswordSame, setIsPasswordSame] = useState(false); // 비밀번호 일치 여부
    const [IdChecked, setIdChecked] = useState(false); // 아이디 중복 검사 여부
    const [nicknameChecked, setNicknameChecked] = useState(false); // 닉네임 중복 검사 여부
    const [items, setItems] = useState([
        {label: 'naver.com', value: 'naver.com'},
        {label: 'google.com', value: 'google.com'}
      ]);

    const idCheck = (entity) => {
        console.log("중복 확인 버튼 클릭");
        if(entity == "id") {
            console.log(id);
            setIdChecked(true);
        } else {
            console.log(nickname);
            setNicknameChecked(true);
        }
        
    }

    const handleNext = async () => {
        const item = {
            nickname: nickname,
            username: id,
            password: password
        }
        try {
            const response = await postSave(item, "member/signUp");
            const memberId = response.data.memberId;
            await setUid(memberId);
            console.log(setUid);
            router.push('Login/GameInfoPage')
            return true;
        } catch(error) {
            console.log("회원 가입 중 에러 발생");
            return false;
        }
    }

    const handleEmail = (itemValue) => {
        console.log(itemValue);
    }

    const isSecurePassword = () => {

    }

    useEffect(() => {
        // const lengthPS = password.length;
        // const lengthPSC = passwordCheck.length;
        // if(lengthPS === 0 || lengthPSC === 0) {
        //     setPasswordText('');
        // } else if(lengthPS === lengthPSC) {
        //     if(password === passwordCheck) {    
        //         setPasswordText('비밀번호 일치!');
        //         setIsPasswordSame(true);
        //     } else {
        //         setPasswordText('비밀번호 불일치!');
        //         setIsPasswordSame(false);
        //     }
        // }
        if(password === '' || passwordCheck === '') {
            setIsPasswordSame(false);
        } else {
            if(password === passwordCheck) {
                setIsPasswordSame(true);
            } else {
                setIsPasswordSame(false);
            }
        }
    }, [password, passwordCheck])

    return (
        <SafeAreaView style = {styles.container}>
            <View style = {{paddingVertical : 10}}>
                <Text style = {[styles.middleFont, {marginBottom : 5}]}>ID</Text>
                <View style = {{flexDirection : 'row'}}>
                    <TextInput style = {[styles.middleBox, {width : 240, marginRight : 10}]} 
                        onChangeText = {setId}
                        placeholder = " 아이디를 입력하세요"
                    />
                    <CommonButton
                        preset = {[styles.smallButton, {height: 50}]}
                        font = {styles.smallFontWhite}
                        title = " 중복 확인"
                        handlePress = {() => idCheck("id")}
                    />
                </View>
            </View>
            <View style = {{paddingVertical : 10}}>
                <Text style = {[styles.middleFont, {marginBottom : 5}]}>E-Mail</Text>
                <View style = {{flexDirection : 'row', alignItems:'center'}}>
                    <TextInput style = {[styles.middleBox, {width : 150}]} 
                        onChangeText = {setNickname}
                        placeholder = " E-Mail"
                    />
                    <Text style = {{marginHorizontal: 5}}>@</Text>
                    <DropDownPicker
                        open={dropEmail}
                        value={"naver.com"}
                        items={items}
                        setOpen={setDropEmail}
                        setValue={setEmail}
                        setItems={setItems}
                        containerStyle={{ width: 175, borderRadius: 0, borderColor: 'gray'}} // 컨테이너 스타일 변경
                    />
                </View>  
            </View>
            <View style = {{paddingVertical : 10}}>
                <Text style = {[styles.middleFont, {marginBottom : 5}]}>출생연도</Text>
                <View style = {{flexDirection : 'row', alignItems:'center'}}>
                    <DropDownPicker
                        open={dropEmail}
                        value={2023}
                        items={items}
                        setOpen={setDropEmail}
                        setValue={setEmail}
                        setItems={setItems}
                        containerStyle={{ width: 175, borderRadius: 0 }} // 컨테이너 스타일 변경
                    />
                    <View style={{width:175}}></View>
                </View>
            </View>
            <TextInputBox 
                preset = {styles.middleBox}
                font = {styles.middleFont}
                data = {{title : '비밀번호', placeholder : ' 비밀번호를 입력하세요.', type : 'PW'}}
                handleChange = {setPassword}
            />
            <TextInputBox 
                preset = {styles.middleBox}
                font = {styles.middleFont}
                data = {{title : '비밀번호 확인', placeholder : ' 비밀번호를 입력하세요.', type : 'PW'}}
                handleChange = {setPasswordCheck}
            />
            <View style = {{paddingVertical : 10}}>
                <Text style = {[styles.middleFont, {marginBottom : 5}]}>닉네임</Text>
                <View style = {{flexDirection : 'row'}}>
                    <TextInput style = {[styles.middleBox, {width : 240, marginRight : 10}]} 
                        onChangeText = {setNickname}
                        placeholder = " 닉네임을 입력하세요"
                    />
                    <CommonButton
                        preset = {[styles.smallButton, {height: 50}]}
                        font = {styles.smallFontWhite}
                        title = "중복 확인"
                        handlePress = {() => idCheck("nickname")}
                    />
                </View>
            </View>
                <CommonButton
                    preset = {[styles.middleButton, {marginTop:'5%'}]}
                    font = {styles.middleFontWhite}
                    title = "다음"
                    handlePress = {() => {handleNext()}}
                />
        </SafeAreaView>
    )
}

export default SignUpPage;
