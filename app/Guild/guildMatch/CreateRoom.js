import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';

//방ID, 방에 입장한 각 길드정보(길드이름, 길드ID, 길드 멤버, 현재 길드포인트) 백엔드로부터 받아오기

const CreateRoom = ( {goBack} ) => {
    const [guildMembers1, setGuildMembers1] = useState(['Member 1A', 'Member 2A', 'Member 3A', 'Member 4A', 'Member 5A']);
    const [guildMembers2, setGuildMembers2] = useState(['Member 1B', 'Member 2B', 'Member 3B', 'Member 4B', 'Member 5B']);

    useEffect(() => {
        getMatchingData();
    }, []);

    const getMatchingData = () => {
        // 백으로부터 매칭된 각 길드정보, 방id 받아오는 로직

    };

    const showMatchResult = () => {
        // 대전 결과 보기 로직
        // 라이엇 API (전적 조회)
        // 승패에 따른 포인트 지급
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} style={styles.backButton}>
                    <Text style={styles.buttonText}>나가기</Text>
                </TouchableOpacity>
                <Text style={styles.title}>길드전</Text>
            </View>

            <Text>방 ID : OOO </Text>
            
            <View style={styles.subContainer}>
                <Text style={styles.guildName}>길드 1</Text>
                <View style={styles.guildContainer}>
                    {guildMembers1.map((member, index) => (
                        <Text key={index} style={styles.member}>{member}</Text>
                    ))}
                </View>

                <Text style={styles.vsText}>VS</Text>

                <Text style={styles.guildName}>길드 2</Text>
                <View style={styles.guildContainer}>
                    {guildMembers2.map((member, index) => (
                        <Text key={index} style={styles.member}>{member}</Text>
                    ))}
                </View>

                <TouchableOpacity onPress={showMatchResult} style={styles.resultButton}>
                    <Text style={styles.buttonText}>대전 결과 보기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D3D3D3', 
    },
    subContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    guildContainer: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        borderWidth: 1, // 1픽셀 테두리 너비
        borderColor: '#000', // 검은색 테두리
        borderRadius: 10, // 모서리 둥근 정도
        padding : 10,
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
    guildName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    member: {
        fontSize: 16,
        marginVertical: 2,
    },
    vsText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    resultButton: {
        backgroundColor: 'green',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 30,
        marginVertical: 10,
        alignItems: 'center',
        alignSelf: 'center', // 버튼을 중앙에 위치시킴
    },
});

export default CreateRoom