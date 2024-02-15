import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from 'assets/images/Logo.png';
import { ReactComponent as ArrowSimpleImage } from 'assets/svg/arrowsimple.svg';
import QRmodal from './QRmodal';
import { useRecoilState } from 'recoil';
import { navToggleState } from 'Recoil/UserState';
import profile from 'assets/images/kingProfile.png';

const NavContainer = styled.nav`
  position: absolute;
  height: 100%;
  width: 38rem;
  flex-direction: column;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  transform: translateX(${(props) => (props.isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease-out;

  border-radius: 0rem 3.125rem 0rem 0rem;
  border: 1px solid rgba(255, 255, 255, 0.53);
  background: rgba(255, 255, 255, 0.53);
  backdrop-filter: blur(7.800000190734863px);
  position: fixed;

  z-index: 8;
`;
const ToggleButton = styled.button`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: ${(props) => (props.isOpen ? '38rem' : '0')};
  top: 7%;
  width: 4.375rem;
  height: 7.3125rem;
  z-index: 2;
  border-radius: 0px 1.5rem 1.5rem 0px;
  background: #11235a;
  color: white;
  cursor: pointer;
  transition: left 0.3s ease-out;
  position: fixed;
`;
const FullLogo = styled.img`
  display: flex;
  height: 9.5rem;
  margin: 3rem;
`;
const Profile = styled.div`
  position: relative;
  display: grid;
  height: 21rem;
  width: 32rem;
  margin-bottom: 2rem;
  padding: 1.7rem 1.7rem 1.5rem;
  background: white;
  border-radius: 1.25rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const NoDataMessage = styled.p`
  color: white;
  font-size: 2.2rem;
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
  font-size: 1.8rem;
`;
const UserName = styled.div`
  font-size: 2.8rem;
  font-weight: 800;
`;
const ProfileBtn = styled.div`
  display: flex;
  justify-content: space-between;
  grid-row: 3;
  grid-column: 1 / span 3;
  /* font-size: 1.1rem; */
  font-weight: 800;
`;
const ClassChoice = styled.div`
  display: flex;
  background: #f6eca9;
  width: 13.5rem;
  height: 4.5rem;
  border-radius: 1.25rem;
  margin: 0.5rem 0 0;
  padding: 0 1rem;
  align-items: center;
  justify-content: space-evenly;
  font-size: 1.75rem;
`;
const Logout = styled.div`
  display: flex;
  background: #f6eca9;
  width: 13.5rem;
  height: 4.5rem;
  border-radius: 1.25rem;
  margin: 0.5rem 0 0;
  padding: 0 1rem;
  align-items: center;
  justify-content: space-evenly;
  font-size: 1.75rem;
`;
const MenuText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  /* margin-left: -3rem; */

  hr {
    /* border: 0.1rem solid #fff; */
    border: none;
    background-color: white;
    width: 90%;
    height: 0.0625rem;
  }
`;
const Menu = styled(Link)`
  align-items: center;
  width: 100%;
  padding: 1.9rem 0 1.9rem 3.75rem;
  color: black;
  font-size: 2.6rem;
  font-weight: 800;
  text-decoration: none;
  cursor: pointer;
`;
const SubMenuItem = styled(Link)`
  /* margin: 1rem 2rem 0; */
  padding: 0.8rem 0 0.8rem 2rem;
  text-decoration: none;
  color: #545454;
  display: block;
  transition: 0.3s;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: normal;
  text-decoration: none;
`;
const StudentProfile = styled.img`
  background-color: beige;
  height: 180px;
  width: 250px;
`;
const SubMenu = ({ to, children }) => {
  const handleSubMenuClick = (e) => {
    e.stopPropagation();
  };

  return (
    <SubMenuItem to={to} onClick={handleSubMenuClick}>
      {children}
    </SubMenuItem>
  );
};

const StudentNav = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useRecoilState(navToggleState);
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

  const handleClassChoiceClick = () => {
    navigate('/class');
  };

  const handleLogoutClick = () => {
    sessionStorage.removeItem('groupId');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('no');
    sessionStorage.removeItem('id');
    setIsOpen(false);

    navigate('/login');
    alert('로그아웃 되었습니다!');
  };

  return (
    <>
      <NavContainer isOpen={isOpen}>
        <Link to='/'>
          <FullLogo src={Logo} />
        </Link>
        <Profile>
          {(!sessionStorage.getItem('name') ||
            !sessionStorage.getItem('no') ||
            !sessionStorage.getItem('groupId')) && (
            <Overlay
              onClick={() => {
                navigate('/login');
                setIsOpen(false);
              }}
            >
              <NoDataMessage>클릭 시 로그인으로 이동</NoDataMessage>
            </Overlay>
          )}
          <StudentProfile src={profile} />
          <UserInfo>
            <UserName>{sessionStorage.getItem('name') || '김싸피'}</UserName>
            <UserType>{sessionStorage.getItem('no') || 999}번</UserType>
          </UserInfo>
          <ProfileBtn>
            <ClassChoice onClick={handleClassChoiceClick}>
              {/* <BookIcon /> */}
              학생 선택
            </ClassChoice>
            <Logout onClick={handleLogoutClick}>
              {/* <LogoutIcon /> */}
              로그아웃
            </Logout>
          </ProfileBtn>
        </Profile>
        <MenuText>
          <Menu to='/heritage'>문화유산 관람</Menu>
          <hr />
          <Menu to='/art'>미술 활동</Menu>
          {/* <Menu onClick={() => toggleSubmenu('art')}>
            미술 활동
            {openMenu.art && (
              <>
                <SubMenu to='/menuDrawing'>드로잉</SubMenu>
                <SubMenu to='/menuColoring'>컬러링북</SubMenu>
              </>
            )}
          </Menu> */}
          <hr />
          <Menu to='/room'>연극 발표 활동</Menu>
          <hr />
          <Menu onClick={() => toggleSubmenu('quiz')}>퀴즈</Menu>
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

export default StudentNav;
