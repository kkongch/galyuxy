import React from 'react'
import styled from 'styled-components'
import Background from 'components/Basic/Background'
import QuizMainImage from 'assets/images/Quiz/퀴즈메인화면.png'
const Wrapper = styled.div`
  position: absolute;
  width: 65vw;
  height: 75vh;
  background-color: #fff9ec;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 3.125rem;
`
const RoomBox = styled.div`
  width: 60rem;
  height: 8.5625rem;
  display: flex;
  position: absolute;
  border-radius: 3.125rem;
  background-color: #ffca5a;
`
const RoomList = styled.div`
  width: 60vw;
  height: 70vh;
  position: absolute;
  align-items: center;
  justify-content: center;
`
function WorkBookList() {
  return (
    <Background backgroundImage={QuizMainImage}>
      <Wrapper>
        <RoomList>
          <RoomBox />
        </RoomList>
      </Wrapper>
    </Background>
  )
}

export default WorkBookList
