import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from 'assets/images/Logo.png';
import LogoBox from './LogoBox';
import { ReactComponent as ArrowSimpleImage } from 'assets/svg/arrowsimple.svg';
import { ReactComponent as BookIcon } from 'assets/svg/nav/book.svg';
import { ReactComponent as LogoutIcon } from 'assets/svg/nav/logout.svg';
import QRmodal from './QRmodal';
const NavContainer = styled.nav`
  position: absolute;
  height: 100%;
  width: 30rem;
  flex-direction: column;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  border-radius: 0rem 5rem 0rem 0rem;
  border: 1px solid rgba(255, 255, 255, 0.53);
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(8px);
  transform: translateX(${(props) => (props.isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease-out;
`;
const ToggleButton = styled.button`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: ${(props) => (props.isOpen ? '30rem' : '0')};
  top: 7%;
  height: 8%;
  width: 3%;
  z-index: 2;
  border-radius: 0px 1.5rem 1.5rem 0px;
  background: #11235a;
  color: white;
  cursor: pointer;
  transition: left 0.3s ease-out;
`;
const FullLogo = styled.img`
  display: flex;
  height: 8rem;
  margin: 3rem;
`;
const Profile = styled.div`
  display: grid;
  height: 17rem;
  width: 25rem;
  margin-bottom: 2rem;
  padding: 1.7rem 1.7rem 1.5rem;
  background: white;
  border-radius: 1.25rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
// const ProfileImage = styled.img`
//   grid-row: 1;
//   grid-column: 1;
//   height: 9rem;
//   width: 9rem;
//   border-radius: 1rem;
// `;
const UserInfo = styled.div`
  display: flex;
  grid-row: 1;
  grid-column: 3;
  text-align: right;
  flex-direction: column-reverse;
  margin: 0 0 0.5rem;
`;
const UserType = styled.div`
  font-weight: 800;
  font-size: 1.3rem;
`;
const UserName = styled.div`
  font-size: 2.3rem;
  font-weight: 800;
`;
const ProfileBtn = styled.div`
  display: flex;
  justify-content: space-between;
  grid-row: 3;
  grid-column: 1 / span 3;
  font-size: 1.1rem;
  font-weight: 900;
`;
const ClassChoice = styled.div`
  display: flex;
  background: #f6eca9;
  width: 10rem;
  height: 3.5rem;
  border-radius: 1.25rem;
  margin: 0.5rem 0 0;
  padding: 0 1rem;
  align-items: center;
  justify-content: space-evenly;
`;
const Logout = styled.div`
  display: flex;
  background: #f6eca9;
  width: 10rem;
  height: 3.5rem;
  border-radius: 1.25rem;
  margin: 0.5rem 0 0;
  padding: 0 1rem;
  align-items: center;
  justify-content: space-evenly;
`;
const MenuText = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: -3rem;

  hr {
    border: 0.1rem solid #fff;
    margin: 1rem -4rem 1rem -1rem;
  }
`;
const Menu = styled(Link)`
  align-items: center;
  width: 100%;
  padding: 1rem;
  color: black;
  font-size: 3rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
`;
const SubMenuItem = styled(Link)`
  margin: 1rem 2rem 0;
  text-decoration: none;
  color: #545454;
  display: block;
  transition: 0.3s;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: normal;
  text-decoration: none;
`;
const SubMenu = ({ children }) => {
  const handleSubMenuClick = (e) => {
    e.stopPropagation();
  };

  return <SubMenuItem onClick={handleSubMenuClick}>{children}</SubMenuItem>;
};

const TeacherNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState({
    art: false,
    culture: false,
    theater: false,
    quiz: false,
  });

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubmenu = (menu) => {
    setOpenMenu((prevMenu) => ({
      ...prevMenu,
      [menu]: !prevMenu[menu],
    }));
  };

  const [checkModal, setCheckModal] = useState(false);
  const toggleQRModal = () => setCheckModal(!checkModal);

  return (
    <>
      <NavContainer isOpen={isOpen}>
        <Link to='/main'>
          <FullLogo src={Logo} />
        </Link>
        <Profile>
          <LogoBox toggleQRModal={toggleQRModal} />
          <UserInfo>
            <UserName>김나연</UserName>
            <UserType>선생님</UserType>
          </UserInfo>
          <ProfileBtn>
            <ClassChoice>
              <BookIcon />
              클래스 선택
            </ClassChoice>
            <Logout>
              <LogoutIcon />
              로그아웃
            </Logout>
          </ProfileBtn>
        </Profile>
        <MenuText>
          <Menu to='/heritage'>문화유산 관람</Menu>
          <hr />
          <Menu onClick={() => toggleSubmenu('art')}>
            미술 활동
            {openMenu.art && (
              <>
                <SubMenu href='#'>드로잉</SubMenu>
                <SubMenu href='#'>컬러링북</SubMenu>
              </>
            )}
          </Menu>
          <hr />
          <Menu to='/presentation'>연극 발표 활동</Menu>
          <hr />
          <Menu onClick={() => toggleSubmenu('quiz')}>
            퀴즈
            {openMenu.quiz && (
              <>
                <SubMenu href='#'>문제집 목록</SubMenu>
                <SubMenu href='#'>문제집 생성</SubMenu>
                <SubMenu href='#'>퀴즈 결과</SubMenu>
              </>
            )}
          </Menu>
        </MenuText>
      </NavContainer>
      {checkModal && <QRmodal toggleQRModal={toggleQRModal} />}
      <ToggleButton isOpen={isOpen} onClick={toggleNavbar}>
        {isOpen ? (
          <ArrowSimpleImage style={{ transform: 'rotate(180deg)' }} />
        ) : (
          <ArrowSimpleImage />
        )}
      </ToggleButton>
    </>
  );
};

export default TeacherNav;
