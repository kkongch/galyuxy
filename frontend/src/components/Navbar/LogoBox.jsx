// LogoBox.jsx
import styled from 'styled-components';
import QRcode from 'pages/main/QRcode';
const StyledLogoBox = styled.div`
  grid-row: 1;
  grid-column: 1;
  border-radius: 1rem;
`;

const LogoBox = ({ toggleQRModal }) => {
  return (
    <StyledLogoBox>
      <QRcode id='받아올id' onClick={toggleQRModal} size={180} />
    </StyledLogoBox>
  );
};

export default LogoBox;
