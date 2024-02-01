import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import heritageDetailImage from 'assets/images/Heritage/문화유산상세배경.png'
import Background from 'components/Basic/Background'

const Description = styled.div`
  display: grid;
  position: fixed;
  top: 55%;
  right: 0;
  transform: translateY(-50%);
  align-items: center;
  justify-content: center;
  width: 50vw;
  height: 45vh;
  background-color: white;
  border-radius: 3rem 0rem 0rem 3rem;
  background: #fff;
  box-shadow: 1rem 1rem 1rem 0 rgba(0, 0, 0, 0.25);
`

function Heritage2D() {
  return (
    <Background backgroundImage={heritageDetailImage}>
      <Description>설명</Description>
      {/* 버튼자리 */}
      {/* <BtnBack> </BtnBack> */}
    </Background>
  )
}
export default Heritage2D
