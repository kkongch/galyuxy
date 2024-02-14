import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

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
    const response = await api.delete(`/room/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleteRoom: ', error);
    throw error;
  }
};

export const createRoom = async (roomData) => {
  try {
    const response = await api.post('/room', roomData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error createRoom:', error);
    throw error;
  }
};

export const createRoomSession = async () => {
  try {
    const response = await api.post(`/openvidu/sessions`, 
    {
      headers: {
        "Authorization": "Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU",
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error createRoomSession: ', error);
    throw error;
  }
};

export const createRoomConnection = async (sessionId) => {
  try {
    const response = await api.post(
      `/openvidu/sessions/${sessionId}/connections`,
      {
        headers: {
          "Authorization": "Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU",
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error createRoomConnection: ', error);
    throw error;
  }
};
