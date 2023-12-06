import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


//Unix TimeStamp 값을 실제 시간으로 변환
const convertUnixTimestamp = (unixTimestamp) => {
    const date = new Date(unixTimestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;  // 월은 0부터 시작하므로 1을 더해줍니다.
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // 각 항목을 항상 두 자리 숫자로 표시하기 위해 '0'을 추가하고, 마지막 두 자리만 사용합니다.
    const formattedMonth = `0${month}`.slice(-2);
    const formattedDay = `0${day}`.slice(-2);
    const formattedHours = `0${hours}`.slice(-2);
    const formattedMinutes = `0${minutes}`.slice(-2);
    const formattedSeconds = `0${seconds}`.slice(-2);

    return `${year}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const MatchResult = ( {goBack, guildInfo} ) => {
    const [nickname, setNickname] = useState(''); //검색창에 입력한 닉네임
    const [userInfo,setUserInfo] = useState(null); //입력한 닉네임에 대한 유저정보
    const [playMember,setPlayMenber] = useState(null); //게임에 첨여한 플레이어 uid
    const [myWinData,setMyWinData] = useState(''); //입력한 닉네임에 대한 승리데이터
    const [myGuild, setMyGuild] = useState(null); //자신이 속한 길드 이름
    const [guildId, setGuildId] = useState(null); //자신이 속한 길드id
    const [playMemberNickname,setPlayMemberNickname] = useState(null); //게임에 참여한 플레이어 실제 닉네임
    const [gameInfo,setGameInfo] = useState(null);  //해당 대전정보
    const [startDateTime,setStartDateTime] = useState(''); //대전이 시작한 시간
    const [endDateTime,setendDateTime] = useState(''); //대전이 종료된 시간
    const [timeDiffer,setTimeDiffer] = useState(false); //현재시각과 대전 종료 시간의 시차

    // 처음 화면실행
    useEffect(() => {
        setMyGuild(guildInfo.name);
        setGuildId(guildInfo.id)

        //gameInfo에 데이터가 들어오면 실행
        if (gameInfo) {
            const startDateTimeRes = convertUnixTimestamp(gameInfo.gameStartTimestamp);
            const endDateTimeRes = convertUnixTimestamp(gameInfo.gameEndTimestamp);
            setStartDateTime(startDateTimeRes);
            setendDateTime(endDateTimeRes);

            checkTimeDifference(endDateTimeRes);
        }
    }, [gameInfo]);

    //현재 시간과 게임 종료시간을 비교
    const checkTimeDifference = (endDateTime) => {
        const currentTime = new Date();
        const endTime = new Date(endDateTime);

        const timeDiff = currentTime - endTime; // 밀리초 단위의 차이
        const minutesDiff = timeDiff / 60000; // 분 단위로 변환

        if (minutesDiff >= 5) {
            setTimeDiffer(true);
        } else {
            setTimeDiffer(false); // 시간 만료 상태를 false로 설정
        }
    };

    //검색버튼 
    const handleSearch = async() => {
        api_key='RGAPI-d9e3aaa3-4814-492b-b5c1-fcca28fcf4d7'

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

                    if (matchRes.status === 200) {

                        console.log('전적 세부 정보',matchRes.data.metadata); //전적 세부정보 콘솔로그 확인
                        setPlayMenber(matchRes.data.metadata.participants); //게임에 첨여한 유저id
                        setGameInfo(matchRes.data.info); //gameEndTimestamp, gameStartTimestamp 저장
                        
                        const playerNicknames = matchRes.data.info.participants.map(participant => participant.summonerName);
                        setPlayMemberNickname(playerNicknames); // 참가자 닉네임 저장

                        const hideOnBushData = matchRes.data.info.participants.find(participant => participant.summonerName === nickname);

                        if (hideOnBushData) {
                            console.log(nickname, "의 승패 여부:", hideOnBushData.win);
                            setMyWinData(hideOnBushData.win);

                            if(myWinData === true) {
                                winnerPointPayments(); //길드포인트 지급 함수
                            }
                        }
                    }
                };
            };

        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const apiGet = () => {
        if(myWinData === true) {
            winnerPointPayments(); //길드포인트 지급 함수
        }
        goBack();
    };

    const winnerPointPayments = async () => {
        if (timeDiffer) {
            alert("포인트지급 시간이 만료되어 포인트를 받을 수 없습니다.");
            return; // 함수를 여기서 종료하고, 포인트 지급을 하지 않습니다.
        }

        try {
            const response = await axios.post('http://34.22.100.104:8080/api/guild/point/add', {
                // POST 요청에 필요한 데이터
                guildId: guildId,
                point: 1500, 
            });
            console.log('백엔드 응답 :',response.data);
    
        } catch (error) {
            console.error('포인트 지급 실패:', error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>결과확인</Text>
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

            <View style={styles.resultsContainer}>
            
                {gameInfo && startDateTime && endDateTime && playMemberNickname && (
                    <>
                        <Text> </Text>
                        <Text style={styles.boldText}>대전 시작시간 : {startDateTime}</Text>
                        <Text style={styles.boldText}>대전 종료시간 : {endDateTime}</Text>
                        <Text> </Text>
                        <View style={styles.subResultsContainer}>
                            <View style={styles.blueGuildMemberContainer}>
                                <Text style={styles.blueTeam}>블루팀</Text>
                                <Text> </Text>
                                {playMemberNickname.slice(0, 5).map((nickname, index) => (
                                    <Text key={index} style={styles.boldText}>{index+1}. {nickname}</Text>
                                ))}
                            </View>

                            <Text style={styles.vsText}>VS</Text>

                            <View style={styles.redGuildMemberContainer}>
                            <Text style={styles.redTeam}>레드팀</Text>
                            <Text> </Text>
                                {playMemberNickname.slice(5, 10).map((nickname, index) => (
                                    <Text key={index + 5} style={styles.boldText}>{index+1}. {nickname}</Text>
                                ))}
                            </View>
                        </View>

                        <Text> </Text>
                        <View style={styles.winnerResultsContainer}>
                            <Text style={styles.resultTitle}>길드전 결과</Text>
                            <Text> </Text>
                            {myGuild && (
                                <>
                                    <Text style={styles.winnerTeam}>
                                        {gameInfo.teams[0].win && (gameInfo.teams[0].teamId === 100 ? "블루팀 승리" : "레드팀 승리")}
                                        {gameInfo.teams[1].win && (gameInfo.teams[1].teamId === 100 ? "블루팀 승리" : "레드팀 승리")}
                                    </Text>
                                    <Text style={styles.winnerGuild}>
                                        {myWinData === true ? `${myGuild}  WIN !!!` : `${myGuild}  LOSE...`}
                                    </Text>
                                    
                                    <Text> </Text>
                                    <Text style={styles.winnerGuild}>
                                        {myWinData === true ? "길드 포인트 +1500 GET!!" : " 길드 포인트 +0"}
                                    </Text>
                                </>
                            )}
                        </View>
                    </>
                )}
            </View>

            <TouchableOpacity onPress={apiGet} style={styles.additionalBox}>
                    <Text style={styles.additionalText}>포인트 수락 / 나가기</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D3D3D3',
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
    resultTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4A90E2', // Example color
        textAlign: 'center',
        padding: 10,
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
        backgroundColor: 'white', 
    },
    searchButton: {
        backgroundColor: 'skyblue',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 5,
    },
    subResultsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', // 공간을 균등하게 분배
        alignItems: 'center',
        padding: 10,
        
    },
    winnerResultsContainer: {
        flex: 1,
        padding: 10,
        borderWidth: 1, // 테두리 두께 추가
        borderColor: '#333', // 테두리 색상 추가
        borderRadius: 10,
        backgroundColor: '#333333',
    },
    winnerTeam: {
        fontSize: 20,
        fontWeight: 'bold', // 굵은 글씨체
        color: 'white',
        textAlign: 'center',
    },
    winnerGuild: {
        fontSize: 30,
        fontWeight: 'bold', // 굵은 글씨체
        color: 'yellow',
        textAlign: 'center',
    },
    blueGuildMemberContainer: {
        flex: 1,
        padding: 10,
        borderWidth: 3, // 굵은 테두리
        borderColor: 'blue', // 파란색 테두리
        borderRadius: 5,
        marginHorizontal: 5,
        shadowColor: '#000', // 그림자 색상
        shadowOffset: { width: 0, height: 2 }, // 그림자 위치
        shadowOpacity: 0.15, // 그림자 투명도
        shadowRadius: 5.84, // 그림자 블러 반경
        elevation: 5, // Android에서의 그림자 효과
    },
    redGuildMemberContainer: {
        flex: 1,
        padding: 10,
        borderWidth: 3, // 굵은 테두리
        borderColor: 'red', // 파란색 테두리
        borderRadius: 5,
        marginHorizontal: 5,
        shadowColor: '#000', // 그림자 색상
        shadowOffset: { width: 0, height: 2 }, // 그림자 위치
        shadowOpacity: 0.15, // 그림자 투명도
        shadowRadius: 5.84, // 그림자 블러 반경
        elevation: 5, // Android에서의 그림자 효과
    },
    vsText: {
        fontSize: 30,
        fontWeight: 'bold',
        padding: 10,
    },
    resultsContainer: {
        flex: 1,
        padding: 10,
        borderWidth: 1, // 테두리 두께 추가
        borderColor: '#333', // 테두리 색상 추가
        borderRadius: 5,
        backgroundColor: 'white', 
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
        backgroundColor: 'orange',
    },
    additionalText: {
        fontSize: 20,
        fontWeight: 'bold', // 굵은 폰트
        color: 'white',
    },
    blueTeam: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue',
        textAlign: 'center',
        
    },
    redTeam: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'center',
    },
    boldText: {
        fontSize: 13,
        fontWeight: 'bold', // 굵은 글씨체
    },
})
export default MatchResult;