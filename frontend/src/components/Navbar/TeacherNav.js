import React, { useState } from 'react';
import styled from 'styled-components';
import Menu from './Menu'; // Menu 컴포넌트 임포트

const NavbarContainer = styled.div`
  height: 100%;
  width: 250px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: ${props => props.isOpen ? '0' : '-250px'};
  background-color: rgba(0, 0, 0, 0.5);
  transition: 0.3s;
  padding-top: 20px;
`;

const ToggleButton = styled.button`
  position: fixed;
  left: ${props => props.isOpen ? '250px' : '0'};
  top: 20px;
  z-index: 2;
  cursor: pointer;
  transition: 0.3s;
`;

// NavbarLink를 별도의 파일로 분리하는 것을 고려하세요. 여기서는 예시로 유지합니다.
const NavbarLink = styled.a`
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: white;
  display: block;
  transition: 0.3s;

  &:hover {
    color: #f1f1f1;
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState({ art: false, culture: false, theater: false, quiz: false }); // 각 메뉴 항목에 대해 초기 상태 설정

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubmenu = (menu) => {
    setOpenMenu({ ...openMenu, [menu]: !openMenu[menu] });
  };

  return (
    <>
      <ToggleButton onClick={toggleNavbar} isOpen={isOpen}>
        {isOpen ? 'Close' : 'Menu'}
      </ToggleButton>
      <NavbarContainer isOpen={isOpen}>
        <Menu title="문화유산 관람" isOpen={openMenu['culture']} />
        <Menu title="미술 활동" isOpen={openMenu['art']} onClick={() => toggleSubmenu('art')}>
          <NavbarLink href="#">드로잉</NavbarLink>
          <NavbarLink href="#">컬러링북</NavbarLink>
        </Menu>
        <Menu title="연극 발표 활동" isOpen={openMenu['theater']} />
        <Menu title="퀴즈" isOpen={openMenu['quiz']} onClick={() => toggleSubmenu('quiz')}>
          <NavbarLink href="#">문제집 목록</NavbarLink>
          <NavbarLink href="#">문제집 생성</NavbarLink>
          <NavbarLink href="#">퀴즈 결과</NavbarLink>
        </Menu>
      </NavbarContainer>
    </>
  );
};

export default Navbar;
