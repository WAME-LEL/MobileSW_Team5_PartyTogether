import {View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';

//생성된 길드 정보 ->DB

//게임 선택 목록
const games = [
    { id: 'lol', name: '리그오브레전드' },
    { id: 'loa', name: '로스트아크' },
    { id: 'valo', name: '발로란트' },
    
];


const CreateGuild = () =>{
    const [guildName, setGuildName] = useState('');
    const [guildDescription, setGuildDescription] = useState('');
    const [guilds, setGuilds] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);

    //길드생성 버튼이벤트
    const CreateGuildBtn = async () => {
        if (guildName.trim().length > 0 && guildDescription.trim().length > 0 && selectedGame) {

            const gameInfo = games.find(game => game.id === selectedGame);
            if (!gameInfo) {
                console.warn('게임을 선택해주세요.');
                return;
            }

            const newGuild = {
                name: guildName,
                description: guildDescription,
                game: gameInfo.name,
            };
            
            // 새 길드를 목록에 추가하고 로그에 표시
            setGuilds(previousGuilds => {
                const updatedGuilds = [...previousGuilds, newGuild];
                console.log('생성된 길드:', newGuild); // 현재 저장한 길드만 로그에 표시
                return updatedGuilds;
            });

            // 입력 필드를 비움
            setGuildName('');
            setGuildDescription('');
            setSelectedGame(null);

            //길드생성 요청 (임시)
            /*try {
                const response = await fetch('http://your-api-server.com/create-guild', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    name: guildName,
                    description: guildDescription,
                    game: gameInfo.name,
                  }),
                });
                const data = await response.json();
                console.log('서버로부터의 응답:', data);
              } catch (error) {
                console.error('서버 요청 중 오류 발생:', error);
            }*/
        } else {
            console.warn('길드 이름과 소개를 입력하고, 게임을 선택해 주세요.');
        }
    };

    

    const onRadioPress = (gameId) => {
        setSelectedGame(gameId);
      };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>길드 생성</Text>
            </View>

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
                        onPress={() => onRadioPress(game.id)}>
                        <View style={[
                            styles.radioCircle, 
                            selectedGame === game.id && styles.selectedRadioCircle
                        ]}>
                            {selectedGame === game.id && <View style={styles.selectedRadioDot} />}
                        </View>
                        <Text style={styles.radioText}>{game.name}</Text>
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