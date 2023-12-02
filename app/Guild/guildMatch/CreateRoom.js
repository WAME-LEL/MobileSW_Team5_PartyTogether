import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import MatchResult from './MatchResult';
import axios from 'axios';

//방ID, 방에 입장한 각 길드정보(길드이름, 길드ID, 길드 멤버) 받아오기

const CreateRoom = ( {goBack} ) => {
    const [currentPage, setCurrentPage] = useState('CreateRoom');
    const [firstGuild, setFirstGuild] = useState(null);
    const [secondGuild, setSecondGuild] = useState(null);
    const [roomNumber,setRoomNumber] = useState(1);

    useEffect(() => {
        getMatchingData();
    }, []);

    const toMatchResult = () => {

        if (firstGuild && secondGuild && firstGuild.length === secondGuild.length) {
            setCurrentPage('MatchResult');
        } else {
            // 인원수가 다르면 경고 메시지 표시
            alert('두 길드의 인원수가 동일하지 않습니다.');
        }
    };
    if (currentPage === 'MatchResult') {
        return <MatchResult goBack={() => setCurrentPage('CreateRoom')} />;
    }


    const getMatchingData = async () => {
        // 백으로부터 매칭된 각 길드정보, 방id 받아오는 로직
        try {
            const res = await axios.get(`http://34.22.100.104:8080/api/guildWar?roomNumber=${roomNumber}`);
            console.log(res.data); // API에서 반환된 데이터
            setFirstGuild(res.data.data.first);
            setSecondGuild(res.data.data.second);

        } catch (error) {
            console.error('There was an error!', error);
        }

    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} style={styles.backButton}>
                    <Text style={styles.buttonText}>나가기</Text>
                </TouchableOpacity>
                <Text style={styles.title}>길드전</Text>
            </View>

            <Text>Room Number : {roomNumber} </Text>
            
            <View style={styles.subContainer}>
                <View style={styles.guildContainer}>
                    {firstGuild && (
                        <>
                            <Text style={styles.guildName}>{firstGuild[0]?.guildName}</Text>
                            {firstGuild.map((member, index) => (
                                <Text key={index} style={styles.guildMemberContainer}>{index + 1}. {member.memberName}</Text>
                            ))}
                        </>
                    )}
                </View>

                <Text style={styles.vsText}>VS</Text>

                <View style={styles.guildContainer}>
                    {secondGuild && (
                        <>
                            <Text style={styles.guildName}>{secondGuild[0]?.guildName}</Text>
                            {secondGuild.map((member, index) => (
                                <Text key={index} style={styles.guildMemberContainer}>{index + 1}. {member.memberName}</Text>
                            ))}
                        </>
                    )}
                </View>

                <TouchableOpacity onPress={toMatchResult} style={styles.resultButton}>
                    <Text style={styles.buttonText}>대전결과 조회</Text>
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
    guildMemberContainer: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        borderWidth: 1, // 1픽셀 테두리 너비
        borderColor: '#000', // 검은색 테두리
        borderRadius: 10, // 모서리 둥근 정도
        padding : 10,
        backgroundColor: 'white', 
    },
    guildContainer:{
        marginTop: 10,
        borderWidth: 1, // 1픽셀 테두리 너비
        borderColor: '#000', // 검은색 테두리
        borderRadius: 10, // 모서리 둥근 정도
        padding : 10,
        backgroundColor: '#F0F0F0', 
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