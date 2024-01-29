// LogoBox.jsx
import styled from 'styled-components';

const StyledLogoBox = styled.div`
  width: 21.03944rem;
  height: 14.3125rem;
  flex-shrink: 0;
  border-radius: 1.25rem;
  background: #FFF;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  margin-top: 1rem; // 로고 이미지와의 간격
  margin-bottom: 1rem; // 메뉴와의 간격
`;

const LogoBox = () => {
  return <StyledLogoBox />;
};

export default LogoBox;
