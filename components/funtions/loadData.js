import axios from 'axios'

const loadBoardData = async (boardName) => {
  const fetchData = async () => {
    try {
      let response = await fetch('http://localhost:8080/api/board', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        param: JSON.stringify({
          keyword: boardName,
        }),
      });
  
      let json = await response.json();
      console.log('Response:', json.data);
      return json.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  const data = await fetchData();

  return data;
}

const loadTestData = (boardName) => {
    const fetchData = async () => {
      try {
        let response = await fetch('http://localhost:8080/api/board', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          param: JSON.stringify({
            keyword: boardName,
          }),
        });
    
        let json = await response.json();
        console.log('Response:', json.data);
        return json.data;
      } catch (error) {
        console.error(error);
        return error;
      }
    }

    const data = fetchData();

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

export { loadBoardData, loadTestData, loadUserData }