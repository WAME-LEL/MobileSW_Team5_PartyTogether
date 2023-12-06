import React, { useState, useEffect, useContext } from 'react'
import { View, SafeAreaView, Text, Image, Dimensions, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native'
import { UserContext, LoadingScreen, getData, postData } from '../components'
import Icon_User from '../assets/icons/Icon_User.png'
import Icon_Close from '../assets/icons/Icon_Close.png'
import Icon_Delete from '../assets/icons/Icon_Delete.png'
import { useRouter } from 'expo-router'

const { width, height } = Dimensions.get('window');

const MyPage = () => {
    const { uid, nickname } = useContext(UserContext);
    const [imageUri, setImageUri] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState([]);
    const [nowMenu, setNowMenu] = useState('Board');
    const [modalVisible, setModalVisible] = useState(false);
    const [currentData, setCurrentData] = useState(0);
    const router = useRouter();

    const MyPageModal = ({item, onClose, handleDelete}) => { // 게시판 상세, 삭제 버튼 추가, 버튼 하나만 달라도 재활용을 못하겠네
        return (
            <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onRequestClose={onClose} // 안드로이드에서 물리적 뒤로 가기 버튼을 눌렀을 때의 처리
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <View style={styles.secondView}>
                        <View style = {styles.lineContainer}>
                        <Text style={styles.titleText}>글제목 :</Text>
                        <Text style={styles.modalText}>{item.title}</Text>
                        </View>
                        <View style = {[styles.lineContainer, {flexDirection: 'row'}]}>
                        <Text style={styles.titleText}>닉네임 :</Text>
                        <Text style={styles.modalText}>{item.nickname}</Text>
                        </View>
                        <View style = {styles.lineContainer}>
                        <Text style={styles.titleText}>글내용 :</Text>
                        <Text style={styles.modalText}>{item.content}</Text>
                        </View>
                        <View style = {styles.lineContainer}>
                        <Text style={styles.titleText}>오픈톡 :</Text>
                        <Text style={styles.modalText}>{item.opentalk}</Text>
                        </View>
                        <View style = {{alignItems: 'center', marginVertical: '3%', flexDirection: 'row'}}>
                        <TouchableOpacity
                            style={[styles.button, {marginRight: width * 0.1}]}
                            onPress={onClose}
                        >
                            <Image source = {Icon_Close} style = {{width: '100%', height: '100%'}} resizeMode = "contain" ></Image>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleDelete}
                        >
                            <Image source = {Icon_Delete} style = {{width: '100%', height: '100%'}} resizeMode = "contain" ></Image>
                        </TouchableOpacity>
                        </View> 
                    </View>
                    </View>
                </View>
            </Modal>
        )
    }

    useEffect(() => { // 첫 입장 시 데이터 초기화
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

    const handleMenuPress = (menu) => { // 메뉴 눌렀을 시 메뉴에 따라 데이터 로딩
        const fetchData = async (item, endPoint) => { // 아래에서 씀
            setIsLoading(true); // 로딩
            setCurrentData(0); // 현재 데이터 초기화
            try {
                const loadData = await getData(item, endPoint); // item과 endPoint를 통해 데이터 로딩
                console.log(loadData);
                if(loadData == 'nothing') { // 없을 경우
                    setItems([]);
                } else {
                    if(endPoint == 'board/member') { // 게시판 데이터
                        const processedData = loadData.map(item => { // 가공
                            return {
                                id: item.boardId,
                                title: item.title,
                                nickname: item.nickname,
                                content: item.content,
                                type: item.type,
                                opentalk: item.opentalk,
                                time: item.time,
                            };
                        });
                        setItems(processedData); // 상태 갱신
                    } else if (endPoint == 'chatRoom/info') { // 채팅방 데이터
                        const processedData = loadData.map(item => {
                            return {
                                id: item.roomId,
                                title: item.name,
                                oneId: item.oneId,
                                otherId: item.otherId
                            };
                        });
                        setItems(processedData);
                    } else {
    
                    }
                }
            } catch (error) {
                alert("데이터 로딩 중 오류 발생");
                return []; // 오류 발생 시 빈배열
            }
            setIsLoading(false); // 로딩 해제
        }

        if(menu === 'Board'){ // 게시판 선택 시
            const item = {
                memberId: uid,
            }
            setNowMenu('Board'); // 현재 게시판 상태 갱신
            fetchData(item, 'board/member'); // 함수 실행
        } else if(menu === 'Chat'){ // 채팅 선택 시
            const item = {
                memberId: uid,
            }
            setNowMenu('Chat'); // 현재 게시판 상태 갱신
            fetchData(item, 'chatRoom/info'); // 함수 실행
        } else if(menu === 'Option'){
            setNowMenu('Option'); // 얘는 아직 가능 없음 ㅋㅋ
            setItems([]);
        } else {
            alert('뭐누른거지');
            console.log(menu);
        }
    }

    const toggleModal = () => {
        setModalVisible(!modalVisible); // 모달창 출력 상태
    }

    const handleDelete = async (id) => { // 게시글 삭제
        console.log('삭제 요청', id);
        setIsLoading(true); // 로딩
        setCurrentData(0); // 현재 데이터 초기화
        setModalVisible(!modalVisible); // 모달창 비활성화
        try {
            const response = await postData({boardId: id}, 'board/delete'); // 삭제 요청
            console.log(response);
            const loadData = await getData({memberId: uid}, 'board/member'); // 삭제 후 데이터 갱신
            if(loadData == 'nothing') {
                setItems([]);
            } else {
                const processedData = loadData.map(item => {
                    return {
                        id: item.boardId,
                        title: item.title,
                        nickname: item.nickname,
                        content: item.content,
                        type: item.type,
                        opentalk: item.opentalk,
                        time: item.time,
                    };
                });
                setItems(processedData);
            }
        } catch (error) {
            console.log(error);
            alert('삭제 중 오류 발생');
        } finally {
            setIsLoading(false);
        }
    }

    const handleAction = (index, item) => { // 클릭 시 액션
        if (nowMenu == 'Board') { // 현재 메뉴가 게시판인 경우
            setCurrentData(index); // 현재 데이터 갱신
            toggleModal(); // 모달 창 출력
        } else if (nowMenu == 'Chat') { 
            if(item.oneId == uid) { // DB에 uid가 2개 있는데, 그 중 상대방 uid를 파라미터로 줘야함
                router.push(`ChatPage/${item.otherId}`) 
            } else {
                router.push(`ChatPage/${item.oneId}`)
            }
        } else if (nowMenu == 'Option') {
            console.log('옵션 메뉴로 연결');
        }
    }

    return (
        <SafeAreaView>
            <LoadingScreen nowLoading = {isLoading} />
            {(!isLoading && items.length != 0) ? <MyPageModal item = {items[currentData]} onClose = {() => toggleModal()} handleDelete={() => handleDelete(items[currentData].id)} /> : <></>}
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
                        <ScrollView
                            contentContainerStyle = {{width: width*0.65, height: height*0.7, backgroundColor: 'white'}}
                        >
                            {(!isLoading) ? 
                                items.length != 0 ?
                                    items?.map((item, index) => (
                                        <TouchableOpacity key = {index} style = {styles.contentBox} onPress = {() => handleAction(index, item)}>
                                            <View style = {styles.contentInBox}>
                                                <Text>{item.title}</Text>
                                            </View>
                                        </TouchableOpacity>))
                                    :
                                    <View style = {{height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                                        <Text>데이터가 없습니다.</Text>
                                    </View>
                            : <></>}
                        </ScrollView>
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
        marginHorizontal: '2.5%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DDDDDD',
        borderRadius: 12,
        padding: 3,
        marginVertical: '1%'
    },
    contentInBox : {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 1,
    },
    titleFont: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    contentFont: {
        fontSize: 20,
        fontWeight: 'normal'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경 추가
    },
    lineContainer: {
        justifyContent: 'flex-start',
        width: '100%',
        flexDirection: 'row',
        paddingVertical: '2.5%',
        borderBottomWidth: 2,
        borderBottomEndRadius: 2,
        borderBottomColor: '#EEEEEE',
    },  
    modalView: {
        margin: width * 0.05,
        backgroundColor: '#EEEEEE',
        borderRadius: 10, // 둥근 모서리 조정
        width: width * 0.9, // 너비 조정
        padding: width * 0.03, // 패딩 조정
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    secondView: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '100%',
        padding: width * 0.02,
        alignItems: 'center',
    },
    button: {
        width: 20,
        height: 20,
        borderRadius: 10, // 더 둥글게
        justifyContent: 'center', // 센터 정렬
        alignItems: 'center', // 센터 정렬
    },
    modalText: {
        fontSize: 16, // 폰트 크기 조정
        width: width * 0.65,
    },
    titleText: { // 제목 텍스트 스타일 추가
        marginLeft: '2%',
        width: width * 0.15,
        fontSize: 16,
        fontWeight: 'bold',
    },
})

export default MyPage