import axios from 'axios';

export async function getQuizList() {
  try {
    const response = await axios.get(
      'http://i10c206.p.ssafy.io:8080/quiz/question'
    );
    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function getQuizStart(data) {
  try {
    const response = await axios.put(
      'http://i10c206.p.ssafy.io:8080/quiz/activeWorkbook/start',
      data
    );
    console.log(response);

    return response;
  } catch (e) {
    console.log(e);
  }
}

export const getActiveWorkBook = async (group_id) => {
  try {
    const response = await axios.get(
      `http://i10c206.p.ssafy.io:8080/quiz/activWorkbook/${group_id}`
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getWorkBook = async () => {
  try {
    const response = await axios.get(
      'http://i10c206.p.ssafy.io:8080/quiz/workbook'
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};
