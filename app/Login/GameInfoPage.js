import react, { useState, useEffect, useContext } from 'react';
import { Text, View, FlatList, SafeAreaView, Dimensions } from 'react-native';
import { getData, CommonButton, UserContext, postSave, LoadingScreen } from '../../components'
import styles from '../../constants/preset'
import { useRouter } from 'expo-router';
import { CheckBox } from 'react-native-elements';

const { width, height } = Dimensions.get('window');

// const items = [
//     {id: 1, title: '리그오브레전드', isChecked: false},
//     {id: 2, title: '메이플스토리', isChecked: false},
//     {id: 3, title: 'FIFA', isChecked: false},
//     {id: 4, title: '배틀그라운드', isChecked: false},
//     {id: 5, title: '오버워치', isChecked: false},
//     {id: 6, title: '서든어택', isChecked: false},
//     {id: 7, title: '카트라이더', isChecked: false},
// ]

const GameInfoPage = () => {
    const router = useRouter();
    const { uid, setUid} = useContext(UserContext);
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [ableCheck, setAbleCheck] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const loaddata = await getData({}, "game");
            const initializeGames = loaddata.map(loaddata => ({
                ...loaddata,
                isChecked: false
            }));
            setGames(initializeGames);
            setIsLoading(false);
        }
        fetchData();
    }, [])

    useEffect(() => {
        const checkedNumber = games.filter(game => game.isChecked).length;
        if( checkedNumber < 5) {
            setAbleCheck(true);
        } else {
            setAbleCheck(false);
        }
    }, [games])

    const handleChecked = (index) => {
        const updatedGames = [...games];
        if(updatedGames[index].isChecked) {
            updatedGames[index] = {
                ...updatedGames[index],
                isChecked: !updatedGames[index].isChecked
            };
            setGames(updatedGames);
        } else {
            if(ableCheck) {
                updatedGames[index] = {
                    ...updatedGames[index],
                    isChecked: !updatedGames[index].isChecked
                };
                setGames(updatedGames);
            } else {
                alert('5개 이상 선택 불가');
            }
        }
    };

    const handleNext = () => {
        const fetchData = async () => {
            setIsLoading(true);
            const checkedGames = games.filter(game => game.isChecked);
            const sendingGames = checkedGames.map(({ isChecked, ...rest }) => rest);
            if(sendingGames.length === 0) {
                alert("게임을 선택 안했잖슴");
            } else {
                const item = {
                    memberId: uid,
                    gameList: sendingGames, 
                }
                try {
                    const response = await postSave(item, "member/game");
                    setIsLoading(false);
                    router.push('Login/LoginPage');
                } catch(error) {
                    alert("게임 정보 저장 중 에러 발생");
                    setIsLoading(false);
                } 
            }
            setIsLoading(false);
        }
        fetchData();
    }
    
    return (
    <SafeAreaView style = {styles.container}>
        <LoadingScreen nowLoading = {isLoading} />
        <View style = {{margin: '2%', height: height * 0.75}}>
            {!isLoading ? <FlatList
                data = {games}
                contentContainerStyle = {{alignItems: 'center', justifyContent: 'center'}}
                renderItem = {({item, index}) =>
                    <View style = {{width: 300}}>
                        <CheckBox
                            title = {item.title}
                            checked={item.isChecked}
                            onPress={() => {handleChecked(index)}}
                            containerStyle = {{backgroundColor: '#FFFFFF', borderRadius: 5,}}
                        />
                    </View>}
            /> : <></>}
        </View>
        <CommonButton
            preset = {styles.middleButton}
            font = {styles.middleFontWhite}
            title = "회원가입"
            handlePress = {() => {handleNext()}}
        />
    </SafeAreaView>
    );
}

export default GameInfoPage;