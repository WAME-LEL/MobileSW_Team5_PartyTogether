import {View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect  } from 'react';
import GuildRanking from './GuildRanking';
import GuildMatch from './guildMatch/GuildMatch';
import axios from 'axios';

//ContextAPI
//길드 멤버목록 DB에서 가져옴
//길드 정보(이름, 하는 게임, 설명, 인원수, 랭킹)
//길드전 버튼이벤트 기능구현

const screenHeight = Dimensions.get('window').height;

//길드 멤버 목록 (임시)
const guildMembers = [
    'member 1',
    'member 2',
    'member 3',
    'member 4',
    'member 5',
    'member 6',
    'member 7',
    'member 8',
    'member 9',
];

const GuildInformation = () => {
    const [currentPage, setCurrentPage] = useState('GuildInformation');
    // const { userId } = useContext(UserContext);
    // const [guildMembers, setGuildMembers] = useState([]);
    const [guildInfo, setGuildInfo] = useState({});


    //멤버 목록 받아오기
    /* const fetchGuildMembers = async () => {
        const options = {
            method: 'GET',
            url: `http://localhost:8080/api/guild/members`,
            params: { "guildId" : 102 },
        };
    
        try {
            const response = await axios.request(options);
            const data = response.data;
            setGuildMembers(data); // 상태 업데이트
        } catch (error) {
            console.error('길드 멤버를 가져오는 중 오류 발생', error);
        }
    }; */

    //길드정보 받아오기
    /* const fetchGuildInfo = async () => {
    
        const options = {
            method: 'GET',
            url: 'http://localhost:8080/api/guild',
            params: { "guildId" : 102 }
        };

         try {
            const response = await axios.request(options);
            setGuildInfo(response.data); // 상태 업데이트
        } catch (error) {
            console.error('길드 정보를 가져오는 중 오류 발생:', error);
        };
    }; */
    
    const fetchGuildInfo = async () => {
        axios.get('http://localhost:8080/api/guild', {
            params: { 
                "guildId" : 102
            },
            headers: {
                'Content-Type' : 'applycation/json'
            }
        }).then(response => {
            setGuildInfo(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    };

    useEffect(() => {
        fetchGuildInfo();
        // fetchGuildMembers();
        
    }, []);

    const toGuildMatch = () => {
        setCurrentPage('GuildMatch');
    };
    const toGuildRanking = () => {
        setCurrentPage('GuildRanking');
    };


    if (currentPage === 'GuildRanking') {
        return <GuildRanking goBack={() => setCurrentPage('GuildInformation')} />;
    }
    if (currentPage === 'GuildMatch') {
        return <GuildMatch goBack={() => setCurrentPage('GuildInformation')} />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>길드 정보</Text>
            </View>


            <View style={styles.guildInfoContentBox}>

                <Text style={styles.guildInfoContentText}>
                    길드 이름: {guildInfo.name}
                </Text>
                <Text style={styles.guildInfoContentText}>
                    길드 소개: {guildInfo.introduce}
                </Text>
                <Text style={styles.guildInfoContentText}>
                    하는 게임: {guildInfo.game}
                </Text>
                <Text style={styles.guildInfoContentText}>
                    인원수: {guildInfo.memberCount}
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
                            {member}
                            {/* {member.nickname} */}
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
        height: screenHeight / 2, //contentBox크기를 전체화면의 1/2로 설정

    },
    guildMemberTitleContentBox: {
        marginTop: 10,
        backgroundColor: '#333', 
        padding: 10, // 내용 주위에 padding 추가
        borderWidth: 1, // 테두리 두께 설정
    },
    guildInfoContentText: {
        fontSize: 16,
        color: '#333', // 글자 색상 설정
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
        padding: 10, // 내부 패딩
        borderWidth: 1, // 테두리 두께
        borderColor: '#ddd', // 테두리 색상
        borderRadius: 10, // 모서리 둥글기
        elevation: 1, // 그림자 (안드로이드)
        shadowRadius: 1, // 그림자 반경 (iOS)
    },
    detailItem: {
        fontSize: 14,
        color: '#333', // 글자 색상 설정
        paddingTop: 5, // 상단 패딩
        paddingBottom: 5, // 하단 패딩    
    },
});

export default GuildInformation;