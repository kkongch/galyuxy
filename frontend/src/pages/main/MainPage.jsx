import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Background from 'components/Basic/Background';
import FullnameImage from 'assets/svg/main/fullname.svg';
import heritageImage from 'assets/svg/main/main1.svg';
import artImage from 'assets/svg/main/main2.svg';
import presentationImage from 'assets/svg/main/main3.svg';
import quizImage from 'assets/svg/main/main4.svg';
import background from 'assets/images/mainBackground.png';

const MainPageContainer = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
`;

const Fullname = styled.img`
  display: flex;
  position: absolute;
  top: 16rem;
  object-fit: none;
`;

const CardContainer = styled.div`
  position: absolute;
  display: flex;
  top: 35rem;
`;
// const StyledLink = styled(Link)`
//   text-decoration: none;
// `
const CardLink = styled.div`
  margin: 0 1rem;
  cursor: pointer;

  &:nth-child(even) {
    margin-top: 10rem;
  }
  &:nth-child(odd) {
    margin-bottom: 10rem;
  }
`;
const CardImage = styled.img`
  width: 100%;
`;
const MainPage = () => {
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem('accessToken');
  const handlePresentationLinkClick = () => {
    const destination = accessToken ? '/presentation' : '/room';
    navigate(destination);
  };

  const handleQuizLinkClick = () => {
    if (accessToken) {
      navigate('/quizlistteacher');
    } else {
      navigate('/quizenter');
    }
  };

  const handleHeritageLinkClick = () => {
    navigate('/heritage');
  };
  const handleArtLinkClick = () => {
    navigate('/art');
    // navigate('/test');
  };

  return (
    <Background backgroundImage={background}>
      <MainPageContainer>
        <Fullname src={FullnameImage} />
        <CardContainer>
          <CardLink onClick={handleHeritageLinkClick}>
            <CardImage src={heritageImage} alt='Heritage' />
          </CardLink>
          <CardLink onClick={handleArtLinkClick}>
            <CardImage src={artImage} alt='Art' />
          </CardLink>
          <CardLink onClick={handlePresentationLinkClick}>
            <CardImage src={presentationImage} alt='Presentation' />
          </CardLink>
          <CardLink onClick={handleQuizLinkClick}>
            <CardImage src={quizImage} alt='Quiz' />
          </CardLink>
        </CardContainer>
      </MainPageContainer>
    </Background>
  );
};

export default MainPage;
