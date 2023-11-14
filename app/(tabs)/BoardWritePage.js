import { SafeAreaView, Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import { CommonButton, TextInputBox } from '../../components'
import styles from '../../constants/preset'

const BoardWritePage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [writerNick, setWriterNick] = useState('');
    const [openChat, setOpenChat] = useState('');
    const [time, setTime] = useState('');

    const handleWrite = () => {
        console.log('게시 버튼 클릭');
        const currentTime = new Date();
        setTime(currentTime.toString());
        // uid를 통해 작성자 닉네임 가져와 setWriterNick
        // 이후 서버 측으로 보내기
        console.log(title, content, writerNick, openChat, time);
    }

    return (
        <SafeAreaView style = {styles.container}>
            <Text>게시글 작성 페이지</Text>
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
                font = {styles.middleFont}
                title = "게시"
                handlePress={handleWrite}
            />
        </SafeAreaView>
    )
}

export default BoardWritePage;