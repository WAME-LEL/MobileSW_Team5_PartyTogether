import axios from 'axios'

// const postSave = async (item, api) => {
//     const fetchData = async () => {
//         try {
//           let response = await fetch(api, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(item)
//           });
    
//           let json = await response;
//           return json;
//         } catch (error) {
//           console.error(error);
//           return error;
//         }
//     };
//     fetchData();
// }

const postSave = async (item, endPoint) => {
  const url = `http://localhost:8080/api/${endPoint}`;
  const config = {
    header: {
      'Content-Type': 'application/json'
    }
  }

  const fetchData = async () => {

    try {
        const response = await axios.post(url, item, config);
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

export { postSave }