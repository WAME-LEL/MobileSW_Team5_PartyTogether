import axios from 'axios'

const saveData = async (item, api) => {
    console.log(JSON.stringify(item))
    const fetchData = async () => {
        try {
          let response = await fetch(api, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
          });
    
          let json = await response;
          return json;
        } catch (error) {
          console.error(error);
          return error;
        }
    };
    fetchData();
}

export { saveData }