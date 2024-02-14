import axios from 'axios';
const baseURL = process.env.REACT_APP_BASE_URL;
const api = axios.create({
  baseURL,
});
export async function getQuizList() {
  try {
    const response = await api.get('/quiz/question');
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function putQuizStart(data) {
  try {
    const response = await api.put('/quiz/activeWorkbook/start', data);
    console.log(response);

    return response;
  } catch (e) {
    console.log(e);
  }
}

export const getActiveWorkBook = async (groupId) => {
  try {
    const response = await api.get(`/quiz/activeWorkbook/${groupId}`);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getWorkBook = async () => {
  try {
    const response = await api.get('/quiz/workbook');
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getDetailWorkBook = async (workbookId) => {
  try {
    const response = await api.get(`/quiz/workbook/${workbookId}/questions`);
    return response;
  } catch (e) {
    console.log(e);
  }
};
