import axios, { formToJSON } from 'axios';

const testData = (boardName) => {
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

const getData = async (item, endPoint) => {
  
  const options = {
    method: 'GET',
    url: `http://localhost:8080/api/${endPoint}`,
    params: {...item},
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const fetchData = async () => {

    try {
        const response = await axios.request(options);
        const loaddata = response.data.data;
        return loaddata;
    } catch(error) {
        console.log(error);
        return error;
    }
  }
  const data = fetchData();
  return data;
}

const postData = async (item, endPoint) => {

  const options = {
    method: 'POST',
    url: `http://localhost:8080/api/${endPoint}`,
    body: {...item},
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const fetchData = async () => {

    try {
        const response = await axios.request(options);
        console.log(response.data);
        const loaddata = response.data;
        return loaddata;
    } catch(error) {
        console.log(error);
        return error;
    }
  }

    const data = fetchData();
    return data;
}


export { testData, getData, postData }