import {View, Modal, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../components'
import GuildMatch from './guildMatch/GuildMatch';
import GuildRanking from './GuildRanking';
import axios from 'axios';

//ContextAPI

const screenHeight = Dimensions.get('window').height;

const GuildInformation = () => {
    const [currentPage, setCurrentPage] = useState('GuildInformation'); //페이지 상태 변수
    const [isLoading, setIsLoading] = useState(false); //로딩 상태변수
    const { uid } = useContext(UserContext); //uid 저장
    // const [uid, setUid] = useState(106); //임시 유저id
    const [guildMembers, setGuildMembers] = useState([]); //멤버목록 상태변수
    const [guildInfo, setGuildInfo] = useState({}); //길드정보 상태변수
    const [guildGame, setGuildGame] = useState({}); //길드게임 상태변수
    const [memberCnt, setmemberCnt] = useState({}); //길드멤버수 상태변수


    // 로딩화면 Modal
    const LoadingModal = () => (
        <Modal
            transparent={true}
            animationType="none"
            visible={isLoading}
            onRequestClose={() => {}}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator animating={isLoading} />
                    <Text style={styles.loadingText}>길드정보 불러오는 중...</Text>
                </View>
            </View>
        </Modal>
    );

    //멤버 목록 받아오기
    const fetchGuildMembers = async () => {
        try {
            const res = await axios.get(`http://34.22.100.104:8080/api/guild/members?memberId=${uid}`);
            console.log(res.data); // API에서 반환된 데이터
            setGuildMembers(res.data.data) //멤버목록

        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    //길드정보 받아오기
    const fetchGuildInfo = async () => {
        setIsLoading(true);

        try {
            const res = await axios.get(`http://34.22.100.104:8080/api/guild?memberId=${uid}`);
            console.log(res.data); // API에서 반환된 데이터
            setGuildInfo(res.data.data.guild) //길드정보
            setGuildGame(res.data.data.guild.game) //하는게임
            setmemberCnt(res.data.data.guild.member) //멤버수
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.error('There was an error!', error);
        }

        
    }

    useEffect(() => {

        fetchGuildInfo();
        fetchGuildMembers(); 
    }, []);

    const toGuildMatch = () => {
        setCurrentPage('GuildMatch');
    };
    const toGuildRanking = () => {
        setCurrentPage('GuildRanking');
    };


    if (currentPage === 'GuildRanking') {
        return <GuildRanking guildInfo={guildInfo} goBack={() => setCurrentPage('GuildInformation')} />;
    }
    if (currentPage === 'GuildMatch') {
        return <GuildMatch guildInfo={guildInfo} goBack={() => setCurrentPage('GuildInformation')} />;
    }

    return (
        <View style={styles.container}>

            <LoadingModal />

            <View style={styles.guildInfoContentBox}>

                <Text style={styles.guildInfoContentText}>
                    길드 이름 : {guildInfo.name}
                </Text>
                <Text style={styles.guildInfoContentText}>
                    길드 소개 : {guildInfo.introduce}
                </Text>
                <Text style={styles.guildInfoContentText}>
                    하는 게임 : {guildGame.title}
                </Text>
                <Text style={styles.guildInfoContentText}>
                    인원수 : {memberCnt.length} / 30
                </Text>


                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toGuildMatch}>
                        <Text style={styles.buttonText}>길드전</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.guildRankingButton]} onPress={toGuildRanking}>
                        <Text style={styles.buttonText}>길드랭킹</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.guildMemberTitleContentBox}>
                <Text style={styles.guildMemberTitleContentText}>
                    길드 멤버
                </Text>
            </View>

            <ScrollView>
                {guildMembers.map((member, index) => (
                    <View key={index} style={styles.guildMemberContentBox}>
                        <Text style={styles.detailItem}>
                            {index + 1})  {member.nickname}
                        </Text>
                    </View>
                ))}
            </ScrollView>

        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#333',
        padding: 10,
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 20,
    },
    guildInfoContentBox: {
        marginTop: 20,
        marginHorizontal: 20, // 좌우 여백
        backgroundColor: '#fff', // 배경색은 하얀색으로 설정
        padding: 20, // 내용 주위에 padding 추가
        borderRadius: 10, // 모서리를 둥글게 설정
        borderWidth: 1, // 테두리 두께 설정
        borderColor: '#ddd', // 테두리 색상 설정
        elevation: 3, //테두리 그림자
        height: 370,

    },
    guildMemberTitleContentBox: {
        marginTop: 10,
        backgroundColor: '#333', 
        padding: 10, // 내용 주위에 padding 추가
        borderWidth: 1, // 테두리 두께 설정
    },
    guildInfoContentText: {
        fontSize: 18,
        color: '#333', // 글자 색상 설정
        marginBottom: 10, // 각 항목 사이의 간격 추가
        fontWeight: 'bold', // 글씨 굵기
    },
    buttonContainer: {
        position: 'absolute', // 절대적인 위치 지정
        right: 10, // 우측에서부터의 위치
        bottom: 10, // 하단에서부터의 위치
        flexDirection: 'row', // 버튼들을 가로로 나열
    },
    button: {
        backgroundColor: '#FF0000', 
        padding: 10,
        borderRadius: 20,
    },
    guildRankingButton: {
        marginLeft: 10, // 첫 번째 버튼과의 간격
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    guildMemberTitleContentText: {
        fontSize: 16,
        color: 'white',
    },
    guildMemberContentBox: {
        marginTop: 10, // 상단 여백
        marginHorizontal: 10, // 좌우 여백
        backgroundColor: '#fff', // 배경색
        padding: 15, // 내부 패딩
        borderWidth: 2, // 테두리 두께
        borderColor: '#ddd', // 테두리 색상
        borderRadius: 10, // 모서리 둥글기
        elevation: 2, // 그림자 
        shadowRadius: 2, 
    },
    detailItem: {
        fontSize: 16,
        color: '#333', // 글자 색상 설정
        paddingTop: 5, // 상단 패딩
        paddingBottom: 5, // 하단 패딩
        fontWeight: '500',  
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
    loadingText: { 
        marginTop: 10, 
        fontSize: 16, 
        color: '#000', 
    },
});

export default GuildInformation;