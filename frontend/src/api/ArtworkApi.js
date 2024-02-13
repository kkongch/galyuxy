import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL,
});



export const getArtworkList = async () => {
    try {
      const response = await api.get('/artwork', { 
      });
      console.log(response.data.dataBody);
      return response.data.dataBody;
    } catch (error) {
      console.error('Error getClassList:', error);
      throw error;
    }
  };
 