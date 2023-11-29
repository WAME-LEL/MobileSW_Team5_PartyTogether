import { useState, useEffect, useContext } from 'react'
import { Text, View, SafeAreaView, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { BoardCard, getData, BoardModal, LoadingScreen, UserContext, CommonButton } from "../components"
import { useRouter } from 'expo-router';

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
      try {
        const loadData = await getData(item, "board");
        setData(loadData);
      } catch(error) {
        setData([]);
      }
      setIsLoading(false);
    }

    fetchData();
  }, [nowGameBoard, page, entity]) // 게시판, 페이지, 데이터 수가 바뀌면 갱신하는데, 페이지와 데이터 수를 초기화 하는 과정 추가 필요

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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

  return (
      <SafeAreaView>
          <LoadingScreen nowLoading = {isLoading} />
          <FlatList
              data = {gameBoardData}
              renderItem={({ item }) => <TouchableOpacity style = {styles.roundedCornerView} 
              onPress = {() => pressGameBoard(item.title)}
              ><Text>{item.title}</Text></TouchableOpacity>}
              keyExtractor={item => item.id}
              horizontal
          />
          <View style={{ borderBottomColor: '#999999', borderBottomWidth: 1, marginHorizontal: '2%', marginBottom:'2%'}} />
          <View style = {{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20}}>
            <Text style = {{fontSize: 20}}>{nowGameBoard} 게시판</Text>
            <CommonButton 
              preset = {{width: 100, height:35, backgroundColor: '#3333FF', justifyContent: 'center', alignItems: 'center', borderRadius: 10}}
              font = {{fontSize: 15, color: '#FFFFFF'}}
              handlePress = {() => router.push(`BoardWritePage/${nowGameBoard}`)}
              title = "게시글 작성"/>
          </View>
          <View style={{ borderBottomColor: '#999999', borderBottomWidth: 1, marginHorizontal: '2%', marginTop:'2%'}} />
          <FlatList
              data={data}
              renderItem={({ item, index }) => (
              <BoardCard 
                items={item}
                handlePress={() => printingModal(index)}
              />
              )}
              keyExtractor={item => item.id}
          />
          {(!isLoading && data.length != 0) ? <BoardModal data = {data[currentData]} visible={modalVisible} onClose={toggleModal} /> : <></>}
          <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
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

const styles = StyleSheet.create({
  roundedCornerView: {
    padding: 10,
    margin: 10, 
    backgroundColor: '#CCCCCC',
    borderRadius: 50
  },
  Paging: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    margin: 5,
  }
});

export default PartyBoard