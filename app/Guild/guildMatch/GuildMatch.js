import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Modal } from 'react-native';
import React, { useState, useContext } from 'react';
import CreateRoom from './CreateRoom';
import { UserContext } from '../../../components'
import axios from 'axios';

const GuildMatch = ( {goBack, guildInfo} ) => {
    const [currentPage, setCurrentPage] = useState('GuildMatch');
    const [isLoading, setIsLoading] = useState(false);
    const [roomId, setRoomId] = useState(''); //사용자가 입력한 방 번호
    const [roomNumber,setRoomNumber] = useState(''); //서버에서 반환 받은 방 번호
    const [uid, setUid] = useState(402); //임시 유저id
    // const { uid } = useContext(UserContext); //uid 저장

    const LoadingModal = () => (
        <Modal
            transparent={true}
            animationType="none"
            visible={isLoading}
            onRequestClose={() => {}}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator animating={isLoading} size="large"/>
                </View>
            </View>
        </Modal>
    );

    const toCreateRoom = async () => {
        // 서버에 방생성 요청
        setIsLoading(true);
        try {
            // 백엔드 서버에 방 생성 요청을 보냅니다.
            const response = await axios.post('http://34.22.100.104:8080/api/guildWar/add', {
                guildId: guildInfo.id, //102
                memberId: uid,
            });
            console.log('백엔드 응답:', response.data);
            const resRoomNumber = response.data.data.roomNumber;
            setRoomNumber(resRoomNumber);

            setCurrentPage('CreateRoom');
            setIsLoading(false);
            

        } catch (error) {
            setIsLoading(false);
            console.error('방 생성 중 에러 발생:', error);
        }

    };
    if (currentPage === 'CreateRoom') {
        return <CreateRoom goBack={() => setCurrentPage('GuildMatch')} roomNumber={roomNumber}/>;
    }

    const toJoinRoom = async () => {
        // 입력한 방ID가 있을 경우 => 입장
        // 입력한 방ID가 존재하지 않을 경우 실패
        setIsLoading(true);

        try {
            // 백엔드 서버에 방 생성 요청을 보냅니다.
            const response = await axios.post('http://34.22.100.104:8080/api/guildWar', {
                roomNumber: roomId,
                memberId: uid,
            });
            
            if (response.data === 'success') {
                
                setRoomNumber(roomId);
                setCurrentPage('CreateRoom');
                setIsLoading(false);
                console.log('백엔드 응답:', response.data);
            }
            else if (response.data === 'failed') {
                console.log('백엔드 응답:', response.data);
            }
            
        } catch (error) {
            setIsLoading(false);
            console.error('서버연결 중 에러 발생:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} style={styles.backButton}>
                    <Text style={styles.buttonText}>뒤로</Text>
                </TouchableOpacity>
                <Text style={styles.title}>길드전</Text>
            </View>

            <LoadingModal />

            <View style={styles.contentBox}>
                <TouchableOpacity onPress={toCreateRoom} style={styles.button}>
                        <Text style={styles.buttonText}>방 만들기</Text>
                </TouchableOpacity>
                <Text> </Text>
                
                <TextInput
                        style={styles.input}
                        placeholder="방 번호를 입력하세요"
                        value={roomId}
                        onChangeText={setRoomId} 
                />
                <TouchableOpacity onPress={toJoinRoom} style={styles.button}>
                    <Text style={styles.buttonText}>입장</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D3D3D3', 
    },
    contentBox: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        padding: 20,
    },
    header: {
        backgroundColor: '#333',
        padding: 10,
        alignItems: 'center',
    },
    backButton: {
        backgroundColor: 'skyblue',
        position: 'absolute',
        paddingVertical: 5,
        paddingHorizontal: 20, 
        left: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold', // 굵은 폰트
    },
    title: {
        color: '#fff',
        fontSize: 20,
    },
    button: {
        backgroundColor: 'red',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginVertical: 10, // 버튼 사이 간격
        width: '30%', // 버튼 너비
        alignItems: 'center',
    },
    input: {
        width: '80%', // 입력란 너비
        borderColor: '#60a3bc', // 테두리 색상
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10, // 위아래 여백
        backgroundColor: '#fff', // 배경색
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040' // 어두운 배경
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 200,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
});

export default GuildMatch