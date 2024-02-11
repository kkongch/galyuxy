import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

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

export const getStudentList = async (accessToken, groupId) => {
  try {
    const response = await api.get(`/group/detail/${groupId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data.dataBody;
  } catch (error) {
    console.error('Error getStudentList:', error);
    throw error;
  }
};

export const createClass = async (accessToken, classData) => {
  try {
    const response = await api.post('/group', classData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error createClass:', error);
    throw error;
  }
};
