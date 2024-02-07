import axios from 'axios';

const baseURL = 'http://localhost:8080';

const api = axios.create({
  baseURL,
});

export const teacherLogin = async (loginData) => {
  try {
    const response = await api.post('/teachers/login', loginData);
    return response.data;
  } catch (error) {
    console.error('Error teacherLogin: ', error);
    throw error;
  }
};
