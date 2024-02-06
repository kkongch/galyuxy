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
    console.error('Error getPresentationList: ', error);
    throw error;
  }
};

export const deletePresentation = async (presentationId) => {
  try {
    const response = await api.delete(`/presentation/${presentationId}`);
    return response.data;
  } catch (error) {
    console.error('Error deletePresentation: ', error);
    throw error;
  }
};

export const createPresentation = async (presentationData) => {
  try {
    const response = await api.post('/presentation', presentationData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error createPresentation:', error);
    throw error;
  }
};
