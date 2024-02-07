import axios from 'axios';

const baseURL = 'http://localhost:8080';

const api = axios.create({
  baseURL,
});

export const getRoomList = async (presentationId) => {
  try {
    const response = await api.get(`/room/${presentationId}`);
    return response.data;
  } catch (error) {
    console.error('Error getRoomList: ', error);
    throw error;
  }
};

export const deleteRoom = async (roomId) => {
  try {
    const response = await api.delete(`/presentation/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleteRoom: ', error);
    throw error;
  }
};

export const createRoom = async (roomData) => {
  try {
    const response = await api.post('/presentation', roomData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error createRoom:', error);
    throw error;
  }
};
