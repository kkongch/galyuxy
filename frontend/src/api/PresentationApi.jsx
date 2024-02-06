import axios from 'axios';

const baseURL = 'http://localhost:8080';

const api = axios.create({
  baseURL,
});

export const getPresentationList = async (groupId) => {
  try {
    const response = await api.get(`/presentation/${groupId}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
