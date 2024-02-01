import React from 'react'
import styled from 'styled-components'
import galaxyImage from 'assets/images/Main/갤역시풀네임.png'
import Background from 'components/Basic/Background'
import mainbackgroundimage from 'assets/images/Main/메인페이지배경화면.png'
import heritageImage from 'assets/images/Main/메인_문화유산관람.png'
import artImage from 'assets/images/Main/메인_미술활동.png'
import presentationImage from 'assets/images/Main/메인_연극발표활동.png'
import quizImage from 'assets/images/Main/메인_퀴즈.png'

const GalaxyImage = styled.img`
  position: absolute;
  width: 50%;
  height: auto;
  left: 50%;
  top: 18%;
  transform: translate(-50%, -50%);
`
const Frame = styled.img`
  position: absolute;
  top: ${(props) => props.top};
  left: ${(props) => props.left};
  width: 15vw;
  height: auto;
`

function MainPage() {
  return (
    <Background backgroundImage={mainbackgroundimage}>
      <GalaxyImage
        src={galaxyImage}
        alt='galaxy'
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      <Frame src={heritageImage} alt='frame' top='38vh' left='17vw' />
      <Frame src={artImage} alt='frame' top='31vh' left='34vw' />
      <Frame src={presentationImage} alt='frame' top='38vh' left='51vw' />
      <Frame src={quizImage} alt='frame' top='31vh' left='68vw' />
    </Background>
  )
}

export default MainPage
