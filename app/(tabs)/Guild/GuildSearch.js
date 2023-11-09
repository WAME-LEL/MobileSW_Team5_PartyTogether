import {View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList  } from 'react-native';
import React, { useState } from 'react';

//길드 목록을 받아서 정보표시(이름, 하는게임, 인원수)
//가입버튼 기능 (길드장에게 가입요청 -> 길드장이 승인 시 가입)

const joinGuild = (guildId) => {
  console.log(`Joining guild with ID: ${guildId}`);
  // 서버에 가입 요청 보내는 로직 추가
};

const GuildSearch = () =>{
    // 길드 정보를 담고 있는 상태
    const [guilds, setGuilds] = useState([]);
    // 길드 목록을 보여줄지 결정하는 상태
    const [showGuilds, setShowGuilds] = useState(false);

    const loadGuilds = () => {
        // 예시 데이터, 실제 앱에서는 서버에서 데이터를 가져오는 로직이 필요
        const guildData = [
          { id: '1', name: 'Guild One', game: '리그오브레전드', curNum :'10', totalNum :'30' },
          
          
        ];
        setGuilds(guildData);
        setShowGuilds(true); // 길드 목록을 화면에 표시
      };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>길드 가입</Text>
            </View>

            {showGuilds ? (
                // FlatList를 사용하여 길드 목록을 렌더링
                <FlatList
                    data={guilds}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                        <View style={styles.guildContainer}>
                            <View style={styles.guildDetails}>
                                <Text style={styles.guildName}>길드이름: {item.name}</Text>
                                <Text style={styles.guildGame}>하는 게임: {item.game}</Text>
                                <Text style={styles.numOfPeople}>현재 길드원 : {item.curNum} / {item.totalNum}</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.joinButton}
                                onPress={() => joinGuild(item.id)}>
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
});

export default GuildSearch;