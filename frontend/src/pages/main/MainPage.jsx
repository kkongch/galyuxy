import React from 'react';
import styled from 'styled-components';
import galaxyImage from 'assets/images/갤역시풀네임.png';
import Background from 'components/Basic/Background';
import mainbackgroundimage from 'assets/images/메인페이지배경화면.png'


const GalaxyImage = styled.img`
    position: absolute;
    width: 50%;
    max-width: 1157px;
    height: auto;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);
`;

function MainPage() {
  return (
    <Background backgroundImage={mainbackgroundimage}>
      <GalaxyImage src={galaxyImage} alt="galaxy" style={{ maxWidth: '100%', height: 'auto' }}/>
    </Background>
  );
}

export default MainPage;
