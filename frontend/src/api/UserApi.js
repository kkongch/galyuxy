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

export const authCodeSend = async (email) => {
  try {
    const response = await api.post('/teachers/emailSend', email);
    return response.data;
  } catch (error) {
    console.error('Error authCodeSend: ', error);
    throw error;
  }
};

export const emailVerify = async (verifyData) => {
  try {
    const response = await api.post('/teachers/emailVerify', verifyData);
    return response.data;
  } catch (error) {
    console.error('Error emailVerify: ', error);
    throw error;
  }
};
