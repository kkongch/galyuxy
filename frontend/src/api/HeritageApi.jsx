import axios from 'axios';
export async function getHeritage() {
  try {
    const response = await axios.get('http://i10c206.p.ssafy.io:8080/heritage');
    // const response = await axios.get(`http://localhost:8080/api/heritage`);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export const getHeritageList = async (presentationId) => {
  try {
    const response = await axios.get(`http://i10c206.p.ssafy.io:8080/heritage`);
    // const response = await axios.get(`http://localhost:8080/api/heritage`);
    return response.data;
  } catch (error) {
    console.error('Error getHeritageList: ', error);
    throw error;
  }
};
