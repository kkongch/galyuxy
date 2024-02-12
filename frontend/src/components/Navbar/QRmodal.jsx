import styled from 'styled-components';
import React from 'react';
import QRcode from 'pages/main/QRcode';
import Close from 'assets/images/close.png';
const Modal = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.66);
  z-index: 10;
`;
const CloseButton = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 150px;
  height: 150px;
  z-index: 11;
`;
function QRmodal({ toggleQRModal }) {
  return (
    <Modal>
      <QRcode size={512} id={sessionStorage.getItem('groupId')} />
      <CloseButton src={Close} alt='close' onClick={toggleQRModal} />
    </Modal>
  );
}

export default QRmodal;
