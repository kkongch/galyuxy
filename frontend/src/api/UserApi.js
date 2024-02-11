import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

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

export const teacherSignUp = async (signUpData) => {
  try {
    const response = await api.post('/teachers/signup', signUpData);
    return response.data;
  } catch (error) {
    console.error('Error teacherSignUp: ', error);
    throw error;
  }
};

export const getTeacherInfo = async (accessToken) => {
  try {
    const response = await api.get(`/teachers`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error getTeacherInfo: ', error);
    throw error;
  }
};

export const teacherLogout = async (accessToken) => {
  try {
    const response = await api.get(`/teachers/logout`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error teacherLogout: ', error);
    throw error;
  }
};
