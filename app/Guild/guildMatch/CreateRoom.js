import { View, Text, StyleSheet, TouchableOpacity, Modal  } from 'react-native';
import React, { useState, useEffect } from 'react';
import MatchResult from './MatchResult';
import { UserContext } from '../../../components'
import axios from 'axios';

//방ID, 방에 입장한 각 길드정보(길드이름, 길드ID, 길드 멤버) 받아오기

const CreateRoom = ( {goBack, roomNumber, guildInfo} ) => {
    const [currentPage, setCurrentPage] = useState('CreateRoom');
    const [firstGuild, setFirstGuild] = useState(null);
    const [secondGuild, setSecondGuild] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [uid, setUid] = useState(402); //임시 유저id
    // const { uid } = useContext(UserContext); //uid 저장

    useEffect(() => {
        getMatchingData();
        setModalVisible(true);
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
        return <MatchResult guildInfo={guildInfo} goBack={() => setCurrentPage('CreateRoom')} />;
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

    const roomExit = async () => {
        try {
            const reponse = await axios.post('http://34.22.100.104:8080/api/guildWar/exit', {
                memberId: uid,
            })

            console.log('백엔드 응답 :',reponse.data);
        } catch (error) {
            console.error('방 나가기 실패:', error);
        }

        goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={roomExit} style={styles.backButton}>
                    <Text style={styles.buttonText}>나가기</Text>
                </TouchableOpacity>
                <Text style={styles.title}>길드전</Text>
            </View>

            <Text>Room Number : {roomNumber} </Text>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>길드전 안내</Text>
                        <Text style={styles.modalText}>길드전 결과는 '대전결과 조회'를 통해 확인하실 수 있습니다.</Text>
                        <Text style={styles.warnningTitle}>주의</Text>
                        <Text style={styles.warnningText}>부적절한 방식을 통해 포인트를 획득할 경우 길드 전체에 불이익이 발생할 수 있습니다.</Text>
                        <Text style={styles.warnningText}>길드전 종료 후 5분 이내로 길드 포인트를 수락하지 않을 경우, 입수가 불가능합니다.</Text>
                        <TouchableOpacity
                            style={styles.buttonClose}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.textStyle}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            
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
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 10,
        borderWidth: 1, // 1픽셀 테두리 너비
        borderColor: '#000', // 검은색 테두리
        borderRadius: 10, // 모서리 둥근 정도
        padding : 10,
        backgroundColor: 'white', 
    },
    guildContainer:{
        borderWidth: 1, // 1픽셀 테두리 너비
        borderColor: '#000', // 검은색 테두리
        borderRadius: 10, // 모서리 둥근 정도
        padding : 5,
        backgroundColor: '#F0F0F0', 
    },
    header: {
        backgroundColor: '#333',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
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
        marginVertical: 5,
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "#333333",
        borderRadius: 10,
        padding: 35,
        alignItems: "center",
        
    },
    modalTitle: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 25,
        color: 'white',
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: 'white',
    },
    warnningTitle: {
        marginBottom: 10,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: 'red',
    },
    warnningText: {
        marginBottom: 15,
        textAlign: "center",
        color: 'red',
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    }
});

export default CreateRoom