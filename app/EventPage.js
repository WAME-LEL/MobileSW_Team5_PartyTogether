import React, { useState, useEffect } from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Dimensions , Image } from 'react-native';
import { Link } from 'expo-router';
import Icon_Close from '../assets/icons/Icon_Close.png';
import axios from 'axios';
import { CommonButton } from '../components';

const { width, height } = Dimensions.get('window');

const EventPage = () => {
    const [events,setEvents] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [eventName, setEventName] = useState('');
    const [eventURL, setEventURL] = useState('');
    const [eventPeriod, setEventPeriod] = useState('');

    //이벤트 url 추가
    const addEvent = async () => {
        try {
            // 이벤트 이름, url, 기간을 전송하고 이벤트 리스트에 추가함
            // const response = await axios.post('http://34.22.100.104:8080/api/event/add', {
            //     name: eventName,
            //     url: eventURL,
            //     period: eventPeriod,
            // });
            // console.log('백엔드 응답:', response.data);
            
            setModalVisible(false);

            setEventName('');
            setEventURL('');
            setEventPeriod('');
            alert('이벤트 추가 요청 완료')
            fetchEvent();
            
        } catch (error) {
            console.error('이벤트추가 요청 중 에러 발생:', error);
            alert('이벤트 추가 요청 중 에러 발생');
        }
    };

    useEffect(() => {
        fetchEvent();
    }, []);

    //이벤트 목록 받기
    const fetchEvent = async () => {
        try {
            const res = await axios.get(`http://34.22.100.104:8080/api/event`);
            console.log(res.data); // API에서 반환된 데이터
            setEvents(res.data.data) //이벤트 목록

        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const renderItem = ({ item }) => (
        <Link href = {item.url} //선택한 이벤트 목록의 url
            style={styles.itemBox}
        >
            <Text>
                제목 : {item.name}{'\n'}
                이벤트 기간 : {item.period}
             </Text>
        </Link>  
    );

    return (
        <SafeAreaView>
            <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
                    <Text style={{color: 'white'}}>이벤트 추가 요청</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.separator} />

            <FlatList
                data={events}
                renderItem={renderItem}
                keyExtractor={item => item.eventId.toString()}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => setModalVisible(false)}
                            >
                                <Image source = {Icon_Close} style = {{width: '100%', height: '100%'}} resizeMode = "contain" ></Image>
                            </TouchableOpacity>
                        </View>
                        <TextInput style={styles.inputField} placeholder="이벤트 이름" onChangeText={setEventName} value={eventName} />
                        <TextInput style={styles.inputField} placeholder="URL" onChangeText={setEventURL} value={eventURL} />
                        <TextInput style={styles.inputField} placeholder="이벤트 기간" onChangeText={setEventPeriod} value={eventPeriod} />
                        <View style = {{alignItems: 'center', justifyContent: 'center'}}>
                            <CommonButton 
                                preset = {styles.middleButton}
                                font = {styles.middleFontWhite}
                                title="요청 전송" 
                                handlePress={() => addEvent()} 
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addButton: {
        marginTop: 10, // 상단 여백
        marginLeft: 10, // 오른쪽 여백
        padding: 10, // 버튼 내부 패딩
        backgroundColor: 'orange', // 버튼 배경 색
        borderRadius: 5, // 버튼 모서리 둥글게
        width : 150,
        alignItems: 'center',
    },
    itemBox: {
        backgroundColor: '#fff', // 상자의 배경색
        borderRadius: 10, // 모서리를 둥글게
        shadowColor: '#000', // 그림자 색
        shadowRadius: 1.84, // 그림자 반경
        padding: 20, // 내부 여백
        marginVertical: 10, // 수직 여백
        marginHorizontal: 10, // 수평 여백
    },
    separator: {
        borderBottomColor: '#e0e0e0', // 선의 색상
        borderBottomWidth: 3, // 선의 두께
        marginVertical: 10, // 위아래 여백
    },
    modalView: {
        margin: 20,
        width: '80%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center', // 수직 방향으로 중앙 정렬
        alignItems: 'center', // 수평 방향으로 중앙 정렬
    },
    inputField: {
        borderWidth: 1, // 테두리 폭
        borderColor: 'grey', // 테두리 색상
        padding: 10, // 내부 여백
        width: '100%', // 입력 필드의 가로 길이
        marginBottom: 10, // 하단 여백
    },
    button: {
        width: 20,
        height: 20,
        borderRadius: 10, // 더 둥글게
        justifyContent: 'center', // 센터 정렬
        alignItems: 'center', // 센터 정렬
        marginBottom: 20
    },
    middleButton : {
        width: 200,
        height: 50,
        borderRadius: 10,
        backgroundColor: '#CC0000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleFontWhite: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    }
});
export default EventPage;