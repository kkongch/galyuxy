// LogoBox.jsx
import styled from 'styled-components';
import QRcode from 'pages/main/QRcode';
const StyledLogoBox = styled.div`
  position: relative;
  grid-row: 1;
  grid-column: 1;
`;
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const NoDataMessage = styled.p`
  color: white;
  font-size: 1.8rem;
`;

const LogoBox = ({ toggleQRModal }) => {
  return (
    <StyledLogoBox>
      {!sessionStorage.getItem('groupId') && (
        <Overlay>
          <NoDataMessage>클래스 선택 후</NoDataMessage>
          <NoDataMessage>이용해주세요</NoDataMessage>
        </Overlay>
      )}
      <QRcode onClick={toggleQRModal} size={180} />
    </StyledLogoBox>
  );
};

export default LogoBox;
