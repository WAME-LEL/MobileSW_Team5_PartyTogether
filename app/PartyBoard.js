import { useState, useEffect, useContext } from 'react'
import { Text, View, SafeAreaView, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { BoardCard, getData, BoardModal, LoadingScreen, UserContext, CommonButton } from "../components"
import { useRouter } from 'expo-router';
import styles from '../constants/preset';

const { width, height } = Dimensions.get('window');

const PartyBoard = () => {
  const router = useRouter();
  const { uid } = useContext(UserContext) // 로그인 정보 저장용
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리 ture = 로딩중, false = 로딩 완료
  const [gameBoardData, setGameBoardData] = useState(['리그오브레전드', '메이플스토리', 'FIFA']); // 게임 목록 배열
  const [nowGameBoard, setNowGameBoard] = useState('리그오브레전드'); // 현재 출력할 게시판
  const [data, setData] = useState([]) // 데이터 관리 배열
  const [currentData, setCurrentData] = useState(0);
  const [page, setPage] = useState(1) // 페이지 관리 숫자
  const [entity, setEntity] = useState(10) // 페이지 한 번에 가져올 데이터 수
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const item = {
        keyword: nowGameBoard
      }
      const nowDate = new Date();
      try {
        const loadData = await getData(item, "board");
        console.log(loadData);
        const processedData = loadData.map((item) => ({
          ...item,
          time: new Date(item.time),
          processedTime: dateToString((nowDate - new Date(item.time)) / 1000)
        }));
        processedData.sort((a, b) => b.time - a.time);
        setData(processedData);
      } catch (error) {
        setData([]);
      }
      setIsLoading(false);
    }

    fetchData();
  }, [nowGameBoard, page, entity]) // 게시판, 페이지, 데이터 수가 바뀌면 갱신하는데, 페이지와 데이터 수를 초기화 하는 과정 추가 필요

  const dateToString = (date) => { // 계산한 초를 보기 쉽게 변환
    const localTime = date - 32400; // 서버랑 시간이 9시간 차이남
    console.log(localTime);
    if(localTime < 60) {
      return `${Math.floor(localTime)}초 전`;
    } else if(localTime >= 60 && localTime < 3600) {
      return `${Math.floor(localTime / 60)}분 전`;
    } else if(localTime >= 3600 && localTime < 86400) {
      return `${Math.floor(localTime / 3600)}시간 전`;
    } else {
      return `${Math.floor(localTime / 86400)}일 전`;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const loadData = await getData({}, "game");
      setGameBoardData(loadData);
    }
    fetchData();
  }, [])

  const pressGameBoard = async (gameName) => { // 게임 목록을 클릭하면 데이터를 갱신할 함수
    setNowGameBoard(gameName);
  }

  const handlePaging = () => {
    console.log('페이지 변경 요청');
  }

  const printingModal = async (index) => {
    console.log('게시판 카드 누름');
    console.log(index);
    await setCurrentData(index);
    toggleModal();
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  }

  const handleChat = (targetId) => {
    console.log(targetId);
    toggleModal();
    router.push(`ChatPage/${targetId}`)
  }

  return (
      <SafeAreaView>
          <LoadingScreen nowLoading = {isLoading} />
          {(!isLoading && data.length != 0) ? <BoardModal items = {data[currentData]} visible={modalVisible} onClose={toggleModal} handleChat = {() => handleChat(data[currentData].memberId)} /> : <></>}
          <View style = {[styles.container, {marginHorizontal: '2%'}]}>
            <FlatList
                data = {gameBoardData}
                showsHorizontalScrollIndicator = {false}
                renderItem={({ item }) => <TouchableOpacity style = {styles.gameNameBox} 
                onPress = {() => pressGameBoard(item.title)}
                ><Text style = {styles.smallFont}>{item.title}</Text></TouchableOpacity>}
                keyExtractor={item => item.id}
                horizontal
            />
          </View>
          <View style={{ borderBottomColor: '#999999', borderBottomWidth: 1, marginHorizontal: '2%', marginBottom:'2%'}} />
          <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20}}>
            <Text style = {styles.middleFont}>{nowGameBoard} 게시판</Text>
            <CommonButton 
              preset = {styles.smallButton}
              font = {{fontSize: 15, color: '#FFFFFF'}}
              handlePress = {() => router.push(`BoardWritePage/${nowGameBoard}`)}
              title = "게시글 작성"/>
          </View>
          <View style = {{ borderBottomColor: '#999999', borderBottomWidth: 1, margin: '2%', marginBottom: '3%'}} />
          <View style = {{height: height * 0.7}}>
            <FlatList
                data={data}
                showsVerticalScrollIndicator = {false}
                renderItem={({ item, index }) => (
                <BoardCard 
                  items={item}
                  handlePress={() => printingModal(index)}
                />
                )}
                keyExtractor={index => index.id}
            />
          </View>
          <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: '5%'}}>
            <TouchableOpacity style = {styles.Paging}
              onPress={handlePaging}>
              <Text>이전 페이지</Text>
            </TouchableOpacity>
            <View style = {styles.Paging}>
              <Text>{page}</Text>
            </View>
            <TouchableOpacity style = {styles.Paging}
              onPress={handlePaging}>
            <Text>다음 페이지</Text>
            </TouchableOpacity>
          </View>
      </SafeAreaView>
    );
}

export default PartyBoard