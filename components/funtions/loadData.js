
const loadBoardData = async (boardName) => {
    const fetchData = () => {
      const loadData = [{
        id: '1',
        imageUrl: 'https://via.placeholder.com/150',
        nickname: '사용자1',
        time: '1시간 전',
        content: '안녕하세요, 첫 번째 게시물입니다.',
        openChat: '오픈챗 링크1',
      },
      {
        id: '2',
        imageUrl: 'https://via.placeholder.com/150',
        nickname: '사용자2',
        time: '2시간 전',
        content: '여기는 두 번째 게시물입니다.',
        openChat: '오픈챗 링크2',
      }];

      return loadData;
    }
    const data = await fetchData();

    return data;
}

const loadUserData = async () => {
  const fetchData = () => {
    const loadData = [];

    return loadData;
  }
  const data = await fetchData();

  return data;
}

export { loadBoardData }