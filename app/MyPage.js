import React, { useState, useEffect, useContext } from 'react'
import { View, SafeAreaView, Text, Image, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import { UserContext, LoadingScreen, getData } from '../components'
import Icon_User from '../assets/icons/Icon_User.png'
import { useRouter } from 'expo-router'

const { width, height } = Dimensions.get('window');

const MyPage = () => {
    const { uid, nickname } = useContext(UserContext);
    const [imageUri, setImageUri] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [nowMenu, setNowMenu] = useState('Board');
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                handleMenuPress('Board');
                setImageUri(Icon_User);
            } catch (error) {
                alert("마이페이지 로딩 중 오류 발생");
            }
        }
        fetchData();
    }, [])

    const handleAction = (item) => {
        if (nowMenu == 'Board') {
            console.log('보드 모달 창 띄우기');
        } else if (nowMenu == 'Chat') { 
            console.log('채팅 페이지와 연결');
            if(item.oneId == uid) {
                router.push(`ChatPage/${item.otherId}`)
            } else {
                router.push(`ChatPage/${item.oneId}`)
            }
        } else if (nowMenu == 'Option') {

        }
    }

    const handleMenuPress = (menu) => {
        const fetchData = async (item, endPoint) => {
            setIsLoading(true);
            try {
                const loadData = await getData(item, endPoint);
                console.log(loadData);
                setItems(loadData);
            } catch (error) {
                alert("데이터 로딩 중 오류 발생");
                return [];
            }
            setIsLoading(false);
        }

        if(menu === 'Board'){
            const item = {
                memberId: uid,
            }
            setNowMenu('Board');
            fetchData(item, 'board/member');
        } else if(menu === 'Chat'){
            const item = {
                memberId: uid,
            }
            setNowMenu('Chat');
            fetchData(item, 'chatRoom/info');
        } else if(menu === 'Option'){
            setNowMenu('Option');
            setItems([]);
        } else {
            alert('뭐누른거지');
            console.log(menu);
        }
    }

    return (
        <SafeAreaView>
            <LoadingScreen nowLoading = {isLoading} />
                <View style = {styles.headerView}>
                    <View style = {styles.imageContainer}>
                        <Image 
                            source={Icon_User}
                            style = {{width: '100%', height: '100%', resizeMode: 'contain'}}
                        />
                    </View>
                    <View style = {styles.textBox}>
                        <Text style = {styles.titleFont}>닉네임 : </Text>
                        <Text style = {styles.contentFont}>{nickname}</Text>
                    </View>
                </View>
                <View style = {styles.middleView}>
                    <View style = {styles.menuView}>
                        <TouchableOpacity style = {styles.menuBox} onPress = {() => handleMenuPress('Board')}>
                            <Text style = {styles.titleFont}>내 글</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.menuBox} onPress = {() => handleMenuPress('Chat')}>
                            <Text style = {styles.titleFont}>내 채팅</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.menuBox} onPress = {() => handleMenuPress('Option')}>
                            <Text style = {styles.titleFont}>환경설정</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.contentView}>
                        {(!isLoading) ? 
                            items?.map((item, index) => (
                                <TouchableOpacity key = {index} style = {styles.contentBox} onPress = {() => handleAction(item)}>
                                    <Text>{item.name}</Text>
                                </TouchableOpacity> 
                        )): <></>}
                    </View>
                </View>            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    headerView: {
        width: width,
        height: height * 0.2,
        flexDirection:'row',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    middleView: {
        width: width,
        height: height * 0.7,
        flexDirection:'row',
    },
    menuView: {
        width: '35%',
        height: '100%',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: 'black',
        backgroundColor: '#EEEEEE'
    },
    contentView: {
        width: '65%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    imageContainer: {
        width: '35%', 
        height: 'auto', 
        backgroundColor: '#DDDDDD', 
        padding: '3%',
        borderRightColor: 'black',
        borderRightWidth: 1,
    },
    textBox: {
        width: '65%', 
        height: '50%', 
        padding: '3%',
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    menuBox: {  
        width: '100%',
        height: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    contentBox: {
        width: '95%',
        height: '9%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: 'white',
        marginVertical: '1%'
    },
    titleFont: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    contentFont: {
        fontSize: 20,
        fontWeight: 'normal'
    }
})

export default MyPage