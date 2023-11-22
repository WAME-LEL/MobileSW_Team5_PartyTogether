
const loadTestData = (boardName) => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/board', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          param: JSON.stringify({
            keyword: boardName,
          }),
        });
    
        const json = await response.json();
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

const getData = async (item, api) => {
  const fetchData = async () => {
    try {
      let response = await fetch(api, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        param: JSON.stringify(item),
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

const loadUserData = async () => {
  const fetchData = () => {
    const fetchData = async () => {
      const loadData = ["유저1", "유저2", "유저3", "유저4", "유저5"]

      return loadData;
    }

    const data = fetchData();

    return loadData;
  }
  const data = await fetchData();

  return data;
}

export { loadTestData, loadUserData, getData }