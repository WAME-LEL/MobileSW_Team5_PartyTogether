import {View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator  } from 'react-native';
import React, { useState, useContext } from 'react';
import { UserContext } from '../../components'
import axios from 'axios';

//길드 목록을 받아서 정보표시(이름, 하는게임, 인원수)
//가입버튼 기능 (길드장에게 가입요청 -> 길드장이 승인 시 가입)

const GuildSearch = () =>{
    const [guilds, setGuilds] = useState([]); //길드목록 받아오는 상태변수
    const [showGuilds, setShowGuilds] = useState(false); //길드목록 show여부 상태변수
    const [isLoading, setIsLoading] = useState(false);
    const { uid } = useContext(UserContext);
    // const [uid, setUid] = useState(402); //가입하는 유저id (임시)

    //길드찾기
    const loadGuilds = async () => {
      setShowGuilds(false);
      setIsLoading(true);

      try {
        const res = await axios.get('http://34.22.100.104:8080/api/guilds');
        console.log(res.data); // API에서 반환된 데이터
        setGuilds(res.data.data) //길드목록

        setShowGuilds(true);

      } catch (error) {
          console.error('There was an error!', error);
      }

      setIsLoading(false);
    };

    //길드가입
    const joinGuild = async (guildId) => { //선택한 길드의 id 값 전달
    
      try {
        const res = await axios.post('http://34.22.100.104:8080/api/member/guild/join', {
          memberId: uid, //유저id
          guildId: guildId //가입 희망하는 길드id
        });
    
        console.log('백엔드 응답:', res.data);
        alert('길드 가입 완료');
        
      } catch (error) {
        console.error('가입 요청 중 오류 발생:', error);
      }
    };


    return (
        <View style={styles.container}>

            {isLoading && (
              <ActivityIndicator style={styles.loadingContainer} size="large" color="#0000ff" />
            )}

            {showGuilds ? (
                <FlatList
                    data={guilds}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <View style={styles.guildContainer}>
                            <View style={styles.guildDetails}>
                                <Text style={styles.guildName}>길드이름 : {item.guildName}</Text>
                                <Text style={styles.guildGame}>하는 게임 : {item.game.title}</Text>
                                <Text style={styles.numOfPeople}>현재 길드원 : {item.memberCount} / 30</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.joinButton}
                                onPress={() => joinGuild(item.guildId)}>
                                <Text style={styles.joinButtonText}>가입</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            ) : null}

            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={loadGuilds}>
                    <Text style={styles.buttonText}>길드 찾기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // 전체 화면을 사용
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
    guildItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
    footer: {
        position: 'absolute',
        padding: 20, // 박스 내부의 패딩
        backgroundColor: '#f8f8f8', // 박스의 배경색
        bottom: 0,
        width: '100%',
    },
    button: {
        backgroundColor: '#f05454', // 버튼의 배경 색상
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    guildContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    guildDetails: {
        flex: 1,
      },
    guildName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    guildGame: {
        fontSize: 14,
    },
    numOfPeople: {

    },
    joinButton: {
        backgroundColor: '#5cb85c', // '가입' 버튼의 배경 색상
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    joinButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    loadingContainer: {
      position: 'absolute', // 절대 위치
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
  },
});

export default GuildSearch;