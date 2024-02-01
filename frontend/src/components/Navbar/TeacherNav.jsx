import React, { useState } from 'react'
import styled from 'styled-components'
import Menu from './Menu' // Menu 컴포넌트 임포트
import { useNavigate } from 'react-router-dom'
import navlogo from 'assets/images/갤역시_로고.png'
import LogoBox from './LogoBox'
import { PiCaretLeftLight, PiCaretRightLight } from 'react-icons/pi'

const NavbarContainer = styled.div`
  height: 100%;
  width: 25%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: ${(props) => (props.isOpen ? '0' : '-25%')};
  background-color: rgba(0, 0, 0, 0.5);
  transition: 0.5s;
  display: flex;
  flex-direction: column;
  padding: 20px 20px;
  border-radius: 0% 5rem 0% 0%;
  border: 1px solid rgba(255, 255, 255, 0.53);
  background: rgba(255, 255, 255, 0.53);
  backdrop-filter: blur(5px);
`

// 로고이미지 추가
const LogoImage = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  background-color: var(--logo-bg); // 글로벌 스타일에서 설정할 배경색
  justify-content: center;
  align-items: center;

  img {
    width: 60%; // 이미지의 최대 너비를 100%로 설정
    height: 100%; // 이미지의 최대 높이를 100%로 설정
  }
`

const ToggleButton = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: ${(props) => (props.isOpen ? '25%' : '0')};
  top: 7%;
  height: 8%;
  width: 3%;
  z-index: 2;
  border-radius: 0px 1.5rem 1.5rem 0px;
  background: #11235a;
  color: white;
  cursor: pointer;
  transition: 0.5s;

  svg {
    font-size: 1000%;
    pointer-events: none;
  }
`

// NavbarLink를 별도의 파일로 분리하는 것을 고려필요
const NavbarLink = styled.a`
  padding: 0.6rem 5rem;
  text-decoration: none;
  color: #545454;
  display: block;
  transition: 0.5s;
  font-size: 150%;
  font-weight: 600;
  line-height: normal;

  &:hover {
    color: #f1f1f1;
  }
  &:active {
    color: black;
  }
`

const MenuText = styled.div`
  width: 100%;

  hr {
    border: 0.1rem solid white;
    margin: 1rem 2rem 0;
  }
`

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState({
    art: false,
    culture: false,
    theater: false,
    quiz: false,
  }) // 각 메뉴 항목에 대해 초기 상태 설정

  const toggleNavbar = () => {
    setIsOpen(!isOpen)
  }

  const navigate = useNavigate()

  const heritageNavigate = () => {
    navigate('/heritage')
  }

  const presentationNavigate = () => {
    navigate('/presentation')
  }

  const toggleSubmenu = (menu) => {
    setOpenMenu({ ...openMenu, [menu]: !openMenu[menu] })
  }

  return (
    <>
      <NavbarContainer isOpen={isOpen}>
        <LogoImage>
          <img src={navlogo} alt='Logo' />{' '}
          {/* 이미지 경로를 자신의 로고 이미지 경로로 변경하세요. */}
        </LogoImage>
        <LogoBox> </LogoBox>
        <MenuText>
          <Menu
            title='문화유산 관람'
            isOpen={openMenu['culture']}
            onClick={heritageNavigate}
          />
          <hr />
          <Menu
            title='미술 활동'
            isOpen={openMenu['art']}
            onClick={() => toggleSubmenu('art')}
          >
            <NavbarLink href='#'>드로잉</NavbarLink>
            <NavbarLink href='#'>컬러링북</NavbarLink>
          </Menu>
          <hr />
          <Menu
            title='연극 발표 활동'
            isOpen={openMenu['theater']}
            onClick={presentationNavigate}
          />
          <hr />
          <Menu
            title='퀴즈'
            isOpen={openMenu['quiz']}
            onClick={() => toggleSubmenu('quiz')}
          >
            <NavbarLink href='#'>문제집 목록</NavbarLink>
            <NavbarLink href='#'>문제집 생성</NavbarLink>
            <NavbarLink href='#'>퀴즈 결과</NavbarLink>
          </Menu>
        </MenuText>
      </NavbarContainer>
      <ToggleButton onClick={toggleNavbar} isOpen={isOpen}>
        {isOpen ? <PiCaretLeftLight /> : <PiCaretRightLight />}
      </ToggleButton>
    </>
  )
}

export default Navbar
