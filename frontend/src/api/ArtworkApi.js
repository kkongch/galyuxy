import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL,
});



export const getArtworkList = async () => {
    console.log("get artwork list api");
    try {
      const response = await api.get('/artwork', { 
      });
      
      return response.data.dataBody;
    } catch (error) {
      console.error('Error getClassList:', error);
      throw error;
    }
  };
 