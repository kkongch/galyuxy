// LogoBox.jsx
import styled from 'styled-components';

const StyledLogoBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 15%;
  flex-shrink: 0;
  border-radius: 1vw;
  background: blue;
  box-shadow: 3px 7px 7px 1px rgba(0, 0, 0, 0.25);
  margin: 5% auto;


`;

const LogoBox = () => {
  return <StyledLogoBox />;
};

export default LogoBox;
