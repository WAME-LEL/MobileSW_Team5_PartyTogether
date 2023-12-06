import {View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../components'
import axios from 'axios';


const CreateGuild = () =>{
    const { uid } = useContext(UserContext); //UserContext => uid
    // const [uid, setUid] = useState(152);  //userId 임시
    const [games, setGames] = useState([]); //하고있는 게임 
    const [guildName, setGuildName] = useState(''); //길드 이름
    const [guildDescription, setGuildDescription] = useState(''); //길드 설명
    const [selectedGame, setSelectedGame] = useState(null); //선택한 게임

    //게임리스트 받기
    const getGameList = async () => {
        try {
            const res = await axios.get('http://34.22.100.104:8080/api/game',);
            console.log(res)
            setGames(res.data.data); // API에서 반환된 데이터

        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    useEffect(() => {
        getGameList();
    }, []);

    //길드생성 버튼이벤트
    const CreateGuildBtn = async () => {
        if (guildName.trim().length > 0 && guildDescription.trim().length > 0 && selectedGame) {
            const gameInfo = games.find(game => game.id === selectedGame); //사용자가 선택한 게임찾기

            if (!gameInfo) {
                console.warn('게임을 선택해주세요.');
                return;
            }

            try {
                // 백엔드 서버에 길드 생성 요청을 보냅니다.
                const response = await axios.post('http://34.22.100.104:8080/api/guild/registration', {
                    guildName: guildName,
                    guildIntroduce: guildDescription,
                    guildGame: gameInfo.id, //선택한 게임 id
                    guildLeader: uid,
                });
                console.log('백엔드 응답:', response.data);
                
                // 입력 필드를 비움
                resetForm();

            } catch (error) {
                console.error('길드 생성 중 에러 발생:', error);
            }

        } else {
            console.warn('길드 이름과 소개를 입력하고, 게임을 선택해 주세요.');
        }
    };

    //입력필드 초기화
    const resetForm = () => {
        setGuildName('');
        setGuildDescription('');
        setSelectedGame(null);
    };

    const onRadioPress = (gameId) => {
        setSelectedGame(gameId);
    };

    return (
        <View style={styles.container}>

            <View style={styles.contentBox}>
                <Text>길드명 입력</Text>
                <TextInput
                    style={styles.input}
                    placeholder="길드 이름을 입력하세요"
                    value={guildName}
                    onChangeText={setGuildName} // 길드 이름이 변경될 때 상태를 업데이트
                />
                <Text> </Text>
                <Text>길드소개 입력</Text>
                <TextInput
                    style={styles.guildDescriptionInput}
                    placeholder="길드 소개를 입력하세요"
                    value={guildDescription}
                    onChangeText={setGuildDescription}
                    multiline //여러 줄 입력 가능
                    numberOfLines={4} //초기에 표시되는 줄 수
                />

                <Text> </Text>
                <Text>게임 선택</Text>
                <ScrollView style={styles.scrollView}>
                    {games.map((game) => (
                        <TouchableOpacity
                            key={game.id}
                            style={styles.radioContainer}
                            onPress={() => onRadioPress(game.id)}
                        >
                            <View style={[
                                styles.radio,
                                { backgroundColor: selectedGame === game.id ? 'blue' : 'white' }
                            ]}/>
                            <Text style={styles.radioText}>{game.title}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                
            </View>

            

            <View style={styles.footer}>
                <TouchableOpacity style={styles.createButton} onPress={CreateGuildBtn}>
                    <Text style={styles.createButtonText}>길드 생성하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // 전체 화면을 사용하도록 설정
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
    contentBox: {
        padding: 10,
    },
    input: {
        marginTop: 10,
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
    },
    guildDescriptionInput: {
        marginTop: 10,
        borderWidth: 1,
        height: 100,
        padding: 10,
        borderRadius: 10,
        textAlignVertical: 'top',
    },
    footer: {
        padding: 10,
        justifyContent: 'flex-end', // 버튼을 하단에 위치시킵니다.
        flex: 1, // 컨테이너가 남은 공간을 모두 차지하도록 합니다.
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#444',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    selectedRadioCircle: {
        borderColor: 'blue',
    },
    selectedRadioDot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: 'blue',
    },
    radioText: {
        fontSize: 16,
        color: '#444',
    },
    scrollView: {
        height: 400,
        borderWidth: 1, // 테두리 두께
        borderColor: '#ddd', // 테두리 색상, 원하는 색상으로 변경 가능
        borderRadius: 10, // 테두리의 모서리 둥글기
        padding: 10,
    },
    createButton: {
        height: 50, // 버튼의 높이를 지정합니다.
        backgroundColor: 'orange', // 버튼의 배경색을 지정합니다.
        justifyContent: 'center', // 텍스트를 버튼 중앙에 위치시킵니다.
        alignItems: 'center', // 텍스트를 버튼 중앙에 위치시킵니다.
        borderRadius: 5, // 버튼의 모서리를 둥글게 합니다.
    },
    createButtonText: {
        color: '#fff', // 버튼 텍스트 색상을 지정합니다.
        fontSize: 16, // 버튼 텍스트 크기를 지정합니다.
        fontWeight: 'bold', // 버튼 텍스트를 굵게 합니다.
    },
});

export default CreateGuild;