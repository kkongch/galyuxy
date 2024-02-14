import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;
console.log(baseURL);
const api = axios.create({
  baseURL,
});

export async function getHeritage() {
  try {
    const response = await api.get('/heritage');
    // const response = await axios.get(`http://localhost:8080/api/heritage`);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export const getHeritageList = async (presentationId) => {
  try {
    const response = await api.get('/heritage');
    // const response = await axios.get(
    //   `https://i10c206.p.ssafy.io:8080/heritage`
    // );
    return response.data;
  } catch (error) {
    console.error('Error getHeritageList: ', error);
    throw error;
  }
};

export const getEraList = async () => {
  try {
    // const response = await axios.get(`http://i10c206.p.ssafy.io:8080/era`);
    const response = await api.get(`/era`);
    return response.data.dataBody;
  } catch (error) {
    console.error('Error getEraList: ', error);
    throw error;
  }
};
