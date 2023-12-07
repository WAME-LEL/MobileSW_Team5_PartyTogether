import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import axios from 'axios';

const AITest = () => {
    const RIOT_API_KEY = 'RGAPI-d9e3aaa3-4814-492b-b5c1-fcca28fcf4d7'   // Riot API Key
    const OPENAI_API_KEY = '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' // OpenAI API Key
    const model = 'gpt-4'       //  모델


    const [summonerName, setSummonerName] = useState('');   //소환사(리그오브레전드의 유저) 이름
    const [myMatchData, setMyMatchData] = useState('');     //소환사의 최근 전적 데이터
    const [gptResult, setGptResult] = useState('');         //GPT 분석 결과
    const [state, setState] = useState("");                 //상태


    const handlePress = async () => {
        setState("전적을 가져오는 중 입니다.");
        try {
            //다른 API들을 활용하기 위한 PUUID 가져오기
            const data = await axios.get(`https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${RIOT_API_KEY}`)
            const puuid = data.data.puuid
            if (puuid) {

                // 가장 최근 전적 데이터 ID 가져오기
                const recordRes = await axios.get(`https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${RIOT_API_KEY}&start=0&count=1`);
                const resentMatchId = recordRes.data[0]; // 데이터 배열에서 첫 번째 ID 추출

                if (resentMatchId) {
                    // 가장 최근 전적 데이터 가져오기
                    const matchRes = await axios.get(`https://asia.api.riotgames.com/lol/match/v5/matches/${resentMatchId}?api_key=${RIOT_API_KEY}`);
                    if (matchRes.status === 200) {

                        // 팀 전적 데이터 중 내 전적 데이터만 추출
                        for (let i = 0; i < 10; i++) {
                            if (matchRes.data.info.participants[i].riotIdGameName === summonerName) {
                                setMyMatchData(JSON.stringify(matchRes.data.info.participants[i]));
                            }
                        }
                    }
                }
            }

        } catch (error) {
            console.log(error)
        }

    }

    // GPT 분석 함수
    const gptAnalysis = async () => {
        setState("GPT가 분석 중 입니다.");
        const messages = [
            { "role": "system", "content": "당신은 전력 분석관 입니다. RIOT API에서 응답받은 전적 데이터를 보고 해당 유저의 장점과 단점, 보완해야할점, 결론을 매우 상세하게 적어주십시오" },
            { "role": "user", "content": myMatchData }];

        // 에러 발생 시 재시도 하기 위한 GPT 분석 실행 함수
        const executeGptAnalysis = async () => {
            try {
                const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                    model: model,
                    messages: messages,
                    temperature: 0.7,       //시행착오 결과 가장 적합하다 판단한 0.7로 설정
                },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${OPENAI_API_KEY}`,
                        },

                    },

                );
                setGptResult(response.data.choices[0].message.content);

            } catch (error) {
                console.log(error)
                console.log('재시도중입니다...')
                await executeGptAnalysis();
            }


            setState("GPT가 분석을 완료했습니다");


        }

        // GPT 분석 최초 실행
        executeGptAnalysis();
    }

    useEffect(() => {
        if(myMatchData){
            gptAnalysis()
        }
    }, [myMatchData]) //myMatchData가 변경될 때마다 실행}


    return (
        <View style={styles.container}>
            <Text>ChatGPT 전적 분석</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={text => setSummonerName(text)}
                value={summonerName} />
            <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>검색</Text>
            </TouchableOpacity>
            <Text>{state}</Text>

            <ScrollView>
                {gptResult &&
                    <>
                        <Text>{summonerName}님의 최근 전적 분석 결과</Text>
                        <Text>{gptResult}</Text>
                    </>
                }


            </ScrollView>


        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
    }
});

export default AITest;