import { SafeAreaView, Text, View, TextInput } from 'react-native'
import { useState, useEffect, useContext } from 'react'
import { CommonButton, TextInputBox, LoadingScreen, UserContext, postSave } from '../../components'
import styles from '../../constants/preset'
import { useRouter, useLocalSearchParams } from 'expo-router'

const BoardWritePage = () => {
    const params = useLocalSearchParams();
    const router = useRouter();
    const gameName = params.gameName;
    const { uid } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [writerNick, setWriterNick] = useState('');
    const [openChat, setOpenChat] = useState('');
    const [time, setTime] = useState('');

    const handleWrite = async () => {
        setIsLoading(true);
        console.log('게시 버튼 클릭');
        const item = {
            title: title,
            content: content,
            opentalk: openChat,
            type: gameName,
            memberId: uid
        }
        console.log(item);
        try {
            await postSave(item, "board/save");
            router.push('PartyBoard');
        } catch(error) {
            console.log("게시글 작성 중 오류 발생");
            setIsLoading(false);
            return false;
        }
        
    }

    return (
        <SafeAreaView style = {styles.container}>
            <LoadingScreen nowLoading={isLoading} />
            <View style = {{paddingVertical : 10}}>
                <Text style = {[styles.middleFont, {marginBottom : 5}]}>게임 명</Text>
                <TextInput style = {[styles.middleBox, {fontWeight: 'bold'}]} 
                    value = {gameName}
                    editable = {false}
                />
            </View>
            <TextInputBox 
                preset = {styles.middleBox}
                font = {styles.middleFont}
                data = {{title : "제목", placeholder : "제목을 입력하세요"}}
                handleChange={setTitle}
            />
            <TextInputBox 
                preset = {styles.middleBox}
                font = {styles.middleFont}
                data = {{title : "내용", placeholder : "내용을 입력하세요"}}
                handleChange={setContent}
            />
            <TextInputBox 
                preset = {styles.middleBox}
                font = {styles.middleFont}
                data = {{title : "오픈 카톡", placeholder : "연락할 오픈 카톡 ID"}}
                handleChange={setOpenChat}
            />
            <CommonButton
                preset = {styles.middleButton}
                font = {styles.middleFontWhite}
                title = "게시"
                handlePress={handleWrite}
            />
        </SafeAreaView>
    )
}

export default BoardWritePage;