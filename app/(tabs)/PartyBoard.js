import { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { BoardCard, loadBoardData, BoardModal } from "../../components/"

const PartyBoard = ({ party }) => {
  //const {uid} = useContext(AuthContext) // 로그인 정보 저장용
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 관리 ture = 로딩중, false = 로딩 완료
  const [gameBoardData, setGameBoardData] = useState(['리그오브레전드', '메이플스토리', '로스트아크']); // 게임 목록 배열
  const [nowGameBoard, setNowGameBoard] = useState('리그오브레전드'); // 현재 출력할 게시판
  const [data, setData] = useState([]) // 데이터 관리 배열
  const [page, setPage] = useState(1) // 페이지 관리 숫자
  const [entity, setEntity] = useState(10) // 페이지 한 번에 가져올 데이터 수
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      const loadData = await loadBoardData(nowGameBoard);
      setData(loadData);
    }
    fetchData();
    setIsLoading(false);
  }, [nowGameBoard, page, entity]) // 게시판, 페이지, 데이터 수가 바뀌면 갱신하는데, 페이지와 데이터 수를 초기화 하는 과정 추가 필요

  const pressGameBoard = async (gameName) => { // 게임 목록을 클릭하면 데이터를 갱신할 함수
    setIsLoading(true);
    setNowGameBoard(gameName);
    // const temp = await loadBoardData(gameName);
    // setData(temp); // 해당 데이터로 상태를 갱신
    setIsLoading(false);
  }

  const printingModal = (index) => {
    console.log('게시판 카드 누름');
    console.log(index);
    console.log(data[index]);
    toggleModal();
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  }

  const handlePaging = () => {
    console.log('페이지 변경 요청');
  }

  return (
      <SafeAreaView>
          <View style = {{alignItems: 'center', justifyContent: 'center'}}>
            <Text>{nowGameBoard} 게시판</Text>
          </View>
          <View style={{ borderBottomColor: '#999999', borderBottomWidth: 1, marginHorizontal: '2%', marginTop:'2%'}} />
          <FlatList
              data = {gameBoardData}
              renderItem={({ item }) => <TouchableOpacity style = {styles.roundedCornerView} 
              onPress = {() => pressGameBoard(item)}
              ><Text>{item}</Text></TouchableOpacity>}
              keyExtractor={index => index.toString()}
              horizontal
          />
          <View style={{ borderBottomColor: '#999999', borderBottomWidth: 1, marginHorizontal: '2%', marginBottom:'2%'}} />
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
          <BoardModal data = {data} visible={modalVisible} onClose={toggleModal} />
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