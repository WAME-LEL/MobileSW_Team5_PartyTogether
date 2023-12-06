import axios from 'axios';

const testData = (boardName) => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://34.22.100.104:8080/api/board`, {
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

const getData = async (item, endPoint) => {
  const options = {
    method: 'GET',
    url: `http://34.22.100.104:8080/api/${endPoint}`,
    params: {...item},
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const fetchData = async () => {

    try {
        const response = await axios.request(options);
        if(response.data.data) {
          const loaddata = response.data.data;
          return loaddata;
        } else {
          const loaddata = response.data;
          return loaddata;
        }
    } catch(error) {
        console.log(error);
        return error;
    }
  }
  const data = fetchData();
  return data;
}

const postData = async (item, endPoint) => {
  const url = `http://34.22.100.104:8080/api/${endPoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const fetchData = async () => {

    try {
        const response = await axios.post(url, item, config);
        const loaddata = response.data;
        return loaddata;
    } catch(error) {
        console.log(error);
        return error;
    }
  }

    const data = await fetchData();
    return data;
}


export { testData, getData, postData }