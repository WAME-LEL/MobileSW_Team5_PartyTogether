import React, { useState, useEffect } from 'react';
import { View, Text, Button, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput } from 'react-native';
import { Link } from 'expo-router';
import axios from 'axios';

const EventPage = () => {
    const [events,setEvents] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [eventName, setEventName] = useState('');
    const [eventURL, setEventURL] = useState('');
    const [eventPeriod, setEventPeriod] = useState('');

    const addEvent = async () => {
        try {
            // 백엔드 서버에 길드 생성 요청을 보냅니다.
            const response = await axios.post('http://34.22.100.104:8080/api/event/add', {
                name: eventName,
                url: eventURL,
                period: eventPeriod,
            });
            console.log('백엔드 응답:', response.data);
            
            setModalVisible(false);

            setEventName('');
            setEventURL('');
            setEventPeriod('');

            fetchEvent();
            
        } catch (error) {
            console.error('이벤트추가 중 에러 발생:', error);
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
                {item.name}{'\n'}
                {item.url}{'\n'}
                이벤트 기간 : {item.period}
             </Text>
        </Link>  
    );

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
                <Text style={{color: 'white'}}>이벤트url 추가</Text>
            </TouchableOpacity>

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
                        <TextInput style={styles.inputField} placeholder="이벤트 이름" onChangeText={setEventName} value={eventName} />
                        <TextInput style={styles.inputField} placeholder="URL" onChangeText={setEventURL} value={eventURL} />
                        <TextInput style={styles.inputField} placeholder="이벤트 기간" onChangeText={setEventPeriod} value={eventPeriod} />

                        <Button title="추가하기" onPress={addEvent} />
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
});
export default EventPage;