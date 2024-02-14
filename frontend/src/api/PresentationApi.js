import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

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
        Authorization: 'Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error createPresentation:', error);
    throw error;
  }
};

export const updatePresentation = async (presentationId, newData) => {
  try {
    const response = await api.put(`/presentation/${presentationId}`, newData);
    return response.data;
  } catch (error) {
    console.error('Error updatePresentation:', error);
    throw error;
  }
};

export const activatePresentation = async (presentationId) => {
  try {
    console.log('activate', presentationId);
    const response = await api.put(`/presentation/${presentationId}/activate`);
  } catch (error) {
    console.error('Error activePresentation:', error);
    throw error;
  }
};

export const deactivatePresentation = async (presentationId) => {
  try {
    console.log('deactivate', presentationId);
    const response = await api.put(
      `/presentation/${presentationId}/deactivate`
    );
  } catch (error) {
    console.error('Error deactivatePresentation:', error);
    throw error;
  }
};

export const activePresentation = async (groupId) => {
  try {
    console.log('groupId:', groupId);
    const response = await api.get(`/presentation/active/${groupId}`);
    console.log('response', response);

    if (response.data.dataBody === null) {
      return null;
    } else {
      return response.data.dataBody.presentationId;
    }
  } catch (error) {
    console.error('Error deactivatePresentation:', error);
    throw error;
  }
};
