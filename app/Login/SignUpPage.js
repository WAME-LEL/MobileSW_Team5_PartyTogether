import React, { useState, useContext } from 'react'
import { SafeAreaView, Text, View, TextInput, ScrollView } from 'react-native'
import { TextInputBox, CommonButton, postSave, UserContext, DropDownModal, DropDownBox, LoadingScreen, getData } from '../../components'
import styles from '../../constants/preset'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'

const SignUpPage = () => {
    const router = useRouter();
    const { uid, setUid } = useContext(UserContext); // uid
    const [id, setId] = useState(''); // id -> 중복 검사 필요
    const [email, setEmail] = useState(''); // 이메일
    const [emailDomain, setEmailDomain] = useState('naver.com'); // 이메일 도메인
    const [dropEmail, setDropEmail] = useState(false); // 이메일 드롭다운 상태 관리
    const [emailDomainList, setEmailDomainList] = useState([]); // 이메일 도메인 리스트
    const [password, setPassword] = useState(''); // 비밀번호
    const [passwordCheck, setPasswordCheck] = useState(''); // 비밀번호 확인
    const [birthYear, setBirthYear] = useState(2000); // 생년
    const [birthYearList, setBirthYearList] = useState([]); // 생년 리스트
    const [dropBirthYear, setDropBirthYear] = useState(false); // 생년 드롭다운 상태 관리
    const [nickname, setNickname] = useState(''); // 닉네임 -> 중복 검사 필요
    const [isPasswordSame, setIsPasswordSame] = useState(false); // 비밀번호 일치 여부
    const [isPasswordSecure, setIsPasswordSecure] = useState(false); // 비밀번호 안전 여부
    const [IdChecked, setIdChecked] = useState(false); // 아이디 중복 검사 여부
    const [nicknameChecked, setNicknameChecked] = useState(false); // 닉네임 중복 검사 여부
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 관리

    useEffect(() => {
        const fetchData = () => {
          const currentYear = new Date().getFullYear();
          const years = [];
          for (let i = currentYear; i >= currentYear - 150; i--) {
            years.push({label: i, value: i});
          }
          setBirthYearList(years);
          setEmailDomainList([
            {label: '직접 입력', value: ''},
            {label: 'naver.com', value: 'naver.com'},
            {label: 'gmail.com', value: 'gmail.com'},
            {label: 'hanmail.net', value: 'hanmail.net'},
            {label: 'nate.com', value: 'nate.com'},
            {label: 'yahoo.com', value: 'yahoo.com'}
          ])
        };
        
        fetchData();
      }, [])

    const toggleBirthModal = () => {
        setDropBirthYear(!dropBirthYear);
    }

    const toggleEmailModal = () => {
        setDropEmail(!dropEmail);
    }

    const idCheck = async (entity) => {
        setIsLoading(true);
        try {
            if(entity == "id") {
                if(id == '') {
                    alert('공백 불가!');
                } else {
                    const checkId = await getData({username: id}, 'member/username/duplicate');
                    if(checkId == 'usable') {
                        alert('아이디 중복 확인 완료!');
                        setIdChecked(true);
                    } else {
                        alert('이미 사용중인 아이디입니다.');
                        setIdChecked(false);
                    }
                }
            } else {
                if(id == '') {
                    alert('공백 불가!');
                    return;
                } else {
                    const checkId = await getData({nickname: id}, 'member/nickname/duplicate');
                    if(checkId == 'usable') {
                        alert('닉네임 중복 확인 완료!');
                        setNicknameChecked(true);
                    } else {
                        alert('이미 사용중인 닉네임입니다.');
                        setNicknameChecked(false);
                    }
                }
            }
        } catch (error) {
            alert('중복 확인 중 에러 발생');
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleNext = async () => {
        setIsLoading(true);
        if(!IdChecked) {
            alert('아이디 중복 확인을 해주세요.');
        } else if(!nicknameChecked) {
            alert('닉네임 중복 확인을 해주세요.');
        } else if(!isPasswordSecure) {
            alert('비밀번호가 안전하지 않습니다.');
        } else if(!isPasswordSame) {
            alert('비밀번호가 일치하지 않습니다.');
        } else {
            const item = {
                nickname: nickname,
                username: id,
                password: password,
                // email: email + '@' + emailDomain,
                birthYear: birthYear
            }
            try {
                const response = await postSave(item, "member/signUp");
                const memberId = response.data.memberId;
                await setUid(memberId);
                setIsLoading(false);
                router.push('Login/GameInfoPage');
            } catch(error) {
                alert('회원가입 중 에러가 발생했습니다.\n 다시 시도해주세요');
            }
        }
        setIsLoading(false);
    }

    const isSecurePassword = (pw) => {
        if (pw.length < 8) { // 비밀번호는 8자 이상
            return false;
          }
        
          // 영어, 숫자, 특수문자 포함인지 확인하는 건데, 이거 특수문자 어디까지 허용해야하지
          const containsLetter = /[a-zA-Z]/.test(pw);
          const containsNumber = /[0-9]/.test(pw);
          const containsSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pw);
        
          return containsLetter && containsNumber && containsSpecialChar;
    }

    const passwordSameChecking = (pw, pwc) => {
        if(pw === '' || pwc === '') {
            return false
        } else {
            if(pw === pwc) {
                return true
            } else {
                return false
            }
        }
    }

    useEffect(() => { // 비밀번호, 비밀번호 확인이 갱신 될 때마다 상태 업데이트
        const isSame = passwordSameChecking(password, passwordCheck);
        const securePassword = isSecurePassword(password);
        setIsPasswordSecure(securePassword);
        setIsPasswordSame(isSame);
    }, [password])

    useEffect(() => {
        const isSame = passwordSameChecking(password, passwordCheck);
        setIsPasswordSame(isSame);
    }, [passwordCheck])

    useEffect(() => {
        setIdChecked(false);
    }, [id])

    useEffect(() => {
        setNicknameChecked(false);
    }, [nickname])

    return (
        <SafeAreaView style = {styles.container}>
            <LoadingScreen nowLoading = {isLoading} />
            <DropDownModal items = {birthYearList} visible = {dropBirthYear} onClose = {toggleBirthModal} onSelectItem = {setBirthYear}></DropDownModal>
            <DropDownModal items = {emailDomainList} visible = {dropEmail} onClose = {toggleEmailModal} onSelectItem = {setEmailDomain}></DropDownModal>
            <ScrollView contentContainerStyle = {styles.container}>
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
                        placeholder = " 입력 안해도 됩니다"
                    />
                    <Text style = {{marginHorizontal: 5}}>@</Text>
                    <DropDownBox
                        preset = {[styles.middleBox, {width : 175, borderRadius: 0, borderColor: 'gray'}]}
                        font = {styles.middleFont}
                        data = {{value: emailDomain, placeholder: ' E-Mail'}}
                        handlePress = {toggleEmailModal}
                    />
                </View>  
            </View>
            <View style = {{paddingVertical : 10}}>
                <Text style = {[styles.middleFont, {marginBottom : 5}]}>출생연도</Text>
                <View style = {{flexDirection : 'row', alignItems:'center'}}>
                <DropDownBox
                        preset = {[styles.middleBox, {width : 175, borderRadius: 0, borderColor: 'gray'}]}
                        font = {styles.middleFont}
                        data = {{value: birthYear, placeholder: ' 생년'}}
                        handlePress = {toggleBirthModal}
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
            {(password == '') ? <View style = {{height: 15}}></View> :
            (isPasswordSecure) ? <View style = {{height: 15}}><Text style = {{color: 'green', fontSize: 11}}>안전한 비밀번호 입니다.</Text></View> : <View style = {{height: 15}}><Text style = {{color: 'red', fontSize: 11}}>비밀번호는 영어, 숫자, 특수문자를 포함해야 합니다.</Text></View>}
            <TextInputBox 
                preset = {styles.middleBox}
                font = {styles.middleFont}
                data = {{title : '비밀번호 확인', placeholder : ' 비밀번호를 입력하세요.', type : 'PW'}}
                handleChange = {setPasswordCheck}
            />
            {(passwordCheck == '') ? <View style = {{height: 15}}></View> :
            (isPasswordSame) ? <View style = {{height: 15}}><Text style = {{color: 'green', fontSize: 11}}>비밀번호가 일치합니다.</Text></View> : <View style = {{height: 15}}><Text style = {{color: 'red', fontSize: 11}}>비밀번호가 일치하지 않습니다.</Text></View>}
            <View style = {{paddingVertical : 10}}>
                <Text style = {[styles.middleFont, {marginBottom : 5}]}>닉네임</Text>
                <View style = {{flexDirection : 'row'}}>
                    <TextInput style = {[styles.middleBox, {width : 240, marginRight : 10}]} 
                        onChangeText = {setNickname}
                        placeholder = " 영어 12자, 한글 6자 이내"
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
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUpPage;
