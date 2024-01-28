import React from 'react';
import styled from 'styled-components';

const Submenu = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  // 추가적인 스타일링
`;

const MenuTitle = styled.div` // MenuTitle로 변경하여 클릭 가능하도록 함
  // 스타일링
  cursor: pointer; // 클릭 가능하도록 스타일 변경
`;

// NavbarLink를 별도의 파일로 분리하거나 여기서 정의를 제거하고 Navbar.js에서 가져온 NavbarLink를 사용하세요.
const NavbarLink = styled.a`
  // 스타일링
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
