import React, { useState } from 'react';
import styled from 'styled-components';
import Menu from './Menu'; // Menu 컴포넌트 임포트
import { useNavigate } from 'react-router-dom';
import navlogo from 'assets/images/갤역시_로고.png'
import LogoBox from './LogoBox';



const NavbarContainer = styled.div`
  height: 100%;
  width: 30rem;
  position: fixed;
  z-index: 1;
  top: 0;
  left: ${props => props.isOpen ? '0' : '-26.125rem'};
  background-color: rgba(0, 0, 0, 0.5);
  transition: 0.5s;
  display: flex;
  flex-direction: column;
  padding: 20px 20px;

  border-radius: 0rem 3.125rem 0rem 0rem;
  border: 1px solid rgba(255, 255, 255, 0.53);
  background: rgba(255, 255, 255, 0.53);
  backdrop-filter: blur(5px);
`;

// 로고이미지 추가
const LogoImage = styled.div`
  display: flex;
  width: 100%; 
  height: auto; // 이미지 높이 설정
  background-color: var(--logo-bg); // 글로벌 스타일에서 설정할 배경색
  justify-content: center; // 가운데 정렬
  align-items: center; // 세로 방향으로 가운데 정렬
  padding: 0.5vh 0.5vw; // 내부 여백
  
  img {
    width: 70%; // 이미지의 최대 너비를 100%로 설정
    height: 100%; // 이미지의 최대 높이를 100%로 설정
  }
  `;


const ToggleButton = styled.button`
  position: fixed;
  left: ${props => props.isOpen ? '20vw' : '0'};
  top: 20px;
  z-index: 2;
  cursor: pointer;
  transition: 0.5s;
`;




// NavbarLink를 별도의 파일로 분리하는 것을 고려필요
const NavbarLink = styled.a`
  padding: 0.5vh 3vw;
  text-decoration: none;
  color: #545454;
  display: block;
  transition: 0.5s;
  font-size: 1.3vw;
  font-weight: 600;
  line-height: normal;

  &:hover {
    color: #f1f1f1;
  }
`;

const MenuText = styled.div`
  width: 95%;
`

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState({ art: false, culture: false, theater: false, quiz: false }); // 각 메뉴 항목에 대해 초기 상태 설정

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate()

  const heritageNavigate = () => {
    navigate('/heritage');
  };
  
  const presentationNavigate = () => {
    navigate('/presentation');
  };

  const toggleSubmenu = (menu) => {
    setOpenMenu({ ...openMenu, [menu]: !openMenu[menu] });
  };

  return (
    <>
      <NavbarContainer isOpen={isOpen}>
        <LogoImage>
          <img src={navlogo} alt="Logo" /> {/* 이미지 경로를 자신의 로고 이미지 경로로 변경하세요. */}
        </LogoImage>
        <LogoBox> </LogoBox>
        <MenuText>
          <Menu title="문화유산 관람" isOpen={openMenu['culture']} onClick={ heritageNavigate }/>
          <hr />
          <Menu title="미술 활동" isOpen={openMenu['art']} onClick={() => toggleSubmenu('art')}>
            <NavbarLink href="#">드로잉</NavbarLink>
            <NavbarLink href="#">컬러링북</NavbarLink>
          </Menu>
          <hr />
          <Menu title="연극 발표 활동" isOpen={openMenu['theater']} onClick={ presentationNavigate }/>
          <hr />
          <Menu title="퀴즈" isOpen={openMenu['quiz']} onClick={() => toggleSubmenu('quiz')}>
            <NavbarLink href="#">문제집 목록</NavbarLink>
            <NavbarLink href="#">문제집 생성</NavbarLink>
            <NavbarLink href="#">퀴즈 결과</NavbarLink>
          </Menu>
        </MenuText>
      </NavbarContainer>
      <ToggleButton onClick={toggleNavbar} isOpen={isOpen}>
        {isOpen ? 'Close' : 'Menu'}
      </ToggleButton>
    </>
  );
};

export default Navbar;
