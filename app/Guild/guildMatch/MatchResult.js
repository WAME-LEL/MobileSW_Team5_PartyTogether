import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 대전 결과 보기 로직
// 라이엇 API (전적 조회)
// 승패에 따른 포인트 지급
// 결과조회 페이지로 이동 => 길드대표의 인게임id 입력 => 승패결과 조회
// 결과조회시 불러올 데이터 => 승패 결과, 대전일시, 참여 플레이어

const MatchResult = ( {goBack} ) => {
    const [nickname, setNickname] = useState('');
    const [userInfo,setUserInfo] = useState({});
    const [playMember,setPlayMenber] = useState({});
    const [gameInfo,setGameInfo] = useState({});


    const handleSearch = async() => {
        api_key='RGAPI-2ba76b30-2a87-42b4-bbf2-ffa3fa51d485'

        try {
            const userRes = await axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nickname}?api_key=${api_key}`);


            if (userRes.status === 200) {
                setUserInfo(userRes.data); // 유저 정보 저장 (id (encryptedAccountId), puuid, name 포함)
    
                const puuid = userRes.data.puuid; // userRes에서 puuid를 가져옴
                const recordRes = await axios.get(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${api_key}&start=0&count=1`);

                if (recordRes.status === 200) {
                    console.log(recordRes.data) //가장 최근 전적데이터

                    const matchid = recordRes.data;
                    const matchRes = await axios.get(`https://asia.api.riotgames.com/lol/match/v5/matches/${matchid}?api_key=${api_key}`);

                    console.log('전적 세부 정보',matchRes.data.metadata); //전적 세부정보 콘솔로그 확인
                    setPlayMenber(matchRes.data.metadata.participants); //게임에 첨여한 유저id
                    setGameInfo(matchRes.data.info); //gameEndTimestamp, gameStartTimestamp 저장
                };
            };

        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={goBack} style={styles.backButton}>
                    <Text style={styles.buttonText}>뒤로</Text>
                </TouchableOpacity>
                <Text style={styles.title}>결과조회</Text>
            </View>

            <View style={styles.searchSection}>
                <TextInput
                    style={styles.input}
                    onChangeText={setNickname}
                    value={nickname}
                    placeholder="닉네임을 입력하세요"
                />
                <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                    <Text style={styles.buttonText}>결과 불러오기</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.resultsContainer}>
                <Text>{userInfo.puuid}</Text>
                <Text>{userInfo.name}</Text>
            </ScrollView>

            <View style={styles.additionalBox}>
                <Text style={styles.additionalText}>여기에 추가적인 텍스트를 표시합니다.</Text>
            </View>
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
        flexDirection: 'row',
        justifyContent: 'center',
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
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#333',
        padding: 8,
        marginRight: 10,
        borderRadius: 5,
    },
    searchButton: {
        backgroundColor: 'skyblue',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 5,
    },
    resultsContainer: {
        flex: 1,
        padding: 10,
        borderWidth: 1, // 테두리 두께 추가
        borderColor: '#333', // 테두리 색상 추가
        borderRadius: 5,
    },
    additionalBox: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 5,
        marginTop: 10, // 상단 여백
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    additionalText: {
        fontSize: 20,
        fontWeight: 'bold', // 굵은 폰트
    },
})
export default MatchResult;