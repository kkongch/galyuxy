import React from 'react';
import styled from 'styled-components';

const Submenu = styled.div`
  display: ${props => props.isOpen ? 'flex' : 'none'};
  flex-direction: column;
  padding-left: 10px;


`;

const MenuTitle = styled.div` // MenuTitle로 변경하여 클릭 가능하도록 함
  cursor: pointer; // 클릭 가능하도록 스타일 변경
  font-size: 20px;
  padding: 10px 15px;

`;

// NavbarLink를 별도의 파일로 분리하거나 여기서 정의를 제거하고 Navbar.js에서 가져온 NavbarLink를 사용하세요.
const NavbarLink = styled.a`
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 18px;
  color: white;
  transition: 0.3s;
  &:hover {
    color: var(--c8c8c8); // 호버 시 색상 변경
  }
`;

const Menu = ({ title, children, isOpen, onClick }) => {
  return (
    <>
      <MenuTitle onClick={onClick}>{title}</MenuTitle> {/* onClick 추가 */}
      <Submenu isOpen={isOpen}>
        {children}
      </Submenu>
    </>
  );
};

export default Menu;
