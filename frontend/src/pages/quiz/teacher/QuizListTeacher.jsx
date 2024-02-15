import React, { useState, useEffect } from 'react';
import QuizMainImage from 'assets/images/Quiz/퀴즈메인화면.png';
import Background from 'components/Basic/Background';
import styled from 'styled-components';
import DeleteSvg from 'assets/svg/quiz/deletesvg.svg';
import { getWorkBook } from 'api/QuizApi';
import { useNavigate } from 'react-router-dom';
import { navToggleState } from 'Recoil/UserState';
import { useRecoilState } from 'recoil';
const Layout = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
`;
const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const QuizBox = styled.div`
  width: 105rem;
  height: 65.625rem;
  background: rgba(255, 249, 236, 0.5);
  border-radius: 3.125rem;
  position: absolute;
  display: flex;
  flex-direction: column;
`;
const OXboxContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: space-around;
  width: 100%;
  margin-top: 5rem;
`;
const OXbox = styled.div`
  width: 45rem;
  height: 45rem;
  border-radius: 1.25rem;
  /* border: 20px solid var(--sub1, #596FB7); */
  background: #fff;
  position: relative;
  display: flex;
  font-size: 25rem;
  font-style: normal;
  font-weight: 600;
  align-items: center;
  justify-content: center;
  transition: border 0.3s;
  &:hover {
    border: 20px solid var(--sub1, #596fb7);
  }
`;
const QuestionNumber = styled.div`
  width: 7.5rem;
  height: 7.5rem;
  position: relative;
  margin-left: 2rem;
  margin-top: 2rem;
`;

const ChoiceBox = styled.div`
  background: rgba(255, 202, 90, 0.8);
  width: 90rem;
  height: 9.6875rem;
  border-radius: 1.25rem;
  align-items: center;
  transition: border 0.3s;
  display: flex;
  justify-content: space-between;
  padding: 0 1.19rem;
  &:hover {
    border: 20px solid var(--sub1, rgba(255, 202, 90, 0.8));
  }
`;

const SvgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QuestionBox = styled.div`
  position: relative;
  width: 100%;
  height: 55.625rem;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  display: flex;
`;
const Number = styled.div`
  color: #000;
  font-size: 3rem;
  font-style: normal;
  font-weight: 600;
  transform: translateY(-50%);
  width: 1.75rem;
  height: 4.0625rem;
  position: relative;
  top: 1.5rem;
  left: 2rem;
`;

const Header = styled.div`
  position: relative;
  bottom: 41.5rem;
  right: 21rem;
`;

const Pagetitle = styled.div`
  color: #000;
  font-size: 4.375rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Content = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  color: #000;
  font-family: 'Noto Sans';
  font-size: 3.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: flex;
`;
const QuizListTeacher = () => {
  const [workbook, setWorkbook] = useState([]);
  const navigate = useNavigate();
  const [toggleNav, setToggleNav] = useRecoilState(navToggleState);
  const fetchWorkbookData = async () => {
    try {
      const response = await getWorkBook();
      setWorkbook(response.data.dataBody);
      console.log(response.data.dataBody);
    } catch (e) {
      console.log(e);
    }
  };
  const HandleWorkbookClick = (workbookId) => {
    navigate(`/quizdetailteacher/${workbookId}`);
  };
  useEffect(() => {
    fetchWorkbookData();
    setToggleNav(false);
  }, []);
  return (
    <Background backgroundImage={QuizMainImage}>
      <Layout>
        <MainContent>
          <Header>
            <Pagetitle>퀴즈 - 문제집 목록</Pagetitle>
          </Header>
          <QuizBox>
            <QuestionNumber />
            <QuestionBox>
              {workbook.map((data, index) => (
                <ChoiceBox>
                  <Content>
                    <div
                      onClick={() => {
                        HandleWorkbookClick(workbook[index].workbookId);
                        sessionStorage.setItem(
                          'workbookId',
                          workbook[index].workbookId
                        );
                      }}
                    >
                      {index + 1}. {data.workbookTitle}
                    </div>
                  </Content>
                  <SvgBox>
                    <img src={DeleteSvg} alt='svg' />
                  </SvgBox>
                </ChoiceBox>
              ))}
            </QuestionBox>
          </QuizBox>
        </MainContent>
      </Layout>
    </Background>
  );
};

export default QuizListTeacher;
