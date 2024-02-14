import React, { useEffect } from 'react';
import styled from 'styled-components';
import heritageDetailImage from 'assets/images/Heritage/문화유산상세배경.png';
import Background from 'components/Basic/Background';
import StarsImage from 'assets/images/stars.png';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { heritageState } from 'Recoil/HeritageState';
import { getHeritage } from 'api/HeritageApi';

const MainBox = styled.main`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  padding: 3.06rem;
`;
const HeritageBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70vh;
  width: 100vw;
`;
const FrameBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 92.5rem;
`;
const FrameOuter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 77.8125rem;
  height: 57.0625rem;
  border-radius: 1rem;
  background: #594f46;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const FrameInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72.25rem;
  height: 51.375rem;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const HeritageImage = styled.img`
  max-width: 72.25rem;
  height: 41.44125rem;
`;
const InfoBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 67.5rem;
  height: 46.0625rem;
  border-radius: 3.125rem 0rem 0rem 3.125rem;
  border: 2px solid #efefef;
  padding: 4.7rem;
  background-color: white;
`;
const TitleBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;
const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 3.75rem;
  font-weight: 600;
`;
const Description = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  font-size: 2.5rem;
  line-height: 4.0625rem;
  margin-top: 2rem;
  overflow-y: auto;
  padding-right: 2.2rem;
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;
const BackButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 22.5rem;
  height: 7.5rem;
  border-radius: 3.75rem;
  box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.25);
  background-color: #d9d9d9;
  font-size: 2.5rem;
  text-align: center;
  margin-left: 3.06rem;
  padding: 0 3.5rem;
  font-weight: 700;
  cursor: pointer;
`;
const ThreeDButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 22.5rem;
  height: 7.5rem;
  border-radius: 3.75rem;
  box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.25);
  background-color: #596fb7;
  font-size: 2.5rem;
  text-align: center;
  margin-left: 3.06rem;
  padding: 0 3.5rem;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
`;
const SvgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 4.6875rem;
`;

const HeritageDetailPage = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [heritage, setHeritage] = useRecoilState(heritageState);

  const handleGetHeritage = async (heritageId) => {
    try {
      const item = await getHeritage(heritageId);
      setHeritage(item.dataBody);

      console.log(item);
    } catch (error) {
      console.error('Error handleGetClassList: ', error);
    }
  };

  useEffect(() => {
    handleGetHeritage(params.id);
  }, []);

  const handleBackClick = () => {
    navigate(`/heritage`);
  };
  const handleThreeDClick = () => {
    navigate(`/heritage/${params.id}/3d`);
  };

  return (
    <Background backgroundImage={heritageDetailImage}>
      <MainBox>
        <HeritageBox>
          <FrameBox>
            <FrameOuter>
              <FrameInner>
                <HeritageImage src={heritage.heritageImageUrl} />
              </FrameInner>
            </FrameOuter>
          </FrameBox>

          <InfoBox>
            <TitleBox>
              <SvgBox>
                <img src={StarsImage} alt='' />
              </SvgBox>
              <Title>{heritage.heritageName}</Title>
            </TitleBox>
            <Description>
              <p>{heritage.heritageContent}</p>
            </Description>
          </InfoBox>
        </HeritageBox>

        <ButtonBox>
          <BackButton onClick={handleBackClick}>
            <SvgBox>
              <svg
                width='76'
                height='75'
                viewBox='0 0 76 75'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M6.52344 37.5C6.52344 54.75 20.601 68.75 37.9466 68.75C55.2921 68.75 69.3697 54.75 69.3697 37.5C69.3697 20.25 55.2921 6.25 37.9466 6.25C20.601 6.25 6.52344 20.25 6.52344 37.5ZM63.0851 37.5C63.0851 51.3125 51.8356 62.5 37.9466 62.5C24.0575 62.5 12.8081 51.3125 12.8081 37.5C12.8081 23.6875 24.0575 12.5 37.9466 12.5C51.8356 12.5 63.0851 23.6875 63.0851 37.5ZM25.3773 37.5L37.9466 25L42.3772 29.4062L37.4124 34.375H50.5158V40.625H37.4124L42.4087 45.5938L37.9466 50L25.3773 37.5Z'
                  fill='black'
                />
              </svg>
            </SvgBox>
            <p>목록 보기</p>
          </BackButton>
          <ThreeDButton onClick={handleThreeDClick}>
            <SvgBox>
              <svg
                width='70'
                height='70'
                viewBox='0 0 70 70'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M34.9994 18.9583C46.0535 18.9583 55.9119 25.1708 60.7244 35C55.9119 44.8292 46.0535 51.0417 34.9994 51.0417C23.9452 51.0417 14.0869 44.8292 9.27435 35C14.0869 25.1708 23.9452 18.9583 34.9994 18.9583ZM34.9994 13.125C20.416 13.125 7.96185 22.1958 2.91602 35C7.96185 47.8042 20.416 56.875 34.9994 56.875C49.5827 56.875 62.0369 47.8042 67.0827 35C62.0369 22.1958 49.5827 13.125 34.9994 13.125ZM34.9994 27.7083C39.0244 27.7083 42.291 30.975 42.291 35C42.291 39.025 39.0244 42.2917 34.9994 42.2917C30.9744 42.2917 27.7077 39.025 27.7077 35C27.7077 30.975 30.9744 27.7083 34.9994 27.7083ZM34.9994 21.875C27.766 21.875 21.8744 27.7667 21.8744 35C21.8744 42.2333 27.766 48.125 34.9994 48.125C42.2327 48.125 48.1244 42.2333 48.1244 35C48.1244 27.7667 42.2327 21.875 34.9994 21.875Z'
                  fill='white'
                />
              </svg>
            </SvgBox>
            <p>3D 관람</p>
          </ThreeDButton>
        </ButtonBox>
      </MainBox>
    </Background>
  );
};
export default HeritageDetailPage;
