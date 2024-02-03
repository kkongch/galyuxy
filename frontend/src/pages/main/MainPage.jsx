import React from 'react'
import styled from 'styled-components'
import Background from 'components/Basic/Background'
import FullnameImage from 'assets/svg/main/fullname.svg'
import heritageImage from 'assets/svg/main/main1.svg'
import artImage from 'assets/svg/main/main2.svg'
import presentationImage from 'assets/svg/main/main3.svg'
import quizImage from 'assets/svg/main/main4.svg'

const MainPageContainer = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: center;
`

const Fullname = styled.img`
  display: flex;
  position: absolute;
  top: 10rem;
  object-fit: none;
`

const CardContainer = styled.div`
  position: absolute;
  display: flex;
  top: 30rem;
`

const CardImage = styled.img`
  margin: 0 1rem;
  &:nth-child(even) {
    margin-top: 10rem;
  }
  &:nth-child(odd) {
    margin-bottom: 10rem;
  }
`

const MainPage = () => {
  return (
    <Background
      backgroundImage={require('assets/svg/main/Background.svg').default}
    >
      <MainPageContainer>
        <Fullname src={FullnameImage} />
        <CardContainer>
          <CardImage src={heritageImage} />
          <CardImage src={artImage} />
          <CardImage src={presentationImage} />
          <CardImage src={quizImage} />
        </CardContainer>
      </MainPageContainer>
    </Background>
  )
}

export default MainPage
