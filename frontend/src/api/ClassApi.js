import axios from 'axios';

const baseURL = 'http://localhost:8080';

const api = axios.create({
  baseURL,
});

export const getClassList = async (accessToken) => {
  try {
    const response = await api.get('/group/list', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.dataBody;
  } catch (error) {
    console.error('Error getClassList:', error);
    throw error;
  }
};
