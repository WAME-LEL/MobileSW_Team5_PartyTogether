import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import CreateRoom from './CreateRoom';

const GuildMatch = ( {goBack} ) => {
    const [currentPage, setCurrentPage] = useState('GuildMatch');
    const [roomId, setRoomId] = useState('');

    const toCreateRoom = () => {
        //서버에 길드ID 보냄
        setCurrentPage('CreateRoom');
    };
    if (currentPage === 'CreateRoom') {
        return <CreateRoom goBack={() => setCurrentPage('GuildMatch')} />;
    }

    const toJoinRoom = () => {
        // 방 입장 로직 구현
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} style={styles.backButton}>
                    <Text style={styles.buttonText}>뒤로</Text>
                </TouchableOpacity>
                <Text style={styles.title}>길드전</Text>
            </View>

            <View style={styles.contentBox}>
                <TouchableOpacity onPress={toCreateRoom} style={styles.button}>
                        <Text style={styles.buttonText}>방 만들기</Text>
                </TouchableOpacity>
                <Text> </Text>
                
                <TextInput
                        style={styles.input}
                        placeholder="방 ID를 입력하세요"
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
});

export default GuildMatch