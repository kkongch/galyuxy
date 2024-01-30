import React from 'react';
import styled from 'styled-components';
import galaxyImage from 'assets/images/Main/갤역시풀네임.png';
import Background from 'components/Basic/Background';
import mainbackgroundimage from 'assets/images/Main/메인페이지배경화면.png'
import heritageImage from 'assets/images/Main/메인_문화유산관람.png'


const GalaxyImage = styled.img`
    position: absolute;
    width: 50%;
    max-width: 1157px;
    height: auto;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);
`;
const Frame = styled.img`
  position: absolute;
  top : 40rem;
  left : 23.44rem;
  width : 25rem;
  height: 31.25rem;
`

function MainPage() {
  return (
    <Background backgroundImage={mainbackgroundimage}>
      <GalaxyImage src={galaxyImage} alt="galaxy" style={{ maxWidth: '100%', height: 'auto' }}/>
      <Frame src={heritageImage} alt='frame'/>
    </Background>
  );
}

export default MainPage;
