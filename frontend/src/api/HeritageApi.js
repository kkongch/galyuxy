import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

const api = axios.create({
  baseURL,
});

export const getHeritageList = async () => {
  try {
    const response = await api.get(`/heritage`);
    return response.data;
  } catch (error) {
    console.error('Error getHeritageList: ', error);
    throw error;
  }
};

export const getHeritage = async (heritageId) => {
  try {
    const response = await api.get(`/heritage/${heritageId}`);
    return response.data;
  } catch (error) {
    console.error('Error getHeritage: ', error);
    throw error;
  }
};
